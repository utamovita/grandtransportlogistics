/** @type {import('next').NextConfig} */

import rewrites from "./next-config/rewrites.mjs";
import redirects from "./next-config/redirects.mjs";

/** @type import("next").I18NConfig */
const i18n = {
  defaultLocale: "pl",
  locales: ["en", "de", "pl"],
  domains: [
    {
      domain: "grandtransportlogistics.pl",
      defaultLocale: "pl",
    },
    {
      domain: "grandtransportlogistics.de",
      defaultLocale: "de",
    },
  ],
};

const nextConfig = {
  i18n,
  async rewrites() {
    return rewrites;
  },

  async redirects() {
    return redirects;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
