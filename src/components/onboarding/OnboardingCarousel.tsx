import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Trophy, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { AppLayout } from '../layout/AppLayout';

const slides = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'Get a personalized learning path tailored to your goals, schedule, and current skills.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Trophy,
    title: 'Gamified Progress',
    description: 'Earn XP, maintain streaks, and unlock achievements as you complete your learning milestones.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'Stay focused on your target role with structured milestones and daily actionable tasks.',
    color: 'from-green-400 to-green-600',
  },
];

export const OnboardingCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/questionnaire');
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col justify-between min-h-screen px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-green-500 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-8 px-4"
            >
              {(() => {
                const IconComponent = slides[currentSlide].icon;
                return (
                  <div className={`w-24 h-24 bg-gradient-to-br ${slides[currentSlide].color} rounded-3xl flex items-center justify-center shadow-lg mx-auto`}>
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                );
              })()}

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center space-x-4">
          <Button
            variant="ghost"
            onClick={prevSlide}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentSlide === 0 ? 'Back' : 'Previous'}
          </Button>

          <Button
            onClick={nextSlide}
            className="flex-1"
          >
            {currentSlide === slides.length - 1 ? "Let's Start" : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};