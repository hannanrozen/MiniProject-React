import React from "react";
import LogoFooter from "../assets/icons/logofooter.svg";
import { Twitter, Linkedin, Github, MessageSquare, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Team Directory", href: "/home" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "Twitter",
      href: "#",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: <Github className="w-5 h-5" />,
    },
    {
      name: "Discord",
      href: "#",
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <img
                    src={LogoFooter}
                    alt="Staffinity Logo"
                    className="h-10 w-auto mr-3"
                  />
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Empowering teams worldwide with intelligent management
                  solutions. Build stronger teams, drive better results, and
                  scale your success.
                </p>

                {/* Newsletter Signup */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Stay Updated
                  </h4>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4F46E5] transition-colors"
                    />
                    <button className="px-4 py-2 bg-[#4F46E5] hover:bg-[#4F46E5]/80 rounded-r-lg transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 hover:bg-[#4F46E5] rounded-lg flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">Product</h3>
                  <ul className="space-y-3">
                    {footerSections.product.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
                  <ul className="space-y-3">
                    {footerSections.legal.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>© {currentYear} Staffinity. All rights reserved.</span>
              </div>

              {/* Additional Info */}
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Enterprise Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
