import type { Metadata } from "next";
// ==================work pending=============
export const metadata: Metadata = {
  title: "Contact Us | Get in Touch",
  description:
    "Ready to transform your digital presence? Get in touch with our team for a free consultation and discover how we can help your business grow.",
  keywords: [
    "contact",
    "digital marketing consultation",
    "business growth",
    "marketing inquiry",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Digital Marketing Agency",
    description: "Get in touch for a free consultation",
    type: "website",
    url: "https://www.advantascale.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
