import notfound from "@/assets/images/404.svg";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 absolute top-1/2 left-1/2 -translate-1/2">
      <Image
        src={notfound}
        alt="404"
        className="w-auto h-auto max-w-[50vw] max-h-[50vh] min-w-50"
        priority
      />
    </div>
  );
}
