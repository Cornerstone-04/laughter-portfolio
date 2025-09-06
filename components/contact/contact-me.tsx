import Link from "next/link";
import socials from "@/data/socials.json";
import { ArrowUpRight, Copy } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "./contact-form";

export const ContactMe = () => {
  return (
    <section
      className="w-full p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center self-stretch"
      id="contact-me"
    >
      <div className="w-full max-w-[1072px] grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-4">
        <div className="w-full h-auto md:h-[680px] shrink-0 rounded-2xl hidden md:flex justify-center items-center col-span-2 overflow-hidden">
          <Image
            src="/images/contact.jpg"
            alt="contact form banner image"
            width={524}
            height={680}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <ContactForm />
        {socials.map(({ id, label, link }) => (
          <Link
            key={`${label} - ${id}`}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex justify-between items-center -tracking-[0.48px] p-6 h-14 rounded-4xl bg-[#E6E5F0] hover:bg-[#E6E5F0]/80 text-[#160F8A] text-base font-medium leading-normal"
            style={{ flex: "1 0 0" }}
          >
            <span>{label}</span>
            {label === "Email" ? (
              <Copy className="size-6" />
            ) : (
              <ArrowUpRight className="size-6" />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
};
