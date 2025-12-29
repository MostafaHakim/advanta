"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Logo from "../../public/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

  const toggleDropdown = (itemName: string) => {
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemName);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
            <div className="relative w-8 h-8">
              <Image
                src={Logo}
                alt="DVANTA SCALE Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DVANTA
              </span>
              <span className="text-xs font-bold bg-gradient-to-tr from-purple-600 to-blue-600 bg-clip-text text-transparent -mt-1">
                SCALE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                      {item.name}
                      <ChevronDown className="ml-1 w-4 h-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <div className="bg-white rounded-lg shadow-xl border p-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors menu-button"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg animate-slide-up mobile-menu">
            <div className="py-2 px-4 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name} className="border-b last:border-0">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.name ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Content with Animation */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openDropdown === item.name ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="pl-4 pb-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors pl-4 border-l-2 border-gray-200 hover:border-blue-400"
                              onClick={() => {
                                setIsOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              <span className="flex items-center">
                                <ChevronRight className="w-3 h-3 mr-2" />
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => {
                        setIsOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Button */}
              <div className="pt-4 pb-4">
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center block"
                  onClick={() => {
                    setIsOpen(false);
                    setOpenDropdown(null);
                  }}
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
