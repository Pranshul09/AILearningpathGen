import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Clock } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface ScheduleStepProps {
  onNext: () => void;
  onBack: () => void;
}

const timeSlots = [
  { value: 'early-morning', label: 'Early Morning', time: '6:00 - 9:00 AM', icon: Sun },
  { value: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM', icon: Sun },
  { value: 'afternoon', label: 'Afternoon', time: '12:00 - 6:00 PM', icon: Clock },
  { value: 'evening', label: 'Evening', time: '6:00 - 9:00 PM', icon: Moon },
  { value: 'late-night', label: 'Late Night', time: '9:00 PM+', icon: Moon },
];

export const ScheduleStep: React.FC<ScheduleStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [selectedTimes, setSelectedTimes] = useState<string[]>(onboardingData.studyHours || []);

  const toggleTimeSlot = (timeSlot: string) => {
    setSelectedTimes(prev =>
      prev.includes(timeSlot)
        ? prev.filter(t => t !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handleNext = () => {
    if (selectedTimes.length > 0) {
      updateOnboardingData({ studyHours: selectedTimes });
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
        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-pink-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">When do you prefer to study?</h2>
        <p className="text-gray-600">Select your preferred learning times</p>
      </div>

      <div className="space-y-3">
        {timeSlots.map((slot) => {
          const Icon = slot.icon;
          return (
            <motion.button
              key={slot.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleTimeSlot(slot.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                selectedTimes.includes(slot.value)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedTimes.includes(slot.value)
                    ? 'bg-green-100'
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    selectedTimes.includes(slot.value)
                      ? 'text-green-600'
                      : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${
                    selectedTimes.includes(slot.value)
                      ? 'text-green-700'
                      : 'text-gray-900'
                  }`}>
                    {slot.label}
                  </div>
                  <div className={`text-sm ${
                    selectedTimes.includes(slot.value)
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    {slot.time}
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedTimes.includes(slot.value)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}>
                  {selectedTimes.includes(slot.value) && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={selectedTimes.length === 0}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};