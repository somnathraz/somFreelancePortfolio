import { Syne, Outfit } from "next/font/google";

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-labs-display",
    weight: ["500", "600", "700", "800"],
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-labs-body",
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export default function LabsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${syne.variable} ${outfit.variable} font-[family-name:var(--font-labs-body)]`}>
            {children}
        </div>
    );
}
