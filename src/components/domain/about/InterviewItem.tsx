"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
  title: string;
  description: ReactNode; // string 대신 ReactNode로 명확히 지정
}

export default function InterviewItem({ title, description }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 md:gap-6 py-5 px-2 md:px-3 md:py-6 my-border text-left  hover:bg-gray-100 transition"
      >
        <h3 className=" text-18-medium sm:text-20-medium md:text-24-medium lg:text-28-medium sm:leading-7 md:leading-9 lg:leading-10">
          {title}
        </h3>
        <IoMdArrowDropdown
          size={22}
          className={`md:size-6 lg:size-8 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 py-3 md:px-3 md:py-4 text-14-medium sm:text-16-medium lg:text-18-medium leading-6 sm:leading-7 lg:leading-8">
              <p>{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
