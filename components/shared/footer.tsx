import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-10 sm:py-16 flex items-center justify-center self-stretch relative overflow-hidden mt-[40px] px-6 sm:px-6 md:h-[640px]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/mesh-gradient.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_70%] md:object-center mix-blend-multiply shrink-0"
        />
      </div>
      <div className="w-full max-w-[1072px] flex flex-col md:gap-[90px] gap-10 items-center mx-auto">
        {/* Top block */}
        <div className="flex flex-col items-center justify-start gap-6 sm:gap-8 w-full">
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 self-stretch">
            <h1 className="text-4xl sm:text-6xl md:text-8xl leading-normal md:-tracking-[2.88px] text-[#2a2938]">
              Laughter Ephraim
            </h1>
            <p className="text-base sm:text-lg md:text-xl -tracking-[0.4px] leading-normal font-medium text-[#454545]">
              Have any project in mind? Let&apos;s have a quick call.
            </p>
          </div>

          <Button
            variant="primary"
            className="h-12 sm:h-14 w-full sm:w-fit px-6 sm:px-8 py-3 sm:py-4 text-base flex items-center justify-center font-medium"
          >
            Book a call
          </Button>
        </div>
        {/* Bottom row */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-[#464554] font-medium -tracking-[0.48px] text-base">
            Designed by{" "}
            <Link
              href="https://instagram.com/devdesigntolu"
              className="text-le-purple"
            >
              devdesigntolu
            </Link>
          </p>
          <p className="text-white font-medium -tracking-[0.48px] text-base flex items-center">
            <span className="text-2xl">&copy;</span>
            {currentYear}. All rights reserved
          </p>
          <p className="text-white font-medium -tracking-[0.48px] text-base">
            Developed by{" "}
            <Link
              href="https://linkedin.com/in/cornerstone-ephraim"
              className="text-le-text"
            >
              Cornerstone
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
