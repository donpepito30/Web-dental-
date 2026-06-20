import React from "react";
import { motion } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
  once?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  highlightClass = "text-[#0B5ED7]",
  once = true,
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 110,
      }
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => {
        // Extract punctuation for matching but preserve it for rendering
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¡!¿?]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block mr-[0.25em] pb-1 ${
              isHighlighted ? `${highlightClass} italic` : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};
