import React from 'react';
import { motion } from 'framer-motion';
import { Edit, User, GraduationCap, Target, Code, Clock, Calendar, AlertCircle, Upload, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { AppLayout } from '../layout/AppLayout';

export const Summary: React.FC = () => {
  const { onboardingData } = useAppStore();
  const navigate = useNavigate();

  const summaryItems = [
    {
      icon: User,
      label: 'Name',
      value: onboardingData.name || 'Not provided',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: GraduationCap,
      label: 'Background',
      value: onboardingData.degree || 'Not provided',
      color: 'text-purple-600 bg-purple-100',
    },
    {
      icon: Target,
      label: 'Target Role',
      value: onboardingData.targetRole || 'Not provided',
      color: 'text-orange-600 bg-orange-100',
    },
    {
      icon: Code,
      label: 'Current Skills',
      value: onboardingData.currentSkills?.length 
        ? `${onboardingData.currentSkills.length} skills selected`
        : 'No skills selected',
      color: 'text-green-600 bg-green-100',
    },
    {
      icon: Clock,
      label: 'Daily Time',
      value: onboardingData.dailyFreeTime 
        ? `${onboardingData.dailyFreeTime} ${onboardingData.dailyFreeTime === 1 ? 'hour' : 'hours'}`
        : 'Not specified',
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      icon: Calendar,
      label: 'Preferred Times',
      value: onboardingData.studyHours?.length 
        ? `${onboardingData.studyHours.length} time slots`
        : 'No preferences set',
      color: 'text-pink-600 bg-pink-100',
    },
    {
      icon: AlertCircle,
      label: 'Constraints',
      value: onboardingData.constraints?.length 
        ? `${onboardingData.constraints.length} constraints noted`
        : 'No constraints',
      color: 'text-red-600 bg-red-100',
    },
    {
      icon: Upload,
      label: 'Resume',
      value: onboardingData.resumeFile ? 'Uploaded' : 'Not uploaded',
      color: 'text-emerald-600 bg-emerald-100',
    },
  ];

  const handleGeneratePath = () => {
    navigate('/generating');
  };

  return (
    <AppLayout>
      <div className="min-h-screen p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Perfect! Let's review</h1>
          <p className="text-gray-600">
            Here's what we know about you. Tap any card to edit.
          </p>
        </motion.div>

        <div className="space-y-4">
          {summaryItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.value}</div>
                      </div>
                    </div>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            className="w-full"
            onClick={handleGeneratePath}
          >
            <Sparkles className="w-5 h-5" />
            Generate My Learning Path
          </Button>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/questionnaire')}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              Make changes to your responses
            </button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};