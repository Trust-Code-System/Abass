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
  title: "Abass Ibrahim | Full-Stack Developer & IT Specialist",
  description:
    "Portfolio of Abass Ibrahim — Full-Stack Developer, IT Support Specialist, and Web3 builder in Lagos, Nigeria. Seven shipped production apps across fintech, e-commerce, edtech, and HR.",
  applicationName: "Abass Ibrahim — Portfolio",
  authors: [{ name: "Abass Ibrahim", url: "https://abassibrahim.xyz" }],
  creator: "Abass Ibrahim",
  alternates: { canonical: "https://abassibrahim.xyz" },
  keywords: [
    "Abass Ibrahim",
    "Lagos developer",
    "Nigeria web developer",
    "IT Support Oil Gas",
    "Full-Stack React Next.js",
    "Next.js TypeScript developer",
    "Web3 builder Nigeria",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abass Ibrahim",
  jobTitle: "Full-Stack Developer & IT Support Specialist",
  url: "https://abassibrahim.xyz",
  email: "mailto:abassibrahim591@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://github.com/Lingz450",
    "https://www.linkedin.com/in/abass-ibrahim-devv",
    "https://hashnode.com/@ghost69",
    "https://medium.com/@Ghost69",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Web3",
    "IT Support",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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

