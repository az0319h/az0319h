import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Space_Grotesk } from "next/font/google";

import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserProvider } from "@/context/UserContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomeMetaData");
  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: t("openGraph.url"),
      siteName: t("openGraph.siteName"),
      images: [
        {
          url: "/seo.png",
          width: 1200,
          height: 630,
          alt: t("openGraph.imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: ["/seo.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} flex flex-col min-h-screen  px-5`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NotificationProvider>
            <UserProvider>
              <Header />
              <div className="flex-1  w-full py-5 md:py-10 lg:py-14 max-w-screen-lg mx-auto">
                {children}
              </div>
              <Footer />
            </UserProvider>
          </NotificationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
