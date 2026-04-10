"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { DeferredSection } from "@/components/DeferredSection";
import { ClientMobileNav } from "@/components/ClientMobileNav";

const BentoServices = dynamic(() => import("@/components/BentoServices").then((mod) => ({ default: mod.BentoServices })), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading services...</div></div>,
});

const ClientFit = dynamic(() => import("@/components/ClientFit").then((mod) => ({ default: mod.ClientFit })), {
  loading: () => <div className="h-64" />,
});

const SelectedWork = dynamic(() => import("@/components/SelectedWork").then((mod) => ({ default: mod.SelectedWork })), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading work...</div></div>,
});

const Process = dynamic(() => import("@/components/Process").then((mod) => ({ default: mod.Process })), {
  loading: () => <div className="h-64" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials").then((mod) => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading testimonials...</div></div>,
});

const Cta = dynamic(() => import("@/components/Cta").then((mod) => ({ default: mod.Cta })), {
  loading: () => <div className="h-96" />,
});

const Footer = dynamic(() => import("@/components/Footer").then((mod) => ({ default: mod.Footer })), {
  loading: () => <div className="h-32" />,
});

export function HomeDeferredContent() {
  return (
    <>
      <section id="services" className="relative z-10">
        <DeferredSection minHeightClassName="h-96">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading services...</div></div>}>
            <BentoServices />
          </Suspense>
        </DeferredSection>
      </section>

      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <ClientFit />
        </Suspense>
      </DeferredSection>

      <section id="work" className="relative z-10 bg-black">
        <DeferredSection minHeightClassName="h-96">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading work...</div></div>}>
            <SelectedWork />
          </Suspense>
        </DeferredSection>
      </section>

      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <Process />
        </Suspense>
      </DeferredSection>

      <section className="relative z-10 bg-black">
        <DeferredSection minHeightClassName="h-96">
          <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-zinc-500">Loading testimonials...</div></div>}>
            <Testimonials />
          </Suspense>
        </DeferredSection>
      </section>

      <DeferredSection minHeightClassName="h-96">
        <Suspense fallback={<div className="h-96" />}>
          <Cta />
        </Suspense>
      </DeferredSection>

      <DeferredSection minHeightClassName="h-32" rootMargin="150px 0px">
        <Suspense fallback={<div className="h-32" />}>
          <Footer />
        </Suspense>
      </DeferredSection>

      <ClientMobileNav />
    </>
  );
}
