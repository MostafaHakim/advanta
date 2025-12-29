import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Our Successful Projects",
  description:
    "Explore our portfolio of successful digital marketing campaigns and web development projects.",
  keywords: [
    "portfolio",
    "digital marketing",
    "case studies",
    "web development",
  ],
  openGraph: {
    title: "Portfolio | Digital Marketing Agency",
    description: "Our successful projects and case studies",
    type: "website",
    url: "https://yourdomain.com/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Our Successful Projects",
    description:
      "Explore our portfolio of successful digital marketing campaigns",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
