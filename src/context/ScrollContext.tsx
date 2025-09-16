'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type ScrollCtx = {
  isScrolled: boolean;    // sudah lewat threshold dari top
  isScrolling: boolean;   // user sedang scroll (transien)
};

const Ctx = createContext<ScrollCtx>({ isScrolled: false, isScrolling: false });

export function useScrollInfo() {
  return useContext(Ctx);
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsScrolling(true);
      if (timer.current) clearTimeout(timer.current);
      // berhenti 150ms setelah user stop scroll
      timer.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const value = useMemo(() => ({ isScrolled, isScrolling }), [isScrolled, isScrolling]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
