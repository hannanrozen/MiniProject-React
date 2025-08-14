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
    support: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "System Status", href: "#" },
    ],
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/hannanrozen/",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/hannanrozen",
      icon: <Github className="w-5 h-5" />,
    },
  ];

  return (
    <footer
      data-testid="footer"
      className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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

            <div className="lg:col-span-2">
              <div className="flex justify-end">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-6">
                      Product
                    </h3>
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

                  <div>
                    <h3 className="text-lg font-bold text-white mb-6">
                      Support
                    </h3>
                    <ul className="space-y-3">
                      {footerSections.support.map((link) => (
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
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div className="flex items-center justify-center">
              <div className="text-gray-400 text-sm text-center">
                <span>© {currentYear} Staffinity. All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
