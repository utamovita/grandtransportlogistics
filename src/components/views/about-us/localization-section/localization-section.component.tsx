import styles from "./localization-section.module.scss";
import { useTranslation } from "next-i18next";
import officeImage from "public/assets/images/aboutUs/office.jpg";
import Image from "next/image";
import { Container, FlexComponent } from "@design-system/layout/utilities";
import { PinIcon } from "@components/shared/icons/pin.icon";
import { ButtonLink } from "@components/shared/button/button-link.component";
import { GoogleMap } from "@components/views/about-us/localization-section/google-map/google-map.component";

function LocalizationSection() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <GoogleMap />

      <Container>
        <LocalizationBox />
      </Container>
    </div>
  );
}

export { LocalizationSection };

function LocalizationBox() {
  const { t } = useTranslation("common");
  return (
    <div className={styles.localizationBox}>
      <h2 className={styles.title}>{t("aboutUs.localization.title")}</h2>
      <p className={styles.text}>{t("aboutUs.localization.subtitle")}</p>
      <FlexComponent className={styles.officeAddress} alignItems={"alignCenter"}>
        <PinIcon className={styles.pinIcon} />
        <span>Brodnicka 4, 85-735 Bydgoszcz</span>
      </FlexComponent>

      <div className={styles.imageWrapper}>
        <Image
          alt="office image"
          src={officeImage}
          placeholder="blur"
          quality={90}
          width={1280}
          height={853}
          style={{
            objectFit: "cover",
          }}
          className={styles.localizationBoxImage}
        />

        <div className={styles.btnWrapper}>
          <ButtonLink to={"/galeria"} className={styles.localizationButton}>
            {t("aboutUs.localization.seeOffice")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
