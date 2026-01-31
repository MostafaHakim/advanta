import { notFound } from "next/navigation";
import { ServiceDetail, RelatedServices } from "@/components/services";
import CTASection from "@/components/sections/CTASection";
import { Metadata } from "next";

async function getService(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/services/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getService(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | Digital Marketing Services`,
    description: service.description,
    keywords: [service.title.toLowerCase(), "digital marketing", "services"],
    openGraph: {
      title: `${service.title} | NextMarketing`,
      description: service.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | NextMarketing`,
      description: service.description,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceDetail service={service} />
      <RelatedServices currentServiceId={service._id} />
      <CTASection />
    </>
  );
}
