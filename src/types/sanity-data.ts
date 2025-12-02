import type { Image } from "sanity";

type LocalizedString = {
  pl: string;
  en: string;
  de: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  fullName: string;
  role: LocalizedString;
  phone: string;
  email: string;
  photoFront: Image;
  photoBack: Image;
};