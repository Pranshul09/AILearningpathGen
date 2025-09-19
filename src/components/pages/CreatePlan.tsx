import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Code, 
  BookOpen, 
  Calendar, 
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { AppLayout } from '../layout/AppLayout';

interface FormData {
  targetRole: string;
  currentSkills: string[];
  learningStyle: string[];
  weekendAvailability: string;
  constraints: string[];
}

const TOTAL_STEPS = 5;

const jobRoles = [
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
];

const skillOptions = [
  'HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
  'Node.js', 'Python', 'Java', 'C++', 'SQL', 'MongoDB', 'Git', 'Docker',
  'AWS', 'Firebase', 'GraphQL', 'REST APIs', 'Machine Learning', 'Data Analysis'
];

const learningStyles = [
  { value: 'video', label: 'Video Tutorials', description: 'Learn through visual demonstrations' },
  { value: 'text', label: 'Text-based Learning', description: 'Read documentation and articles' },
  { value: 'project', label: 'Project-based', description: 'Learn by building real projects' },
  { value: 'interactive', label: 'Interactive Coding', description: 'Hands-on coding exercises' },
];

const weekendOptions = [
  { value: 'full', label: 'Full Weekend', description: 'Both Saturday and Sunday' },
  { value: 'partial', label: 'Partial Weekend', description: 'Either Saturday or Sunday' },
  { value: 'limited', label: 'Limited Time', description: 'Few hours on weekends' },
  { value: 'none', label: 'No Weekend Study', description: 'Weekdays only' },
];

const constraintOptions = [
  'College/University classes',
  'Full-time job (9-5)',
  'Part-time job',
  'Family responsibilities',
  'Long commute',
  'Evening commitments',
  'Health considerations',
  'Other courses/certifications',
];

export const CreatePlan: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    targetRole: '',
    currentSkills: [],
    learningStyle: [],
    weekendAvailability: '',
    constraints: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const progressPercentage = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    navigate('/view-full-path');
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateFormData(field, newArray);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.targetRole !== '';
      case 1: return formData.currentSkills.length > 0;
      case 2: return formData.learningStyle.length > 0;
      case 3: return formData.weekendAvailability !== '';
      case 4: return true; // Constraints are optional
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What's your target role?</h2>
              <p className="text-gray-600">Choose the role you want to work towards</p>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {jobRoles.map((role) => (
                <motion.button
                  key={role}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('targetRole', role)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    formData.targetRole === role
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {role}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto">
                <Code className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Current Skills</h2>
              <p className="text-gray-600">Select all technologies you're familiar with</p>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
              {skillOptions.map((skill) => (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleArrayItem('currentSkills', skill)}
                  className={`p-3 text-sm rounded-xl border-2 transition-all ${
                    formData.currentSkills.includes(skill)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>

            {formData.currentSkills.length > 0 && (
              <div className="text-center text-sm text-gray-600">
                {formData.currentSkills.length} skills selected
              </div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Learning Style</h2>
              <p className="text-gray-600">How do you prefer to learn? (Select multiple)</p>
            </div>

            <div className="space-y-3">
              {learningStyles.map((style) => (
                <motion.button
                  key={style.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleArrayItem('learningStyle', style.value)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    formData.learningStyle.includes(style.value)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`font-medium ${
                    formData.learningStyle.includes(style.value) ? 'text-green-700' : 'text-gray-900'
                  }`}>
                    {style.label}
                  </div>
                  <div className={`text-sm ${
                    formData.learningStyle.includes(style.value) ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {style.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Weekend Availability</h2>
              <p className="text-gray-600">How much time can you dedicate on weekends?</p>
            </div>

            <div className="space-y-3">
              {weekendOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateFormData('weekendAvailability', option.value)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    formData.weekendAvailability === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`font-medium ${
                    formData.weekendAvailability === option.value ? 'text-green-700' : 'text-gray-900'
                  }`}>
                    {option.label}
                  </div>
                  <div className={`text-sm ${
                    formData.weekendAvailability === option.value ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {option.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Time Constraints</h2>
              <p className="text-gray-600">What might limit your study time? (Optional)</p>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {constraintOptions.map((constraint) => (
                <motion.button
                  key={constraint}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleArrayItem('constraints', constraint)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    formData.constraints.includes(constraint)
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
                onClick={() => updateFormData('constraints', [])}
                className="text-sm text-gray-500"
              >
                No major constraints
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isGenerating) {
    return (
      <AppLayout>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Creating Your Plan
          </h1>
          <p className="text-lg text-gray-600">
            Analyzing your preferences and generating a personalized learning path...
          </p>

          <div className="flex items-center justify-center space-x-2 mt-8">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="w-2 h-2 bg-green-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {TOTAL_STEPS}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 flex items-center">
          <div className="w-full">
            {renderStep()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mt-8">
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            className="flex-1"
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1"
          >
            {currentStep === TOTAL_STEPS - 1 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Create Plan
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};