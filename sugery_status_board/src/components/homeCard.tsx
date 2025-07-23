import { ReactHTMLElement, ReactNode } from "react";

export default function HomeCard({
  Icon,
  header,
  desc,
  key,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  header: string;
  desc: string;
  key: string;
}) {
  return (
    <article className="flex mx-auto flex-col rounded-lg space-y-1 shadow justify-center sm:w-[20vw] w-[45vw] px-4 sm:px-6 py-2 items-center">
      <div className="bg-accentSub w-8 h-8  flex justify-center items-center rounded-full">
        <Icon className="p-2 text-accentMain sm:size-16 size-12 stroke-accentMain stroke-2 " />
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        <h2 className="sm:font-semibold font-medium capitalise text-center">
          {/* Real-time status tracking */}
          {header}
        </h2>
        <p className=" text-center text-gray-600">
          {/* Monitor ptient status through each surgical state with live updates{" "} */}
          {desc}
        </p>
      </div>
    </article>
  );
}
