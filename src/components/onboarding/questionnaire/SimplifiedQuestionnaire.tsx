import React from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { ProgressBar } from '../../ui/ProgressBar';
import { AppLayout } from '../../layout/AppLayout';
import { NameStep } from './NameStep';
import { DegreeStep } from './DegreeStep';
import { TimeStep } from './TimeStep';

const TOTAL_STEPS = 3;

export const SimplifiedQuestionnaire: React.FC = () => {
  const { currentStep, setCurrentStep } = useAppStore();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <NameStep onNext={handleNext} onBack={handleBack} />;
      case 1:
        return <DegreeStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <TimeStep onNext={handleNext} onBack={handleBack} isLast={true} />;
      default:
        return <NameStep onNext={handleNext} onBack={handleBack} />;
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col px-6 py-8">
        <ProgressBar current={currentStep + 1} total={TOTAL_STEPS} className="mb-8" />
        <div className="flex-1 flex items-center">
          <div className="w-full">
            {renderStep()}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};