import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { Welcome } from './components/onboarding/Welcome';
import { OnboardingCarousel } from './components/onboarding/OnboardingCarousel';
import { Questionnaire } from './components/onboarding/Questionnaire';
import { Summary } from './components/onboarding/Summary';
import { PathGeneration } from './components/onboarding/PathGeneration';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { user } = useAppStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding" element={<OnboardingCarousel />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/generating" element={<PathGeneration />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;