import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Edit3, 
  Save, 
  RotateCcw,
  Sun,
  Moon,
  Coffee,
  Sunset,
  CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { AppLayout } from '../layout/AppLayout';

interface TimeSlot {
  id: string;
  time: string;
  label: string;
  icon: React.ComponentType<any>;
  selected: boolean;
}

interface DaySchedule {
  day: string;
  studyHours: number;
  timeSlots: TimeSlot[];
  tasks: string[];
}

const timeSlotOptions = [
  { id: 'early-morning', time: '6:00 - 9:00 AM', label: 'Early Morning', icon: Sun },
  { id: 'morning', time: '9:00 AM - 12:00 PM', label: 'Morning', icon: Coffee },
  { id: 'afternoon', time: '12:00 - 6:00 PM', label: 'Afternoon', icon: Sun },
  { id: 'evening', time: '6:00 - 9:00 PM', label: 'Evening', icon: Sunset },
  { id: 'night', time: '9:00 PM - 12:00 AM', label: 'Night', icon: Moon },
];

const mockTasks = [
  'Complete React Hooks tutorial',
  'Build a todo app component',
  'Read about state management',
  'Practice CSS Grid layout',
  'Review JavaScript fundamentals',
];

export const AdjustSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      studyHours: 2,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'evening' })),
      tasks: mockTasks.slice(0, 2),
    },
    {
      day: 'Tuesday',
      studyHours: 1.5,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'morning' })),
      tasks: mockTasks.slice(1, 3),
    },
    {
      day: 'Wednesday',
      studyHours: 2,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'evening' })),
      tasks: mockTasks.slice(2, 4),
    },
    {
      day: 'Thursday',
      studyHours: 1,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'afternoon' })),
      tasks: mockTasks.slice(0, 1),
    },
    {
      day: 'Friday',
      studyHours: 2.5,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'evening' })),
      tasks: mockTasks.slice(3, 5),
    },
    {
      day: 'Saturday',
      studyHours: 3,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'morning' })),
      tasks: mockTasks.slice(0, 3),
    },
    {
      day: 'Sunday',
      studyHours: 1,
      timeSlots: timeSlotOptions.map(slot => ({ ...slot, selected: slot.id === 'afternoon' })),
      tasks: mockTasks.slice(4, 5),
    },
  ]);

  const totalWeeklyHours = weeklySchedule.reduce((total, day) => total + day.studyHours, 0);

  const updateDayHours = (dayIndex: number, hours: number) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, studyHours: hours } : day
    ));
    setHasChanges(true);
  };

  const updateTimeSlot = (dayIndex: number, slotId: string) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex 
        ? {
            ...day,
            timeSlots: day.timeSlots.map(slot => ({
              ...slot,
              selected: slot.id === slotId
            }))
          }
        : day
    ));
    setHasChanges(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setHasChanges(false);
    // Here you would typically save to your backend/state management
  };

  const handleReset = () => {
    // Reset to original values - in a real app, you'd fetch from your store
    setHasChanges(false);
  };

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
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Adjust Schedule</h1>
              <Button
                variant={isEditing ? "primary" : "secondary"}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? 'Done' : 'Edit'}
              </Button>
            </div>
            
            <p className="text-gray-600">
              Customize your weekly study schedule to fit your lifestyle
            </p>

            {/* Weekly Summary */}
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Weekly Total</span>
                <span className="text-lg font-bold text-blue-900">{totalWeeklyHours} hours</span>
              </div>
              <div className="text-sm text-blue-600">
                Average: {(totalWeeklyHours / 7).toFixed(1)} hours per day
              </div>
            </div>
          </motion.div>
        </div>

        {/* Schedule Grid */}
        <div className="p-6 space-y-4">
          {weeklySchedule.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.1 }}
            >
              <Card className="p-6">
                <div className="space-y-4">
                  {/* Day Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{day.day}</h3>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{day.studyHours}h</span>
                    </div>
                  </div>

                  {/* Hours Adjustment */}
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <label className="text-sm font-medium text-gray-700">Study Hours</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.5"
                          value={day.studyHours}
                          onChange={(e) => updateDayHours(dayIndex, parseFloat(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                          {day.studyHours}h
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Preferred Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      {day.timeSlots.map((slot) => {
                        const IconComponent = slot.icon;
                        return (
                          <motion.button
                            key={slot.id}
                            whileHover={isEditing ? { scale: 1.02 } : {}}
                            whileTap={isEditing ? { scale: 0.98 } : {}}
                            onClick={() => isEditing && updateTimeSlot(dayIndex, slot.id)}
                            disabled={!isEditing}
                            className={`p-3 rounded-xl border-2 transition-all text-left ${
                              slot.selected
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            } ${!isEditing ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center space-x-2">
                              <IconComponent className={`w-4 h-4 ${
                                slot.selected ? 'text-green-600' : 'text-gray-500'
                              }`} />
                              <div>
                                <div className={`text-xs font-medium ${
                                  slot.selected ? 'text-green-700' : 'text-gray-700'
                                }`}>
                                  {slot.label}
                                </div>
                                <div className={`text-xs ${
                                  slot.selected ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {slot.time}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tasks Preview */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Planned Tasks</label>
                    <div className="space-y-1">
                      {day.tasks.map((task, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 pt-6"
          >
            {hasChanges && (
              <div className="flex space-x-4">
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Changes
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Schedule
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              onClick={() => navigate('/view-full-path')}
              className="w-full"
            >
              Back to Learning Path
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};