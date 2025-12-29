"use client";

import { motion } from "framer-motion";
import { Target, Users, Shield, Zap, TrendingUp, Heart } from "lucide-react";

const values = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, delivering exceptional quality and results.",
    principles: [
      "Quality-focused approach",
      "Continuous improvement",
      "Attention to detail",
    ],
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and building strong partnerships with our clients.",
    principles: [
      "Open communication",
      "Teamwork synergy",
      "Client partnership",
    ],
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Integrity",
    description:
      "We operate with honesty, transparency, and ethical practices in all our dealings.",
    principles: [
      "Ethical business practices",
      "Transparent reporting",
      "Honest communication",
    ],
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Innovation",
    description:
      "We embrace innovation and stay ahead of industry trends to deliver cutting-edge solutions.",
    principles: [
      "Creative problem-solving",
      "Technology adoption",
      "Future-forward thinking",
    ],
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Results-Driven",
    description:
      "We focus on delivering measurable results and achieving our clients business objectives.",
    principles: ["Data-driven decisions", "ROI focus", "Performance tracking"],
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Passion",
    description:
      "We are passionate about what we do and committed to making a positive impact.",
    principles: [
      "Enthusiastic approach",
      "Client success celebration",
      "Positive work culture",
    ],
    color: "from-red-500 to-red-600",
  },
];

const ValuesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
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
            <span className="text-sm font-medium">Our Values</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What <span className="text-blue-600">Drives Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our core values define who we are and guide every decision we make
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 group-hover:border-blue-200">
                {/* Icon */}
                <div
                  className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {value.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 mb-6">{value.description}</p>

                {/* Principles */}
                <ul className="space-y-3">
                  {value.principles.map((principle, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      {principle}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Our Culture</h3>
                <p className="text-lg mb-8 opacity-90">
                  We foster a culture of learning, growth, and collaboration
                  where every team member is empowered to do their best work and
                  make a meaningful impact.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { label: "Employee Satisfaction", value: "98%" },
                    { label: "Training Hours/Year", value: "100+" },
                    { label: "Team Events/Year", value: "24" },
                    { label: "Growth Opportunities", value: "Unlimited" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                    >
                      <div className="text-3xl font-bold mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm opacity-90">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Continuous Learning",
                  "Work-Life Balance",
                  "Diversity & Inclusion",
                  "Community Impact",
                ].map((item, idx) => (
                  <div
                    key={item}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center text-center"
                  >
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Our Commitment to You</h3>
            <p className="text-gray-600 mb-8">
              We are committed to not just meeting but exceeding your
              expectations. Our values are not just words on a page - they are
              the foundation of how we work with every client, on every project.
            </p>
            <button className="btn-primary">
              Learn More About Our Approach
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;
