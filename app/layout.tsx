import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "GIFLIF Fest — We build cultural IPs. For brands. And our own.",
  description:
    "GIFLIF Fest is a creative consultancy that builds cultural IPs — for our clients, and for ourselves. Home of The Great Indian Film & Literature Festival and Indiestaan Music Festival.",
  metadataBase: new URL("https://giflif.in"),
  openGraph: {
    title: "GIFLIF Fest",
    description:
      "We build cultural IPs. For brands. And our own. Creative consultancy · Audience Intelligence · Production.",
    url: "https://giflif.in",
    siteName: "GIFLIF Fest",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        {children}
      </body>
    </html>
  );
}
