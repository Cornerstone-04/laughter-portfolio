import Link from "next/link";
import socials from "@/data/socials.json";
import { ArrowUpRight, Copy } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "./contact-form";
import type { SiteSettings } from "@/sanity/lib/portfolio-data";

type Props = {
  settings?: SiteSettings;
};

export const ContactMe = ({ settings }: Props) => {
  const links = settings?.socials?.length ? settings.socials : socials;

  return (
    <section
      className="flex w-full flex-col items-center justify-center self-stretch p-6 sm:p-8 md:p-16"
      id="contact-me"
    >
      <div className="grid w-full max-w-268 grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-6">
        <div className="col-span-2 hidden h-auto w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl md:flex md:h-170">
          <Image
            src="/images/contact.jpg"
            alt="contact form banner image"
            width={524}
            height={680}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <ContactForm
          heading={settings?.contactHeading}
          intro={settings?.contactIntro}
        />
        {links.map(({ id, label, link }) => (
          <Link
            key={`${label} - ${id}`}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 items-center justify-between rounded-4xl bg-[#E6E5F0] p-6 text-base leading-normal font-medium tracking-[-0.48px] text-[#160F8A] hover:bg-[#E6E5F0]/80"
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
