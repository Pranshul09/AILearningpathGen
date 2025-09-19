import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {children}
      </div>
    </div>
  );
};