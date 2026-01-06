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
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#2c2c54] via-[#706fd3] to-[#40407a]/50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />

      {/* Floating Orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Our Dream Team
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
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
          className="mb-24"
        >
          <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-100/50 border border-blue-100 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-tr-full" />

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
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
                    className="relative w-full aspect-square max-w-md mx-auto"
                  >
                    {/* Main Image Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
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
                          idx === 0 ? "top-6 -right-4" : "bottom-6 -left-4"
                        } bg-white px-4 py-3 rounded-2xl shadow-xl border border-gray-100`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
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
                  <div className="absolute inset-0 -m-4 rounded-full border-2 border-blue-200/50" />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-medium">Leadership</span>
                </div>

                <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {teamMembers[0].name}
                </h3>

                <p className="text-xl font-semibold text-blue-600">
                  {teamMembers[0].position}
                </p>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {teamMembers[0].bio}
                </p>

                {/* Expertise */}
                <div className="pt-4">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {teamMembers[0].expertise.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="px-5 py-2.5 bg-white rounded-full text-gray-700 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 pt-6">
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
                      className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
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
              <div className="relative h-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Section */}
                <div className="relative px-8 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative mx-auto w-48 h-48"
                  >
                    {/* Main Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
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
                      className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
                    >
                      <div className="text-center">
                        <div className="font-bold text-sm">
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
                <div className="p-8 pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
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
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100">
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
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold hover:from-blue-100 hover:to-purple-100 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
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
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-r from-[#2c2c54] to-[#40407a]/90 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-2 border-white rounded-full translate-x-16 translate-y-16" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-medium">
                  We're Growing
                </span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                Want to Join Our Team?
              </h3>

              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                We're always looking for talented and passionate individuals to
                join our mission of transforming businesses through digital
                excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                >
                  View Open Positions
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
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
