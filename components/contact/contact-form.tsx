import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ContactForm = () => {
  return (
    <form className="w-full p-4 md:p-8 flex flex-col gap-32 md:gap-0 rounded-2xl h-auto md:h-[680px] justify-between items-center col-span-2 bg-le-purple">
      <div className="flex items-start gap-1.5 flex-col">
        <p className="text-3xl md:text-[32px] font-semibold -tracking-[0.96px] leading-normal text-white">
          Contact Me
        </p>
        <span className="text-base md:text-lg font-medium -tracking-[0.54px] leading-normal text-[#E9E9E9]">
          Get an inside look at the edits, stories, and moments that shaped each
          frame.
        </span>
      </div>
      <div className="w-full grid gap-1.5">
        <Input
          type="text"
          placeholder="Name"
          className="px-4 py-3 rounded-4xl text-sm md:text-base leading-normal -tracking-[0.48px] placeholder:text-[#61616B] bg-[#E0DFEC]!"
          required
        />
        <Input
          type="email"
          placeholder="Email Adresss"
          className="px-4 py-3 rounded-4xl text-sm md:text-base leading-normal -tracking-[0.48px] placeholder:text-[#61616B] bg-[#E0DFEC]!"
          required
        />
        <Textarea
          placeholder="Your Message"
          className="px-4 py-3 rounded-4xl text-sm md:text-base leading-normal -tracking-[0.48px] placeholder:text-[#61616B] h-40 bg-[#E0DFEC]! resize-none"
          required
        />
        <Button
          variant="secondary"
          className="py-4 px-8 bg-[#2A2936]! dark:text-white! w-full h-14"
        >
          Send message
        </Button>
      </div>
    </form>
  );
};
