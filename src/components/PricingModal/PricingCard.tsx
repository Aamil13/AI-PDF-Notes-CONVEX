'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Phone } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';

const features = [
  'Unlimited PDF uploads',
  'Unlimited conversations with your PDFs',
  'AI-powered document summaries',
  'Secure document storage',
  'Priority support',
  'Advanced analytics',
];

export function PricingCard() {
  const userData = useUser();
  const upgradeUserPlan = useMutation(api.user.updateUserPlan);
  const onPaymentSuccess = async () => {
    // Handle post-payment success actions here
    const result = await upgradeUserPlan({
      email: userData.user?.primaryEmailAddress?.emailAddress || '',
      planType: 'pro',
    });

    // console.log('Payment Successful!', result);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-neutral-600 rounded-2xl p-8 shadow-xl relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute -top-16 -right-16 w-40 h-40 bg-[#b8f9f7] rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="absolute top-6 right-14"
      >
        <span className="bg-[#24AFFC] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Best
        </span>
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center mb-6"
        >
          <span className="text-gray-400 text-lg">+</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-2xl font-bold text-foreground dark:text-neutral-300 mb-3">
            Pro Plan
          </h3>
          <p className="text-gray-600 dark:text-neutral-300 text-sm mb-6 leading-relaxed">
            Unlock unlimited PDF uploads and conversations. Ideal for users who
            need to chat with more than 5 documents regularly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">$1.99</span>
            <span className="text-gray-600 text-sm">/mo</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-2"
        >
          <h4 className="font-semibold text-foreground mb-4">Core Features</h4>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-neutral-300 text-sm">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-between gap-3"
        >
          {/* <button className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center gap-2 transition-colors">
            <Phone className="w-4 h-4" />
            Need a Team Plan?
          </button> */}
          {/* <Button className="bg-[#24AFFC] hover:bg-[#0da5a1] text-white">
            Upgrade Now
          </Button> */}

          <PayPalButtons
            className="w-full "
            style={{ height: 30, layout: 'horizontal' }}
            onApprove={async (data, actions) => {
              await onPaymentSuccess();
            }}
            onCancel={() => console.log('payment cancelled')}
            onError={(err) => console.log('err', err)}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: '1.99',
                    },
                  },
                ],
              });
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
