import { useState } from 'react';
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
  { id: 1, label: 'Tell Us'  },
  { id: 2, label: 'Project'  },
  { id: 3, label: 'Features' },
  { id: 4, label: 'Add-ons'  },
  { id: 5, label: 'Timeline' },
  { id: 6, label: 'Summary'  },
];

const AI_LOADING_MSGS = [
  'Reading your description...',
  'Understanding what you need...',
  'Matching the right project type...',
  'Selecting the best features...',
  'Building your quote...',
];

// ── CLAUDE LOADER ──
const ClaudeLoader = () => (
  <div className="claude-loader">
    <span /><span /><span />
  </div>
);

// ── SIDEBAR ──
const Sidebar = ({ step, projectType, selectedFeatures, selectedAddons, currency, setCurrency, onRemoveFeature, onRemoveAddon, totals }) => (
  <aside className="pricing-sidebar">
    <div className="sidebar-header">
      <h3 className="sidebar-title">Your Quote</h3>
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
      <p className="sidebar-empty">Your selections will appear here once we analyse your project.</p>
    ) : (
      <>
        <div className="sidebar-section">
          <p className="sidebar-section-label">Project Type</p>
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
              <div className="sidebar-discount">
                🎉 {DISCOUNT_PERCENTAGE}% discount applied!
              </div>
            )}
          </div>
        )}

        {selectedAddons.length > 0 && (
          <div className="sidebar-section">
            <p className="sidebar-section-label">Add-ons</p>
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

        <div className="sidebar-total">
          {totals.discount > 0 && (
            <div className="sidebar-total-row sidebar-saving">
              <span>Discount</span>
              <span>-{currency.symbol}{totals.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="sidebar-total-row">
            <span className="sidebar-total-label">Total Estimate</span>
            <span className="sidebar-total-amount">{currency.symbol}{totals.total.toLocaleString()}</span>
          </div>
          {currency.code === 'NGN' && (
            <p className="sidebar-usd-note">≈ ${Math.round(totals.total / currency.rate).toLocaleString()} USD</p>
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
        <h2 className="step-title">Before we start, tell us a little about you.</h2>
        <p className="step-sub">This helps us personalise your quote and get in touch with you.</p>
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
          <label className="form-label">Company / Business Name <span className="form-optional">(optional)</span></label>
          <input
            className="form-input"
            placeholder="e.g. Acme Ltd or leave blank"
            value={details.company}
            onChange={e => setDetails(d => ({ ...d, company: e.target.value }))}
          />
        </div>
      </div>
      <button className="btn-primary" disabled={!valid} onClick={onNext}>
        Let's Build Your Quote →
      </button>
    </div>
  );
};

// ── STEP 1: AI INTERVIEW ──
const StepAIInterview = ({
  clientDetails, notes, setNotes,
  aiLoading, aiLoadingMsg, aiError, aiResult,
  onAnalyse, onSkip, onContinue, onRestart, onBack,
}) => {
  const firstName = clientDetails.name?.split(' ')[0] || 'there';

  return (
    <div className="step-content">
      {!aiResult ? (
        <>
          <div className="step-question">
            <h2 className="step-title">Tell us about your project, {firstName}.</h2>
            <p className="step-sub">
              Describe what you need in plain English — who you are, what your business does, and what
              you want the site or app to do. Our AI will read it and automatically select the best
              project type and features for you.
            </p>
          </div>

          <div className="form-field">
            <textarea
              className="form-input form-textarea"
              style={{ minHeight: 160, fontSize: 15, lineHeight: 1.75 }}
              placeholder="e.g. I run a hair salon in Lagos and I want my customers to book appointments online, see photos of my work, and contact me easily..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              disabled={aiLoading}
              rows={7}
            />
          </div>

          {aiError && <p className="ai-error">{aiError}</p>}

          <div className="step-nav" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <button className="btn-ghost" onClick={onBack} disabled={aiLoading}>← Back</button>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-ghost" onClick={onSkip} disabled={aiLoading}>
                I'll choose manually →
              </button>
              <button
                className="btn-ai"
                disabled={aiLoading || notes.trim().length < 10}
                onClick={onAnalyse}
              >
                {aiLoading
                  ? <><ClaudeLoader /> {aiLoadingMsg}</>
                  : '✨ Analyse My Project'
                }
              </button>
            </div>
          </div>
        </>
      ) : (
        <motion.div
          className="ai-result-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="ai-result-header">
            <div className="ai-result-sparkle">✨</div>
            <div>
              <h3 className="ai-result-title">All set! Here's what I understood.</h3>
              {aiResult.reasoning && (
                <p className="ai-result-reasoning">{aiResult.reasoning}</p>
              )}
            </div>
          </div>

          {aiResult.projectBrief && (
            <blockquote className="ai-result-brief">
              "{aiResult.projectBrief}"
            </blockquote>
          )}

          <div className="ai-result-pills">
            {aiResult.preselectedType && (
              <span className="ai-pill ai-pill-type">
                {aiResult.preselectedType.icon} {aiResult.preselectedType.name}
              </span>
            )}
            {aiResult.preselectedFeatureCount > 0 && (
              <span className="ai-pill ai-pill-features">
                {aiResult.preselectedFeatureCount} feature{aiResult.preselectedFeatureCount !== 1 ? 's' : ''} selected
              </span>
            )}
            {aiResult.preselectedAddonCount > 0 && (
              <span className="ai-pill ai-pill-addons">
                {aiResult.preselectedAddonCount} add-on{aiResult.preselectedAddonCount !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>

          <p className="ai-result-note">
            Everything has been pre-selected for you. You'll review each step next — add, remove, or change anything you like.
          </p>

          <div className="step-nav">
            <button className="btn-ghost" onClick={onRestart}>← Re-describe project</button>
            <button className="btn-primary" onClick={onContinue}>Review my selections →</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ── STEP 2: PROJECT TYPE ──
const StepProjectType = ({ selected, onSelect, onNext, onBack }) => (
  <div className="step-content">
    <div className="step-question">
      <h2 className="step-title">What are we building for you?</h2>
      <p className="step-sub">
        {selected
          ? 'Our AI suggested the type below based on your description. Change it if needed.'
          : 'Select the option that best describes your project. Not sure? Pick the closest one — we can adjust later.'}
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
          <div className="type-price">
            Starting at <strong>${t.basePrice}</strong>
          </div>
          <div className="type-includes">
            <p className="type-includes-label">Included in base:</p>
            <ul>
              {t.includes.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        </button>
      ))}
    </div>
    <div className="step-nav">
      <button className="btn-ghost" onClick={onBack}>← Back</button>
      <button className="btn-primary" disabled={!selected} onClick={onNext}>
        Next: Choose Features →
      </button>
    </div>
  </div>
);

// ── STEP 3: FEATURES ──
const StepFeatures = ({ projectType, selected, aiSelectedIds, onToggle, onNext, onBack }) => {
  const features = FEATURES_BY_TYPE[projectType?.id] || [];
  const hasAiSelections = aiSelectedIds.size > 0;

  return (
    <div className="step-content">
      <div className="step-question">
        <h2 className="step-title">What should your project be able to do?</h2>
        <p className="step-sub">
          {hasAiSelections
            ? 'Our AI pre-selected the features below based on your description. Add more or remove any you don\'t need. Select 5+ for a 10% discount.'
            : 'Select every feature you need. Select 5 or more for a 10% discount on features.'}
        </p>
      </div>
      {selected.length >= DISCOUNT_THRESHOLD && (
        <div className="discount-banner">
          🎉 You've selected {selected.length} features — a {DISCOUNT_PERCENTAGE}% discount has been applied to your features total!
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
              {isAI && <span className="ai-badge">AI</span>}
              <div className="feature-card-top">
                <span className="feature-name">{f.name}</span>
                <div className="feature-card-meta">
                  <span className="feature-price">${f.price}</span>
                  <div className={`feature-check ${isSelected ? 'checked' : ''}`}>
                    {isSelected ? '✓' : '+'}
                  </div>
                </div>
              </div>
              <p className="feature-desc">{f.description}</p>
            </button>
          );
        })}
      </div>
      <div className="step-nav">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>
          Next: Add-ons →
        </button>
      </div>
    </div>
  );
};

// ── STEP 4: ADD-ONS ──
const StepAddons = ({ selected, aiSelectedIds, onToggle, onNext, onBack }) => (
  <div className="step-content">
    <div className="step-question">
      <h2 className="step-title">Want to go further?</h2>
      <p className="step-sub">
        {aiSelectedIds.size > 0
          ? 'Our AI suggested the add-ons below. These extras can significantly improve your project\'s quality and longevity.'
          : 'These extras are not required but can significantly improve your project\'s quality, visibility, and longevity.'}
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
            {isAI && <span className="ai-badge">AI</span>}
            <div className="feature-card-top">
              <span className="feature-name">{a.name}</span>
              <div className="feature-card-meta">
                <span className="feature-price">
                  {a.isPercentage ? `+${a.percentage}%` : `$${a.price}`}
                </span>
                <div className={`feature-check ${isSelected ? 'checked' : ''}`}>
                  {isSelected ? '✓' : '+'}
                </div>
              </div>
            </div>
            <p className="feature-desc">{a.description}</p>
          </button>
        );
      })}
    </div>
    <div className="step-nav">
      <button className="btn-ghost" onClick={onBack}>← Back</button>
      <button className="btn-primary" onClick={onNext}>
        Next: Timeline →
      </button>
    </div>
  </div>
);

// ── STEP 5: TIMELINE ──
const StepTimeline = ({ projectType, timeline, setTimeline, startDate, setStartDate, onNext, onBack }) => {
  const timelineOptions = projectType?.timelineOptions || [];
  return (
    <div className="step-content">
      <div className="step-question">
        <h2 className="step-title">When do you want to get started?</h2>
        <p className="step-sub">
          Give us a preferred start date and an estimated duration. This helps us plan and gives you a realistic delivery window.
        </p>
      </div>
      <div className="timeline-fields">
        <div className="form-field">
          <label className="form-label">Preferred Start Date</label>
          <input
            className="form-input"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-field">
          <label className="form-label">Estimated Duration</label>
          <select
            className="form-input form-select"
            value={timeline}
            onChange={e => setTimeline(e.target.value)}
          >
            {timelineOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="step-nav">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>See My Summary →</button>
      </div>
    </div>
  );
};

// ── STEP 6: ANIMATED SUMMARY ──
const StepSummary = ({
  clientDetails, projectType, selectedFeatures, selectedAddons,
  timeline, startDate, totals, currency, projectBrief,
  onBack, onDownloadPDF, onSendEmail, emailStatus,
}) => {
  const items = [
    { label: `${projectType?.icon} ${projectType?.name}`, price: totals.base },
    ...selectedFeatures.map(f => ({ label: f.name, price: Math.round(f.price * currency.rate) })),
    ...selectedAddons.map(a => ({
      label: a.name,
      price: a.isPercentage ? totals.rushAmount : Math.round(a.price * currency.rate),
    })),
  ];

  return (
    <div className="step-content summary-content">
      <div className="step-question">
        <h2 className="step-title">
          Here's your project quote, {clientDetails.name?.split(' ')[0]}! 🎉
        </h2>
        <p className="step-sub">
          Here's everything we'll build for you. Download your PDF or send it straight to Amen.
        </p>
      </div>

      <div className="summary-items">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="summary-item"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
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
            transition={{ duration: 0.35, delay: items.length * 0.08 }}
          >
            <span>🎉 Loyalty Discount (10%)</span>
            <span>-{currency.symbol}{totals.discount.toLocaleString()}</span>
          </motion.div>
        )}
      </div>

      <motion.div
        className="summary-total"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: items.length * 0.08 + 0.2 }}
      >
        <span>Total Estimate</span>
        <motion.span
          className="summary-total-amount"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.08 + 0.5 }}
        >
          {currency.symbol}{totals.total.toLocaleString()}
        </motion.span>
      </motion.div>

      {timeline && timeline !== 'none' && (
        <motion.div
          className="summary-timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.08 + 0.7 }}
        >
          <span>⏱ Estimated Duration: {projectType?.timelineOptions?.find(t => t.value === timeline)?.label}</span>
          {startDate && (
            <span>
              📅 Start Date: {new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
        </motion.div>
      )}

      <motion.div
        className="summary-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: items.length * 0.08 + 0.9 }}
      >
        <button className="btn-primary" onClick={onDownloadPDF}>
          📄 Download PDF Quote
        </button>
        <button
          className="btn-secondary"
          onClick={onSendEmail}
          disabled={emailStatus === 'sending' || emailStatus === 'sent'}
        >
          {emailStatus === 'sent' ? '✓ Sent to Amen!' : emailStatus === 'sending' ? 'Sending...' : '📨 Send to Amen'}
        </button>
        <button className="btn-ghost" onClick={onBack}>← Adjust selections</button>
      </motion.div>

      <motion.p
        className="summary-note"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: items.length * 0.08 + 1.1 }}
      >
        Amen will follow up with you at <strong>{clientDetails.email}</strong> to discuss next steps and schedule a call.
      </motion.p>
    </div>
  );
};

