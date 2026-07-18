import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-white/5 bg-black/50 px-6 backdrop-blur-md">
            <Link href="/" className="group flex items-center">
                <Logo
                    priority
                    className="h-9 w-auto transition-transform group-hover:scale-[1.02]"
                />
            </Link>

            <nav className="hidden gap-8 md:flex">
                <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    About
                </Link>
                <Link href="/services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    Services
                </Link>
                <Link
                    href="/agency-development-partner"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-white"
                >
                    For Agencies
                </Link>
                <Link href="/case-studies" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    Case Studies
                </Link>
                <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    Blogs
                </Link>
            </nav>

            <Button asChild size="sm">
                <Link href="/book">Book Intro Call</Link>
            </Button>
        </header>
    )
}
