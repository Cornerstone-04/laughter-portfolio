import Image from "next/image";

export function FavouriteQuote() {
  return (
    <section className="relative isolate overflow-hidden w-full min-h-screen flex items-center justify-center text-center p-4 md:p-6">
      {/* AURORA BACKGROUND */}
      {/* <div
        aria-hidden
        className="absolute inset-0 -z-10"
      /> */}
      <div className="pointer-events-none absolute inset-0 -z-10 blur-in bg-gradient-to-br from-[#ffffff63] via-[#ff421861] to-[#4e46e572] animate-gradient bg-[length:200%_200%]">
        <Image
          src="/images/gradient.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_70%] md:object-center"
        />
      </div>
      <div className="mx-auto w-full max-w-[784px] flex flex-col items-center justify-center gap-6 md:gap-8">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
          {/* Opening Quote */}
          <div className="py-4 md:py-6 px-3 md:px-4 flex items-center justify-center">
            <Image
              src="/icons/quote.svg"
              alt="quote icon"
              width={40}
              height={32}
              className="md:w-[70px] md:h-[55px] -scale-x-[1]"
            />
          </div>
          {/* Quote Text */}
          <h2 className="text-pretty text-2xl md:text-[44px] font-medium leading-snug md:leading-[normal] -tracking-[1.32px] text-white">
            The essence of cinema is editing. It&apos;s the combination of what
            can be extraordinary images of people during emotional moments, or
            images in a general sense, put together in a kind of alchemy.
          </h2>
          {/* Closing Quote */}
          <div className="py-4 md:py-6 px-3 md:px-4 flex items-center justify-center">
            <Image
              src="/icons/quote.svg"
              alt="quote icon"
              width={40}
              height={32}
              className="md:w-[70px] md:h-[55px]"
            />
          </div>
        </div>
        {/* Attribution */}
        <p className="text-lg md:text-2xl font-medium text-white mt-6 md:mt-8">
          ~ Francis Ford Coppola
        </p>
      </div>
    </section>
  );
}
