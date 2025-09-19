import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { useAppStore } from '../../../store/useAppStore';
import { Button } from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

interface ResumeStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const ResumeStep: React.FC<ResumeStepProps> = ({ onNext, onBack }) => {
  const { onboardingData, updateOnboardingData } = useAppStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
      setSelectedFile(file);
      updateOnboardingData({ resumeFile: file });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    updateOnboardingData({ resumeFile: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    navigate('/summary');
  };

  const skipStep = () => {
    updateOnboardingData({ resumeFile: undefined });
    navigate('/summary');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
          <Upload className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Upload your resume</h2>
        <p className="text-gray-600">Optional - helps us understand your background better</p>
      </div>

      <div className="space-y-4">
        {!selectedFile ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drop your resume here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PDF and image files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl p-4 bg-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-green-700">{selectedFile.name}</div>
                  <div className="text-sm text-green-600">
                    {Math.round(selectedFile.size / 1024)} KB
                  </div>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="text-green-500 hover:text-green-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Button variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button variant="ghost" onClick={skipStep} className="flex-1">
          Skip for now
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Finish
        </Button>
      </div>
    </motion.div>
  );
};