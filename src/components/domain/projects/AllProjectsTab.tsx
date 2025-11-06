import { readAllProjects } from "@/api/readAllProjects.action";
import ProjectCard from "@/components/common/ProjectCard";
import { SortKey, sortProjects } from "@/utils";

export default async function AllProjectsTab({ sort }: { sort: SortKey }) {
  const datas = await readAllProjects();
  const sorted = sortProjects(datas, sort);

  return (
    <>
      {sorted.length === 0 ? (
        <div className="text-center text-14-medium md:text-16-medium">
          N O&nbsp;&nbsp;&nbsp;P R O J E C T S&nbsp;&nbsp;&nbsp;F O U N D . . .
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-start justify-items-center lg:grid-cols-3 lg:gap-y-25">
          {sorted.map((data) => (
            <ProjectCard key={data.id} data={data} currentTab="1" />
          ))}
        </div>
      )}
    </>
  );
}
