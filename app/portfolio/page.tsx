import { Metadata } from "next";
import { PortfolioClientWrapper } from "@/components/portfolio";
import { getBaseUrl } from "@/lib/url"; // Import getBaseUrl

interface PortfolioItem {
  _id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string;
  featured: boolean;
  results: {
    value: string;
    label: string;
  }[];
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return (await res.json()).data;
}

export const metadata: Metadata = {
  title: "Our Portfolio | Successful Digital Marketing Campaigns",
  description:
    "Explore our portfolio of successful digital marketing campaigns and web development projects. See how we've helped businesses like yours achieve their goals with our expert services.",
};

export default async function PortfolioPage() {
  const portfolioItems: PortfolioItem[] = await getProjects();

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web-development", name: "Web Development" },
    { id: "seo", name: "SEO" },
    { id: "social-media", name: "Social Media" },
    { id: "ppc", name: "PPC" },
    { id: "content-marketing", name: "Content Marketing" },
    { id: "design", name: "Design" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-blue-600">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our portfolio of successful digital marketing campaigns
              and web development projects that have transformed businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-y">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Projects Completed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "150M+", label: "Revenue Generated" },
              { value: "50+", label: "Industries Served" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <PortfolioClientWrapper
            initialPortfolioItems={portfolioItems}
            categories={categories}
          />

          {/* Featured Projects */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Case Studies
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {portfolioItems
                .filter((item) => item.featured)
                .map((item) => (
                  <div
                    key={item._id}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.client}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-600 mb-6">{item.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {item.results.map((result, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {result.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full btn-primary">
                        View Case Study
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let&apos;s discuss how we can help you achieve similar results for
            your business
          </p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </>
  );
}
