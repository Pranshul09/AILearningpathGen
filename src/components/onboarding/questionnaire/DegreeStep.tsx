import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface DegreeStepProps {
  onNext: () => void;
  onBack: () => void;
}

const degreeOptions = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Science',
  'Business Administration',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Other Engineering',
  'Mathematics',
  'Physics',
  'Other',
];

export const DegreeStep: React.FC<DegreeStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [degree, setDegree] = useState(onboardingData.degree || '');

  const handleNext = () => {
    if (degree) {
      updateOnboardingData({ degree });
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
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What's your educational background?</h2>
        <p className="text-gray-600">This helps us understand your foundation</p>
      </div>

      <div className="space-y-3">
        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-white"
        >
          <option value="">Select your degree/field</option>
          {degreeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!degree}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};