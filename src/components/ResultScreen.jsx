import React from 'react';
import { motion } from 'framer-motion';

// Sparkle component
function Sparkle({ style }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        fontSize: '1rem',
        pointerEvents: 'none',
        ...style,
      }}
      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 180] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
    >
      ✦
    </motion.div>
  );
}

export default function ResultScreen({ onReset }) {
  return (
    <motion.div
      className="result-card"
      initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -30 }}
      transition={{ type: 'spring', stiffness: 200, damping: 16 }}
    >
      {/* Floating sparkles */}
      <Sparkle style={{ top: 20, left: 30, color: '#ffd60a' }} />
      <Sparkle style={{ top: 40, right: 25, color: '#c77dff' }} />
      <Sparkle style={{ bottom: 60, left: 20, color: '#f72585' }} />
      <Sparkle style={{ bottom: 40, right: 35, color: '#00f5d4' }} />

      {/* Bouncing cake emoji */}
      <motion.span
        className="result-emoji"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎂
      </motion.span>

      <div className="result-label">✨ ADITI'S BIRTHDAY IS ✨</div>

      {/* Animated date */}
      <motion.div
        className="result-date"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        5 AUGUST
      </motion.div>

      <div className="result-year">Every year, always & forever 🎉</div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.button
          className="btn-primary"
          onClick={onReset}
          style={{ width: 'auto', padding: '0.9rem 2rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          🔄 Calculate Another
        </motion.button>
      </div>
    </motion.div>
  );
}
