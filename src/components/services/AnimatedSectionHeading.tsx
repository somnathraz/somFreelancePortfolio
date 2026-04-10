"use client";

import { motion } from "motion/react";

type AnimatedSectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export function AnimatedSectionHeading({ children, className }: AnimatedSectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.h2>
  );
}
