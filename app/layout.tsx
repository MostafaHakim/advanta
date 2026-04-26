import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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

  metadataBase: new URL("https://www.advantascale.com/"),

  alternates: {
    canonical: "https://www.advantascale.com/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.advantascale.com",
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-gray-900 overflow-x-hidden`}
      >
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NWP7GGLP');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '871201332274380');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWP7GGLP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Facebook Pixel (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=871201332274380&ev=PageView&noscript=1"
          />
        </noscript>

        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        <ToastContainer />
      </body>
    </html>
  );
}
