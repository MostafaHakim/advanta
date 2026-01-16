"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Award,
  Users,
  Target,
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO & Founder",
    bio: "10+ years in digital marketing, specializing in growth strategies and business development.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    expertise: ["SEO", "Strategy", "Leadership"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "sarah@nextmarketing.com",
    },
    featured: true,
    stats: [
      { label: "Projects", value: "250+" },
      { label: "Experience", value: "10 Years" },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Head of SEO",
    bio: "Former Google employee with 8+ years of SEO experience across multiple industries.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    expertise: ["Technical SEO", "Content Strategy", "Analytics"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "michael@nextmarketing.com",
    },
    stats: [
      { label: "Rankings", value: "500+" },
      { label: "Traffic", value: "300%" },
    ],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    position: "Creative Director",
    bio: "Award-winning designer with expertise in branding and user experience.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    expertise: ["UI/UX Design", "Branding", "Content Creation"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "emma@nextmarketing.com",
    },
    stats: [
      { label: "Awards", value: "12" },
      { label: "Clients", value: "150+" },
    ],
  },
  {
    id: 4,
    name: "David Wilson",
    position: "PPC Specialist",
    bio: "Managed over $5M in ad spend with expertise in conversion optimization.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    expertise: ["Google Ads", "Facebook Ads", "ROI Optimization"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "david@nextmarketing.com",
    },
    stats: [
      { label: "Ad Spend", value: "$5M+" },
      { label: "ROI", value: "8x" },
    ],
  },
  {
    id: 5,
    name: "Lisa Anderson",
    position: "Content Strategist",
    bio: "Former journalist with expertise in content marketing and storytelling.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    expertise: ["Content Marketing", "Copywriting", "Storytelling"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "lisa@nextmarketing.com",
    },
    stats: [
      { label: "Articles", value: "500+" },
      { label: "Readership", value: "2M+" },
    ],
  },
  {
    id: 6,
    name: "Alex Turner",
    position: "Web Developer",
    bio: "Full-stack developer specializing in high-performance web applications.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    expertise: ["React/Next.js", "Node.js", "Performance"],
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "alex@nextmarketing.com",
    },
    stats: [
      { label: "Projects", value: "80+" },
      { label: "Speed", value: "<2s" },
    ],
  },
];

const TeamSection = () => {
  return (
    <section className="relative py-6 lg:py-24 overflow-hidden bg-linear-to-r bg- from-violet-300 via-white to-violet-300">
      {/* Light Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-50/60 to-blue-50/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-50/60 to-blue-50/20 rounded-full blur-3xl" />

      {/* Light Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-4 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 mb-4 lg:mb-6"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Our Dream Team
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-6 tracking-tight text-gray-900">
            Meet Our <span className="text-blue-600">Expert Team</span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A collective of passionate professionals dedicated to delivering
            exceptional results and driving digital success for our clients.
          </p>
        </motion.div>

        {/* Featured Team Member */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6 lg:mb-24"
        >
          <div className="relative bg-white rounded-2xl p-6 md:p-12 shadow-lg border border-gray-200 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/30 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-50/30 to-transparent rounded-tr-full" />

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full aspect-square max-w-sm md:max-w-md mx-auto"
                  >
                    {/* Main Image Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-xl">
                      <Image
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                    </div>

                    {/* Floating Stats */}
                    {teamMembers[0].stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className={`absolute ${
                          idx === 0
                            ? "top-4 -right-2 sm:top-6 sm:-right-4"
                            : "bottom-4 -left-2 sm:bottom-6 sm:-left-4"
                        } bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg border border-gray-200`}
                      >
                        <div className="text-center">
                          <div className="text-base sm:text-lg font-bold text-blue-600">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Decorative Ring */}
                  <div className="absolute inset-0 -m-4 rounded-full border-2 border-blue-100/50" />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 lg:space-y-6 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-800">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">Leadership</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {teamMembers[0].name}
                </h3>

                <p className="text-lg md:text-xl font-semibold text-blue-600">
                  {teamMembers[0].position}
                </p>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {teamMembers[0].bio}
                </p>

                {/* Expertise */}
                <div className="pt-4">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 justify-center lg:justify-start">
                    <Target className="w-5 h-5 text-blue-500" />
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    {teamMembers[0].expertise.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-50 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all border border-gray-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-6 justify-center lg:justify-start">
                  {[
                    {
                      icon: Linkedin,
                      href: teamMembers[0].social.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: Twitter,
                      href: teamMembers[0].social.twitter,
                      label: "Twitter",
                    },
                    {
                      icon: Mail,
                      href: `mailto:${teamMembers[0].social.email}`,
                      label: "Email",
                    },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(1).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden border border-gray-200">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Section */}
                <div className="relative px-8 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mx-auto w-36 h-36 sm:w-48 sm:h-48"
                  >
                    {/* Main Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* Stats Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md"
                    >
                      <div className="text-center">
                        <div className="font-bold text-xs sm:text-sm">
                          {member.stats?.[0]?.value}
                        </div>
                        <div className="text-xs opacity-90">
                          {member.stats?.[0]?.label}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      {member.position}
                    </p>
                  </div>

                  <p className="text-gray-600 text-center mb-6 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-4 md:gap-6 pt-6 border-t border-gray-200">
                    {[
                      {
                        icon: Linkedin,
                        href: member.social.linkedin,
                        label: "LinkedIn",
                      },
                      {
                        icon: Twitter,
                        href: member.social.twitter,
                        label: "Twitter",
                      },
                      {
                        icon: Mail,
                        href: `mailto:${member.social.email}`,
                        label: "Email",
                      },
                    ].map((social, idx) => (
                      <motion.a
                        key={idx}
                        href={social.href}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* View Profile Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 pt-0"
                >
                  <button className="w-full py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-blue-100">
                    View Full Profile
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center mt-4 lg:mt-20 shadow-2xl"
        >
          <div className="relative bg-blue-50 rounded-xl p-8 md:p-12 overflow-hidden border border-blue-100 ">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 border-2 border-blue-200 rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-blue-200 rounded-full translate-x-16 translate-y-16" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg mb-6 border border-blue-200">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 text-sm font-medium">
                  We're Growing
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Want to Join Our Team?
              </h3>

              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're always looking for talented and passionate individuals to
                join our mission of transforming businesses through digital
                excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{ borderRadius: "8px" }}
                >
                  View Open Positions
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
                  style={{ borderRadius: "8px" }}
                >
                  Contact Our HR
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
