import React from "react";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Sparkles,
    Zap,
    Bot,
    Rocket,
    Smartphone,
    Play,
    Download,
    ShoppingBag,
    Utensils,
    CheckCircle2,
    Armchair,
    MapPin,
    Calendar,
    Globe,
    Truck,
    Package,
    Anchor
} from "lucide-react";

// 1. AI PRODUCT HERO
// Vibe: Dark mode, glowing gradients, futuristic, "Linear-style" design.
export const AIHero = () => (
    <div className="relative h-full w-full bg-[#0A0A0A] overflow-hidden flex flex-col items-center justify-center p-8 text-center border border-white/5 rounded-3xl">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>

        <div className="z-10 flex flex-col items-center gap-6 max-w-md relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-medium text-indigo-200">New: GPT-4o Integration</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[0.9]">
                Think <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Faster.</span>
            </h2>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                The AI workspace that adapts to your thoughts. Generate code, design, and copy in milliseconds.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button className="flex-1 sm:flex-none rounded-lg bg-white text-black hover:bg-zinc-200 font-semibold h-11 px-6">
                    Start Generating <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="ghost" className="flex-1 sm:flex-none rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 h-11 px-6">
                    <Play className="w-4 h-4 mr-2" /> Watch Demo
                </Button>
            </div>

            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold mt-4">
                Trusted by 10,000+ Builders
            </p>
        </div>
    </div>
);

// 2. MOBILE APP HERO
// Vibe: Clean, playful, focused on "Download", using a mock notification visual.
export const MobileAppHero = () => (
    <div className="relative h-full w-full bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden flex flex-col justify-center p-10">
        {/* Background Shapes */}
        <div className="absolute -right-10 top-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute left-10 bottom-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl"></div>

        <div className="z-10 flex flex-col items-start gap-5 max-w-sm">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-indigo-100 flex items-center gap-3 w-fit mb-2">
                <div className="bg-blue-100 p-2 rounded-xl">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-800">New Notification</p>
                    <p className="text-[10px] text-slate-500">Your daily goals are ready!</p>
                </div>
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Productivity <br />
                <span className="text-blue-600">SaaS MVP.</span>
            </h2>

            <p className="text-slate-600 text-sm">
                Built end-to-end in React + Node. <br />
                <span className="font-semibold text-slate-800">Outcome:</span> Launched in 21 days, 10k+ users onboarded.
            </p>

            <div className="flex gap-3 mt-2">
                <Button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-6 h-12">
                    <Download className="w-4 h-4 mr-2" /> App Store
                </Button>
            </div>

            <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">4.9/5 Rating</span>
            </div>
        </div>
    </div>
);

// 3. SAAS / B2B HERO
// Vibe: Trustworthy, professional, metric-focused, clean typography.
export const SaasHero = () => (
    <div className="relative h-full w-full bg-white overflow-hidden flex flex-col justify-center p-8 border border-zinc-200 rounded-lg">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="z-10 flex flex-col gap-6 max-w-lg relative">
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                v2.0 is live
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                CRM <br />
                <span className="bg-zinc-900 text-white px-2 italic">Integrations</span>
            </h2>

            <p className="text-zinc-500 text-base max-w-xs">
                Unified 5 fragmented tools into one dashboard. Reduced data entry time by 80%.
            </p>

            <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                    <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20">
                        Start Free Trial
                    </Button>
                    <Button variant="outline" className="h-12 px-6 border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-lg">
                        Pricing
                    </Button>
                </div>
                <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> No credit card required
                </p>
            </div>
        </div>
    </div>
);

