import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { IoMail } from 'react-icons/io5';
import { FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { useTrack } from '../../../../context/TrackContext';
import './style.css';

const SOCIALS = [
  { icon: FaPhone,    label: 'Phone',    value: '+1 (417) 227-8921',          href: 'tel:+14172278921' },
  { icon: IoMail,     label: 'Email',    value: 'aee9552s@MissouriState.edu', href: 'mailto:aee9552s@MissouriState.edu' },
  { icon: FaLinkedin, label: 'LinkedIn', value: 'Amen Engworo',               href: 'https://www.linkedin.com/in/amen-engworo-1078b0232/' },
  { icon: FaGithub,   label: 'GitHub',   value: 'edohadevelops',              href: 'https://github.com/edohadevelops' },
  // { icon: FaUpwork, label: 'Upwork', value: 'Hire on Upwork', href: 'https://www.upwork.com' },
];

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const HAS_EMAILJS = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY;

const Contact = () => {
  const { track } = useTrack();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm]   = useState({ company: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setStatus('sending');

    if (HAS_EMAILJS) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name:  form.company || 'Portfolio Visitor',
            from_email: form.email,
            company:    form.company || 'Not provided',
            message:    form.message,
            to_name:    'Amen',
          },
          PUBLIC_KEY
        );
        setStatus('sent');
        setForm({ company: '', email: '', message: '' });
      } catch {
        setStatus('error');
      }
    } else {
      // Fallback: open mail client with pre-filled content
      const subject = encodeURIComponent(`Portfolio Enquiry${form.company ? ` from ${form.company}` : ''}`);
      const body = encodeURIComponent(
        `Hi Amen,\n\n${form.message}\n\nFrom: ${form.email}${form.company ? `\nCompany: ${form.company}` : ''}`
      );
      window.location.href = `mailto:aee9552s@MissouriState.edu?subject=${subject}&body=${body}`;
      setTimeout(() => {
        setStatus('sent');
        setForm({ company: '', email: '', message: '' });
      }, 800);
    }
  };

  const accentHex = track.color;

  return (
    <section
      id="contact"
      className="contact-section"
      ref={ref}
      style={{ '--track-color': accentHex, '--track-shadow': `${accentHex}20` }}
    >
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="section-tag" style={{ background: `${track.color}14`, color: track.color }}>
          Contact
        </div>
        <h2 className="section-title font-display">Let's Work Together</h2>
        <p className="section-subtitle">
          Reach out directly or fill out the form. I respond to every message.
        </p>
      </motion.div>

      <div className="contact-layout">
        {/* Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="contact-field">
            <label className="contact-label">Company or Organisation</label>
            <input
              name="company"
              className="contact-input"
              placeholder="e.g. Google, Missouri State University"
              value={form.company}
              onChange={handleChange}
            />
          </div>
          <div className="contact-field">
            <label className="contact-label">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              className="contact-input"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="contact-field">
            <label className="contact-label">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              required
              className="contact-textarea"
              placeholder="Tell me about the opportunity, project, or question..."
              value={form.message}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <button
            type="submit"
            className="contact-submit"
            style={{ background: track.color }}
            disabled={status === 'sending'}
          >
            {status === 'sent' ? (
              'Message Sent!'
            ) : status === 'sending' ? (
              'Sending...'
            ) : status === 'error' ? (
              'Failed. Try again'
            ) : (
              <>Send Message <IoIosSend size={18} /></>
            )}
          </button>

          {status === 'sent' && (
            <p className="contact-success">
              {HAS_EMAILJS
                ? 'Your message has been sent. I will be in touch soon.'
                : 'Your email client has opened with the message pre-filled. Just hit send.'}
            </p>
          )}
          {status === 'error' && (
            <p className="contact-error">
              Something went wrong. Please email me directly at aee9552s@MissouriState.edu
            </p>
          )}
        </motion.form>

        {/* Socials */}
        <motion.div
          className="contact-socials"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <h3 className="contact-socials-title font-display">Find Me On</h3>
          <div className="contact-social-list">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="contact-social-item"
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <span
                  className="contact-social-icon"
                  style={{ background: `${track.color}14`, color: track.color }}
                >
                  <s.icon size={18} />
                </span>
                <div>
                  <p className="contact-social-label">{s.label}</p>
                  <p className="contact-social-value">{s.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
