import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { dmSans, instrumentSerif } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior opts in to the stylesheet's smooth scrolling for in-page links.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
