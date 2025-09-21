"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/images/logo.svg";
import subLogo from "@/assets/images/subLogo.svg";
import otherSubLogo from "@/assets/images/otherSubLogo.svg";
import hamburgerMenu from "@/assets/images/hamburgerMenu.png";
import AppLink from "@/components/common/AppLink";
import { toggleBodyScroll } from "@/utils";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";

const logos = [subLogo, otherSubLogo];

export default function Header() {
  const t = useTranslations("Nav");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [index, setIndex] = useState(0);

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

  //body 스크롤 제어
  useEffect(() => {
    toggleBodyScroll(isOpen);

    return () => {
      toggleBodyScroll(false);
    };
  }, [isOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 공통 클래스
  const baseClasses = `
    relative py-1 pr-6 w-fit
    before:absolute before:bottom-0 before:content-[''] before:-z-10 
    before:bg-primary-white-100 before:h-full before:right-0 before:w-0
    before:transition-all before:duration-300 
    hover:before:w-[65%] hover:md:before:w-[60%]
  `;

  return (
    <header
      className={`sticky -mx-5 px-5  z-40 top-0 left-0 bg-bg-100 transition-shadow ${
        isScrolled ? "shadow-header" : ""
      }`}
    >
      <div className="py-5 md:py-6 flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1 w-fit">
          <Image src={logo} width={35} height={35} alt="logo" priority />
          <h2>
            MadeBy<span className="font-bold">Hong</span>
          </h2>
        </Link>
        <div className="hidden md:block relative w-[6.25rem] h-[4.6875rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src={logos[index]}
                width={100}
                height={100}
                alt="subLogo"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <nav className="flex items-center gap-8">
          <button onClick={() => setIsOpen(true)}>
            <Image
              src={hamburgerMenu}
              width={20}
              className="md:size-6"
              alt="menu"
            />
          </button>
          <div className="hidden md:block">
            <AppLink text="G I T H U B" href="https://github.com/az0319h" />
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 bg-bg-200 flex flex-col items-center justify-center"
            initial={{ clipPath: "inset(50% 0 50% 0)" }} // 위/아래 50% → 닫힘
            animate={{ clipPath: "inset(0 0 0 0)" }} // 전체 열림
            exit={{ clipPath: "inset(50% 0 50% 0)" }} // 다시 위/아래로 닫힘
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <nav className="flex flex-col gap-3 md:gap-5 text-20-semibold md:text-24-semibold">
              <button
                onClick={() => setIsOpen(false)}
                className="text-22-semibold md:text-26-semibold text-left"
              >
                X
              </button>
              <Link
                href="/"
                className={`${baseClasses}`}
                onClick={() => setIsOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href="/about"
                className={`${baseClasses}`}
                onClick={() => setIsOpen(false)}
              >
                {t("about")}
              </Link>

              <Link
                href="/contact"
                className={`${baseClasses}`}
                onClick={() => setIsOpen(false)}
              >
                {t("contact")}
              </Link>
              <Link
                href="/projects"
                className={`${baseClasses}`}
                onClick={() => setIsOpen(false)}
              >
                {t("projects")}
              </Link>
              <LocaleSwitcher onClose={() => setIsOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
