"use client";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

export default function Notification({
  message,
  success,
}: {
  message: string;
  success: boolean;
}) {
  return (
    <motion.div
      key="notification"
      initial={{
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        opacity: 0,
      }}
      animate={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
      }}
      exit={{
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        opacity: 0,
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`
            flex items-center gap-4
            ${success ? "bg-black-100" : "bg-red-500"}
            max-w-92 min-h-16 w-9/10 fixed bottom-5 
            left-1/2 -translate-x-1/2
            md:left-auto md:translate-x-0
            md:bottom-9 md:right-5
            px-4 py-3 rounded-sm shadow text-white z-40
          `}
    >
      <IoIosCloseCircle size={24} className="flex-shrink-0" />
      <span className="flex-1 break-words">{message}</span>
    </motion.div>
  );
}
