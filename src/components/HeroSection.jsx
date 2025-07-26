const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4F46E5]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-full mb-8 shadow-lg">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-700">
            Trusted by 10,000+ companies worldwide
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
          Build a Stronger
          <span className="block bg-gradient-to-r from-[#4F46E5] to-purple-600 bg-clip-text text-transparent">
            Connection
          </span>
          with Your Team
        </h1>

        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
          Staffinity empowers modern HR teams to manage employees, track
          performance, and strengthen workplace collaboration with cutting-edge
          analytics and tools.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
          <button className="bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-[#4F46E5]/90 hover:to-purple-600/90 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
            Try Demo
          </button>
          <button className="bg-white/80 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-2xl hover:bg-white border border-white/20 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-black text-[#4F46E5] mb-2">10K+</div>
            <div className="text-sm font-semibold text-gray-600">
              Active Users
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-purple-600 mb-2">
              99.9%
            </div>
            <div className="text-sm font-semibold text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-600 mb-2">
              24/7
            </div>
            <div className="text-sm font-semibold text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