// ── MAIN PRICING PAGE ──
const PricingPage = () => {
  const [step, setStep]                         = useState(0);
  const [currency, setCurrency]                 = useState(CURRENCY.USD);
  const [clientDetails, setClientDetails]       = useState({ name: '', email: '', company: '' });
  const [projectType, setProjectType]           = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedAddons, setSelectedAddons]     = useState([]);
  const [aiSelectedIds, setAiSelectedIds]       = useState(new Set());
  const [timeline, setTimeline]                 = useState('none');
  const [startDate, setStartDate]               = useState('');
  const [notes, setNotes]                       = useState('');
  const [projectBrief, setProjectBrief]         = useState('');
  const [aiResult, setAiResult]                 = useState(null);
  const [aiLoading, setAiLoading]               = useState(false);
  const [aiLoadingMsg, setAiLoadingMsg]         = useState(AI_LOADING_MSGS[0]);
  const [aiError, setAiError]                   = useState('');
  const [emailStatus, setEmailStatus]           = useState('idle');

  const totals = calculateTotal(projectType, selectedFeatures, selectedAddons, currency.code);

  const handleProjectTypeSelect = (type) => {
    if (projectType?.id !== type.id) setSelectedFeatures([]);
    setProjectType(type);
    if (type.timelineOptions?.[0]) setTimeline(type.timelineOptions[0].value);
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

  const handleAnalyse = async () => {
    setAiLoading(true);
    setAiError('');
    setAiResult(null);

    let msgIdx = 0;
    const msgTimer = setInterval(() => {
      msgIdx = (msgIdx + 1) % AI_LOADING_MSGS.length;
      setAiLoadingMsg(AI_LOADING_MSGS[msgIdx]);
    }, 1600);

    try {
      const response = await fetch('/.netlify/functions/analyse-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDescription: notes,
          allTypes: PROJECT_TYPES,
          allFeatures: FEATURES_BY_TYPE,
          allAddons: ADDONS,
        }),
      });

      clearInterval(msgTimer);

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Analysis failed');
      }

      const data = await response.json();

      // Resolve project type
      const type = PROJECT_TYPES.find(t => t.id === data.suggestedTypeId) || PROJECT_TYPES[0];
      setProjectType(type);
      if (type.timelineOptions?.[0]) setTimeline(type.timelineOptions[0].value);

      // Resolve features
      const typeFeatures = FEATURES_BY_TYPE[type.id] || [];
      const features = (data.suggestedFeatureIds || [])
        .map(id => typeFeatures.find(f => f.id === id))
        .filter(Boolean);
      setSelectedFeatures(features);

      // Resolve add-ons
      const addons = (data.suggestedAddonIds || [])
        .map(id => ADDONS.find(a => a.id === id))
        .filter(Boolean);
      setSelectedAddons(addons);

      // Track which IDs were AI-chosen for badge display
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
    } catch (err) {
      clearInterval(msgTimer);
      setAiError(err.message || 'Something went wrong. You can still choose manually.');
    } finally {
      setAiLoading(false);
      setAiLoadingMsg(AI_LOADING_MSGS[0]);
    }
  };

  const resetAI = () => {
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
      const subject = encodeURIComponent(`New Quote Request — ${clientDetails.name} — ${projectType?.name}`);
      const body = encodeURIComponent(
        `New quote request from EdohaDeveloped Quote Builder\n\n` +
        `Client: ${clientDetails.name}\n` +
        `Email: ${clientDetails.email}\n` +
        `Company: ${clientDetails.company || 'N/A'}\n\n` +
        `Project Type: ${projectType?.name}\n` +
        `Features: ${selectedFeatures.map(f => f.name).join(', ')}\n` +
        `Add-ons: ${selectedAddons.map(a => a.name).join(', ') || 'None'}\n` +
        `Timeline: ${projectType?.timelineOptions?.find(t => t.value === timeline)?.label || 'Not specified'}\n` +
        `Start Date: ${startDate || 'Not specified'}\n\n` +
        `Project Notes:\n${notes}\n\n` +
        `Project Brief (AI-generated):\n${projectBrief}\n\n` +
        `Total Estimate: ${currency.symbol}${totals.total.toLocaleString()} ${currency.code}\n\n` +
        `[PDF quote generated and available for download by client]`
      );
      window.location.href = `mailto:aee9552s@MissouriState.edu?subject=${subject}&body=${body}`;
      setTimeout(() => setEmailStatus('sent'), 800);
    } catch {
      setEmailStatus('idle');
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
          <h1 className="pricing-page-title font-display">Get Your Project Quote</h1>
          <p className="pricing-page-sub">
            Answer a few questions and get a detailed, personalised quote in minutes.
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
                  <StepAIInterview
                    clientDetails={clientDetails}
                    notes={notes}
                    setNotes={setNotes}
                    aiLoading={aiLoading}
                    aiLoadingMsg={aiLoadingMsg}
                    aiError={aiError}
                    aiResult={aiResult}
                    onAnalyse={handleAnalyse}
                    onSkip={() => goToStep(2)}
                    onContinue={() => goToStep(2)}
                    onRestart={resetAI}
                    onBack={() => goToStep(0)}
                  />
                )}
                {step === 2 && (
                  <StepProjectType
                    selected={projectType}
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
