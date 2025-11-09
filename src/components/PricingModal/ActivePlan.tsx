'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export function ActivePlan({
  planType,
  planActiveTill,
}: {
  planType?: string;
  planActiveTill?: number;
}) {
  const user = useUser();

  const formattedDate = planActiveTill
    ? new Date(planActiveTill).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-neutral-600 rounded-2xl p-8 shadow-xl relative overflow-hidden"
    >
      {/* Accent circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute -top-16 -right-16 w-40 h-40 bg-[#b8f9f7] rounded-full"
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground dark:text-neutral-300">
            Active Plan
          </h3>
          <span className="bg-[#24AFFC] text-white text-xs font-semibold px-3 py-1 rounded-full">
            {planType?.toUpperCase() || 'FREE'}
          </span>
        </div>

        {planType === 'pro' ? (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-neutral-300">
              Your <span className="font-semibold">Pro Plan</span> is active
              until{' '}
              <span className="text-[#24AFFC] font-semibold">
                {formattedDate}
              </span>
              .
            </p>

            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                All premium features unlocked
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">
            You are currently on the{' '}
            <span className="font-semibold">Free Plan</span>. Upgrade to unlock
            unlimited uploads and more.
          </p>
        )}
      </div>
    </motion.div>
  );
}
