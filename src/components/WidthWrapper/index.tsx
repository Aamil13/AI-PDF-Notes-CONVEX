import React, { ReactNode } from 'react';
import useAppStore from '@/Store/useAppStore';
interface WidthWrapperProps {
  children: ReactNode;
}

const WidthWrapper = ({ children }: WidthWrapperProps) => {
  const { theme } = useAppStore();
  return (
    <div
      className={`flex justify-center items-center bg-white   ${
        theme === 'light'
          ? 'bg-gradient-to-br from-white via-blue-50 to-gray-100 text-gray-900'
          : 'bg-gradient-to-br from-slate-900 via-neutral-900 to-gray-900 text-white '
      }`}
    >
      <div className="max-w-[1440px] w-full overflow-x-hidden">{children}</div>
    </div>
  );
};

export default WidthWrapper;
