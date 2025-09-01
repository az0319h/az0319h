import Image from "next/image";
import Link from "next/link";
import github from "@/assets/images/github.png";

export default function Shortcut({ url }: { url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit inline-flex items-center gap-2 rounded-xl bg-black-100 px-4 py-2 shadow-md transition-all duration-300 hover:bg-black-100 hover:shadow-lg hover:scale-105"
    >
      <Image src={github} alt="github" width={20} height={20} unoptimized />
      <span className="text-14-regular text-white">View on GitHub</span>
    </Link>
  );
}
