import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface ExperienceStepProps {
  onNext: () => void;
  onBack: () => void;
}

const experienceOptions = [
  'Freshman (1st year)',
  'Sophomore (2nd year)',
  'Junior (3rd year)',
  'Senior (4th year)',
  'Recent Graduate (0-1 years experience)',
  '1-2 years experience',
  '2-3 years experience',
  '3+ years experience',
];

export const ExperienceStep: React.FC<ExperienceStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [currentYear, setCurrentYear] = useState(onboardingData.currentYear || '');

  const handleNext = () => {
    if (currentYear) {
      updateOnboardingData({ currentYear });
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
        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
          <Calendar className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What's your current level?</h2>
        <p className="text-gray-600">Help us gauge your experience level</p>
      </div>

      <div className="space-y-3">
        {experienceOptions.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentYear(option)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              currentYear === option
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!currentYear}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};