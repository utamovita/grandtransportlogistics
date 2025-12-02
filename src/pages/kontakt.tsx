import { BaseLayout } from "@design-system/layout/base-layout.component";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ContactView } from "@components/views/contact";
import { useTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import React from "react";
import { TeamMember } from "@src/types/sanity-data";
import { client } from "@src/sanity/lib/client";
import { groq } from "next-sanity";

type ContactPageProps = {
  teamMembers: TeamMember[];
};

export default function ContactPage({ teamMembers }: ContactPageProps) {

  const { t } = useTranslation("common");

  return (
    <>
      <NextSeo title={t("seo.contact.title")} description={t("seo.contact.description")} />
      <BaseLayout>
        <ContactView teamMembers={teamMembers}/>
      </BaseLayout>
    </>
  );
}

const teamQuery = groq`
  *[_type == "teamMember"] | order(orderRank asc) {
    _id,
    name,
    fullName,
    role,
    phone,
    email,
    photoFront,
    photoBack
  }
`;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const teamMembers = await client.fetch<TeamMember[]>(teamQuery);

  return {
    props: {
      teamMembers,
      ...(await serverSideTranslations(locale as string, ["common", "validation", "forms"])),
    },
    revalidate: 60,
  };
}
