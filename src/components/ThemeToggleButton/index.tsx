import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAppStore from '@/Store/useAppStore';


const Switch = () => {
  const { theme, toggleTheme, setInitialTheme } = useAppStore();

  useEffect(() => {
    setInitialTheme();
  }, [setInitialTheme]);

  
  

  return (
<div 
  onClick={toggleTheme} 
  className={`w-6 h-6 select-none flex items-center justify-center p-2 cursor-pointer 
    rounded-full shadow-md transform transition-all duration-300 ease-in-out 
    ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
>
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="flex items-center justify-center w-full h-full rounded-full"
  >
    {theme === 'light' ? (
      <motion.span
        className="text-xl text-yellow-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // transition={{ duration: 0.3 }}
        whileTap={{ rotate: 360 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      >
        🌞
      </motion.span>
    ) : (
      <motion.span
        className="text-xl text-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // transition={{ duration: 0.3 }}
        whileTap={{ rotate: 360 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      >
        🌙
      </motion.span>
    )}
  </motion.div>
</div>
  );
};

export default Switch;
