"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/images/logo.png";
import subLogo from "@/assets/images/subLogo.png";
import hamburgerMenu from "@/assets/images/hamburgerMenu.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky z-40 top-0 left-0 bg-bg-100 transition-shadow ${
        isScrolled ? "shadow-header" : ""
      }`}
    >
      <div className="py-5 md:py-6 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1 w-fit">
          <Image src={logo} width={35} height={35} alt="logo" />
          <h2>
            MadeBy<span className="font-bold">Hong</span>
          </h2>
        </Link>

        <div className="hidden md:block">
          <Image src={subLogo} width={100} alt="subLogo" />
        </div>

        <nav className="flex items-center gap-8">
          <button onClick={() => setIsOpen(true)}>
            <Image src={hamburgerMenu} width={24} alt="menu" />
          </button>
          <button className="hidden md:block text-16-bold">G I T H U B</button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-bg-200 flex flex-col items-center justify-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <nav className="flex flex-col gap-3 md:gap-5 text-20-semibold md:text-24-semibold">
              <button
                onClick={() => setIsOpen(false)}
                className="text-22-semibold md:text-26-semibold text-left"
              >
                X
              </button>
              <Link href="/" onClick={() => setIsOpen(false)}>
                H O M E
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                A B O U T
              </Link>
              <Link href="/project" onClick={() => setIsOpen(false)}>
                P R O J E C T
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                C O N T A C T
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
