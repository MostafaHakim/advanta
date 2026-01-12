// import Link from "next/link";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";
// import Image from "next/image";
// import Logo from "../../public/logo.png";
// const Footer = () => {
//   const footerLinks = {
//     Services: [
//       { name: "SEO Optimization", href: "/services/seo" },
//       { name: "PPC Advertising", href: "/services/ppc" },
//       { name: "Social Media Marketing", href: "/services/social-media" },
//       { name: "Web Development", href: "/services/web-development" },
//       { name: "Content Marketing", href: "/services/content-marketing" },
//     ],
//     Company: [
//       { name: "About Us", href: "/about" },
//       { name: "Our Team", href: "/about#team" },
//       { name: "Careers", href: "/careers" },
//       { name: "Blog", href: "/blog" },
//       { name: "Contact", href: "/contact" },
//     ],
//     Legal: [
//       { name: "Privacy Policy", href: "/privacy" },
//       { name: "Terms of Service", href: "/terms" },
//       { name: "Cookie Policy", href: "/cookies" },
//       { name: "GDPR Compliance", href: "/gdpr" },
//     ],
//   };

//   const socialLinks = [
//     {
//       icon: <Facebook className="w-5 h-5" />,
//       href: "https://facebook.com",
//       label: "Facebook",
//     },
//     {
//       icon: <Twitter className="w-5 h-5" />,
//       href: "https://twitter.com",
//       label: "Twitter",
//     },
//     {
//       icon: <Instagram className="w-5 h-5" />,
//       href: "https://instagram.com",
//       label: "Instagram",
//     },
//     {
//       icon: <Linkedin className="w-5 h-5" />,
//       href: "https://linkedin.com",
//       label: "LinkedIn",
//     },
//   ];

//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="container-custom">
//         {/* Main Footer */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 py-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="flex items-center space-x-2 mb-6">
//               <Image className="w-8 h-8" src={Logo} alt="Logo" />
//               <span className="text-2xl font-bold bg-linear-to-r from-[#FAFAFA] to-[#F9FAFB] bg-clip-text text-transparent">
//                 DVANTA {` `}
//                 <span className="text-xs font-bold bg-linear-to-tr from-gray-200 to-stone-200 bg-clip-text text-transparent">
//                   SCALE
//                 </span>
//               </span>
//             </Link>
//             <p className="mb-6 max-w-md">
//               We help businesses transform their digital presence with
//               cutting-edge marketing strategies and innovative solutions.
//             </p>

//             {/* Newsletter */}
//             <div className="mb-8">
//               <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
//               <form className="flex gap-2">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Links Columns */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h4 className="text-white font-semibold mb-6">{category}</h4>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       href={link.href}
//                       className="hover:text-white transition-colors"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Contact Info */}
//         <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-gray-800">
//           <div className="flex items-center space-x-3">
//             <Phone className="w-5 h-5 text-blue-400" />
//             <div>
//               <div className="text-sm text-gray-400">Phone</div>
//               <div className="text-white">+8801722440899</div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Mail className="w-5 h-5 text-blue-400" />
//             <div>
//               <div className="text-sm text-gray-400">Email</div>
//               <div className="text-white">mostafa@gmail.com</div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <MapPin className="w-5 h-5 text-blue-400" />
//             <div>
//               <div className="text-sm text-gray-400">Location</div>
//               <div className="text-white">Dhaka</div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             © {new Date().getFullYear()} ADVANTA{" "}
//             <span className="text-xs"> SCALE </span>. All rights reserved.
//           </div>

//           <div className="flex items-center space-x-6">
//             {/* Social Links */}
//             <div className="flex items-center space-x-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="hover:text-white transition-colors"
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import Link from "next/link";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Mail,
//   Phone,
//   MapPin,
// } from "lucide-react";
// import Image from "next/image";
// import Logo from "../../public/logo.png";

// const Footer = () => {
//   const footerLinks = {
//     Services: [
//       { name: "SEO Optimization", href: "/services/seo" },
//       { name: "PPC Advertising", href: "/services/ppc" },
//       { name: "Social Media Marketing", href: "/services/social-media" },
//       { name: "Web Development", href: "/services/web-development" },
//       { name: "Content Marketing", href: "/services/content-marketing" },
//     ],
//     Company: [
//       { name: "About Us", href: "/about" },
//       { name: "Our Team", href: "/about#team" },
//       { name: "Careers", href: "/careers" },
//       { name: "Blog", href: "/blog" },
//       { name: "Contact", href: "/contact" },
//     ],
//     Legal: [
//       { name: "Privacy Policy", href: "/privacy" },
//       { name: "Terms of Service", href: "/terms" },
//       { name: "Cookie Policy", href: "/cookies" },
//       { name: "GDPR Compliance", href: "/gdpr" },
//     ],
//   };

