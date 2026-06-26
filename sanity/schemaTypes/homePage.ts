import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroIntro",
      title: "Hero intro",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero CTA label",
      type: "string",
      initialValue: "Get in touch",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero CTA link",
      type: "string",
      initialValue: "/#contact-me",
    }),
    defineField({
      name: "gallery",
      title: "Hero gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "quoteText",
      title: "Favorite quote",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "quoteAttribution",
      title: "Quote attribution",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
