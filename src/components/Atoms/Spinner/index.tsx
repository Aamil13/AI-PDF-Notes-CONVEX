import React from 'react';

interface SpinnerProps {
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  color = 'border-white dark:border-neutral-600 border-t-transparent dark:border-t-transparent',
}) => (
  <div className="flex items-center justify-center w-4 h-4">
    <div
      className={`w-3 h-3 border-4 ${color} rounded-full animate-spin`}
    ></div>
  </div>
);
