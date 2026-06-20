import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

interface AnimatedNumberProps {
  value: string; // e.g. "+8,500", "12", "99.4%", "100%"
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, className = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (!isInView) return;

    // Check if value actually has numbers
    const match = value.match(/^([^0-9]*)([0-9.,]+)([^0-9]*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const rawNumberStr = match[2];
    const suffix = match[3];

    // Check if it's decimal or has comma
    const hasComma = rawNumberStr.includes(",");
    const hasDecimal = rawNumberStr.includes(".");
    
    // Clean to float
    const cleanNumberStr = rawNumberStr.replace(/,/g, "");
    const targetNumber = parseFloat(cleanNumberStr);

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, targetNumber, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1], // Custom elegant easeOutExpo curve
      onUpdate: (latest) => {
        let formatted: string;
        
        // Format decimal places if target had decimal
        if (hasDecimal) {
          const decimalPlaces = rawNumberStr.split(".")[1]?.length || 1;
          formatted = latest.toFixed(decimalPlaces);
        } else {
          formatted = Math.floor(latest).toString();
        }

        // Add back commas if target had commas
        if (hasComma) {
          const parts = formatted.split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          formatted = parts.join(".");
        }

        setDisplayValue(`${prefix}${formatted}${suffix}`);
      },
    });

    return () => controls.stop();
  }, [value, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayValue || value}
    </span>
  );
};