//   const socialLinks = [
//     {
//       icon: <Facebook className="w-5 h-5" />,
//       href: "https://facebook.com",
//       label: "Facebook",
//     },
//     {
//       icon: <Twitter className="w-5 h-5" />,
//       href: "https://twitter.com",
//       label: "Twitter",
//     },
//     {
//       icon: <Instagram className="w-5 h-5" />,
//       href: "https://instagram.com",
//       label: "Instagram",
//     },
//     {
//       icon: <Linkedin className="w-5 h-5" />,
//       href: "https://linkedin.com",
//       label: "LinkedIn",
//     },
//   ];

//   return (
//     <footer className="bg-[#0B1221] text-white">
//       <div className="container-custom">
//         {/* Main Footer */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 py-12">
//           {/* Brand Column */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="flex items-center space-x-2 mb-6">
//               <Image className="w-8 h-8" src={Logo} alt="Logo" />
//               <span className="text-2xl font-bold text-white">
//                 DVANTA{" "}
//                 <span className="text-xs font-bold text-blue-400">SCALE</span>
//               </span>
//             </Link>
//             <p className="mb-6 max-w-md text-gray-300">
//               We help businesses transform their digital presence with
//               cutting-edge marketing strategies and innovative solutions.
//             </p>

//             {/* Newsletter */}
//             <div className="mb-8">
//               <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
//               <form className="flex gap-2">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   style={{ borderRadius: "8px" }}
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Links Columns */}
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h4 className="text-white font-semibold mb-6">{category}</h4>
//               <ul className="space-y-3">
//                 {links.map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       href={link.href}
//                       className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Contact Info */}
//         <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-white/20">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
//               <Phone className="w-5 h-5 text-blue-400" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-400">Phone</div>
//               <div className="text-white font-medium">+8801722440899</div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
//               <Mail className="w-5 h-5 text-blue-400" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-400">Email</div>
//               <div className="text-white font-medium">mostafa@gmail.com</div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
//               <MapPin className="w-5 h-5 text-blue-400" />
//             </div>
//             <div>
//               <div className="text-sm text-gray-400">Location</div>
//               <div className="text-white font-medium">Dhaka</div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="py-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0 text-gray-400">
//             © {new Date().getFullYear()} DVANTA{" "}
//             <span className="text-blue-400">SCALE</span>. All rights reserved.
//           </div>

//           <div className="flex items-center space-x-6">
//             {/* Social Links */}
//             <div className="flex items-center space-x-4">
//               {socialLinks.map((social) => (
//                 <a
//                   key={social.label}
//                   href={social.href}
//                   aria-label={social.label}
//                   className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300"
//                 >
//                   {social.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Award,
  Globe,
} from "lucide-react";
import Image from "next/image";

const FooterPremium = () => {
  const footerLinks = {
    "Digital Solutions": [
      { name: "SEO Optimization", href: "/services/seo" },
      { name: "PPC Advertising", href: "/services/ppc" },
      { name: "Social Media Marketing", href: "/services/social-media" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "Content Marketing", href: "/services/content-marketing" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Blog", href: "/blog" },
      { name: "Whitepapers", href: "/whitepapers" },
      { name: "Webinars", href: "/webinars" },
      { name: "Tools", href: "/tools" },
      { name: "Support", href: "/support" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Compliance", href: "/compliance" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const certifications = [
    { name: "Google Partner", icon: Award },
    { name: "GDPR Compliant", icon: Shield },
    { name: "ISO Certified", icon: Globe },
  ];

  return (
    <footer className="bg-linear-to-r from-[#0B1221] via-blue-950 to-[#0B1221] text-white">
      {/* Top Section */}
      <div className="border-b border-white/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 py-16">
            {/* Brand Info */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DS</span>
                </div>
                <div>
                  <div className="text-2xl font-bold">DVANTA SCALE</div>
                  <div className="text-blue-400 text-sm">
                    Digital Transformation Agency
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                We transform businesses through innovative digital strategies,
                delivering measurable results and sustainable growth.
              </p>

              {/* Newsletter */}
              <div className="mb-8 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-white">Stay Updated</h4>
                </div>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-gray-500 text-xs mt-2">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-6">Get in Touch</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Phone</div>
                      <div className="text-white font-medium">
                        +8801722440899
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <div className="text-white font-medium">
                        hello@dvatascale.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Location</div>
                      <div className="text-white font-medium">
                        Dhaka, Bangladesh
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h4 className="font-semibold text-white mb-6">
                  Business Hours
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Links */}
      <div className="border-b border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 py-16 ">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-white mb-6">{category}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <div className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Certifications */}
            <div>
              <h4 className="font-semibold text-white mb-6">Certifications</h4>
              <div className="space-y-4">
                {certifications.map((cert) => {
                  const Icon = cert.icon;
                  return (
                    <div key={cert.name} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-400 text-sm">{cert.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container-custom">
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DVANTA SCALE. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/5 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>

        {/* Made With Love */}
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-gray-500 text-sm">
            Made with ❤️ in Bangladesh • Building digital futures since 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPremium;
