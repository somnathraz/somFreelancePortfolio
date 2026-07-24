"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { DeferredSection } from "@/components/DeferredSection";
import { ClientMobileNav } from "@/components/ClientMobileNav";

const SelectedWork = dynamic(() => import("@/components/SelectedWork").then((mod) => ({ default: mod.SelectedWork })), {
  loading: () => <div className="flex h-96 items-center justify-center"><div className="animate-pulse text-zinc-500">Loading work...</div></div>,
});

const WhyFoundersHire = dynamic(() => import("@/components/WhyFoundersHire").then((mod) => ({ default: mod.WhyFoundersHire })), {
  loading: () => <div className="h-64" />,
});

const AgencyComparison = dynamic(() => import("@/components/AgencyComparison").then((mod) => ({ default: mod.AgencyComparison })), {
  loading: () => <div className="h-64" />,
});

const BentoServices = dynamic(() => import("@/components/BentoServices").then((mod) => ({ default: mod.BentoServices })), {
  loading: () => <div className="flex h-96 items-center justify-center"><div className="animate-pulse text-zinc-500">Loading services...</div></div>,
});

const FlexibleTeamSection = dynamic(() => import("@/components/FlexibleTeamSection").then((mod) => ({ default: mod.FlexibleTeamSection })), {
  loading: () => <div className="h-64" />,
});

const ClientFit = dynamic(() => import("@/components/ClientFit").then((mod) => ({ default: mod.ClientFit })), {
  loading: () => <div className="h-64" />,
});

const Process = dynamic(() => import("@/components/Process").then((mod) => ({ default: mod.Process })), {
  loading: () => <div className="h-64" />,
});

const Testimonials = dynamic(() => import("@/components/Testimonials").then((mod) => ({ default: mod.Testimonials })), {
  loading: () => <div className="flex h-96 items-center justify-center"><div className="animate-pulse text-zinc-500">Loading testimonials...</div></div>,
});

const HomeFaq = dynamic(() => import("@/components/HomeFaq").then((mod) => ({ default: mod.HomeFaq })), {
  loading: () => <div className="h-64" />,
});

const Cta = dynamic(() => import("@/components/Cta").then((mod) => ({ default: mod.Cta })), {
  loading: () => <div className="h-96" />,
});

export function HomeDeferredContent() {
  return (
    <>
      {/* 1. Proof first — case studies right after hero for Ads decision-making */}
      <section id="work" className="relative z-10 bg-black">
        <DeferredSection minHeightClassName="h-96">
          <Suspense fallback={<div className="flex h-96 items-center justify-center"><div className="animate-pulse text-zinc-500">Loading work...</div></div>}>
            <SelectedWork />
          </Suspense>
        </DeferredSection>
      </section>

      {/* 2. Why hire me */}
      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <WhyFoundersHire />
        </Suspense>
      </DeferredSection>

      {/* 3. Agency comparison */}
      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <AgencyComparison />
        </Suspense>
      </DeferredSection>

      {/* 4. Services */}
      <section id="services" className="relative z-10">
        <DeferredSection minHeightClassName="h-96">
          <Suspense fallback={<div className="flex h-96 items-center justify-center"><div className="animate-pulse text-zinc-500">Loading services...</div></div>}>
            <BentoServices />
          </Suspense>
        </DeferredSection>
      </section>

      {/* 4b. Flexible team model */}
      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <FlexibleTeamSection />
        </Suspense>
      </DeferredSection>

      <section id="who-i-work-with" className="relative z-10">
        <DeferredSection minHeightClassName="h-64">
          <Suspense fallback={<div className="h-64" />}>
            <ClientFit />
          </Suspense>
        </DeferredSection>
      </section>

      {/* 5. Process */}
      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <Process />
        </Suspense>
      </DeferredSection>

      {/* 6. Testimonials / more proof */}
      <section id="testimonials" className="relative z-10 bg-black">
        <DeferredSection minHeightClassName="h-96">
          <Suspense fallback={<div className="flex h-96 items-center justify-center"><div className="animate-pulse text-zinc-500">Loading testimonials...</div></div>}>
            <Testimonials />
          </Suspense>
        </DeferredSection>
      </section>

      {/* 7. FAQ */}
      <DeferredSection minHeightClassName="h-64">
        <Suspense fallback={<div className="h-64" />}>
          <HomeFaq />
        </Suspense>
      </DeferredSection>

      {/* 8. CTA */}
      <DeferredSection minHeightClassName="h-96">
        <Suspense fallback={<div className="h-96" />}>
          <Cta />
        </Suspense>
      </DeferredSection>

      <ClientMobileNav />
    </>
  );
}
