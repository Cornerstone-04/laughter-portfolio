import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          "TV Series",
          "Feature Film",
          "Short Film",
          "Web Series",
          "Documentary",
          "Documentary Series",
          "Reality TV",
          "Commercial",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "production", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "year", type: "number", validation: (rule) => rule.required().min(1900) }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "synopsis", type: "text", rows: 5 }),
    defineField({
      name: "image",
      title: "Poster / image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imagePath",
      title: "Existing image path",
      type: "string",
      description: "Use this only before uploading the image to Sanity, e.g. /works/ENAKHE.jpg.",
    }),
    defineField({
      name: "link",
      title: "Preview link",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "previewTitle", title: "Preview link label", type: "string" }),
    defineField({ name: "featured", title: "Show on homepage", type: "boolean", initialValue: false }),
    defineField({
      name: "featuredOrder",
      title: "Homepage order",
      type: "number",
      hidden: ({ document }) => !document?.featured,
    }),
  ],
  orderings: [
    { title: "Year, newest first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
    {
      title: "Featured order",
      name: "featuredOrder",
      by: [{ field: "featuredOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "production", media: "image" },
  },
});
