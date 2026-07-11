import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { icon: '🚀', label: 'Connecting to NASA HQ...' },
  { icon: '🤖', label: 'Asking Elon Musk...' },
  { icon: '🧠', label: 'Asking Albert Einstein...' },
  { icon: '🔭', label: 'Connecting Hubble Telescope...' },
  { icon: '👽', label: 'Asking Aliens of Alpha Centauri...' },
  { icon: '🌌', label: 'Decoding the Universe...' },
];

const TOTAL_DURATION = 10000; // ms
const STEP_DURATION = TOTAL_DURATION / steps.length;

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, STEP_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, TOTAL_DURATION / 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const step = steps[stepIndex];

  return (
    <motion.div
      className="loading-card"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Live badge */}
      <div className="loading-badge">
        <span className="pulse-dot" />
        COSMIC SCAN ACTIVE
      </div>

      {/* Animated icon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`icon-${stepIndex}`}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
        >
          {step.icon}
        </motion.div>
      </AnimatePresence>

      {/* Message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`msg-${stepIndex}`}
          className="loading-message"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          {step.label}
        </motion.div>
      </AnimatePresence>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '2rem' }}>
        {steps.map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: i === stepIndex ? 24 : 8,
              height: 8,
              borderRadius: 100,
              background: i <= stepIndex
                ? 'linear-gradient(90deg, #f72585, #c77dff)'
                : 'rgba(255,255,255,0.12)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <motion.div
          className="progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-label">{progress}% complete</div>
    </motion.div>
  );
}
