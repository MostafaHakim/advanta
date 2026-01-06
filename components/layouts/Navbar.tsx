"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Search,
  TrendingUp,
  MessageSquare,
  Code,
  PenTool,
  BarChart,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Shield,
  Smartphone,
  Monitor,
  Users,
  Target,
  Briefcase,
  FileText,
  DollarSign,
  Headphones,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "About", href: "/about", icon: Users },
    {
      name: "Services",
      href: "/services",
      icon: Briefcase,
      hasMegaMenu: true,
    },
    { name: "Portfolio", href: "/portfolio", icon: FileText },
    { name: "Pricing", href: "/pricing", icon: DollarSign },
    { name: "Contact", href: "/contact", icon: Headphones },
  ];

  const serviceCategories = [
    {
      title: "Digital Marketing",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      services: [
        {
          name: "SEO Optimization",
          href: "/services/seo-optimization",
          description: "Boost search rankings & organic traffic",
          icon: <Search className="w-5 h-5" />,
        },
        {
          name: "PPC Advertising",
          href: "/services/ppc-advertising",
          description: "Maximize ROI with targeted ads",
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          name: "Social Media Marketing",
          href: "/services/social-media-marketing",
          description: "Build brand presence & engagement",
          icon: <MessageSquare className="w-5 h-5" />,
        },
        {
          name: "Content Marketing",
          href: "/services/content-marketing",
          description: "Create compelling content that converts",
          icon: <PenTool className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Tech Solutions",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      services: [
        {
          name: "Web Development",
          href: "/services/web-development",
          description: "High-performance custom websites",
          icon: <Monitor className="w-5 h-5" />,
        },
        {
          name: "Mobile App Development",
          href: "/services/mobile-app",
          description: "iOS & Android applications",
          icon: <Smartphone className="w-5 h-5" />,
        },
        {
          name: "E-commerce Solutions",
          href: "/services/ecommerce",
          description: "Scalable online stores",
          icon: <Globe className="w-5 h-5" />,
        },
        {
          name: "UI/UX Design",
          href: "/services/ui-ux",
          description: "User-centered design experiences",
          icon: <Sparkles className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Analytics & Strategy",
      icon: <Target className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      services: [
        {
          name: "Analytics & Reporting",
          href: "/services/analytics",
          description: "Data-driven insights & tracking",
          icon: <BarChart className="w-5 h-5" />,
        },
        {
          name: "Conversion Optimization",
          href: "/services/conversion",
          description: "Increase conversions & revenue",
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          name: "Marketing Automation",
          href: "/services/automation",
          description: "Streamline marketing workflows",
          icon: <Zap className="w-5 h-5" />,
        },
        {
          name: "Brand Strategy",
          href: "/services/strategy",
          description: "Complete brand positioning",
          icon: <Shield className="w-5 h-5" />,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-linear-to-r from-[#020617]/5 to-indigo-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-100 shadow-2xl"
            : "bg-linear-to-r from-[#020617]/90 to-indigo-900/95 backdrop-blur-lg"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with Glow Effect */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-full blur group-hover:blur-lg transition-all duration-300 opacity-70"></div>
                <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    src={Logo}
                    alt="DVANTA SCALE"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-linear-to-r from-[#f5f6fa] to-[#dcdde1] bg-clip-text text-transparent animate-gradient">
                  DVANTA{" "}
                  <span className="text-xs font-bold text-white tracking-wider">
                    SCALE
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="relative group">
                    {item.hasMegaMenu ? (
                      <>
                        {/* Services Link with Mega Menu */}
                        <Link
                          href={item.href}
                          className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-300 text-white ${
                            isServicesActive ? "" : ""
                          }`}
                          onMouseEnter={() => setMegaMenuOpen(true)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                              megaMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </Link>

                        {/* Mega Menu */}
                        <AnimatePresence>
                          {megaMenuOpen && (
                            <motion.div
                              className="absolute left-1/2 -translate-x-1/2 mt-6 w-[95vw] max-w-6xl z-50"
                              initial={{ opacity: 0, y: -12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.2 }}
                              onMouseEnter={() => setMegaMenuOpen(true)}
                              onMouseLeave={() => setMegaMenuOpen(false)}
                            >
                              <div className="rounded-2xl bg-gradient-to-r from-[#020617]/95 via-indigo-900/95 to-indigo-800/95 shadow-2xl p-8 text-white">
                                <div className="grid grid-cols-3 gap-8">
                                  {serviceCategories.map((category, index) => (
                                    <motion.div
                                      key={category.title}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="space-y-6"
                                    >
                                      {/* Category Header */}
                                      <div className="flex items-center gap-4">
                                        <div
                                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                                        >
                                          {category.icon}
                                        </div>
                                        <div>
                                          <h3 className="text-lg font-bold">
                                            {category.title}
                                          </h3>
                                          <p className="text-sm text-gray-300">
                                            Expert solutions
                                          </p>
                                        </div>
                                      </div>

                                      {/* Services */}
                                      <ul className="space-y-3">
                                        {category.services.map((service) => (
                                          <motion.li
                                            key={service.name}
                                            whileHover={{ x: 6 }}
                                            transition={{
                                              type: "spring",
                                              stiffness: 300,
                                            }}
                                          >
                                            <Link
                                              href={service.href}
                                              className="
                              group flex items-center p-3 rounded-xl
                              hover:bg-white
                              transition-all duration-300
                              hover:text-gray-800
                            "
                                            >
                                              <div
                                                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform`}
                                              >
                                                {service.icon}
                                              </div>

                                              <div className="flex-1">
                                                <div className="font-semibold ">
                                                  {service.name}
                                                </div>
                                                <div className="text-xs mt-1">
                                                  {service.description}
                                                </div>
                                              </div>

                                              <ArrowRight className="w-4 h-4 text-white group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Bottom CTA */}
                                <div className="mt-8 pt-8 border-t border-white/20 flex items-center justify-between">
                                  <div>
                                    <h4 className="font-bold text-lg">
                                      Need a custom solution?
                                    </h4>
                                    <p className="text-gray-300 text-sm mt-1">
                                      Tailored services for your business
                                    </p>
                                  </div>
                                  <Link
                                    href="/services"
                                    className="flex items-center bg-white text-gray-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                                  >
                                    Explore All Services
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center px-8 py-2 rounded-xl transition-all duration-300 ${
                          pathname === item.href
                            ? " ring-1  ring-gray-300 bg-white text-gray-900"
                            : "text-white hover:ring-1 ring-gray-300 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Link href="/contact" className="relative overflow-hidden group">
                <div className="absolute inset-0 "></div>
                <div className="relative px-6 py-2.5 ring-2 ring-white text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                  Get Started
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group"
            >
              <div className="relative">
                <Menu
                  className={`w-6 h-6 text-gray-700 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <X
                  className={`w-6 h-6 text-gray-700 absolute top-0 left-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center space-x-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex flex-col">
                      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        <span className="p-2 mr-1 rounded-full text-gray-800 ring-1 ring-gray-800">
                          A
                        </span>
                        DVANTA{" "}
                        <span className="text-xs font-bold text-gray-600">
                          SCALE
                        </span>
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="p-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                    >
                      {item.hasMegaMenu ? (
                        <div>
                          <button
                            onClick={() =>
                              setActiveService(
                                activeService === item.name ? null : item.name
                              )
                            }
                            className="flex items-center justify-between w-full py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mr-3 group-hover:from-blue-200 group-hover:to-purple-200">
                                <Icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-gray-900">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  All services
                                </div>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                activeService === item.name ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {/* Mobile Services Dropdown */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeService === item.name
                                ? "max-h-[500px]"
                                : "max-h-0"
                            }`}
                          >
                            <div className="pl-4 mt-2 space-y-3">
                              {serviceCategories.map((category) => (
                                <div key={category.title} className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                                    ></div>
                                    <h4 className="text-sm font-semibold text-gray-900">
                                      {category.title}
                                    </h4>
                                  </div>
                                  <div className="space-y-1">
                                    {category.services.map((service) => (
                                      <Link
                                        key={service.name}
                                        href={service.href}
                                        className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                      >
                                        <div
                                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mr-3`}
                                        >
                                          {service.icon}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium text-gray-900 group-hover:text-blue-600">
                                            {service.name}
                                          </div>
                                          <div className="text-xs text-gray-500 mt-0.5">
                                            {service.description}
                                          </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}

                              {/* View All Mobile Button */}
                              <Link
                                href="/services"
                                className="flex items-center justify-center py-3 mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-semibold hover:from-blue-100 hover:to-purple-100 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                View All Services
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center mr-3 group-hover:from-blue-100 group-hover:to-purple-100">
                            <Icon className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
                          </div>
                          <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                            {item.name}
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA Section */}
              <div className="p-6 border-t border-gray-100">
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full py-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Free Consultation
                  </Link>

                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <span>Need help?</span>
                    <a
                      href="tel:+8801234567890"
                      className="text-blue-600 font-medium hover:text-blue-700"
                    >
                      +880 1234 567890
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Follow us</p>
                  <div className="flex justify-center space-x-4">
                    {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                      (social) => (
                        <a
                          key={social}
                          href="#"
                          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all"
                        >
                          {social.charAt(0)}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
