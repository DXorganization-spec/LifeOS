"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export default function PageTransition({
    children,
    className,
    style,
}: PageTransitionProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            style={{
                width: "100%",
                height: "100%",
                ...style,
            }}
        >
            {children}
        </motion.div>
    );
}