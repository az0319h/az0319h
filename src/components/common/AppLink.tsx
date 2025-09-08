// components/common/AppLink.tsx
"use client";

import { Link } from "@/i18n/routing";
import { FaArrowRightLong } from "react-icons/fa6";

interface AppLinkProps {
  text: string;
  href: string;
  className?: string;
}

export default function AppLink({ text, href, className = "" }: AppLinkProps) {
  const isExternal = href.startsWith("http");

  // 공통 클래스
  const baseClasses = `
    relative inline-block py-1 pr-6 text-16-bold
    before:absolute before:bottom-0 before:content-[''] 
    before:bg-primary-blue-100 before:h-full before:right-0 before:w-20 
    before:transition-all before:duration-300  before:-z-10
    hover:before:h-2/10
  `;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${className}`}
      >
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {text}
      <FaArrowRightLong className="absolute -right-2.5 top-1/2 -translate-y-1/2" />
    </Link>
  );
}
