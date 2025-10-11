import { motion, AnimatePresence } from "framer-motion";

const PageTransition = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="layer-1"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-blue-900"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        key="layer-2"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-neutral-50"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        key="layer-3"
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-neutral-800"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: "-100%" }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
      />
    </AnimatePresence>
  );
};

export default PageTransition;
