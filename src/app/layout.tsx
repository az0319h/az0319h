import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserProvider } from "@/context/UserContext";
import { NotificationProvider } from "@/context/NotificationContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hong Sunghoon - Web Developer Portfolio",
  description:
    "A personal portfolio website designed to introduce myself and showcase my projects and experiences at a glance. It organizes my background, skills, and work to help visitors easily understand my capabilities.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Hong Sunghoon - Web Developer Portfolio",
    description:
      "Personal portfolio website showcasing my profile, projects, and experiences in one place.",
    url: "https://madebyhshfolio.site/",
    siteName: "Hong Sunghoon Portfolio",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Site Preview Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hong Sunghoon - Web Developer Portfolio",
    description:
      "Personal portfolio website showcasing my profile, projects, and experiences in one place.",
    images: ["/seo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${poppins.className} flex flex-col min-h-screen  px-5`}>
        <NotificationProvider>
          <UserProvider>
            <Header />
            <div className="flex-1  w-full py-5 md:py-10 lg:py-14 max-w-screen-lg mx-auto">
              {children}
            </div>

            <Footer />
          </UserProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
