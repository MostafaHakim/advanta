import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layouts/ClientLayoutWrapper";
import { ToastContainer } from "react-toastify";
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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NWP7GGLP');`,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-white text-gray-900 overflow-x-hidden w-screen`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <ToastContainer />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWP7GGLP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  );
}
