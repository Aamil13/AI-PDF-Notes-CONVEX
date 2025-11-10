import { easeInOut, motion } from 'framer-motion';

export default function Preloader() {
  // SVG animation variants
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.3, ease: easeInOut },
        opacity: { duration: 0.5 },
      },
    },
  };

  // Corrected pulse variants to match proper Framer Motion types
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 0.5, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          className="relative w-32 h-32"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.5, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Outer circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#E0E7FF"
              strokeWidth="3"
              fill="transparent"
              initial="hidden"
              animate="visible"
              variants={circleVariants}
            />

            {/* Inner shapes */}
            <motion.path
              d="M50 25 L70 50 L50 75 L30 50 Z"
              fill="#A5B4FC"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 360,
                transition: {
                  delay: 0.5,
                  duration: 1.2,
                  rotate: {
                    repeat: Infinity,
                    duration: 4,
                  },
                },
              }}
            />
          </motion.svg>
        </motion.div>

        <motion.div
          className="mt-6 text-center text-white"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5 },
          }}
        >
          <p className="text-lg font-medium">Loading your experience</p>
          <div className="flex mt-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 mx-1 bg-white rounded-full"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  transition: {
                    delay: i * 0.3,
                    duration: 1.5,
                    repeat: Infinity,
                  },
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
