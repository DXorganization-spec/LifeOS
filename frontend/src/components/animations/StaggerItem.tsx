"use client";

import { motion } from "framer-motion";
import { ReactNode, CSSProperties } from "react";

interface StaggerItemProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export default function StaggerItem({
    children,
    className,
    style,
}: StaggerItemProps) {
    return (
        <motion.div
            className={className}
            style={style}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 20,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: "easeOut",
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}