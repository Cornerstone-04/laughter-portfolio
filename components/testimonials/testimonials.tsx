"use client";

import { useState } from "react";
import testimonials from "@/data/testimonials.json";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => setCurrentIndex(index);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${
          i < rating
            ? "fill-[#D0BB1C] text-[#D0BB1C]"
            : "fill-[#D9D9D9] text-[#D9D9D9]"
        }`}
      />
    ));

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="w-full p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center self-stretch dark:bg-[#15151E]"
      id="testimonials"
    >
      <div className="w-full max-w-[1072px] flex flex-col items-center gap-11">
        {/* header */}
        <div className="text-center flex flex-col items-center gap-1">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#2A2936] dark:text-white leading-normal -tracking-[1.44px]">
            What my clients have to say
          </h2>
          <p className="text-base md:text-lg -tracking-[0.54px] leading-normal text-[#454545] dark:text-[#CACACA] w-full max-w-[477px] text-center">
            Get an inside look at the edits, stories, and moments that shaped
            each frame. Dive into my world of cinematic storytelling.
          </p>
        </div>

        {/* card */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 max-w-[800px] bg-white rounded-2xl overflow-hidden lg:h-[400px]">
          <div className="flex-shrink-0 w-full lg:max-w-[316px] h-56 sm:h-72 md:h-80 lg:h-full overflow-hidden">
            <Image
              src={currentTestimonial.image}
              alt={`${currentTestimonial.name} testimonial`}
              width={640}
              height={800}
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 316px"
              priority={currentIndex === 0}
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 w-full lg:max-w-[460px] px-6 lg:pl-0 py-6 lg:pr-6">
            <div className="flex flex-col items-start gap-6 lg:justify-between">
              {/* Stars */}
              <div className="flex gap-0.5">
                {renderStars(currentTestimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-xl  font-medium text-[#2A2936] leading-normal -tracking-[0.48px]">
                &quot;{currentTestimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex flex-col items-start gap-0.5">
                <h4 className="text-lg font-semibold text-[#454545] -tracking-[0.36px]">
                  {currentTestimonial.name}
                </h4>
                <p className="text-[#595959] font-medium -tracking-[0.28px] text-sm">
                  {currentTestimonial.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* footer controls */}
        <div className="flex items-center justify-between w-full max-w-[800px]">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "w-8 bg-[#4F46E5]"
                    : index === currentIndex + 1 ||
                      (currentIndex === testimonials.length - 1 && index === 0)
                    ? "bg-[#9D98F5]"
                    : "bg-[#DBD9FF]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <Button
              onClick={goToPrevious}
              className="size-14 p-4 rounded-xl bg-[#DBD9FF] hover:bg-[#9d98f5] flex items-center justify-center transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="size-6 text-[#4F46E5]" />
            </Button>
            <Button
              onClick={goToNext}
              className="size-14 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 flex items-center justify-center transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ArrowRight className="size-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
