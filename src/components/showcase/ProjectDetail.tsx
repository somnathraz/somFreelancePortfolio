import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

interface ProjectDetailProps {
    image: string;
    title: string;
    description: string;
    stack: string[];
    children?: React.ReactNode;
}

export const ProjectDetail = ({ image, title, description, stack, children }: ProjectDetailProps) => {
    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 bg-white dark:bg-neutral-900 rounded-3xl">
            {/* Hero Image - Full Width & Modern */}
            {image && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 group">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            )}

            {/* Content Section */}
            <div className="flex flex-col gap-6 max-w-4xl">
                <div>
                    <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
                        {title}
                    </h3>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                    {children}
                </div>

                {/* Tech Stack - Minimalist & Icon-wise */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
                        <Layers className="w-4 h-4" />
                        <span>Technology Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((tech, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-sm font-medium border border-neutral-200 dark:border-neutral-700 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
                            >
                                {tech}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};
