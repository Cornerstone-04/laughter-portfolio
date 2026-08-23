"use client";

import { useContactForm } from "@/hooks/useContactForm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type Props = {
  heading?: string;
  intro?: string;
};

export const ContactForm = ({ heading = "Contact Me", intro }: Props) => {
  const { onSubmit, sending, status, message } =
    useContactForm<HTMLFormElement>({
      clearAfterMs: 4000,
    });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="col-span-2 flex h-auto w-full flex-col items-center justify-between gap-32 rounded-2xl bg-le-purple p-4 md:h-170 md:gap-0 md:p-8"
    >
      <div className="flex flex-col items-start gap-1.5">
        <p className="text-3xl leading-normal font-semibold tracking-[-0.96px] text-white md:text-[32px]">
          {heading}
        </p>
        <span className="text-base leading-normal font-medium tracking-[-0.54px] text-[#E9E9E9] md:text-lg">
          {intro ??
            "Get an inside look at the edits, stories, and moments that shaped each frame."}
        </span>
      </div>
      <div className="grid w-full gap-1.5">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          className="rounded-4xl bg-[#E0DFEC]! px-4 py-3 text-sm leading-normal tracking-[-0.48px] placeholder:text-[#61616B] md:text-base"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          className="rounded-4xl bg-[#E0DFEC]! px-4 py-3 text-sm leading-normal tracking-[-0.48px] placeholder:text-[#61616B] md:text-base"
          required
        />
        <Textarea
          name="message"
          placeholder="Your Message"
          className="h-40 resize-none rounded-4xl bg-[#E0DFEC]! px-4 py-3 text-sm leading-normal tracking-[-0.48px] placeholder:text-[#61616B] md:text-base"
          required
        />
        {message && (
          <p
            className={[
              "rounded-4xl px-4 py-3 text-sm leading-normal font-medium tracking-[-0.42px]",
              status === "success"
                ? "bg-white/15 text-white"
                : "bg-[#FF4318]/20 text-white",
            ].join(" ")}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message}
          </p>
        )}
        <Button
          type="submit"
          variant="secondary"
          className="h-14 w-full bg-[#2A2936]! px-8 py-4 dark:text-white!"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
};
