import React from "react";

export const Logo = ({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M7 8C7 5.79086 8.79086 4 11 4H13C15.2091 4 17 5.79086 17 8C17 10.2091 15.2091 12 13 12H11C8.79086 12 7 13.7909 7 16C7 18.2091 8.79086 20 11 20H13C15.2091 20 17 18.2091 17 16"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
