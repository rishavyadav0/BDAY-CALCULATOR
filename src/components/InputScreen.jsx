import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function InputScreen({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name);
      setName('');
    }
  };

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -40, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top sparkle decoration */}
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔮</div>

      <div className="site-title">BDAY FINDER</div>
      <div className="site-subtitle">Cosmic Birthday Oracle</div>

      <div className="divider" />

      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '1rem',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '1px',
        marginBottom: '2rem',
        lineHeight: '1.7',
      }}>
        Enter a first name and let the universe<br />reveal the cosmic birthday date.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <span className="input-icon">✦</span>
          <input
            type="text"
            className="name-input"
            placeholder="Enter first name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            autoFocus
          />
        </div>
        <motion.button
          type="submit"
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          ⚡ Reveal Birthday
        </motion.button>
      </form>
    </motion.div>
  );
}
