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
    "개인 포트폴리오 웹사이트로, 저를 소개하고 프로젝트와 경험을 한눈에 볼 수 있도록 제작했습니다. 자기소개, 경력 및 기술, 그리고 작업물들을 정리하여 방문자가 제 역량을 쉽게 이해할 수 있도록 구성했습니다.",
  icons: {
    icon: "/favicon.ico",
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
