"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Moon,
  Sun,
  Menu,
  X,
  Upload,
  ArrowRight,
  Play,
  Check,
} from "lucide-react";
import useAppStore from "@/Store/useAppStore";
import { useRouter } from "next/navigation";

const CTASection = () => {
  const { theme } = useAppStore();
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <div
          className={`backdrop-blur-lg rounded-3xl p-12 border ${
            theme === "light"
              ? "bg-gradient-to-r from-blue-50/80 to-white/80 border-gray-200"
              : "bg-gradient-to-r from-[#24AFFC]/20 to-blue-600/20 border-white/10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your PDFs?
          </h2>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}
          >
            Join thousands of professionals who've revolutionized their document
            workflow with AI-powered conversations.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(36, 175, 252, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#24AFFC] text-white hover:bg-blue-600 active:bg-black px-12 py-4 rounded-full font-semibold text-xl flex items-center space-x-2 mx-auto shadow-lg transition-colors"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          <div
            className={`flex justify-center items-center space-x-8 mt-8 text-sm ${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
