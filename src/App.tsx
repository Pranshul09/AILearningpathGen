import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import { Welcome } from './components/onboarding/Welcome';
import { OnboardingCarousel } from './components/onboarding/OnboardingCarousel';
import { SimplifiedQuestionnaire } from './components/onboarding/questionnaire/SimplifiedQuestionnaire';
import { Summary } from './components/onboarding/Summary';
import { PathGeneration } from './components/onboarding/PathGeneration';
import { Dashboard } from './components/dashboard/Dashboard';
import { ViewFullPath } from './components/pages/ViewFullPath';
import { CreatePlan } from './components/pages/CreatePlan';
import { AdjustSchedule } from './components/pages/AdjustSchedule';

function App() {
  const { user } = useAppStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding" element={<OnboardingCarousel />} />
        <Route path="/questionnaire" element={<SimplifiedQuestionnaire />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/generating" element={<PathGeneration />} />
        <Route path="/view-full-path" element={<ViewFullPath />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/adjust-schedule" element={<AdjustSchedule />} />
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