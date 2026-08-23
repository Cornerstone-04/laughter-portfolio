import Image from "next/image";

type Props = {
  text?: string;
  attribution?: string;
};

export function FavouriteQuote({
  text = "The essence of cinema is editing. It's the combination of what can be extraordinary images of people during emotional moments, or images in a general sense, put together in a kind of alchemy.",
  attribution = "Francis Ford Coppola",
}: Props) {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden p-4 text-center md:p-6">
      {/* AURORA BACKGROUND */}
      <div className="animate-gradient pointer-events-none absolute inset-0 -z-10 bg-[#F9F9FB] bg-size-[200%_200%] blur-in dark:bg-[#15151d]">
        <Image
          src="/images/gradient.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_70%] md:object-center"
        />
      </div>
      <div className="mx-auto flex w-full max-w-196 flex-col items-center justify-center gap-6 md:gap-8">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
          {/* Opening Quote */}
          <div className="flex items-center justify-center px-3 py-4 md:px-4 md:py-6">
            <Image
              src="/icons/quote.svg"
              alt="quote icon"
              width={40}
              height={32}
              className="scale-x-[-1] md:h-13.75 md:w-17.5"
            />
          </div>
          {/* Quote Text */}
          <h2 className="text-2xl leading-snug font-medium tracking-[-1.32px] text-pretty text-white md:text-[44px] md:leading-[normal]">
            {text}
          </h2>
          {/* Closing Quote */}
          <div className="flex items-center justify-center px-3 py-4 md:px-4 md:py-6">
            <Image
              src="/icons/quote.svg"
              alt="quote icon"
              width={40}
              height={32}
              className="md:h-13.75 md:w-17.5"
            />
          </div>
        </div>
        {/* Attribution */}
        <p className="mt-6 text-lg font-medium text-white md:mt-8 md:text-2xl">
          ~ {attribution}
        </p>
      </div>
    </section>
  );
}
