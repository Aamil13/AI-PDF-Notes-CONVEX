"use client";
import React, { useEffect, useState } from "react";
import Preloader from "@/components/PreLoader";
import PageTransition from "../PageTransitionSlide";
import { useSessionVisited } from "@/Hooks/useSessionVisited";

const ShowLoader = () => {
  const { hasVisited, markVisited } = useSessionVisited();
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    if (hasVisited === null) return;

    if (hasVisited === false) {
      setShowPreloader(true);

      const timeout = setTimeout(() => {
        markVisited();
        setShowPreloader(false);
      }, 1300);

      return () => clearTimeout(timeout);
    }
  }, [hasVisited, markVisited]);

  if (hasVisited === null) return null;

  return showPreloader ? <Preloader /> : <PageTransition />;
};

export default ShowLoader;
