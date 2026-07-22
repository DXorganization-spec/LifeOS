"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface AnimatedCardProps {
    children: ReactNode;
    delay?: number;
    whileHover?: boolean;
    className?: string;
    style?: CSSProperties;
}

export default function AnimatedCard({
    children,
    delay = 0,
    whileHover = true,
    className,
    style,
}: AnimatedCardProps) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
                delay,
            }}
            whileHover={
                whileHover
                    ? {
                          y: -3,
                          transition: {
                              duration: 0.2,
                          },
                      }
                    : undefined
            }
        >
            {children}
        </motion.div>
    );
}