// 4. STREETWEAR / SNEAKER HERO
// Vibe: Bold, edgy, brutalist, high contrast.
export const StreetwearHero = ({
    image = "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop"
}: { image?: string }) => (
    <div className="relative h-full w-full bg-zinc-900 overflow-hidden group">
        <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"
            style={{ backgroundImage: `url('${image}')` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-12">
            <div className="bg-yellow-400 text-black text-[10px] font-bold uppercase px-2 py-1 w-fit mb-4 tracking-wider">
                Client: DTC Brand | Role: Frontend
            </div>

            <h2 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-4">
                Urban <br /> Drift
            </h2>

            <div className="flex items-center justify-between border-t border-white/20 pt-4">
                <div>
                    <p className="text-white font-bold text-xl">$189.00</p>
                    <p className="text-zinc-400 text-xs uppercase">Summer Collection '26</p>
                </div>
                <Button size="icon" className="rounded-full h-12 w-12 bg-white text-black hover:bg-zinc-200">
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    </div>
);
// 4. GENERATIVE AI / CREATIVE HERO
// Vibe: Artistic, colorful, high-energy, "Magic" feel.
export const AIGenerativeHero = () => (
    <div className="relative h-full w-full bg-black overflow-hidden flex flex-col items-center justify-center p-8 border border-zinc-800 rounded-3xl group">

        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#3b0764,transparent)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

        {/* Floating Particles/Elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-cyan-400 rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-400 rounded-full blur-[2px] animate-pulse delay-75"></div>

        <div className="z-10 relative flex flex-col items-center text-center gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <Sparkles className="w-4 h-4 text-fuchsia-400 fill-fuchsia-400" />
                <span className="text-sm font-medium text-white/90">Text-to-Video 2.0</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1]">
                Dream with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-cyan-400 to-emerald-400">
                    Open Eyes.
                </span>
            </h2>

            <p className="text-zinc-400 text-lg max-w-md">
                Generate cinematic videos from simple text prompts. No rendering time. No expensive hardware.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center">
                <Button className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-transform hover:scale-105">
                    Start Dreaming
                </Button>
                <Button variant="outline" className="h-14 px-8 rounded-full border-white/10 text-white hover:bg-white/10 font-medium text-lg backdrop-blur-md">
                    View Gallery
                </Button>
            </div>

            {/* Social Proof / "Product Hunt" Badge style */}
            <div className="mt-8 flex items-center gap-3 text-xs font-medium text-zinc-500 uppercase tracking-widest">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-6 h-6 rounded-full border border-black bg-zinc-800" />
                    ))}
                </div>
                <div>Used by 40k+ Creators</div>
            </div>
        </div>
    </div>
);
export const BookingHero = ({
    image = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
}: { image?: string }) => (
    <div className="relative h-full w-full bg-zinc-900 overflow-hidden flex flex-col items-center justify-center p-6 border border-zinc-800 rounded-3xl group">
        {/* Immersive Background */}
        <div
            className="absolute inset-0 bg-cover bg-center opacity-70 transition-transform duration-[3s] ease-in-out group-hover:scale-105"
            style={{ backgroundImage: `url('${image}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40"></div>

        <div className="z-10 flex flex-col items-center text-center gap-6 max-w-xs w-full m-10">
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-medium tracking-wide uppercase text-[10px] mb-1">
                    <Globe className="w-3 h-3" />
                    <span>Discover the Undiscovered</span>
                </div>
                <h2 className="text-5xl md:text-5xl font-serif text-white leading-none tracking-tight">
                    Find your next <br /> <span className="italic text-white/90">Great Escape.</span>
                </h2>
            </div>

            {/* Search Widget - Glassmorphism */}
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex flex-col gap-2 shadow-2xl animate-in fade-in zoom-in-95 duration-700 delay-150">
                <div className="flex-1 flex items-center px-4 h-12 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/input">
                    <MapPin className="w-4 h-4 text-zinc-400 group-hover/input:text-emerald-400 transition-colors mr-3" />
                    <div className="text-left overflow-hidden">
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Where to?</p>
                        <p className="text-sm font-semibold text-white truncate">Kyoto, Japan</p>
                    </div>
                </div>

                <div className="flex-1 flex items-center px-4 h-12 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group/input">
                    <Calendar className="w-4 h-4 text-zinc-400 group-hover/input:text-emerald-400 transition-colors mr-3" />
                    <div className="text-left overflow-hidden">
                        <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Dates</p>
                        <p className="text-sm font-semibold text-white truncate">Nov 14 - Nov 21</p>
                    </div>
                </div>

                <Button className="h-12 w-full px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/20">
                    Search
                </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 text-xs font-medium text-white/60 pt-2">
                <span className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-emerald-400 pb-0.5">Popular: Bali</span>
                <span className="text-white/20">•</span>
                <span className="hover:text-white cursor-pointer transition-colors border-b border-transparent hover:border-emerald-400 pb-0.5">Santorini</span>
            </div>
        </div>
    </div>
);
// 5. SHIPPING / LOGISTICS HERO
// Vibe: Industrial, data-heavy, blue/slate tones, map visualization.
export const ShippingHero = () => (
    <div className="relative h-full w-full bg-slate-950 overflow-hidden flex flex-col items-center justify-center p-8 border border-slate-800 rounded-3xl">
        {/* Background Map Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#020617_100%)]"></div>
        <div
            className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain"
            style={{ filter: 'invert(1)' }}
        ></div>

        {/* Decor Lines */}
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-10">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    SYSTEM OPERATIONAL
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    Global Logistics, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        Simplified.
                    </span>
                </h2>
            </div>

            {/* Tracking Interface */}
            <div className="w-full max-w-lg bg-white p-2 rounded-2xl flex shadow-2xl shadow-blue-900/20 transform transition-transform hover:scale-[1.02] duration-300">
                <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                    <Package className="text-slate-400 w-5 h-5 mr-3" />
                    <input
                        className="bg-transparent w-full outline-none text-slate-900 font-mono text-sm placeholder:text-slate-400 h-12"
                        placeholder="Enter Tracking ID (e.g., TRK-9281)"
                    />
                </div>
                <Button className="ml-2 h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25">
                    Track
                </Button>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center backdrop-blur-sm hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <div className="p-3 bg-blue-500/10 rounded-full mb-3 group-hover:bg-blue-500/20 transition-colors">
                        <Truck className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">1.2M</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Daily Shipments</div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center backdrop-blur-sm hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <div className="p-3 bg-cyan-500/10 rounded-full mb-3 group-hover:bg-cyan-500/20 transition-colors">
                        <Globe className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">190+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Countries Covered</div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center text-center backdrop-blur-sm hover:bg-slate-800/50 transition-colors group cursor-pointer">
                    <div className="p-3 bg-emerald-500/10 rounded-full mb-3 group-hover:bg-emerald-500/20 transition-colors">
                        <Anchor className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-bold text-white font-mono">99.9%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">On-Time Delivery</div>
                </div>
            </div>
        </div>
    </div>
);
// 5. FOOD / DELIVERY HERO
// Vibe: Fresh, appetizing, rounded, warm colors.
export const FoodHero = ({
    image = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop"
}: { image?: string }) => (
    <div className="relative h-full w-full bg-orange-50 overflow-hidden flex flex-col p-6 rounded-3xl">
        {/* Top Navigation-ish area */}
        <div className="flex justify-between items-center mb-8 z-10">
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
                <Utensils className="w-4 h-4 text-orange-600" />
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-900">
                15-30 min
            </div>
        </div>

        <div className="z-10 mt-auto bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl shadow-orange-900/5">
            <h2 className="text-2xl font-serif font-bold text-stone-800 leading-tight mb-2">
                Fresh Basil <br /> & Tomato Pizza
            </h2>
            <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-3 h-3 text-orange-400 fill-orange-400">★</div>
                ))}
                <span className="text-xs text-stone-400 ml-2">(2k+)</span>
            </div>
            <div className="flex gap-2">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-10">
                    Add to Cart
                </Button>
                <div className="flex items-center justify-center px-4 font-bold text-stone-800 bg-orange-100 rounded-xl">
                    $18
                </div>
            </div>
        </div>

        {/* Full Background Image */}
        <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
        ></div>
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
    </div>
);

// RESTORED COMPONENTS FOR COMPATIBILITY
export const FashionHero = ({
    image = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    title = "Summer Essentials",
    subtitle = "New Arrivals"
}: { image?: string; title?: React.ReactNode; subtitle?: string }) => (
    <div className="relative h-full w-full bg-zinc-100 overflow-hidden flex flex-col items-center justify-center text-center p-8">
        <div
            className="absolute top-0 left-0 w-full h-full opacity-50 bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url('${image}')` }}
        ></div>
    </div>
);

