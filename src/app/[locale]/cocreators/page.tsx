import { readAllCocreators } from "@/api/readAllCocreators.action";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function CocreatorsPage() {
  const cocreators = await readAllCocreators();
  const t = await getTranslations("CocreatorsPage");
  return (
    <div className="max-w-258.75 mx-auto">
      <h1 className="text-16-semibold md:text-20-semibold mb-10 sm:mb-15 md:mb-20">
        {t("title")}
      </h1>

      {cocreators.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-20 sm:gap-x-5 sm:gap-y-30 lg:gap-x-[5vw] lg:gap-y-40 md:gap-x-[20vw]">
          {cocreators.map((c) => (
            <li key={c.id} className="group">
              <a
                href={c.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.name}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={c.imageUrl || "not found"}
                    alt={c.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    unoptimized
                    className="
                      object-cover w-full h-full
                      filter
                      grayscale-[40%] contrast-[1.15] brightness-[0.9]
                      transition-all duration-500
                      group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100
                    "
                  />

                  {/* hover 시 이름 노출 오버레이 */}
                  <div
                    className="
                      absolute inset-0
                      flex items-end justify-center
                      bg-gradient-to-t from-black/60 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      p-3
                    "
                  >
                    <span className="text-white text-12-medium sm:text-14-medium lg:text-16-medium">
                      {c.name}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
