"use client";

import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RippleProps {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
    className?: string;
}

const Ripple = React.memo(function Ripple({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
    className,
}: RippleProps) {
    return (
        <div
            className={cn(
                "absolute top-1/2 left-1/2 h-full w-full overflow-hidden bg-transparent [mask-image:linear-gradient(to_bottom,white,transparent)]",
                className,
            )}
        >
            {Array.from({ length: numCircles }).map((_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.03;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
                const borderOpacity = 5 + i * 5;

                return (
                    <div
                        key={i}
                        className={`absolute animate-ripple rounded-full bg-white/5 shadow-xl border [--i:${i}]`}
                        style={
                            {
                                width: `${size}px`,
                                height: `${size}px`,
                                opacity,
                                animationDelay,
                                borderStyle,
                                borderWidth: "1px",
                                borderColor: `rgba(255, 255, 255, ${borderOpacity / 100})`,
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%) scale(1)",
                            } as CSSProperties
                        }
                    />
                );
            })}
        </div>
    );
});

Ripple.displayName = "Ripple";

export default Ripple;
