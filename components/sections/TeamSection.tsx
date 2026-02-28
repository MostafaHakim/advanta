"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Linkedin,
  Twitter,
  Mail,
  Award,
  Users,
  Target,
  Star,
  Sparkles,
  BarChart3,
} from "lucide-react";

type TeamMember = {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: {
    url: string;
    public_id: string;
  };
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  featured: boolean;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/team");
      if (!res.ok) throw new Error("Failed to fetch team members");
      const data = await res.json();
      setTeamMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load team");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Loading Our Team
              </h3>
              <p className="text-gray-600">
                Fetching the amazing people behind our success...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">!</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Failed to Load Team
            </h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchTeamMembers}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const featuredMember =
    teamMembers.find((member) => member.featured) || teamMembers[0];
  const regularMembers = teamMembers.filter(
    (member) => member._id !== featuredMember?._id,
  );

  return (
    <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/50 to-purple-100/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-100/50 to-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f4f8_1px,transparent_1px),linear-gradient(to_bottom,#f0f4f8_1px,transparent_1px)] bg-[size:60px_60px] opacity-10" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 mb-6"
          >
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Meet Our Experts
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 tracking-tight text-gray-900">
            The Minds Behind{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Our Success
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A diverse team of passionate professionals united by innovation,
            expertise, and a commitment to excellence.
          </p>
        </motion.div>

        {/* Featured Member */}
        {featuredMember && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12 lg:mb-16"
          >
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 md:p-10 lg:p-12 shadow-xl border border-gray-200 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-50/40 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-50/40 to-transparent rounded-tr-full" />

              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative"
                >
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative w-full aspect-square max-w-md mx-auto"
                    >
                      {/* Main Image */}
                      <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                        <Image
                          src={
                            featuredMember?.image?.url ||
                            "/placeholder-avatar.jpg"
                          }
                          alt={featuredMember.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredMember.name)}&background=2563eb&color=fff&size=400`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>

                      {/* Stats Badges */}
                      {featuredMember.stats?.slice(0, 2).map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className={`absolute ${
                            idx === 0 ? "top-6 -right-4" : "bottom-6 -left-4"
                          } bg-white px-4 py-3 rounded-xl shadow-xl border border-gray-200`}
                        >
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">
                              {stat.label}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Featured Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                          <Sparkles className="w-4 h-4" />
                          Featured
                        </span>
                      </div>
                    </motion.div>

                    {/* Expertise Ring */}
                    <div className="absolute -inset-4 rounded-full border-2 border-blue-100/50" />
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-lg mb-4">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">Leadership</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                      {featuredMember.name}
                    </h3>

                    <p className="text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
                      {featuredMember.position}
                    </p>

                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {featuredMember.bio}
                    </p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Target className="w-6 h-6 text-blue-500" />
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {featuredMember.expertise?.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  {featuredMember.stats?.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      {featuredMember.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200"
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex items-center gap-4 pt-6">
                    {[
                      {
                        icon: Linkedin,
                        href: featuredMember.social?.linkedin,
                        label: "LinkedIn",
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                      },
                      {
                        icon: Twitter,
                        href: featuredMember.social?.twitter,
                        label: "Twitter",
                        color: "text-sky-500",
                        bg: "bg-sky-50",
                      },
                      {
                        icon: Mail,
                        href: featuredMember.social?.email
                          ? `mailto:${featuredMember.social.email}`
                          : "#",
                        label: "Email",
                        color: "text-rose-600",
                        bg: "bg-rose-50",
                      },
                    ].map(
                      (social, idx) =>
                        social.href && (
                          <motion.a
                            key={idx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-3 rounded-xl ${social.bg} ${social.color} hover:shadow-md transition-all border`}
                            aria-label={social.label}
                          >
                            <social.icon className="w-6 h-6" />
                          </motion.a>
                        ),
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {regularMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative h-full bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200">
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Image Section */}
                  <div className="relative px-6 pt-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative mx-auto w-40 h-40"
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                        <Image
                          src={member?.image?.url || "/placeholder-avatar.jpg"}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2563eb&color=fff&size=300`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      </div>

                      {/* Stats Badge */}
                      {member.stats?.[0] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-2 rounded-lg shadow-lg"
                        >
                          <div className="text-center">
                            <div className="font-bold text-sm">
                              {member.stats[0].value}
                            </div>
                            <div className="text-xs opacity-90">
                              {member.stats[0].label}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Featured Badge */}
                      {member.featured && (
                        <div className="absolute top-0 left-0">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-bold">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {member.position}
                      </p>
                    </div>

                    <p className="text-gray-600 text-center mb-6 line-clamp-3 text-sm leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Expertise */}
                    <div className="mb-6">
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise?.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise && member.expertise.length > 3 && (
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                            +{member.expertise.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats (if available) */}
                    {member.stats?.length > 1 && (
                      <div className="mb-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-center gap-4">
                          {member.stats.slice(0, 2).map((stat, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-lg font-bold text-gray-900">
                                {stat.value}
                              </div>
                              <div className="text-xs text-gray-600">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                      {[
                        {
                          icon: Linkedin,
                          href: member.social?.linkedin,
                          label: "LinkedIn",
                        },
                        {
                          icon: Twitter,
                          href: member.social?.twitter,
                          label: "Twitter",
                        },
                        {
                          icon: Mail,
                          href: member.social?.email
                            ? `mailto:${member.social.email}`
                            : "#",
                          label: "Email",
                        },
                      ].map(
                        (social, idx) =>
                          social.href &&
                          social.href !== "#" && (
                            <motion.a
                              key={idx}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.2, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                              aria-label={social.label}
                            >
                              <social.icon className="w-5 h-5" />
                            </motion.a>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
