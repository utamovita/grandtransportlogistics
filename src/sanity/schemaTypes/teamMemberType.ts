import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team",
  type: "document",
  icon: UsersIcon,
  fields: [
    orderRankField({ type: "teamMember" }),
    defineField({
      name: "name",
      title: "Imię",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Imię i nazwisko",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rola",
      type: "object",
      fields: [
        defineField({ name: "pl", type: "string", title: "PL" }),
        defineField({ name: "en", type: "string", title: "EN" }),
        defineField({ name: "de", type: "string", title: "DE" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email prefiks (np. 'j.nowak')",
      type: "string",
      description: "Nie podawaj całego adresu email, tylko prefiks przed @",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photoFront",
      title: "Zdjęcie Przód (AI)",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photoBack",
      title: "Zdjęcie Tył (Normalne)",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    })
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "role.pl",
      media: "photoFront",
    },
  },
});