import React from 'react';
import { motion } from 'framer-motion';

export default function RejectedScreen({ onReset }) {
  return (
    <motion.div
      className="rejected-card"
      initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      {/* Rejected icon */}
      <motion.span
        className="rejected-icon"
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        🚫
      </motion.span>

      <motion.div
        className="rejected-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        WE ONLY CALCULATE<br />BIRTHDAY OF ADITI
      </motion.div>

      <motion.div
        className="rejected-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        The cosmic database has only one entry
      </motion.div>

      {/* Buttons */}
      <motion.div
        style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="btn-primary"
          onClick={onReset}
          style={{ background: 'linear-gradient(135deg, #7b0020, #f72585)', width: 'auto', padding: '0.9rem 2rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 Try Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
