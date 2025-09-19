import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { generateLearningPath } from '../../api/mockApi';
import { AppLayout } from '../layout/AppLayout';

const loadingMessages = [
  'Analyzing your background and goals...',
  'Crafting your personalized curriculum...',
  'Optimizing for your schedule...',
  'Adding gamification elements...',
  'Finalizing your learning journey...',
];

export const PathGeneration: React.FC = () => {
  const { onboardingData, setLearningPath, setUser, setLoading } = useAppStore();
  const [currentMessage, setCurrentMessage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1000);

    const generatePath = async () => {
      setLoading(true);
      try {
        const learningPath = await generateLearningPath(onboardingData);
        setLearningPath(learningPath);
        
        // Create user profile
        const user = {
          id: crypto.randomUUID(),
          name: onboardingData.name || 'User',
          degree: onboardingData.degree || '',
          currentYear: onboardingData.currentYear || '',
          targetRole: onboardingData.targetRole || '',
          currentSkills: onboardingData.currentSkills || [],
          dailyFreeTime: onboardingData.dailyFreeTime || 1,
          studyHours: onboardingData.studyHours || [],
          constraints: onboardingData.constraints || [],
          resumeUploaded: !!onboardingData.resumeFile,
          xp: 0,
          streak: 0,
          createdAt: new Date().toISOString(),
        };
        
        setUser(user);
        clearInterval(messageInterval);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error generating path:', error);
        setLoading(false);
      }
    };

    generatePath();

    return () => clearInterval(messageInterval);
  }, [onboardingData, setLearningPath, setUser, setLoading, navigate]);

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
          className="mb-12"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <Rocket className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-sm"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Creating Your Path
          </h1>
          
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg text-gray-600"
          >
            {loadingMessages[currentMessage]}
          </motion.p>

          <div className="flex items-center justify-center space-x-2">
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 flex items-center space-x-2 text-sm text-gray-500"
        >
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI to match your unique needs</span>
        </motion.div>
      </div>
    </AppLayout>
  );
};