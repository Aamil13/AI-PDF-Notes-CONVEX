'use client';
import { useState } from 'react';
import { motion, AnimatePresence, spring } from 'framer-motion';
import {
  FileText,
  Moon,
  Sun,
  Menu,
  X,
  Upload,
  ArrowRight,
  Play,
} from 'lucide-react';
import useAppStore from '@/Store/useAppStore';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
  const { theme } = useAppStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: spring,
        stiffness: 100,
      },
    },
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium border mb-6 ${
                theme === 'light'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-[#24AFFC]/20 border-[#24AFFC]/30 text-[#24AFFC]'
              }`}
            >
              ✨ AI-Powered PDF Intelligence
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-5xl md:text-7xl font-bold mb-6 ${
              theme === 'light'
                ? 'bg-gradient-to-r from-gray-900 via-blue-800 to-[#24AFFC] bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-white via-gray-200 to-[#24AFFC] bg-clip-text text-transparent'
            }`}
          >
            Chat with Your
            <br />
            <span className="bg-gradient-to-r from-[#24AFFC] to-blue-600 bg-clip-text text-transparent">
              PDFs Instantly
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
          >
            Transform any PDF into an intelligent conversation. Ask questions,
            get instant answers, and unlock insights from your documents with
            cutting-edge AI.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(36, 175, 252, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#24AFFC] text-white hover:bg-blue-600 active:bg-black px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span>Upload & Chat Now</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`border px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-colors ${
                theme === 'light'
                  ? 'border-gray-300 hover:bg-gray-50'
                  : 'border-white/30 hover:bg-white/10'
              }`}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
