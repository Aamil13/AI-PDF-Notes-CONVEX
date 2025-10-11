'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className=" py-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {/* © 2025 PDFChat AI. All rights reserved. */}
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          &copy; {new Date().getFullYear()} PDFChat AI. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
