"use client";

import { usePathname } from "@/i18n/routing";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  const isProjects = pathname.startsWith("/projects/");

  return (
    <footer
      className={`py-6 md:py-9 z-30 ${
        isProjects ? "bg-bg-400 -mx-5 px-5" : "bg-bg-100"
      }`}
    >
      <div className="flex flex-col-reverse items-center gap-9 md:grid md:grid-rows-2 md:grid-cols-3 md:gap-y-6">
        <span className="text-12-semibold md:text-14-semibold md:col-start-1  md:row-start-2 md:self-end md:justify-self-start">
          © 2025 Hong Sunghoon. ALL RIGHTS RESERVED.
        </span>

        <ul className="flex items-center gap-6 md:gap-10 md:col-span-3 md:row-start-1 md:justify-self-center">
          <li>
            <a href="#" rel="noopener noreferrer">
              <FaFacebookF size={22} className="md:size-7" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/az0319h"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={22} className="md:size-7" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/h__sunghoon/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={22} className="md:size-7" />
            </a>
          </li>
        </ul>

        <span className="hidden md:block text-14-semibold md:col-start-3 md:row-start-2 md:self-end md:justify-self-end">
          CODE. CREATE. INSPIRE.
        </span>
      </div>
    </footer>
  );
}
