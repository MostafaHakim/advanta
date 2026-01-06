"use client";

import { motion } from "framer-motion";
import { Search, Target, Palette, Rocket, BarChart, Users } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: <Search className="w-8 h-8" />,
      title: "Discovery",
      description:
        "We begin by understanding your business, goals, and challenges.",
      details: ["Business Analysis", "Competitor Research", "Goal Setting"],
    },
    {
      number: "02",
      icon: <Target className="w-8 h-8" />,
      title: "Strategy",
      description:
        "Developing a customized strategy tailored to your specific needs.",
      details: [
        "Strategy Development",
        "Channel Selection",
        "Roadmap Creation",
      ],
    },
    {
      number: "03",
      icon: <Palette className="w-8 h-8" />,
      title: "Implementation",
      description:
        "Executing the strategy with precision and attention to detail.",
      details: [
        "Campaign Setup",
        "Content Creation",
        "Technical Implementation",
      ],
    },
    {
      number: "04",
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch",
      description:
        "Going live with optimized campaigns and continuous monitoring.",
      details: ["Quality Assurance", "Performance Testing", "Official Launch"],
    },
    {
      number: "05",
      icon: <BarChart className="w-8 h-8" />,
      title: "Optimization",
      description:
        "Continuous improvement based on data and performance insights.",
      details: ["Performance Analysis", "A/B Testing", "Strategy Refinement"],
    },
    {
      number: "06",
      icon: <Users className="w-8 h-8" />,
      title: "Growth",
      description:
        "Scaling successful strategies and expanding to new opportunities.",
      details: ["Scale Campaigns", "Expand Channels", "Strategic Partnership"],
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
            <span className="text-sm font-medium">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            How We <span className="text-blue-600">Work</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A proven methodology that delivers consistent results for our
            clients
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop Only */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden lg:block" />

          <div className="space-y-8 md:space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col lg:flex-row items-center lg:space-y-0"
              >
                {/* Desktop Step Number & Line */}
                <div
                  className={`hidden lg:flex w-5/12 items-center justify-center ${
                    index % 2 === 0 ? "order-1 pr-8" : "order-3 pl-8"
                  }`}
                >
                  {index % 2 !== 0 && <div className="w-full h-0.5 bg-gray-200"></div>}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-4 border-blue-600 rounded-full z-10 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {step.number}
                    </span>
                  </div>
                  {index % 2 === 0 && <div className="w-full h-0.5 bg-gray-200"></div>}
                </div>

                {/* Content Card */}
                <div className="w-full lg:w-1/2 z-20 order-2">
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="inline-flex lg:hidden items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-4">
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center lg:hidden">
                           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">{step.number}</span>
                           </div>
                           <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                        </div>
                         <h3 className="text-2xl font-bold hidden lg:block">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 ml-0 lg:ml-0">
                      {step.description}
                    </p>

                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  Why Our Process Works
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Data-Driven Decisions",
                      description: "Every step is backed by data and analytics",
                    },
                    {
                      title: "Agile Methodology",
                      description:
                        "Flexible approach that adapts to changing needs",
                    },
                    {
                      title: "Transparent Communication",
                      description: "Regular updates and clear reporting",
                    },
                    {
                      title: "Continuous Optimization",
                      description: "Ongoing improvement based on performance",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold md:font-bold mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h4 className="text-xl md:text-2xl font-bold mb-4">Ready to Start?</h4>
                <p className="text-gray-600 mb-6">
                  Begin your journey with our proven process and start seeing
                  results.
                </p>
                <button className="w-full btn-primary">
                  Start Your Project
                </button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  No commitment required for initial consultation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
