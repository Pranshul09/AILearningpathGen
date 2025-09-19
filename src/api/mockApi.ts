import { LearningPath, Milestone, LearningTask } from '../types';

// Mock data for learning paths
const mockTasks: LearningTask[] = [
  {
    id: '1',
    title: 'Learn React Fundamentals',
    description: 'Complete the official React tutorial and understand components, props, and state.',
    estimatedTime: 120,
    type: 'reading',
    completed: false,
    xpReward: 100,
  },
  {
    id: '2',
    title: 'Build a To-Do App',
    description: 'Create your first React application with CRUD functionality.',
    estimatedTime: 180,
    type: 'project',
    completed: false,
    xpReward: 200,
  },
  {
    id: '3',
    title: 'TypeScript Basics',
    description: 'Learn TypeScript fundamentals and type annotations.',
    estimatedTime: 90,
    type: 'video',
    completed: false,
    xpReward: 150,
  },
  {
    id: '4',
    title: 'State Management with Redux',
    description: 'Understand global state management patterns.',
    estimatedTime: 150,
    type: 'practice',
    completed: false,
    xpReward: 175,
  },
];

const mockMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Frontend Foundations',
    description: 'Master the core concepts of modern frontend development.',
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    tasks: mockTasks.slice(0, 2),
    xpReward: 300,
  },
  {
    id: '2',
    title: 'Advanced JavaScript & TypeScript',
    description: 'Develop expertise in modern JavaScript and TypeScript.',
    targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    tasks: mockTasks.slice(2),
    xpReward: 325,
  },
];

export const mockLearningPath: LearningPath = {
  id: crypto.randomUUID(),
  title: 'Frontend Developer Roadmap',
  description: 'A comprehensive learning path to become a skilled frontend developer.',
  totalDuration: 12, // 12 weeks
  milestones: mockMilestones,
  createdAt: new Date().toISOString(),
};

// Mock API function to simulate path generation
export const generateLearningPath = async (userData: any): Promise<LearningPath> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  // In a real app, this would call the Gemini API
  return {
    ...mockLearningPath,
    id: crypto.randomUUID(),
    title: `${userData.targetRole} Learning Path`,
    description: `Personalized learning path for ${userData.name} to become a ${userData.targetRole}.`,
  };
};