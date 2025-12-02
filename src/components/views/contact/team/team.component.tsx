import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Container } from "@design-system/layout/utilities";
import styles from "./team.module.scss";

// Icons
import { HomeIconColored } from "@components/views/contact/team/icons/home.icon";
import PhoneIconColored from "@components/views/contact/team/icons/phone.icon";
import ChatIconColored from "@components/views/contact/team/icons/chat.icon";

// Sanity
import { urlFor } from "@src/sanity/lib/image";
import { TeamMember } from "@customTypes/sanity-data";
import { Locale } from "@customTypes/pages";

type TeamProps = {
  members: TeamMember[];
};

function Team({ members }: TeamProps) {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const currentLocale = (locale as Locale) || "pl";

  // Helper to safely get image URL
  const getImageUrl = (source: any) => {
    return source ? urlFor(source).width(445).height(800).url() : "";
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>
          {t("contact.teamTitle1")}
          <span>{t("contact.teamTitle2")}</span>
        </h3>

        <div className={styles.team}>
          {members.map((item) => (
            <div key={item._id} className={styles.item}>
              <div className={styles.content}>
                <h4 className={styles.name}>{item.name}</h4>

                {/* Dynamic Localization from Sanity Object */}
                <h5 className={styles.role}>{item.role?.[currentLocale] || item.role?.pl}</h5>

                <ul className={styles.list}>
                  <li className={styles.element}>
                    <div className={styles.iconWrapper}>
                      <HomeIconColored />
                    </div>
                    {item.fullName}
                  </li>
                  <li className={styles.element}>
                    <div className={styles.iconWrapper}>
                      <PhoneIconColored />
                    </div>
                    {item.phone}
                  </li>
                  <li className={styles.element}>
                    <div className={styles.iconWrapper}>
                      <ChatIconColored />
                    </div>
                    <span className={styles.emailText}>
                      {item.email}
                      <span>@grandtransportlogistics.pl</span>
                    </span>
                  </li>
                </ul>

                <div className={styles.image}>
                  <Image
                    src={getImageUrl(item.photoFront)}
                    alt={`${item.name} - Front`}
                    width={445}
                    height={800}
                    style={{ objectFit: "cover" }}
                    className={styles.image1}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Image
                    src={getImageUrl(item.photoBack)}
                    alt={`${item.name} - Back`}
                    width={445}
                    height={800}
                    style={{ objectFit: "cover" }}
                    className={styles.image2}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export { Team };
