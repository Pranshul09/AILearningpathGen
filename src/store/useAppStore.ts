import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, OnboardingData, LearningPath } from '../types';

// Generate mock user data
const generateUser = (onboardingData: OnboardingData): User => ({
  id: crypto.randomUUID(),
  name: onboardingData.name,
  degree: onboardingData.degree,
  currentYear: onboardingData.currentYear,
  targetRole: onboardingData.targetRole,
  currentSkills: onboardingData.currentSkills,
  dailyFreeTime: onboardingData.dailyFreeTime,
  studyHours: onboardingData.studyHours,
  constraints: onboardingData.constraints,
  resumeUploaded: !!onboardingData.resumeFile,
  xp: 0,
  streak: 0,
  createdAt: new Date().toISOString(),
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      onboardingData: {},
      learningPath: null,
      currentStep: 0,
      isLoading: false,

      setUser: (user: User) => set({ user }),

      updateOnboardingData: (data: Partial<OnboardingData>) =>
        set((state) => ({
          onboardingData: { ...state.onboardingData, ...data },
        })),

      setCurrentStep: (step: number) => set({ currentStep: step }),

      setLearningPath: (path: LearningPath) => set({ learningPath: path }),

      completeTask: (taskId: string) => {
        const { user, learningPath } = get();
        if (!user || !learningPath) return;

        const updatedPath = { ...learningPath };
        let taskFound = false;
        let xpGained = 0;

        updatedPath.milestones = updatedPath.milestones.map((milestone) => ({
          ...milestone,
          tasks: milestone.tasks.map((task) => {
            if (task.id === taskId && !task.completed) {
              taskFound = true;
              xpGained = task.xpReward;
              return { ...task, completed: true };
            }
            return task;
          }),
        }));

        if (taskFound) {
          const updatedUser = {
            ...user,
            xp: user.xp + xpGained,
            streak: user.streak + 1, // Simplified streak logic
          };

          set({
            user: updatedUser,
            learningPath: updatedPath,
          });
        }
      },

      resetOnboarding: () =>
        set({
          onboardingData: {},
          currentStep: 0,
          user: null,
          learningPath: null,
        }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'skillroute-storage',
      partialize: (state) => ({
        user: state.user,
        learningPath: state.learningPath,
        onboardingData: state.onboardingData,
      }),
    }
  )
);