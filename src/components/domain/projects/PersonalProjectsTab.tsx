import { readPersonalProjects } from "@/api/readPersonalProjects.action";

export default async function PersonalProjectsTab() {
  const datas = await readPersonalProjects();

  console.log(datas);

  return (
    <>
      {datas.length === 0 ? (
        <div className="text-center text-12-medium md:text-14-medium">
          N O&nbsp;&nbsp;&nbsp;P R O J E C T S&nbsp;&nbsp;&nbsp;F O U N D . . .
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
