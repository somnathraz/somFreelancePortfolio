"use client";

import React from "react";

type DeferredSectionProps = {
    children: React.ReactNode;
    className?: string;
    minHeightClassName?: string;
    rootMargin?: string;
};

export function DeferredSection({
    children,
    className,
    minHeightClassName = "min-h-32",
    rootMargin = "300px 0px",
}: DeferredSectionProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (!ref.current || visible) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [rootMargin, visible]);

    return (
        <div ref={ref} className={className}>
            {visible ? children : <div className={minHeightClassName} aria-hidden="true" />}
        </div>
    );
}
