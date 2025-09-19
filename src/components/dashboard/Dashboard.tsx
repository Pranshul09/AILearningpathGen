import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Trophy, 
  Target, 
  Clock, 
  Flame,
  CheckCircle,
  Settings,
  BookOpen,
  BarChart3
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AppLayout } from '../layout/AppLayout';

export const Dashboard: React.FC = () => {
  const { user, learningPath, completeTask } = useAppStore();

  if (!user || !learningPath) {
    return (
      <AppLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </AppLayout>
    );
  }

  // Get today's tasks (simplified - just get first few incomplete tasks)
  const todayTasks = learningPath.milestones
    .flatMap(milestone => milestone.tasks)
    .filter(task => !task.completed)
    .slice(0, 3);

  const completedTasksCount = learningPath.milestones
    .flatMap(milestone => milestone.tasks)
    .filter(task => task.completed).length;

  const totalTasksCount = learningPath.milestones
    .flatMap(milestone => milestone.tasks).length;

  const progressPercentage = totalTasksCount > 0 
    ? Math.round((completedTasksCount / totalTasksCount) * 100) 
    : 0;

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-6 py-8 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">Ready to continue your learning journey?</p>
            </div>
            <Button variant="ghost" className="p-2">
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{user.streak}</div>
                <div className="text-sm text-gray-500">Day Streak</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{user.xp}</div>
                <div className="text-sm text-gray-500">Total XP</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-6 h-6 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{progressPercentage}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  Today's Plan
                </h2>
                <span className="text-sm text-gray-500">
                  {todayTasks.length} tasks
                </span>
              </div>
              
              <div className="space-y-3">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => completeTask(task.id)}
                        className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-green-500 transition-colors flex items-center justify-center"
                      >
                        {task.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </button>
                      <div>
                        <div className="font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {task.estimatedTime} min
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      +{task.xpReward} XP
                    </div>
                  </div>
                ))}
                
                {todayTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                    <p>All caught up for today! 🎉</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Progress Overview
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{completedTasksCount}/{totalTasksCount} tasks</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{learningPath.milestones.length}</div>
                    <div className="text-sm text-gray-500">Milestones</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{learningPath.totalDuration}</div>
                    <div className="text-sm text-gray-500">Weeks Total</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <Button
              variant="secondary"
              className="h-20 flex-col"
            >
              <BookOpen className="w-6 h-6 mb-2" />
              <span>View Full Path</span>
            </Button>
            
            <Button
              variant="secondary"
              className="h-20 flex-col"
            >
              <Settings className="w-6 h-6 mb-2" />
              <span>Adjust Schedule</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};