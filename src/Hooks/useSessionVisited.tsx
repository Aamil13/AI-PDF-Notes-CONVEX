"use client";
import { useEffect, useState } from "react";

const SESSION_KEY = "hasVisited";

export const useSessionVisited = () => {
  const [hasVisited, setHasVisited] = useState<boolean | null>(null);

  useEffect(() => {
    const visited = sessionStorage.getItem(SESSION_KEY);
    setHasVisited(visited === "true");
  }, []);

  const markVisited = () => {
    sessionStorage.setItem(SESSION_KEY, "true");
    setHasVisited(true);
  };

  return { hasVisited, markVisited };
};
