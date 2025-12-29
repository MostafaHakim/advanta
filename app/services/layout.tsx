import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Digital Marketing Solutions",
  description:
    "Comprehensive digital marketing services including SEO, PPC, Social Media, Web Development, and more.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
