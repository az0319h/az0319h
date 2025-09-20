import { ProjectPayload } from "@/types";
import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function ProjectCard({
  data,
  currentTab,
}: {
  data: ProjectPayload;
  currentTab: string;
}) {
  const t = await getTranslations("ProjectsPage");
  const locale = (await getLocale()) as "en" | "ko";
  return (
    <Link
      href={`/projects/${data.id}?tab=${currentTab}`}
      className="group flex flex-col  justify-center"
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
            absolute inset-0 bg-black/70 opacity-0
            transition-opacity duration-300
            group-hover:opacity-100 text-gray-100
            flex justify-center items-center
          "
        >
          <div className="flex items-center gap-2 text-14-semibold">
            <h4>{t("viewProject")}</h4>
            <FaArrowRightLong />
          </div>
        </div>
      </div>

      <h4 className="max-w-92.5 pt-2 md:pt-3 text-14-semibold  md:text-16-semibold  line-clamp-2">
        {data.title[locale]} - {data.tagline[locale]}
      </h4>
    </Link>
  );
}
