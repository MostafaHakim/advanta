import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/logo.png";
const Footer = () => {
  const footerLinks = {
    Services: [
      { name: "SEO Optimization", href: "/services/seo" },
      { name: "PPC Advertising", href: "/services/ppc" },
      { name: "Social Media Marketing", href: "/services/social-media" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Content Marketing", href: "/services/content-marketing" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 py-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Image className="w-8 h-8" src={Logo} alt="Logo" />
              <span className="text-2xl font-bold bg-linear-to-r from-[#FAFAFA] to-[#F9FAFB] bg-clip-text text-transparent">
                DVANTA {` `}
                <span className="text-xs font-bold bg-linear-to-tr from-gray-200 to-stone-200 bg-clip-text text-transparent">
                  SCALE
                </span>
              </span>
            </Link>
            <p className="mb-6 max-w-md">
              We help businesses transform their digital presence with
              cutting-edge marketing strategies and innovative solutions.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-sm text-gray-400">Phone</div>
              <div className="text-white">+8801722440899</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-sm text-gray-400">Email</div>
              <div className="text-white">mostafa@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-sm text-gray-400">Location</div>
              <div className="text-white">Dhaka</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} ADVANTA{" "}
            <span className="text-xs"> SCALE </span>. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
