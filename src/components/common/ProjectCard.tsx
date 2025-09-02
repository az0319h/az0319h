import { ProjectPayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function ProjectCard({
  data,
  currentTab,
}: {
  data: ProjectPayload;
  currentTab: string;
}) {
  return (
    <Link
      href={`/projects/${data.id}?tab=${currentTab}`}
      className="block group "
    >
      <div className="relative w-fit">
        <Image
          src={data.projectImageUrl}
          alt="projectImageUrl"
          width={370}
          height={0}
          unoptimized
          className="block"
        />
        <div
          className="
            absolute inset-0 bg-black/50 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100 text-gray-100
            flex justify-center items-center
          "
        >
          <div className="flex items-center gap-2 text-14-semibold">
            <h4>V I E W&nbsp;&nbsp;&nbsp;P R O J E C T</h4>
            <FaArrowRightLong />
          </div>
        </div>
      </div>

      <h4 className="pt-2 md:pt-3 text-14-semibold md:text-16-semibold uppercase">
        {data.title} - {data.tagline}
      </h4>
    </Link>
  );
}
