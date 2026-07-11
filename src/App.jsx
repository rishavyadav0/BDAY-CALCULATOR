import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';

import Scene from './components/Scene';
import InputScreen from './components/InputScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import RejectedScreen from './components/RejectedScreen';

function App() {
  const [phase, setPhase] = useState('input'); // input, calculating, result, rejected
  const [speed, setSpeed] = useState(1); // For the 3D scene speed
  const [submittedName, setSubmittedName] = useState('');

  const handleNameSubmit = (name) => {
    const normalizedName = name.trim().toLowerCase();
    setSubmittedName(normalizedName);
    
    setPhase('calculating');
    setSpeed(5); // Speed up stars
    
    // Sequence takes 10 seconds total for ALL users
    setTimeout(() => {
      setSpeed(1); // Return to normal speed
      if (normalizedName === 'aditi') {
        setPhase('result');
      } else {
        setPhase('rejected');
      }
    }, 10000);
  };

  const handleReset = () => {
    setPhase('input');
    setSubmittedName('');
  };

  return (
    <>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 1.5, 7], fov: 70 }} gl={{ antialias: true }} dpr={[1, 2]}>
          <color attach="background" args={['#04000d']} />
          <fog attach="fog" args={['#04000d', 12, 40]} />
          <Suspense fallback={null}>
            <Scene speed={speed} />
          </Suspense>
        </Canvas>
      </div>

      <div className="ui-container">
        <AnimatePresence mode="wait">
          {phase === 'input' && (
            <InputScreen 
              key="input" 
              onSubmit={handleNameSubmit} 
            />
          )}
          {phase === 'calculating' && (
            <LoadingScreen key="loading" />
          )}
          {phase === 'result' && (
            <ResultScreen key="result" onReset={handleReset} />
          )}
          {phase === 'rejected' && (
            <RejectedScreen key="rejected" onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
