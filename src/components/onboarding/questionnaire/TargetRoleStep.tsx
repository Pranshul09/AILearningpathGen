import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface TargetRoleStepProps {
  onNext: () => void;
  onBack: () => void;
}

const roleOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile App Developer',
  'Data Scientist',
  'Machine Learning Engineer',
  'DevOps Engineer',
  'UI/UX Designer',
  'Product Manager',
  'Software Architect',
  'Quality Assurance Engineer',
  'Other',
];

export const TargetRoleStep: React.FC<TargetRoleStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [targetRole, setTargetRole] = useState(onboardingData.targetRole || '');
  const [customRole, setCustomRole] = useState('');

  const handleNext = () => {
    const finalRole = targetRole === 'Other' ? customRole : targetRole;
    if (finalRole) {
      updateOnboardingData({ targetRole: finalRole });
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
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
          <Target className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What's your target role?</h2>
        <p className="text-gray-600">This will help us create your personalized path</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {roleOptions.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setTargetRole(option)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              targetRole === option
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {targetRole === 'Other' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            placeholder="Enter your target role"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
            autoFocus
          />
        </motion.div>
      )}

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!targetRole || (targetRole === 'Other' && !customRole)}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};