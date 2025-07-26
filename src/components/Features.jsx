import React from "react";
import { GitBranch, BarChart3, Star, Bell, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Visual Organization",
    desc: "See your entire team in a dynamic org chart with real-time updates.",
    icon: <GitBranch className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "HR Analytics",
    desc: "Track growth, engagement, and retention trends with advanced analytics.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Recognize Excellence",
    desc: "Celebrate employee milestones and achievements with automated rewards.",
    icon: <Star className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Smart Notifications",
    desc: "Get intelligent reminders for contracts, events, and important dates.",
    icon: <Bell className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 px-6 md:px-12 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-10 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#4F46E5]/10 rounded-full mb-6">
            <span className="text-sm font-bold text-[#4F46E5]">
              ✨ POWERFUL FEATURES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Everything you need to manage your
            <span className="block bg-gradient-to-r from-[#4F46E5] to-purple-600 bg-clip-text text-transparent">
              dream team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Streamline your HR processes with our comprehensive suite of tools
            designed for modern workplaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#4F46E5] transition-colors duration-300">
                {feat.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {feat.desc}
              </p>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#4F46E5]/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white font-bold rounded-2xl hover:from-[#4F46E5]/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
            Explore All Features
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Features;
