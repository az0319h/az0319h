// components/common/AppLink.tsx
"use client";

import Link from "next/link";

interface AppLinkProps {
  text: string;
  href: string;
  className?: string;
}

export default function AppLink({ text, href, className = "" }: AppLinkProps) {
  const isExternal = href.startsWith("http");

  // 공통 클래스
  const baseClasses = `
    relative py-1 pr-6 text-16-bold 
    before:absolute before:bottom-0 before:content-[''] before:-z-10 
    before:bg-primary-blue-100 before:h-full before:left-5 before:w-4/5 
    before:transition-all before:duration-300 
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
    </Link>
  );
}
