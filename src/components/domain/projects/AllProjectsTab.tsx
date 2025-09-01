import { readAllProjects } from "@/api/readAllProjects.action";

export default async function AllProjectsTab() {
  const datas = await readAllProjects();
  console.log(datas);
  return (
    <>
      {datas.length === 0 ? (
        <div className="text-center text-14-medium md:text-16-medium">
          N O&nbsp;&nbsp;&nbsp;P R O J E C T S&nbsp;&nbsp;&nbsp;F O U N D . . .
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
