import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface NameStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const NameStep: React.FC<NameStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [name, setName] = useState(onboardingData.name || '');

  const handleNext = () => {
    if (name.trim()) {
      updateOnboardingData({ name: name.trim() });
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <User className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What's your name?</h2>
        <p className="text-gray-600">Let's personalize your learning experience</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
          autoFocus
        />
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!name.trim()}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};