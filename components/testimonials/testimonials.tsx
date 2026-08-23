"use client";

import { useEffect, useRef, useState } from "react";
import testimonials from "@/data/testimonials.json";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  containerVariants,
  contentVariants,
  imageVariants,
} from "../../lib/testimonial-variants";
import type { TestimonialItem } from "@/sanity/lib/portfolio-data";

type Props = {
  items?: TestimonialItem[];
};

export const Testimonials = ({ items }: Props) => {
  const testimonialItems = items?.length ? items : testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const len = testimonialItems.length;
  const shouldReduceMotion = useReducedMotion();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const safeClear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === len - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? len - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Autoplay effect
  useEffect(() => {
    if (shouldReduceMotion || paused) return;

    const run = () => {
      safeClear();
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === len - 1 ? 0 : prev + 1));
      }, 5000);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        safeClear();
      } else {
        run();
      }
    };

    run();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      safeClear();
    };
  }, [len, paused, shouldReduceMotion]);

  const pauseThen = (fn: () => void) => {
    setPaused(true);
    safeClear();
    fn();
    // give a small delay before resuming autoplay so it doesn’t jump immediately
    const resumeId = setTimeout(() => setPaused(false), 2000);
    return () => clearTimeout(resumeId);
  };

  const goToNext = () => pauseThen(next);
  const goToPrevious = () => pauseThen(prev);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.75 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          shouldReduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.9 }
        }
        transition={{
          duration: 0.22,
          delay: shouldReduceMotion ? 0 : i * 0.045,
          ease: "easeOut",
        }}
        className="inline-flex"
      >
        <Star
          className={`h-6 w-6 ${
            i < rating
              ? "fill-[#D0BB1C] text-[#D0BB1C]"
              : "fill-[#D9D9D9] text-[#D9D9D9]"
          }`}
        />
      </motion.span>
    ));

  const currentTestimonial = testimonialItems[currentIndex];

  return (
    <section
      className="flex w-full flex-col items-center justify-center self-stretch p-6 sm:p-8 md:p-16 dark:bg-[#15151E]"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="flex w-full max-w-268 flex-col items-center gap-11">
        {/* header */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="text-3xl leading-normal font-semibold tracking-[-1.44px] text-[#2A2936] md:text-5xl dark:text-white">
            What my clients have to say
          </h2>
          <p className="w-full max-w-119.25 text-center text-base leading-normal tracking-[-0.54px] text-[#454545] md:text-lg dark:text-[#CACACA]">
            Notes from collaborators who trusted Laughter with the pace, rhythm,
            and emotional shape of their stories.
          </p>
        </div>

        {/* card */}
        <div className="flex max-w-200 flex-col items-stretch gap-6 overflow-hidden rounded-2xl bg-white lg:h-100 lg:flex-row">
          {/* Image */}
          <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-72 md:h-80 lg:h-full lg:max-w-79">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial.id || currentIndex}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.3 },
                      }
                }
                className="h-full w-full"
              >
                <Image
                  src={currentTestimonial.image}
                  alt={`${currentTestimonial.name} testimonial`}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 316px"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="flex w-full flex-1 px-6 py-6 lg:max-w-115 lg:pr-6 lg:pl-0">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`content-${currentTestimonial.id || currentIndex}`}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-start gap-6 lg:justify-between"
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }
                }
              >
                {/* Stars */}
                <motion.div
                  variants={contentVariants}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }
                  }
                  className="flex gap-0.5"
                >
                  {renderStars(currentTestimonial.rating)}
                </motion.div>

                {/* Quote */}
                <motion.p
                  variants={contentVariants}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }
                  }
                  className="text-xl leading-normal font-medium tracking-[-0.48px] text-[#2A2936]"
                >
                  &quot;{currentTestimonial.quote}&quot;
                </motion.p>

                {/* Author */}
                <motion.div
                  variants={contentVariants}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }
                  }
                  className="flex flex-col items-start gap-0.5"
                >
                  <h4 className="text-lg font-semibold tracking-[-0.36px] text-[#454545]">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm font-medium tracking-[-0.28px] text-[#595959]">
                    {currentTestimonial.title}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* footer controls */}
        <div className="flex w-full max-w-200 items-center justify-between">
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonialItems.map((_, index) => (
              <button
                key={index}
                onClick={() => pauseThen(() => goToSlide(index))}
                className={`h-1.5 w-4 cursor-pointer rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#4F46E5]"
                    : index === currentIndex + 1 ||
                        (currentIndex === testimonialItems.length - 1 &&
                          index === 0)
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
              onClick={() => pauseThen(goToPrevious)}
              className="flex size-14 items-center justify-center rounded-xl bg-[#DBD9FF] p-4 transition-colors duration-200 hover:bg-[#9d98f5]"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="size-6 text-[#4F46E5]" />
            </Button>
            <Button
              onClick={() => pauseThen(goToNext)}
              className="flex size-14 items-center justify-center rounded-xl bg-[#4F46E5] transition-colors duration-200 hover:bg-[#4F46E5]/90"
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
