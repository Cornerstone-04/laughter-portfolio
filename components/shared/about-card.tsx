import { FC } from "react";

type AboutCardProps = {
  id: number;
  color: string;
  title: string;
  description: string;
};

export const AboutCard: FC<AboutCardProps> = ({
  id,
  color,
  title,
  description,
}) => {
  return (
    <div
      key={id}
      className="rounded-2xl text-white p-[34px] flex justify-center items-center"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <span className="text-5xl sm:text-6xl md:text-[64px] font-medium leading-normal tracking-[-1.92px]">
          {String(id).padStart(2, "0")}
        </span>
        <div className="space-y-4">
          <h3 className="text-white font-semibold leading-normal -tracking-[0.72px] text-xl sm:text-2xl">
            {title}
          </h3>
          <p className="text-white/90 text-base sm:text-lg font-medium tracking-[-0.54px] leading-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
