const HeroSection = () => {
  return (
    <section className="pt-28 pb-20 px-6 md:px-12 bg-gray-50 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Build a Stronger Connection
        <br />
        with Your Team
      </h1>
      <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
        Staffinity helps modern HR teams manage employees, track performance,
        and strengthen workplace collaboration.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
          Try Demo
        </button>
        <button className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200">
          Learn More
        </button>
      </div>
    </section>
  );
};
export default HeroSection;
