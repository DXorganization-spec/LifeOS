"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
    children: ReactNode;
    delayChildren?: number;
    staggerChildren?: number;
    style?: React.CSSProperties;
}

export default function StaggerContainer({
    children,
    delayChildren = 0,
    staggerChildren = 0.08,
    style,
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren,
                        staggerChildren,
                    },
                },
            }}
            style={style}
        >
            {children}
        </motion.div>
    );
}