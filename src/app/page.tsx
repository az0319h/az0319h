import { readAllProjects } from "@/api/read-projects.action";
import AppLink from "@/components/common/AppLink";
import ProjectCard from "@/components/common/ProjectCard";
import HeroBanner from "@/components/domain/home/HeroBanner";
import Image from "next/image";
import blog from "@/assets/images/blog.png";
import { readDeployProjectUrl } from "@/api/raed-deployProjectUrl.action";

export default async function HomePage() {
  const [datas, deployUrl] = await Promise.all([
    readAllProjects(),
    readDeployProjectUrl(),
  ]);

  return (
    <div>
      <h1 className="text-center mb-3 md:mb-4   text-14-semibold md:text-16-semibold">
        T H E&nbsp;&nbsp;&nbsp;L A T E S T&nbsp;&nbsp;&nbsp;P R O J E C
        T&nbsp;&nbsp;&nbsp;2 0 2 5
      </h1>
      <HeroBanner data={datas[0]} />
      <div>
        <div className="relative z-10 py-14">
          <AppLink
            text="N E W E S T&nbsp;&nbsp;&nbsp;P R O J E C T S"
            href="/projects/"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-14">
          {datas.map((data, idx) => (
            <div
              key={data.id}
              className={`
        ${idx >= 4 ? "hidden" : ""}
        ${idx >= 3 ? "lg:hidden" : ""}
      `}
            >
              <ProjectCard data={data} />
            </div>
          ))}
        </div>
        <div className="relative z-10 pt-14 md:py-14 flex justify-center">
          <AppLink
            text="M&nbsp;&nbsp;O&nbsp;&nbsp;R&nbsp;&nbsp;E"
            href="/projects/"
          />
        </div>
      </div>
      <div className="mx-auto bg-bg-300 w-fit hidden md:block">
        <a href={deployUrl ?? "/"} target="_blank">
          <Image
            src={blog}
            alt="blog"
            width={716}
            className="shadow transition-opacity duration-300 hover:opacity-75"
            unoptimized
          />
        </a>
      </div>
    </div>
  );
}
