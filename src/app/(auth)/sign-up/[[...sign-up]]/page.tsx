'use client';

import { Suspense } from 'react';
import { SignUp } from '@clerk/nextjs';
import { easeOut, motion } from 'framer-motion';
import WidthWrapper from '@/components/WidthWrapper';
import ShowLoader from '@/components/ShowLoader';
import Footer from '@/components/Footer';
import { HeroNavigation } from '@/components/HeroNavbar';
import { useDelayedReadyState } from '@/Hooks/useDelayedReadyState';
import { Check } from 'lucide-react';

function SignUpPageContent() {
  const { isReady } = useDelayedReadyState();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideInVariants = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4 } },
  };

  if (!isReady) return <ShowLoader />;

  return (
    <WidthWrapper>
      <HeroNavigation />
      <motion.div
        className="min-h-screen flex flex-col overflow-hidden mx-auto"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideInVariants}
      >
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden mt-8 max-md:justify-center">
          {/* Left Info Section */}
          <motion.div
            className="hidden md:w-1/2 bg-muted p-2 lg:p-8 md:flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md space-y-6">
              <motion.h1
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                Join our community today
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Create an account to get access to all features and start your
                journey with us.
              </motion.p>
              <motion.ul
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate={isReady ? 'visible' : 'hidden'}
              >
                {[
                  'Personalized dashboard',
                  'Save your favorites',
                  'Access to premium content',
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2"
                    variants={itemVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Check className="h-5 w-5 text-primary" />
                    </motion.div>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Right Sign Up Section */}
          <motion.div
            className="md:w-1/2 p-2 lg:p-8 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-md">
              <SignUp forceRedirectUrl={'/recent'} />
            </div>
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    </WidthWrapper>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<ShowLoader />}>
      <SignUpPageContent />
    </Suspense>
  );
}
