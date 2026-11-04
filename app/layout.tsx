import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ssaammiiii.github.io"),
  title: "Samia Soleimani",
  description:
    "Computer engineering graduate, University of Ghana. Wearable sensing, edge AI and assistive technology. Creator of SignSpeak, sensor gloves that turn Ghanaian Sign Language into speech.",
  openGraph: {
    title: "Samia Soleimani",
    description: "Wearable sensing and the machine learning behind it, with a focus on assistive technology.",
    images: ["/samia.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf1f0" },
    { media: "(prefers-color-scheme: dark)", color: "#091315" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body className="grain min-h-[100dvh]">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
