import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif, Syne } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Cursor } from "@/components/ui/Cursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abassibrahim.xyz"),
  title: "Abass Ibrahim | IT Specialist & Full-Stack Developer",
  description:
    "Portfolio of Abass Ibrahim — IT Support Specialist, Full-Stack Developer, UI/UX Designer, and Web3 Builder based in Lagos, Nigeria.",
  keywords: [
    "Abass Ibrahim",
    "Lagos developer",
    "Nigeria web developer",
    "IT Support Oil Gas",
    "Full-Stack React Next.js",
  ],
  openGraph: {
    title: "Abass Ibrahim | IT Specialist & Full-Stack Developer",
    description:
      "Portfolio of Abass Ibrahim — IT Support Specialist, Full-Stack Developer, UI/UX Designer, and Web3 Builder based in Lagos, Nigeria.",
    type: "website",
    images: ["/images/abass.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abass Ibrahim | IT Specialist & Full-Stack Developer",
    description:
      "Portfolio of Abass Ibrahim — IT Support Specialist, Full-Stack Developer, UI/UX Designer, and Web3 Builder based in Lagos, Nigeria.",
    images: ["/images/abass.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="abass-theme"
        >
          <a
            href="#main"
            className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-xs bg-accent px-3 py-2 font-mono text-[12px] uppercase tracking-[0.22em] text-bg transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

