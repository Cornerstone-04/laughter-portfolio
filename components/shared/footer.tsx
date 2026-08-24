import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-10 self-stretch px-6 shadow-lg shadow-black/8 lg:px-20 dark:shadow-black/30">
      <div className="relative mx-auto flex max-w-360 items-center justify-center overflow-hidden rounded-t-4xl px-6 py-10 shadow-[0_-24px_80px_rgba(42,41,54,0.12)] sm:rounded-t-[2.5rem] sm:py-16 md:h-160 dark:shadow-[0_-24px_80px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 -z-10 dark:bg-[#131316]">
          <Image
            src="/images/mesh-gradient.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1536px) calc(100vw - 5rem), 1440px"
            className="shrink-0 object-cover object-[70%_70%] mix-blend-color md:object-center"
          />
        </div>
        <div className="mx-auto flex w-full max-w-268 flex-col items-center gap-10 md:gap-22.5">
          {/* Top block */}
          <div className="flex w-full flex-col items-center justify-start gap-6 sm:gap-8">
            <div className="flex flex-col items-center gap-3 self-stretch text-center sm:gap-4">
              <h1 className="text-4xl leading-normal text-[#2a2938] sm:text-6xl md:text-8xl md:tracking-[-2.88px] dark:text-white">
                Laughter Ephraim
              </h1>
              <p className="text-base leading-normal font-medium tracking-[-0.4px] text-[#454545] sm:text-lg md:text-xl dark:text-[#cacaca]">
                Have any project in mind? Let&apos;s have a quick call.
              </p>
            </div>

            <Button
              variant="primary"
              asChild
              className="flex h-12 w-full items-center justify-center px-6 py-3 text-base font-medium sm:h-14 sm:w-fit sm:px-8 sm:py-4"
            >
              <Link
                href="https://calendar.app.google/f4RhQrpnjYe2uv6y5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </Link>
            </Button>
          </div>
          {/* Bottom row */}
          <div className="flex w-full flex-col items-center justify-center gap-3 text-center sm:gap-4 md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-base font-medium tracking-[-0.48px] text-[#464554] dark:text-white">
              Designed by{" "}
              <Link
                href="https://linktr.ee/ToluwalopeAdebunmi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-le-purple underline dark:text-[#cacaca]"
              >
                Tolu Adebunmi
              </Link>
            </p>
            <p className="flex items-center text-base font-medium tracking-[-0.48px] text-white dark:text-white">
              <span className="text-2xl">&copy;</span>
              {currentYear}. All rights reserved
            </p>
            <p className="text-base font-medium tracking-[-0.48px] text-white dark:text-white">
              Developed by{" "}
              <Link
                href="https://cornerstoneephraim.vercel.app/"
                rel="noopener noreferrer"
                target="_blank"
                className="underline dark:text-[#cacaca]"
              >
                Cornerstone
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
