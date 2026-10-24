import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between gap-3 border-b border-white/5 bg-black/50 px-4 backdrop-blur-md sm:px-6">
            <Link href="/" className="group flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black">
                <Logo
                    expandable
                    className="h-9 w-auto"
                />
            </Link>

            <nav className="hidden shrink-0 gap-5 lg:flex xl:gap-8">
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
                <Link href="/labs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    Labs
                </Link>
                <Link href="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    Blogs
                </Link>
                <Link href="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-white">
                    Contact
                </Link>
            </nav>

            <Button asChild size="sm">
                <Link href="/contact"><span className="sm:hidden">Let’s talk</span><span className="hidden sm:inline">Talk to an Engineer</span></Link>
            </Button>
        </header>
    )
}
