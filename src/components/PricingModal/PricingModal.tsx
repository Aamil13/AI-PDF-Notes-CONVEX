'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { PricingCard } from './PricingCard';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { ActivePlan } from './ActivePlan';

export function PricingModal({
  isNavbarCollapsed,
  isPlanValid,
  planType,
  planActiveTill,
}: {
  isNavbarCollapsed: boolean;
  isPlanValid: boolean;
  planType?: string;
  planActiveTill?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        style={{ borderRadius: 10 }}
        className={`bg-white text-neutral-800 hover:bg-white active:bg-[#000000] font-poppins flex items-center gap-2 ${isNavbarCollapsed ? 'w-2/3' : 'mx-4 w-11/12 h-12'}`}
        onClick={() => setIsOpen(true)}
      >
        <FaFileInvoiceDollar size={32} />{' '}
        {isNavbarCollapsed
          ? ''
          : !isPlanValid
            ? 'Upgrade for 1.99$'
            : 'PRO Plan'}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {isPlanValid ? (
                <ActivePlan
                  planType={planType}
                  planActiveTill={planActiveTill}
                />
              ) : (
                <PricingCard />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
