import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface TimeStepProps {
  onNext: () => void;
  onBack: () => void;
  isLast?: boolean;
}

export const TimeStep: React.FC<TimeStepProps> = ({ onNext, onBack, isLast = false }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [dailyFreeTime, setDailyFreeTime] = useState(onboardingData.dailyFreeTime || 1);
  const navigate = useNavigate();

  const handleNext = () => {
    updateOnboardingData({ dailyFreeTime });
    if (isLast) {
      // Create basic user profile and redirect to ViewFullPath
      const user = {
        id: crypto.randomUUID(),
        name: onboardingData.name || 'User',
        degree: onboardingData.degree || '',
        currentYear: '',
        targetRole: '',
        currentSkills: [],
        dailyFreeTime,
        studyHours: [],
        constraints: [],
        resumeUploaded: false,
        xp: 0,
        streak: 0,
        createdAt: new Date().toISOString(),
      };
      
      useAppStore.getState().setUser(user);
      navigate('/view-full-path');
    } else {
      onNext();
    }
  };

  const timeOptions = [
    { value: 0.5, label: '30 minutes', description: 'Quick daily sessions' },
    { value: 1, label: '1 hour', description: 'Standard commitment' },
    { value: 1.5, label: '1.5 hours', description: 'Good progress pace' },
    { value: 2, label: '2 hours', description: 'Fast track learning' },
    { value: 3, label: '3+ hours', description: 'Intensive learning' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">How much time can you dedicate daily?</h2>
        <p className="text-gray-600">Be realistic - consistency beats intensity</p>
      </div>

      <div className="space-y-3">
        {timeOptions.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDailyFreeTime(option.value)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
              dailyFreeTime === option.value
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className={`font-medium ${dailyFreeTime === option.value ? 'text-green-700' : 'text-gray-900'}`}>
                  {option.label}
                </div>
                <div className={`text-sm ${dailyFreeTime === option.value ? 'text-green-600' : 'text-gray-500'}`}>
                  {option.description}
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 ${
                dailyFreeTime === option.value
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {dailyFreeTime === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          {isLast ? 'Get Started' : 'Continue'}
        </Button>
      </div>
    </motion.div>
  );
};