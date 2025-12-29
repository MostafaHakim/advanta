"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO & Founder",
    bio: "10+ years in digital marketing, specializing in growth strategies and business development.",
    image: "/api/placeholder/400/400",
    expertise: ["SEO", "Strategy", "Leadership"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah@nextmarketing.com",
    },
    featured: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Head of SEO",
    bio: "Former Google employee with 8+ years of SEO experience across multiple industries.",
    image: "/api/placeholder/400/400",
    expertise: ["Technical SEO", "Content Strategy", "Analytics"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "michael@nextmarketing.com",
    },
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Creative Director",
    bio: "Award-winning designer with expertise in branding and user experience.",
    image: "/api/placeholder/400/400",
    expertise: ["UI/UX Design", "Branding", "Content Creation"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emma@nextmarketing.com",
    },
  },
  {
    id: 4,
    name: "David Wilson",
    position: "PPC Specialist",
    bio: "Managed over $5M in ad spend with expertise in conversion optimization.",
    image: "/api/placeholder/400/400",
    expertise: ["Google Ads", "Facebook Ads", "ROI Optimization"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "david@nextmarketing.com",
    },
  },
  {
    id: 5,
    name: "Lisa Anderson",
    position: "Content Strategist",
    bio: "Former journalist with expertise in content marketing and storytelling.",
    image: "/api/placeholder/400/400",
    expertise: ["Content Marketing", "Copywriting", "Storytelling"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "lisa@nextmarketing.com",
    },
  },
  {
    id: 6,
    name: "Alex Turner",
    position: "Web Developer",
    bio: "Full-stack developer specializing in high-performance web applications.",
    image: "/api/placeholder/400/400",
    expertise: ["React/Next.js", "Node.js", "Performance"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "alex@nextmarketing.com",
    },
  },
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
            <span className="text-sm font-medium">Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Meet Our <span className="text-blue-600">Experts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A team of passionate professionals dedicated to delivering
            exceptional results
          </p>
        </motion.div>

        {/* Featured Team Member */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={teamMembers[0].image}
                    alt={teamMembers[0].name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600 text-white mb-6">
                  <span className="text-sm font-medium">Leadership</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  {teamMembers[0].name}
                </h3>
                <p className="text-xl text-blue-600 font-medium mb-6">
                  {teamMembers[0].position}
                </p>
                <p className="text-gray-600 mb-8">{teamMembers[0].bio}</p>

                {/* Expertise */}
                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {teamMembers[0].expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-white rounded-full text-gray-700 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={teamMembers[0].social.linkedin}
                    className="p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </a>
                  <a
                    href={teamMembers[0].social.twitter}
                    className="p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-blue-600" />
                  </a>
                  <a
                    href={`mailto:${teamMembers[0].social.email}`}
                    className="p-2 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(1).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-100">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label="Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                    <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
                      View Profile
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col md:flex-row items-center justify-center gap-8 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-2">Join Our Team</h3>
              <p className="opacity-90">
                We're always looking for talented individuals to join our
                growing team.
              </p>
            </div>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
              View Open Positions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
