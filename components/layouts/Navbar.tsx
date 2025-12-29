"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "SEO Optimization", href: "/services/seo-optimization" },
        { name: "PPC Advertising", href: "/services/ppc-advertising" },
        {
          name: "Social Media Marketing",
          href: "/services/social-media-marketing",
        },
        { name: "Web Development", href: "/services/web-development" },
        { name: "Content Marketing", href: "/services/content-marketing" },
      ],
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image className="w-8 h-8" src={Logo} alt="Logo" />
            <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DVANTA {` `}
              <span className="text-xs font-bold bg-linear-to-tr from-purple-600 to-blue-600 bg-clip-text text-transparent">
                SCALE
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    {/* Parent Link (Services → /services) */}
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 transition-colors ${
                        pathname === item.href
                          ? "text-blue-600 font-medium"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className="absolute left-0 mt-2 w-56 opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50"
                    >
                      <div className="bg-white rounded-lg shadow-xl border p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700
                  hover:bg-blue-50 hover:text-blue-600
                  rounded-md transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "text-blue-600 font-medium"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg animate-slide-up">
            <div className="py-4 px-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="py-2">
                      <div className="font-medium text-gray-900 mb-2">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 text-gray-700 hover:text-blue-600 transition-colors border-b last:border-0"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
