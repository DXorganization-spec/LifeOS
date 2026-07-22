"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface StaggerContainerProps {
    children: ReactNode;
    delayChildren?: number;
    staggerChildren?: number;
    className?: string;
    style?: CSSProperties;
}

export default function StaggerContainer({
    children,
    delayChildren = 0,
    staggerChildren = 0.08,
    className,
    style,
}: StaggerContainerProps) {
    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {
                    opacity: 0,
                },
                visible: {
                    opacity: 1,
                    transition: {
                        delayChildren,
                        staggerChildren,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}