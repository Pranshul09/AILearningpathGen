import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface ConstraintsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const constraintOptions = [
  'College/Work classes (9 AM - 5 PM)',
  'Part-time job',
  'Family responsibilities',
  'Commute time',
  'Sports/Exercise routine',
  'Social commitments',
  'Health considerations',
  'Weekend unavailability',
];

export const ConstraintsStep: React.FC<ConstraintsStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>(onboardingData.constraints || []);

  const toggleConstraint = (constraint: string) => {
    setSelectedConstraints(prev =>
      prev.includes(constraint)
        ? prev.filter(c => c !== constraint)
        : [...prev, constraint]
    );
  };

  const handleNext = () => {
    updateOnboardingData({ constraints: selectedConstraints });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Any time constraints?</h2>
        <p className="text-gray-600">Help us work around your existing commitments</p>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {constraintOptions.map((constraint) => (
          <motion.button
            key={constraint}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleConstraint(constraint)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              selectedConstraints.includes(constraint)
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            {constraint}
          </motion.button>
        ))}
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => updateOnboardingData({ constraints: [] })}
          className="text-sm text-gray-500"
        >
          No major constraints
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Almost Done!
        </Button>
      </div>
    </motion.div>
  );
};