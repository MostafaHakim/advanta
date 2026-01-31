import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Comprehensive Digital Marketing Solutions",
  description:
    "Discover our comprehensive digital marketing services designed to grow your business. From SEO and content marketing to social media and PPC, we have the expertise to deliver results.",
};
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
