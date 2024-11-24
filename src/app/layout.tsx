import type { Metadata } from "next";
import { UserProvider } from "@/utils/contexts";
import Header from "@/components/Header";
import LogInWrapper from "@/components/LogInWrapper/page";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Recipe Finder",
  description: "Generate and find recipes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Header />
        <UserProvider>
          <LogInWrapper>{children}</LogInWrapper>
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}
