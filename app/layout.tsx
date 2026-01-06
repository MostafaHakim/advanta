import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layouts/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Digital Marketing Agency | Grow Your Business Online",
    template: "%s | NextMarketing",
  },
  description:
    "Premier digital marketing agency specializing in SEO, Social Media Marketing, PPC, and Web Development. Boost your online presence with our expert team.",
  keywords: [
    "digital marketing",
    "seo",
    "social media marketing",
    "web development",
    "ppc",
  ],
  authors: [{ name: "NextMarketing Agency" }],
  creator: "NextMarketing",
  publisher: "NextMarketing Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nextmarketing.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextmarketing.vercel.app",
    title: "Digital Marketing Agency | Grow Your Business Online",
    description:
      "Premier digital marketing agency specializing in SEO, Social Media Marketing, PPC, and Web Development.",
    siteName: "NextMarketing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NextMarketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency | Grow Your Business Online",
    description:
      "Premier digital marketing agency specializing in SEO, Social Media Marketing, PPC, and Web Development.",
    images: ["/twitter-image.png"],
    creator: "@nextmarketing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth overflow-x-hidden"
      suppressHydrationWarning={true}
    >
      <body
        className={`${inter.className} bg-white text-gray-900 overflow-x-hidden w-screen`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
