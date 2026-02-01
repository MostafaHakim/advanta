import { Users, Target, Award, Globe } from "lucide-react";
import Image from "next/image";
import { ValuesSection, CTASection, TeamSection } from "@/components/sections";

export const metadata = {
  title: "About Us | Digital Marketing Agency",
  description:
    "Learn about our mission, values, and team of digital marketing experts.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                We&apos;re More Than Just a{" "}
                <span className="text-blue-600">Marketing Agency</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We&apos;re a team of passionate digital strategists, creative
                minds, and tech experts dedicated to transforming businesses
                through innovative marketing solutions.
              </p>
              <div className="flex gap-4">
                <a href="/contact" className="btn-primary">
                  Meet Our Team
                </a>
                <a
                  href="/portfolio"
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Watch Our Story
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Our Team"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-blue-50 rounded-3xl">
              <Target className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To empower businesses of all sizes to thrive in the digital
                landscape through innovative, data-driven marketing strategies
                that deliver measurable results and sustainable growth.
              </p>
              <ul className="space-y-2">
                {[
                  "Data-Driven Approach",
                  "Client Success Focus",
                  "Continuous Innovation",
                  "Ethical Practices",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl text-white">
              <Globe className="w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="mb-4 opacity-90">
                To become the world&apos;s most trusted digital marketing
                partner, recognized for transforming businesses and setting new
                standards in marketing excellence.
              </p>
              <ul className="space-y-2">
                {[
                  "Global Impact",
                  "Industry Leadership",
                  "Technological Excellence",
                  "Sustainable Growth",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a leading digital marketing
              agency
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block" />

            <div className="space-y-12">
              {[
                {
                  year: "2014",
                  title: "Founding Year",
                  description:
                    "Started with 3 passionate marketers in a small office",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  year: "2016",
                  title: "First Major Success",
                  description:
                    "Helped first client achieve 300% ROI on marketing spend",
                  icon: <Award className="w-6 h-6" />,
                },
                {
                  year: "2018",
                  title: "Expansion",
                  description:
                    "Opened second office and expanded team to 20+ experts",
                  icon: <Globe className="w-6 h-6" />,
                },
                {
                  year: "2020",
                  title: "Digital Transformation",
                  description: "Pioneered AI-powered marketing strategies",
                  icon: <Target className="w-6 h-6" />,
                },
                {
                  year: "2023",
                  title: "Global Recognition",
                  description: 'Awarded "Best Digital Marketing Agency"',
                  icon: <Award className="w-6 h-6" />,
                },
              ].map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white z-10 hidden md:block" />

                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-2/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Values Section */}
      <ValuesSection />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
