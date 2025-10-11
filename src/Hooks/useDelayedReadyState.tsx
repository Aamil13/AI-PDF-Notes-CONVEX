'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessionVisited } from '@/Hooks/useSessionVisited';

export const useDelayedReadyState = () => {
  const searchParams = useSearchParams();
  const isRedirected = searchParams.get('redirected') === 'true';
  const [isReady, setIsReady] = useState(isRedirected);
  const { hasVisited } = useSessionVisited();

  useEffect(() => {
    if (hasVisited === null || isRedirected) return;

    const timer = setTimeout(() => setIsReady(true), hasVisited ? 1000 : 1400);
    return () => clearTimeout(timer);
  }, [isRedirected, hasVisited]);

  return { isReady };
};
