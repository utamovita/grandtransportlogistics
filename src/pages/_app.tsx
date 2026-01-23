import { AppProps } from "next/app";
import "@design-system/styles/global.scss";
import { poppins } from "@design-system/fonts/poppins";
import { bebasNeue } from "@design-system/fonts/bebas-neue";
import { pd } from "@design-system/fonts/pd";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@components/shared/spinner/spinner.component";
import Head from "next/head";

NProgress.configure({ showSpinner: false });

function MaintenanceScreen() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999999,
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Head>
        <title>Strona w przebudowie | Under reconstruction</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Strona w przebudowie
      </h1>
      <h2 style={{ fontSize: "1.5rem", color: "#cccccc", fontWeight: "normal" }}>
        Website under reconstruction
      </h2>
      <p style={{ marginTop: "3rem", color: "#666666", fontSize: "0.9rem" }}>
        Grand Transport Logistics
      </p>
    </div>
  );
}

function App({ Component, pageProps }: AppProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const previewParam = params.get("preview");
        const sessionAccess = sessionStorage.getItem("gtl_preview_access");

        if (previewParam === "gtl_access" || sessionAccess === "true") {
          setIsAuthorized(true);
          if (previewParam === "gtl_access") {
            sessionStorage.setItem("gtl_preview_access", "true");
          }
        }
      }
      setIsChecking(false);
    };

    checkAccess();
  }, []);

  if (isChecking) {
    return <Spinner show={true} />;
  }

  if (!isAuthorized) {
    return <MaintenanceScreen />;
  }

  return (
    <>
      <style jsx global>
        {`
          :root {
            --fontFamilyPrimary: ${poppins.style.fontFamily};
            --fontFamilySecondary: ${pd.style.fontFamily};
            --fontFamilyTertiary: ${bebasNeue.style.fontFamily};
          }
        `}
      </style>
      <PageLoadingIndicator>
        <main>
          <Component {...pageProps} />
          <ToastContainer />
        </main>
      </PageLoadingIndicator>
    </>
  );
}

type PageLoadingIndicatorProps = {
  children: React.ReactNode;
};

function PageLoadingIndicator(props: PageLoadingIndicatorProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return <>{props.children}</>;
}

export default appWithTranslation(App);
