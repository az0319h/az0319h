import AllProjectsTab from "@/components/domain/projects/AllProjectsTab";
import PersonalProjectsTab from "@/components/domain/projects/PersonalProjectsTab";
import ProjectsTabNavigation from "@/components/domain/projects/ProjectsTabNavigation";
import TeamProjectsTab from "@/components/domain/projects/TeamProjectsTab";
import { redirect } from "next/navigation";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;

  if (!tab) {
    redirect("?tab=1");
  }

  let content;
  switch (tab) {
    case "1":
      content = <AllProjectsTab />;
      break;
    case "2":
      content = <TeamProjectsTab />;
      break;
    case "3":
      content = <PersonalProjectsTab />;
      break;
    default:
      redirect("?tab=1");
  }

  return (
    <>
      <ProjectsTabNavigation />
      {content}
    </>
  );
}
