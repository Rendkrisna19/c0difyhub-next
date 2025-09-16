'use client';

import { useScrollInfo } from "@/context/ScrollContext";
import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

type Props = {
  as?: ElementType;          // ⬅️ ganti ini
  className?: string;
  id?: string;
  children: ReactNode;
  blurAmount?: string;
  scale?: string;
};

export default function BlurOnScrollSection({
  as: Tag = "section",
  className,
  id,
  children,
  blurAmount = "blur-[1.5px] md:blur-[2px]",
  scale = "scale-[.99]"
}: Props) {
  const { isScrolling } = useScrollInfo();
  return (
    <Tag
      id={id}
      className={clsx(
        "relative transition-all duration-300 will-change-transform will-change-filter",
        isScrolling ? `${blurAmount} ${scale} opacity-95` : "blur-0 scale-100 opacity-100",
        className
      )}
    >
      {children}
    </Tag>
  );
}
