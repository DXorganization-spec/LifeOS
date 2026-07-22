"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    style?: CSSProperties;
}

export default function FadeIn({
    children,
    delay = 0,
    className,
    style,
}: FadeInProps) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}