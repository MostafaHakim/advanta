"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail, Users, ChevronRight } from "lucide-react";

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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#218c74] via-[#1e7a64] to-[#33d9b2]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-6"></div>
          <h3 className="text-2xl font-light text-white mb-2">Loading Team</h3>
          <p className="text-white/70">Please wait a moment...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#218c74] via-[#1e7a64] to-[#33d9b2]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-3xl font-medium text-white">!</span>
          </div>
          <h3 className="text-2xl font-light text-white mb-3">
            Unable to Load Team
          </h3>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={fetchTeamMembers}
            className="px-6 py-3 bg-white text-[#218c74] rounded-full hover:shadow-lg transition-all duration-300 text-sm font-medium inline-flex items-center gap-2 group"
          >
            Try Again
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-10 lg:py-20 overflow-hidden bg-gradient-to-br from-[#218c74] via-[#1e7a64] to-[#33d9b2]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#33d9b2]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20"
          >
            <Users className="w-4 h-4 text-[#33d9b2]" />
            <span className="text-xs font-medium text-white tracking-wider uppercase">
              Meet Our Team
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light mb-4 text-white"
          >
            Meet our{" "}
            <span className="font-bold bg-gradient-to-r from-[#33d9b2] to-white bg-clip-text text-transparent">
              team members
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-white/80 max-w-2xl mx-auto"
          >
            Passionate professionals dedicated to bringing your vision to life
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredCard(member._id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 transition-all duration-500 hover:bg-white/20 hover:shadow-2xl">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#33d9b2] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-xl"></div>

                {/* Image Container */}
                <div className="relative pt-8 px-6">
                  <div className="relative w-40 h-40 mx-auto">
                    {/* Animated Ring */}
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#33d9b2] to-white transition-all duration-500 ${hoveredCard === member._id ? "scale-105 opacity-100" : "scale-100 opacity-0"}`}
                    ></div>

                    {/* Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-all duration-300">
                      <Image
                        src={member?.image?.url || "/placeholder-avatar.jpg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=33d9b2&color=ffffff&size=400&bold=true&length=2`;
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center p-6 pt-4">
                  <motion.h3
                    className="font-bold text-white text-xl mb-1"
                    animate={{ y: hoveredCard === member._id ? -2 : 0 }}
                  >
                    {member.name}
                  </motion.h3>
                  <p className="text-[#33d9b2] text-sm font-medium mb-4">
                    {member.position}
                  </p>

                  {/* Bio (optional) */}
                  {member.bio && (
                    <motion.p
                      className="text-white/60 text-xs mb-4 line-clamp-2"
                      initial={{ opacity: 0.6 }}
                      animate={{
                        opacity: hoveredCard === member._id ? 0.8 : 0.6,
                      }}
                    >
                      {member.bio}
                    </motion.p>
                  )}

                  {/* Expertise Tags (if available) */}
                  {member.expertise && member.expertise.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                      {member.expertise.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/70 rounded-full text-[10px] font-medium">
                          +{member.expertise.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/10">
                    {member.social?.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#33d9b2] transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </motion.a>
                    )}

                    {member.social?.twitter && (
                      <motion.a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#33d9b2] transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Twitter"
                      >
                        <Twitter size={18} />
                      </motion.a>
                    )}

                    {member.social?.email && (
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        className="text-white/60 hover:text-[#33d9b2] transition-all duration-300"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Email"
                      >
                        <Mail size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#33d9b2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
