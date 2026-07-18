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
      className="flex items-center justify-center rounded-2xl p-8.5 text-white"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <span className="text-5xl leading-normal font-medium tracking-[-1.92px] sm:text-6xl md:text-[64px]">
          {String(id).padStart(2, "0")}
        </span>
        <div className="space-y-4">
          <h3 className="text-xl leading-normal font-semibold tracking-[-0.72px] text-white sm:text-2xl">
            {title}
          </h3>
          <p className="text-base leading-normal font-medium tracking-[-0.54px] text-white/90 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
