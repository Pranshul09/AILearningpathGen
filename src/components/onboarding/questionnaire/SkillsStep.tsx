import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, X } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';

interface SkillsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const skillOptions = [
  'HTML/CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Vue.js',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'SQL',
  'MongoDB',
  'Git',
  'Docker',
  'AWS',
  'Firebase',
  'GraphQL',
  'REST APIs',
];

export const SkillsStep: React.FC<SkillsStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(onboardingData.currentSkills || []);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleNext = () => {
    updateOnboardingData({ currentSkills: selectedSkills });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
          <Code className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What skills do you already have?</h2>
        <p className="text-gray-600">Select all that apply - we'll build on your existing knowledge</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
          {skillOptions.map((skill) => (
            <motion.button
              key={skill}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSkill(skill)}
              className={`p-3 text-sm rounded-xl border-2 transition-all ${
                selectedSkills.includes(skill)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {skill}
            </motion.button>
          ))}
        </div>

        {selectedSkills.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Selected skills:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => toggleSkill(skill)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Continue
        </Button>
      </div>
    </motion.div>
  );
};