"use client";

import { AnimatePresence, motion } from "framer-motion";

import useAppStore from "@/Store/useAppStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  const { theme } = useAppStore();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Research Analyst",
      text: "This AI PDF chat has revolutionized how I analyze research papers. I can extract insights in seconds instead of hours.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Legal Consultant",
      text: "Incredible for reviewing contracts and legal documents. The AI understands context perfectly.",
      rating: 5,
    },
    {
      name: "Dr. Emily Watson",
      role: "Academic",
      text: "Game-changer for my literature reviews. I can query hundreds of papers simultaneously.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold mb-12 ${
            theme === "light"
              ? "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          }`}
        >
          Loved by Professionals
        </motion.h2>

        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div
                className={`backdrop-blur-lg rounded-2xl p-8 border ${
                  theme === "light"
                    ? "bg-white/80 border-gray-200"
                    : "bg-gradient-to-br from-white/10 to-white/5 border-white/10"
                }`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ),
                  )}
                </div>
                <p className="text-xl mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div>
                  <div className="font-semibold">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div
                    className={
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }
                  >
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial
                  ? "bg-[#24AFFC]"
                  : theme === "light"
                    ? "bg-gray-300"
                    : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
