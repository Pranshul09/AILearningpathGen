import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { AppLayout } from '../layout/AppLayout';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Rocket className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to{' '}
            <span className="text-green-500">SkillRoute</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Your AI-powered companion for creating personalized learning journeys
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 space-y-4 w-full"
        >
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/onboarding')}
          >
            Start My Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <p className="text-sm text-gray-500">
            Takes just 2 minutes to set up your personalized path
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};