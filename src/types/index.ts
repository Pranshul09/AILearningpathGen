// Core types for the SkillRoute application
export interface User {
  id: string;
  name: string;
  degree: string;
  currentYear: string;
  targetRole: string;
  currentSkills: string[];
  dailyFreeTime: number; // in hours
  studyHours: string[];
  constraints: string[];
  resumeUploaded: boolean;
  xp: number;
  streak: number;
  createdAt: string;
}

export interface OnboardingData {
  name: string;
  degree: string;
  currentYear: string;
  targetRole: string;
  currentSkills: string[];
  dailyFreeTime: number;
  studyHours: string[];
  constraints: string[];
  resumeFile?: File;
}

export interface LearningTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // in minutes
  type: 'reading' | 'video' | 'practice' | 'project';
  completed: boolean;
  xpReward: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  tasks: LearningTask[];
  xpReward: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalDuration: number; // in weeks
  milestones: Milestone[];
  createdAt: string;
}

export interface AppState {
  user: User | null;
  onboardingData: Partial<OnboardingData>;
  learningPath: LearningPath | null;
  currentStep: number;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  setCurrentStep: (step: number) => void;
  setLearningPath: (path: LearningPath) => void;
  completeTask: (taskId: string) => void;
  resetOnboarding: () => void;
  setLoading: (loading: boolean) => void;
}