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
    { name: "Blog", href: "/blog", icon: DollarSign },
    { name: "Contact", href: "/contact", icon: Headphones },
  ];

  const serviceCategories = [
    {
      title: "Digital Marketing",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
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
      color: "from-blue-600 to-blue-700",
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
      color: "from-blue-700 to-blue-800",
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
        suppressHydrationWarning
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg border-b border-gray-200 backdrop-blur-sm"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group"
            >
              <div className="relative">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow ring-1  ring-black/20 border border-gray-200">
                  <Image
                    src={Logo}
                    alt="DVANTA SCALE"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ADVANTA{" "}
                  <span className="text-xs font-bold text-blue-600 tracking-wider">
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
                          className={`flex items-center px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                            isServicesActive
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          }`}
                          onMouseEnter={() => setMegaMenuOpen(true)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                              megaMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </Link>

                        {/* Mega Menu */}
                        <AnimatePresence>
                          {megaMenuOpen && (
                            <motion.div
                              className="absolute left-1/2 -translate-x-1/2 mt-2 w-[95vw] max-w-6xl z-50"
                              initial={{ opacity: 0, y: -12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.2 }}
                              onMouseEnter={() => setMegaMenuOpen(true)}
                              onMouseLeave={() => setMegaMenuOpen(false)}
                            >
                              <div className="rounded-xl bg-white shadow-2xl border border-gray-200 p-6 lg:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                  {serviceCategories.map((category, index) => (
                                    <motion.div
                                      key={category.title}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="space-y-4 lg:space-y-6"
                                    >
                                      {/* Category Header */}
                                      <div className="flex items-center gap-3 lg:gap-4">
                                        <div
                                          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-sm`}
                                        >
                                          {category.icon}
                                        </div>
                                        <div>
                                          <h3 className="text-base lg:text-lg font-bold text-gray-900">
                                            {category.title}
                                          </h3>
                                          <p className="text-xs lg:text-sm text-gray-500">
                                            Expert solutions
                                          </p>
                                        </div>
                                      </div>

                                      {/* Services */}
                                      <ul className="space-y-2 lg:space-y-3">
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
                                              className="group flex items-center p-2 lg:p-3 rounded-lg hover:bg-blue-50 transition-all duration-300"
                                            >
                                              <div
                                                className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform`}
                                              >
                                                {service.icon}
                                              </div>

                                              <div className="flex-1">
                                                <div className="font-semibold text-sm lg:text-base text-gray-900 group-hover:text-blue-600">
                                                  {service.name}
                                                </div>
                                                <div className="text-xs mt-1 text-gray-600">
                                                  {service.description}
                                                </div>
                                              </div>

                                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Bottom CTA */}
                                <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-4">
                                  <div>
                                    <h4 className="font-bold text-base lg:text-lg text-gray-900">
                                      Need a custom solution?
                                    </h4>
                                    <p className="text-gray-600 text-xs lg:text-sm mt-1">
                                      Tailored services for your business
                                    </p>
                                  </div>
                                  <Link
                                    href="/services"
                                    className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 lg:px-5 lg:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 w-full lg:w-auto shadow-sm hover:shadow-md"
                                    style={{ borderRadius: "8px" }}
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
                        className={`flex items-center px-4 sm:px-6 lg:px-8 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                          pathname === item.href
                            ? "text-blue-600 bg-blue-50 font-medium"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
                <div
                  className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                  style={{ borderRadius: "8px" }}
                >
                  Get Started
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 group border border-gray-200"
              style={{ borderRadius: "8px" }}
            >
              <div className="relative">
                <Menu
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-700 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <X
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-700 absolute top-0 left-0 transition-all duration-300 ${
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:max-w-sm bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 sm:space-x-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="relative">
                      <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                        <Image
                          src={Logo}
                          alt="ADVANTA SCALE"
                          width={16}
                          height={16}
                          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ADVANTA{" "}
                        <span className="text-xs font-bold text-blue-600">
                          SCALE
                        </span>
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200"
                    style={{ borderRadius: "8px" }}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="p-4 sm:p-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="border-b border-gray-200 last:border-0 pb-2 last:pb-0"
                    >
                      {item.hasMegaMenu ? (
                        <div>
                          <button
                            onClick={() =>
                              setActiveService(
                                activeService === item.name ? null : item.name,
                              )
                            }
                            className="flex items-center justify-between w-full py-3 sm:py-4 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                            style={{ borderRadius: "8px" }}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3 border border-blue-100">
                                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-gray-900 text-sm sm:text-base">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  All services
                                </div>
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 ${
                                activeService === item.name ? "rotate-90" : ""
                              }`}
                            />
                          </button>

                          {/* Mobile Services Dropdown */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              activeService === item.name
                                ? "max-h-[500px] overflow-y-auto"
                                : "max-h-0"
                            }`}
                          >
                            <div className="pl-2 sm:pl-4 mt-2 space-y-3">
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
                                        style={{ borderRadius: "8px" }}
                                      >
                                        <div
                                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white mr-3`}
                                        >
                                          {service.icon}
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
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
                                className="flex items-center justify-center py-3 mt-4 rounded-lg bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-all text-sm border border-blue-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{ borderRadius: "8px" }}
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
                          className="flex items-center py-3 sm:py-4 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors group"
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{ borderRadius: "8px" }}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-50 flex items-center justify-center mr-3 border border-gray-200">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-blue-600" />
                          </div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-blue-600">
                            {item.name}
                          </div>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile CTA Section */}
              <div className="p-4 sm:p-6 border-t border-gray-200">
                <div className="space-y-4">
                  <Link
                    href="/contact"
                    className="block w-full py-3 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ borderRadius: "8px" }}
                  >
                    Get Free Consultation
                  </Link>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
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
              <div className="p-4 sm:p-6 bg-gray-50">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Follow us
                  </p>
                  <div className="flex justify-center space-x-3 sm:space-x-4">
                    {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                      (social) => (
                        <a
                          key={social}
                          href="#"
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-md transition-all text-xs sm:text-sm border border-gray-200"
                          style={{ borderRadius: "8px" }}
                        >
                          {social.charAt(0)}
                        </a>
                      ),
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
