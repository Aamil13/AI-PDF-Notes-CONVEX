'use client';

import { Suspense } from 'react';
import useAppStore from '@/Store/useAppStore';

import Footer from '@/components/Footer';
import { HeroNavigation } from '@/components/HeroNavbar';
import WidthWrapper from '@/components/WidthWrapper';
import { HeroSection } from '@/components/HeroSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import { PricingSection } from '@/components/PricingSection';
import { useDelayedReadyState } from '@/Hooks/useDelayedReadyState';
import ShowLoader from '@/components/ShowLoader';

function HomeContent() {
  const { theme } = useAppStore();
  const { isReady } = useDelayedReadyState();

  if (!isReady) return <ShowLoader />;

  return (
    <WidthWrapper>
      <div
        className={`min-h-screen overflow-hidden transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-gradient-to-br from-white via-blue-50 to-gray-100 text-gray-900'
            : 'bg-gradient-to-br from-slate-900 via-neutral-900 to-gray-900 text-white'
        }`}
      >
        <HeroNavigation />
        <HeroSection />
        <Features />
        <Testimonials />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>
    </WidthWrapper>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<ShowLoader />}>
      <HomeContent />
    </Suspense>
  );
}
