import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PROJECT_TYPES,
  FEATURES_BY_TYPE,
  ADDONS,
  CURRENCY,
  calculateTotal,
  DISCOUNT_THRESHOLD,
  DISCOUNT_PERCENTAGE,
} from '../../../data/pricingData';
import { generatePDF } from '../../../utils/generatePDF';
import './style.css';

const STEPS = [
  { id: 0, label: 'You'      },
  { id: 1, label: 'Chat'     },
  { id: 2, label: 'Project'  },
  { id: 3, label: 'Features' },
  { id: 4, label: 'Extras'   },
  { id: 5, label: 'Timeline' },
  { id: 6, label: 'Your Plan'},
];

// ── SIDEBAR ──
const Sidebar = ({ step, projectType, selectedFeatures, selectedAddons, timeline, currency, setCurrency, onRemoveFeature, onRemoveAddon, totals }) => (
  <aside className="pricing-sidebar">
    <div className="sidebar-header">
      <h3 className="sidebar-title">Your Plan</h3>
      <div className="sidebar-currency">
        {Object.values(CURRENCY).map(c => (
          <button
            key={c.code}
            className={`currency-btn ${currency.code === c.code ? 'active' : ''}`}
            onClick={() => setCurrency(c)}
          >
            {c.code}
          </button>
        ))}
      </div>
    </div>

    {!projectType ? (
      <p className="sidebar-empty">Once we figure out what you need, your selections will show up here.</p>
    ) : (
      <>
        <div className="sidebar-section">
          <p className="sidebar-section-label">Project</p>
          <div className="sidebar-item">
            <span>{projectType.icon} {projectType.name}</span>
            <span className="sidebar-price">{currency.symbol}{Math.round(projectType.basePrice * currency.rate).toLocaleString()}</span>
          </div>
        </div>

        {selectedFeatures.length > 0 && (
          <div className="sidebar-section">
            <p className="sidebar-section-label">Features ({selectedFeatures.length})</p>
            {selectedFeatures.map(f => (
              <div key={f.id} className="sidebar-item">
                <span className="sidebar-item-name">{f.name}</span>
                <div className="sidebar-item-right">
                  <span className="sidebar-price">{currency.symbol}{Math.round(f.price * currency.rate).toLocaleString()}</span>
                  {step < 6 && (
                    <button className="sidebar-remove" onClick={() => onRemoveFeature(f.id)}>×</button>
                  )}
                </div>
              </div>
            ))}
            {selectedFeatures.length >= DISCOUNT_THRESHOLD && (
              <div className="sidebar-discount">10% discount applied</div>
            )}
          </div>
        )}

        {selectedAddons.length > 0 && (
          <div className="sidebar-section">
            <p className="sidebar-section-label">Extras</p>
            {selectedAddons.map(a => (
              <div key={a.id} className="sidebar-item">
                <span className="sidebar-item-name">{a.name}</span>
                <div className="sidebar-item-right">
                  <span className="sidebar-price">
                    {a.isPercentage ? `+${a.percentage}%` : `${currency.symbol}${Math.round(a.price * currency.rate).toLocaleString()}`}
                  </span>
                  {step < 6 && (
                    <button className="sidebar-remove" onClick={() => onRemoveAddon(a.id)}>×</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {totals.timelineSurcharge > 0 && (
          <div className="sidebar-section">
            <p className="sidebar-section-label">Timeline</p>
            <div className="sidebar-item">
              <span className="sidebar-item-name">
                {projectType?.timelineOptions?.find(t => t.value === timeline)?.label}
              </span>
              <span className="sidebar-price">+{currency.symbol}{totals.timelineSurcharge.toLocaleString()}</span>
            </div>
          </div>
        )}

        <div className="sidebar-total">
          {totals.discount > 0 && (
            <div className="sidebar-total-row sidebar-saving">
              <span>Discount</span>
              <span>-{currency.symbol}{totals.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="sidebar-total-row">
            <span className="sidebar-total-label">Estimated Total</span>
            <span className="sidebar-total-amount">{currency.symbol}{totals.total.toLocaleString()}</span>
          </div>
          {currency.code === 'NGN' && (
            <p className="sidebar-usd-note">approx. ${Math.round(totals.total / currency.rate).toLocaleString()} USD</p>
          )}
        </div>
      </>
    )}
  </aside>
);

// ── STEP 0: CLIENT DETAILS ──
const StepClientDetails = ({ details, setDetails, onNext }) => {
  const valid = details.name.trim() && details.email.trim();
  return (
    <div className="step-content">
      <div className="step-question">
        <h2 className="step-title">First, let's get to know you a little.</h2>
        <p className="step-sub">Just a couple of quick details so we can personalise your quote and follow up with you afterwards.</p>
      </div>
      <div className="form-fields">
        <div className="form-field">
          <label className="form-label">Your Full Name *</label>
          <input
            className="form-input"
            placeholder="e.g. John Smith"
            value={details.name}
            onChange={e => setDetails(d => ({ ...d, name: e.target.value }))}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Email Address *</label>
          <input
            className="form-input"
            type="email"
            placeholder="your@email.com"
            value={details.email}
            onChange={e => setDetails(d => ({ ...d, email: e.target.value }))}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Business or Company Name <span className="form-optional">(optional)</span></label>
          <input
            className="form-input"
            placeholder="e.g. Acme Ltd or leave it blank"
            value={details.company}
            onChange={e => setDetails(d => ({ ...d, company: e.target.value }))}
          />
        </div>
      </div>
      <button className="btn-primary" disabled={!valid} onClick={onNext}>
        Let's go →
      </button>
    </div>
  );
};

// ── STEP 1: AI CONVERSATION (3 turns) ──
const StepAIConversation = ({
  conversationState,
  currentQuestion,
  currentAnswer, setCurrentAnswer,
  aiError, aiResult,
  onSubmitTurn,
  onContinue, onRestart, onSkip, onBack,
}) => {
  const isLoading = conversationState.startsWith('loading_');
  const isResult  = conversationState === 'result';

  const turnIndex = { q1: 0, loading_q2: 0, q2: 1, loading_q3: 1, q3: 2, loading_result: 2 }[conversationState] ?? 0;

  const placeholders = [
    'Tell me about your business, your idea, or what you\'re trying to build...',
    'Your answer...',
    'Your answer...',
  ];

  return (
    <div className="step-content">
      {!isResult ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={conversationState}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Progress dots */}
            <div className="conv-progress">
              {[0, 1, 2].map(i => (
                <div key={i} className={`conv-dot ${i <= turnIndex ? 'active' : ''} ${i === turnIndex && !isLoading ? 'current' : ''}`} />
              ))}
              <span className="conv-progress-label">
                {isLoading ? 'Thinking...' : `Question ${turnIndex + 1} of 3`}
              </span>
            </div>

            {/* AI chat bubble */}
            <div className="ai-chat-wrap">
              <div className="ai-chat-avatar">✦</div>
              <div className="ai-chat-bubble">
                {isLoading ? (
                  <div className="ai-thinking">
                    <span /><span /><span />
                  </div>
                ) : (
                  <p>{currentQuestion}</p>
                )}
              </div>
            </div>

            {!isLoading && (
              <>
                {aiError && <p className="ai-error">{aiError}</p>}

                <textarea
                  className="form-input form-textarea conv-textarea"
                  value={currentAnswer}
                  onChange={e => setCurrentAnswer(e.target.value)}
                  placeholder={placeholders[turnIndex]}
                  rows={5}
                />

                <div className="step-nav" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <button className="btn-ghost" onClick={onBack}>← Back</button>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="btn-ghost" onClick={onSkip}>Choose manually →</button>
                    <button
                      className="btn-ai"
                      disabled={currentAnswer.trim().length < 5}
                      onClick={onSubmitTurn}
                    >
                      {turnIndex < 2 ? 'Continue →' : '✨ Build my quote'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          className="ai-result-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="ai-result-header">
            <div className="ai-result-sparkle">✦</div>
            <div>
              <h3 className="ai-result-title">Got it — here's what I've put together for you.</h3>
              {aiResult?.reasoning && (
                <p className="ai-result-reasoning">{aiResult.reasoning}</p>
              )}
            </div>
          </div>

          {aiResult?.projectBrief && (
            <blockquote className="ai-result-brief">"{aiResult.projectBrief}"</blockquote>
          )}

          <div className="ai-result-pills">
            {aiResult?.preselectedType && (
              <span className="ai-pill ai-pill-type">
                {aiResult.preselectedType.icon} {aiResult.preselectedType.name}
              </span>
            )}
            {aiResult?.preselectedFeatureCount > 0 && (
              <span className="ai-pill ai-pill-features">
                {aiResult.preselectedFeatureCount} feature{aiResult.preselectedFeatureCount !== 1 ? 's' : ''} picked
              </span>
            )}
            {aiResult?.preselectedAddonCount > 0 && (
              <span className="ai-pill ai-pill-addons">
                {aiResult.preselectedAddonCount} extra{aiResult.preselectedAddonCount !== 1 ? 's' : ''} added
              </span>
            )}
          </div>

          <p className="ai-result-note">
            Everything has been pre-selected based on our chat. Go through each step to review it — change anything you want.
          </p>

          <div className="step-nav">
            <button className="btn-ghost" onClick={onRestart}>← Start over</button>
            <button className="btn-primary" onClick={onContinue}>Review my selections →</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ── STEP 2: PROJECT TYPE ──
const StepProjectType = ({ selected, aiUsed, onSelect, onNext, onBack }) => (
  <div className="step-content">
    <div className="step-question">
      <h2 className="step-title">What are we building?</h2>
      <p className="step-sub">
        {aiUsed && selected
          ? 'Based on our chat, this is what I think fits best. Feel free to change it if something else feels more right.'
          : 'Pick the option that best describes what you\'re after. Not sure? Go with the closest match and we\'ll sort out the details together.'}
      </p>
    </div>
    <div className="type-grid">
      {PROJECT_TYPES.map(t => (
        <button
          key={t.id}
          className={`type-card ${selected?.id === t.id ? 'selected' : ''}`}
          onClick={() => onSelect(t)}
        >
          <span className="type-icon">{t.icon}</span>
          <h3 className="type-name">{t.name}</h3>
          <p className="type-desc">{t.description}</p>
          <div className="type-price">Starting from <strong>${t.basePrice}</strong></div>
          <div className="type-includes">
            <p className="type-includes-label">What's in the base package:</p>
            <ul>{t.includes.map(i => <li key={i}>{i}</li>)}</ul>
          </div>
        </button>
      ))}
    </div>
    <div className="step-nav">
      <button className="btn-ghost" onClick={onBack}>← Back</button>
      <button className="btn-primary" disabled={!selected} onClick={onNext}>
        Next: Pick your features →
      </button>
    </div>
  </div>
);

// ── STEP 3: FEATURES ──
const StepFeatures = ({ projectType, selected, aiSelectedIds, onToggle, onNext, onBack }) => {
  const features = FEATURES_BY_TYPE[projectType?.id] || [];
  return (
    <div className="step-content">
      <div className="step-question">
        <h2 className="step-title">What do you need your site to do?</h2>
        <p className="step-sub">
          Your base package already covers the essentials listed on the previous step. These are the extras you can layer on top. Pick 5 or more and you'll get 10% off the features total.
        </p>
      </div>
      {selected.length >= DISCOUNT_THRESHOLD && (
        <div className="discount-banner">
          Nice one — {selected.length} features selected and your 10% discount has kicked in.
        </div>
      )}
      <div className="features-grid">
        {features.map(f => {
          const isSelected = selected.some(s => s.id === f.id);
          const isAI = aiSelectedIds.has(f.id);
          return (
            <button
              key={f.id}
              className={`feature-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onToggle(f)}
            >
              {isAI && <span className="ai-badge">AI pick</span>}
              <span className="feature-name">{f.name}</span>
              <p className="feature-desc">{f.description}</p>
              <div className="feature-footer">
                <span className="feature-price">${f.price}</span>
                <div className={`feature-check ${isSelected ? 'checked' : ''}`}>
                  {isSelected ? '✓' : '+'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="step-nav">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>Next: Extras →</button>
      </div>
    </div>
  );
};

// ── STEP 4: ADD-ONS ──
const StepAddons = ({ selected, aiSelectedIds, onToggle, onNext, onBack }) => (
  <div className="step-content">
    <div className="step-question">
      <h2 className="step-title">Anything else you'd like to add?</h2>
      <p className="step-sub">
        These extras aren't required, but they can make a real difference to the quality, lifespan, and visibility of your project.
      </p>
    </div>
    <div className="features-grid">
      {ADDONS.map(a => {
        const isSelected = selected.some(s => s.id === a.id);
        const isAI = aiSelectedIds.has(a.id);
        return (
          <button
            key={a.id}
            className={`feature-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggle(a)}
          >
            {isAI && <span className="ai-badge">AI pick</span>}
            <span className="feature-name">{a.name}</span>
            <p className="feature-desc">{a.description}</p>
            <div className="feature-footer">
              <span className="feature-price">
                {a.isPercentage ? `+${a.percentage}%` : `$${a.price}`}
              </span>
              <div className={`feature-check ${isSelected ? 'checked' : ''}`}>
                {isSelected ? '✓' : '+'}
              </div>
            </div>
          </button>
        );
      })}
    </div>
    <div className="step-nav">
      <button className="btn-ghost" onClick={onBack}>← Back</button>
      <button className="btn-primary" onClick={onNext}>Next: Timeline →</button>
    </div>
  </div>
);

// ── STEP 5: TIMELINE ──
const StepTimeline = ({ projectType, timeline, setTimeline, startDate, setStartDate, totals, currency, onNext, onBack }) => {
  const timelineOptions = projectType?.timelineOptions || [];
  return (
    <div className="step-content">
      <div className="step-question">
        <h2 className="step-title">How soon do you need this?</h2>
        <p className="step-sub">
          Every project type has a standard delivery window that's built into the price. If you need it sooner, that's totally fine — it just means we prioritise your project and compress the timeline, which comes at an extra cost.
        </p>
      </div>

      <div className="timeline-options">
        {timelineOptions.map(opt => {
          const isSelected = timeline === opt.value;
          const surchargeAmt = opt.surchargePercent > 0
            ? Math.round((totals.base / currency.rate + totals.discountedFeatures / currency.rate) * opt.surchargePercent / 100)
            : 0;
          return (
            <button
              key={opt.value}
              className={`timeline-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setTimeline(opt.value)}
            >
              <span className="timeline-card-label">{opt.label.split(' — ')[0]}</span>
              <span className="timeline-card-duration">{opt.label.split(' — ')[1]}</span>
              {opt.surchargePercent === 0 ? (
                <span className="timeline-card-standard">Included in price</span>
              ) : (
                <span className="timeline-card-surcharge">
                  +{opt.surchargePercent}% &nbsp; ({currency.symbol}{Math.round(surchargeAmt * currency.rate).toLocaleString()} extra)
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="form-field" style={{ maxWidth: 260 }}>
        <label className="form-label">Preferred Start Date <span className="form-optional">(optional)</span></label>
        <input
          className="form-input"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="step-nav">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>See my full plan →</button>
      </div>
    </div>
  );
};

// ── STEP 6: SUMMARY ──
const StepSummary = ({
  clientDetails, projectType, selectedFeatures, selectedAddons,
  timeline, startDate, totals, currency, projectBrief,
  onBack, onDownloadPDF, onSendEmail, emailStatus,
}) => {
  const timelineLabel = projectType?.timelineOptions?.find(t => t.value === timeline)?.label;
  const items = [
    { label: `${projectType?.icon} ${projectType?.name}`, price: totals.base },
    ...selectedFeatures.map(f => ({ label: f.name, price: Math.round(f.price * currency.rate) })),
    ...(totals.timelineSurcharge > 0
      ? [{ label: `Faster timeline — ${timelineLabel}`, price: totals.timelineSurcharge }]
      : []),
    ...selectedAddons.map(a => ({ label: a.name, price: Math.round(a.price * currency.rate) })),
  ];

  return (
    <div className="step-content summary-content">
      <div className="step-question">
        <h2 className="step-title">Here's your website plan, {clientDetails.name?.split(' ')[0]}!</h2>
        <p className="step-sub">
          This is everything we've put together for you. Download it as a PDF to keep a copy, or send it straight to Amen to get the ball rolling.
        </p>
      </div>

      <div className="summary-items">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="summary-item"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            <span className="summary-item-label">{item.label}</span>
            <span className="summary-item-price">{currency.symbol}{item.price?.toLocaleString()}</span>
          </motion.div>
        ))}

        {totals.discount > 0 && (
          <motion.div
            className="summary-item summary-discount"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: items.length * 0.07 }}
          >
            <span>10% loyalty discount</span>
            <span>-{currency.symbol}{totals.discount.toLocaleString()}</span>
          </motion.div>
        )}
      </div>

      <motion.div
        className="summary-total"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: items.length * 0.07 + 0.2 }}
      >
        <span>Total Estimate</span>
        <motion.span
          className="summary-total-amount"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.07 + 0.5 }}
        >
          {currency.symbol}{totals.total.toLocaleString()}
        </motion.span>
      </motion.div>

      {timeline && timeline !== 'none' && (
        <motion.div
          className="summary-timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.07 + 0.7 }}
        >
          <span>Duration: {projectType?.timelineOptions?.find(t => t.value === timeline)?.label}</span>
          {startDate && (
            <span>
              Start: {new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
        </motion.div>
      )}

      <motion.div
        className="summary-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: items.length * 0.07 + 0.9 }}
      >
        <button className="btn-primary" onClick={onDownloadPDF}>Download PDF</button>
        <button
          className="btn-secondary"
          onClick={onSendEmail}
          disabled={emailStatus === 'sending' || emailStatus === 'sent'}
        >
          {emailStatus === 'sent'    ? '✓ Sent to Amen!'
           : emailStatus === 'sending' ? 'Sending...'
           : emailStatus === 'error'   ? 'Try again'
           : 'Send to Amen'}
        </button>
        <button className="btn-ghost" onClick={onBack}>← Go back and adjust</button>
      </motion.div>

      <motion.p
        className="summary-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: items.length * 0.07 + 1.1 }}
      >
        Amen will follow up with you at <strong>{clientDetails.email}</strong> to chat through the details and get things moving.
      </motion.p>
    </div>
  );
};

// ── MAIN PAGE ──
const PricingPage = () => {
  const [step, setStep]                         = useState(0);
  const [currency, setCurrency]                 = useState(CURRENCY.USD);
  const [clientDetails, setClientDetails]       = useState({ name: '', email: '', company: '' });
  const [projectType, setProjectType]           = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedAddons, setSelectedAddons]     = useState([]);
  const [aiSelectedIds, setAiSelectedIds]       = useState(new Set());
  const [timeline, setTimeline]                 = useState('standard');
  const [startDate, setStartDate]               = useState('');
  const [projectBrief, setProjectBrief]         = useState('');
  const [emailStatus, setEmailStatus]           = useState('idle');

  // Conversation state
  const [conversationState, setConversationState] = useState('q1');
  const [conversationTurns, setConversationTurns] = useState([]);
  const [currentQuestion, setCurrentQuestion]     = useState('');
  const [currentAnswer, setCurrentAnswer]         = useState('');
  const [aiResult, setAiResult]                   = useState(null);
  const [aiError, setAiError]                     = useState('');

  const totals = calculateTotal(projectType, selectedFeatures, selectedAddons, timeline, currency.code);
  const aiUsed = aiSelectedIds.size > 0;

  // Set opening question when client details are entered and we move to step 1
  useEffect(() => {
    if (step === 1 && conversationTurns.length === 0 && !currentQuestion) {
      const firstName = clientDetails.name?.split(' ')[0] || 'there';
      setCurrentQuestion(
        `Hey ${firstName}! Let's figure out exactly what you need. Tell me about your business or idea, and what you're hoping a website will help you do. Just say it however comes naturally — no tech speak needed.`
      );
    }
  }, [step, clientDetails.name, conversationTurns.length, currentQuestion]);

  const handleProjectTypeSelect = (type) => {
    if (projectType?.id !== type.id) setSelectedFeatures([]);
    setProjectType(type);
    setTimeline('standard');
  };

  const toggleFeature = (f) => {
    setSelectedFeatures(prev =>
      prev.some(s => s.id === f.id) ? prev.filter(s => s.id !== f.id) : [...prev, f]
    );
  };

  const toggleAddon = (a) => {
    setSelectedAddons(prev =>
      prev.some(s => s.id === a.id) ? prev.filter(s => s.id !== a.id) : [...prev, a]
    );
  };

  const handleSubmitTurn = async () => {
    if (!currentAnswer.trim()) return;

    const turnIndex = conversationTurns.length; // 0, 1, or 2
    const isFinal   = turnIndex >= 2;

    setConversationState(isFinal ? 'loading_result' : `loading_q${turnIndex + 2}`);
    setAiError('');

    const thisConversation = [
      ...conversationTurns,
      { question: currentQuestion, answer: currentAnswer.trim() },
    ];

    try {
      const res = await fetch('/.netlify/functions/analyse-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turn: isFinal ? 'final' : `q${turnIndex + 2}`,
          conversation: thisConversation,
          allTypes: PROJECT_TYPES,
          allFeatures: FEATURES_BY_TYPE,
          allAddons: ADDONS,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Request failed');
      }

      const data = await res.json();

      // Save this turn now that the API call succeeded
      setConversationTurns(thisConversation);
      setCurrentAnswer('');

      if (isFinal) {
        const type = PROJECT_TYPES.find(t => t.id === data.suggestedTypeId) || PROJECT_TYPES[0];
        setProjectType(type);
        setTimeline('standard');

        const typeFeatures = FEATURES_BY_TYPE[type.id] || [];
        const features = (data.suggestedFeatureIds || [])
          .map(id => typeFeatures.find(f => f.id === id))
          .filter(Boolean);
        setSelectedFeatures(features);

        const addons = (data.suggestedAddonIds || [])
          .map(id => ADDONS.find(a => a.id === id))
          .filter(Boolean);
        setSelectedAddons(addons);

        const aiIds = new Set([...features.map(f => f.id), ...addons.map(a => a.id)]);
        setAiSelectedIds(aiIds);

        if (data.projectBrief) setProjectBrief(data.projectBrief);

        setAiResult({
          reasoning: data.reasoning,
          projectBrief: data.projectBrief,
          preselectedType: type,
          preselectedFeatureCount: features.length,
          preselectedAddonCount: addons.length,
        });
        setConversationState('result');
      } else {
        setCurrentQuestion(data.question);
        setConversationState(`q${turnIndex + 2}`);
      }
    } catch (err) {
      setAiError(err.message || 'Something went wrong. Try again or choose manually.');
      setConversationState(`q${turnIndex + 1}`);
    }
  };

  const resetConversation = () => {
    setConversationState('q1');
    setConversationTurns([]);
    setCurrentQuestion('');
    setCurrentAnswer('');
    setAiResult(null);
    setAiError('');
    setProjectType(null);
    setSelectedFeatures([]);
    setSelectedAddons([]);
    setAiSelectedIds(new Set());
    setProjectBrief('');
  };

  const handleDownloadPDF = () => {
    generatePDF({
      clientDetails,
      projectType,
      selectedFeatures,
      selectedAddons,
      timeline: projectType?.timelineOptions?.find(t => t.value === timeline)?.label,
      startDate: startDate
        ? new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        : '',
      projectBrief,
      totals,
      currency,
    });
  };

  const handleSendEmail = async () => {
    setEmailStatus('sending');
    try {
      const timelineLabel = projectType?.timelineOptions?.find(t => t.value === timeline)?.label;

      // Generate PDF as base64 so it can be attached to the email
      const { quoteRef, base64: pdfBase64 } = generatePDF({
        clientDetails,
        projectType,
        selectedFeatures,
        selectedAddons,
        timeline: timelineLabel,
        startDate: startDate
          ? new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
          : '',
        projectBrief,
        totals,
        currency,
        returnBase64: true,
      });

      const res = await fetch('/.netlify/functions/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientDetails,
          projectType,
          selectedFeatures,
          selectedAddons,
          timeline: timelineLabel,
          totals,
          currency,
          quoteRef,
          pdfBase64,
          projectBrief,
          timelineSurchargePercent: totals.timelineSurchargePercent,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to send');
      }

      setEmailStatus('sent');
    } catch (err) {
      console.error('Send email error:', err);
      setEmailStatus('error');
    }
  };

  const goToStep = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <div className="pricing-header-inner">
          <h1 className="pricing-page-title font-display">Build Your Website</h1>
          <p className="pricing-page-sub">
            Answer a few questions and walk away with a clear, honest plan for your project — and a price you can actually work with.
          </p>
        </div>
      </div>

      <div className="pricing-body">
        {step < 6 && (
          <div className="progress-bar">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={`progress-step ${step >= i ? 'active' : ''} ${step === i ? 'current' : ''}`}
              >
                <div className="progress-dot">{step > i ? '✓' : i + 1}</div>
                <span className="progress-label">{s.label}</span>
                {i < STEPS.length - 1 && <div className="progress-line" />}
              </div>
            ))}
          </div>
        )}

        <div className="pricing-main">
          <div className="pricing-steps">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <StepClientDetails
                    details={clientDetails}
                    setDetails={setClientDetails}
                    onNext={() => goToStep(1)}
                  />
                )}
                {step === 1 && (
                  <StepAIConversation
                    conversationState={conversationState}
                    currentQuestion={currentQuestion}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    aiError={aiError}
                    aiResult={aiResult}
                    onSubmitTurn={handleSubmitTurn}
                    onSkip={() => goToStep(2)}
                    onContinue={() => goToStep(2)}
                    onRestart={resetConversation}
                    onBack={() => goToStep(0)}
                  />
                )}
                {step === 2 && (
                  <StepProjectType
                    selected={projectType}
                    aiUsed={aiUsed}
                    onSelect={handleProjectTypeSelect}
                    onNext={() => goToStep(3)}
                    onBack={() => goToStep(1)}
                  />
                )}
                {step === 3 && (
                  <StepFeatures
                    projectType={projectType}
                    selected={selectedFeatures}
                    aiSelectedIds={aiSelectedIds}
                    onToggle={toggleFeature}
                    onNext={() => goToStep(4)}
                    onBack={() => goToStep(2)}
                  />
                )}
                {step === 4 && (
                  <StepAddons
                    selected={selectedAddons}
                    aiSelectedIds={aiSelectedIds}
                    onToggle={toggleAddon}
                    onNext={() => goToStep(5)}
                    onBack={() => goToStep(3)}
                  />
                )}
                {step === 5 && (
                  <StepTimeline
                    projectType={projectType}
                    timeline={timeline}
                    setTimeline={setTimeline}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    totals={totals}
                    currency={currency}
                    onNext={() => goToStep(6)}
                    onBack={() => goToStep(4)}
                  />
                )}
                {step === 6 && (
                  <StepSummary
                    clientDetails={clientDetails}
                    projectType={projectType}
                    selectedFeatures={selectedFeatures}
                    selectedAddons={selectedAddons}
                    timeline={timeline}
                    startDate={startDate}
                    totals={totals}
                    currency={currency}
                    projectBrief={projectBrief}
                    onBack={() => goToStep(5)}
                    onDownloadPDF={handleDownloadPDF}
                    onSendEmail={handleSendEmail}
                    emailStatus={emailStatus}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {step >= 1 && step < 6 && (
            <Sidebar
              step={step}
              projectType={projectType}
              selectedFeatures={selectedFeatures}
              selectedAddons={selectedAddons}
              timeline={timeline}
              currency={currency}
              setCurrency={setCurrency}
              onRemoveFeature={id => setSelectedFeatures(prev => prev.filter(f => f.id !== id))}
              onRemoveAddon={id => setSelectedAddons(prev => prev.filter(a => a.id !== id))}
              totals={totals}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
