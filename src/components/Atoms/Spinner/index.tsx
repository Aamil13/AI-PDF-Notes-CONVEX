import React from 'react';

interface SpinnerProps {
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ color = 'border-white' }) => (
  <div className="flex items-center justify-center w-4 h-4">
    <div
      className={`w-3 h-3 border-4 ${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  </div>
);
