"use client";

import { motion } from "framer-motion";

import useAppStore from "@/Store/useAppStore";
import { useRouter } from "next/navigation";
import { MessageCircle, Zap, Shield } from "lucide-react";
const Features = () => {
  const { theme } = useAppStore();
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === "light"
                ? "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            }`}
          >
            Powerful Features
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Everything you need to have intelligent conversations with your
            documents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Lightning Fast",
              description:
                "Get instant responses to complex questions about your PDFs with our advanced AI processing.",
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Secure & Private",
              description:
                "Your documents are encrypted and processed securely. We never store your sensitive data.",
            },
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "Natural Conversations",
              description:
                "Chat naturally with your documents. Ask follow-up questions and dive deeper into topics.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/80 border-gray-200 hover:border-[#24AFFC]/50"
                  : "bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-[#24AFFC]/30"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#24AFFC] to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p
                className={`leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
