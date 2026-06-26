import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "contactHeading", title: "Contact heading", type: "string" }),
    defineField({ name: "contactIntro", title: "Contact intro", type: "text", rows: 3 }),
    defineField({ name: "email", type: "email" }),
    defineField({ name: "bookingLink", title: "Booking link", type: "url" }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({
              name: "link",
              type: "url",
              validation: (rule) =>
                rule.uri({ scheme: ["http", "https", "mailto", "tel"] }).required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "link" } },
        }),
      ],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "Open Graph image", type: "image" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