export const TechHero = () => (
    <div className="relative h-full w-full bg-zinc-950 overflow-hidden flex flex-col items-start justify-center p-12">
        <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-violet-500/10 to-transparent"></div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/20 blur-[100px] rounded-full"></div>

        <div className="z-10 flex flex-col items-start gap-4 max-w-sm">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <Zap className="w-3 h-3 text-violet-400" />
                <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">Next Gen</span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-none tracking-tight">
                Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">X-Pro</span>
                <br />Series
            </h2>
            <p className="text-sm text-zinc-400">
                Experience sound like never before with active noise cancellation and 40h battery life.
            </p>
            <div className="flex gap-4 pt-2">
                <Button className="bg-white text-black hover:bg-zinc-200">
                    Pre-order
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Specs
                </Button>
            </div>
        </div>
    </div>
);

export const FurnitureHero = () => (
    <div className="relative h-full w-full bg-[#F5F2EF] overflow-hidden flex flex-col justify-end p-8">
        <div className="absolute top-8 right-8">
            <Armchair className="w-8 h-8 text-stone-800 opacity-20" />
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-left"></div>

        <div className="z-10 flex flex-col gap-3 max-w-xs">
            <h2 className="text-3xl font-light text-stone-900">
                Modern <span className="font-semibold">Living</span>
            </h2>
            <div className="h-0.5 w-12 bg-stone-900/20"></div>
            <p className="text-sm text-stone-600">
                Minimalist furniture for the contemporary home. Sustainable materials, timeless design.
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm font-medium text-stone-900 cursor-pointer group">
                Explor Catalog
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    </div>
);

export const BeautyHero = () => (
    <div className="relative h-full w-full bg-rose-50 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-rose-100/50"></div>

        <div className="z-10 text-center p-8 border border-rose-900/5 bg-white/40 backdrop-blur-sm rounded-2xl shadow-sm max-w-[80%]">
            <div className="flex justify-center mb-4">
                <Sparkles className="w-6 h-6 text-rose-400" />
            </div>
            <h2 className="text-4xl font-serif text-rose-950 mb-2">
                Glow Up
            </h2>
            <p className="text-xs font-medium uppercase tracking-widest text-rose-700/60 mb-6">
                Skincare Revolution
            </p>
            <Button size="sm" className="bg-rose-950 text-white hover:bg-rose-800 rounded-full px-6">
                <ShoppingBag className="w-3 h-3 mr-2" /> Shop Now
            </Button>
        </div>
    </div>
);