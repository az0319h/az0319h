interface CoreBeliefItemProps {
  title: string;
  description: string;
}

export default function CoreBeliefItem({
  title,
  description,
}: CoreBeliefItemProps) {
  return (
    <li className="my-border flex items-center justify-between gap-6 py-5 md:py-6">
      <div className="flex flex-col gap-2 md:gap-3">
        <h3 className="text-primary-blue-200 text-18-medium sm:text-20-medium md:text-24-medium lg:text-28-medium sm:leading-7 md:leading-9 lg:leading-10">
          {title}
        </h3>
        <p className="w-fit text-14-medium sm:text-16-medium lg:text-18-medium leading-6 sm:leading-7 lg:leading-8">
          {description}
        </p>
      </div>
    </li>
  );
}
