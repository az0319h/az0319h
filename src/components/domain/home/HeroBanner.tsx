import { ProjectPayload } from "@/types";
import Image from "next/image";
import Link from "next/link";
import badge from "@/assets/images/badge.svg";
import { IoSpeedometerOutline, IoAccessibilityOutline } from "react-icons/io5";
import { TbSeo } from "react-icons/tb";

export default async function HeroBanner({ data }: { data: ProjectPayload }) {
  // participants가 배열이면 그대로, 객체면 Object.values로 배열화, 없으면 빈 배열
  const participants = Array.isArray(data.participants)
    ? data.participants
    : Object.values(data.participants || {});

  return (
    <div className="relative ">
      <div className="">
        <Link
          href={`/projects/${data.id}`}
          className="inline-block w-fit md:block md:mx-auto "
        >
          <Image
            src={data.projectImageUrl}
            alt="projectImageUrl"
            width={765}
            height={0}
            className="lg:w-250 cursor-pointer shadow-image transition-transform duration-300 ease-in-out hover:scale-101"
            unoptimized
          />
        </Link>

        <div className="md:flex md:w-180  md:mx-auto py-7 md:py-10 justify-between lg:w-230 ">
          <div className="mb-5 md:mb-0 md:flex md:items-center md:gap-5 ">
            <Image
              src={badge}
              alt="badge"
              width={120}
              className="!hidden md:!block"
            />
            <div className="flex flex-col items-center md:items-start ">
              <h3 className="text-18-bold mb-2 lg:text-20-bold">
                {data.title}
              </h3>
              <h4 className="text-14-regular lg:text-16-regular">
                {data.tagline}
              </h4>
              <span className="text-14-regular lg:text-16-regular">-</span>
              <span className="text-14-regular lg:text-16-regular">
                {" "}
                {data.location}
              </span>
            </div>
          </div>

          <div className="px-10 md:px-0 md:flex items-center justify-center md:w-50 lg:w-70">
            <p className="text-center md:text-left">
              <em className="text-12-regular lg:text-14-regular ">
                {data.description}
              </em>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-bg-300 -mx-5 py-10 px-5 lg:bg-bg-100 lg:w-180 lg:mx-auto lg:px-0 lg:hidden">
        <div className="flex justify-center ">
          {participants.map((participant) => (
            <div key={participant.id} className="flex">
              {participant.imageUrl && (
                <a href={participant.githubUrl} target="_blank">
                  <Image
                    src={participant.imageUrl}
                    alt={`${participant.name}`}
                    width={40}
                    height={40}
                  />
                </a>
              )}
            </div>
          ))}
        </div>
        <ul className="pt-6 md:pt-8 grid grid-cols-2 md:grid-cols-4   gap-y-6 [&_li]:flex  [&_li]:gap-1 [&_li]:flex-col [&_li]:justify-center  [&_li]:items-center [&_li>h4]:text-14-medium [&_li>span]:text-14-semibold">
          <li>
            <IoSpeedometerOutline size={40} />
            <h4>P E R F O R M A N C E</h4>
            <span>{data.performanceScore}/100</span>
          </li>
          <li>
            <IoAccessibilityOutline size={40} />
            <h4>A C C E S S I B I L I T Y</h4>
            <span>{data.accessibilityScore}/100</span>
          </li>
          <li className="!gap-0">
            <TbSeo size={40} />
            <h4>S E O</h4>
            <span>{data.seoScore}/100</span>
          </li>
          <li>
            <p className="text-20-bold">{data.overallScore}/100</p>
            <h4>O V E R A L L&nbsp;&nbsp;S C O R E</h4>
          </li>
        </ul>
      </div>
    </div>
  );
}
