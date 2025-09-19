import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Target, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Circle,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { AppLayout } from '../layout/AppLayout';

// Mock timeline data
const mockTimeline = [
  {
    id: 1,
    title: 'Frontend Foundations',
    description: 'Master HTML, CSS, and JavaScript fundamentals',
    duration: '2-3 weeks',
    status: 'completed',
    tasks: ['HTML Structure', 'CSS Styling', 'JavaScript Basics'],
  },
  {
    id: 2,
    title: 'React Development',
    description: 'Learn React components, hooks, and state management',
    duration: '3-4 weeks',
    status: 'in-progress',
    tasks: ['Components & Props', 'State & Hooks', 'Event Handling'],
  },
  {
    id: 3,
    title: 'Advanced React',
    description: 'Context API, custom hooks, and performance optimization',
    duration: '2-3 weeks',
    status: 'upcoming',
    tasks: ['Context API', 'Custom Hooks', 'Performance'],
  },
  {
    id: 4,
    title: 'Full Stack Integration',
    description: 'Connect frontend with backend APIs and databases',
    duration: '3-4 weeks',
    status: 'upcoming',
    tasks: ['REST APIs', 'Database Integration', 'Authentication'],
  },
];

export const ViewFullPath: React.FC = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  const completedSteps = mockTimeline.filter(step => step.status === 'completed').length;
  const totalSteps = mockTimeline.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-6 py-8 border-b border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-gray-900">Your Learning Path</h1>
            <p className="text-gray-600">
              {user?.name ? `Welcome ${user.name}! ` : ''}
              Here's your personalized journey to becoming a skilled developer.
            </p>
            
            {/* Progress Overview */}
            <div className="bg-green-50 rounded-2xl p-4 mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-green-700">Overall Progress</span>
                <span className="text-sm text-green-600">{progressPercentage}% Complete</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-500" />
              Learning Roadmap
            </h2>
            
            <div className="space-y-4">
              {mockTimeline.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 relative">
                    {/* Status Indicator */}
                    <div className="absolute left-6 top-6">
                      {step.status === 'completed' ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      ) : step.status === 'in-progress' ? (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="ml-10">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {step.duration}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      {/* Tasks */}
                      <div className="flex flex-wrap gap-2">
                        {step.tasks.map((task, taskIndex) => (
                          <span
                            key={taskIndex}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              step.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : step.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {index < mockTimeline.length - 1 && (
                      <div className="absolute left-9 bottom-0 w-0.5 h-4 bg-gray-200 transform translate-y-full" />
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 pt-6"
          >
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate('/create-plan')}
            >
              <Sparkles className="w-5 h-5" />
              Create Personalised Plan
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => navigate('/adjust-schedule')}
            >
              <Calendar className="w-5 h-5" />
              Adjust Schedule
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};