'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Moon, Sun, Menu, X } from 'lucide-react';
import useAppStore from '@/Store/useAppStore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export const HeroNavigation = () => {
  const { theme, toggleTheme } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLogoClick = () => {
    if (path.includes('/sign-up') || path.includes('/sign-in')) {
      router.push('/');
    } else {
      scrollToSection('hero');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full max-w-[1440px] z-50 backdrop-blur-lg border-b transition-colors duration-300  ${
        theme === 'light' ? ' border-gray-200' : 'bg-black/20 border-white/10'
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleLogoClick()}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#24AFFC] to-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">PDFChat AI</span>
          </motion.div>

          {/* Desktop Navigation */}
          {!path.includes('/sign-up') && !path.includes('/sign-in') ? (
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors ${
                    theme === 'light'
                      ? 'hover:text-[#24AFFC]'
                      : 'hover:text-[#24AFFC]'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          ) : null}

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                theme === 'light'
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-neutral-600 hover:bg-neutral-500'
              }`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  theme === 'light'
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => router.push('/sign-in')}
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#24AFFC] text-white hover:bg-blue-600 active:bg-black px-6 py-2 rounded-full font-semibold transition-colors"
                onClick={() => router.push('/sign-up')}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${
                theme === 'light' ? 'border-gray-200' : 'border-white/10'
              }`}
            >
              <div className="py-4 space-y-4">
                {!path.includes('/sign-up') && !path.includes('/sign-in') ? (
                  <>
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </>
                ) : null}

                <div className="flex space-x-3 px-4 pt-4 border-t border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => router.push('/sign-in')}
                    className="flex-1 py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => router.push('/sign-up')}
                    className="flex-1 py-2 px-4 rounded-full bg-[#24AFFC] text-white font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
