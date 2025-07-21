const features = [
  {
    title: "Visual Organization",
    desc: "See your entire team in a dynamic org chart.",
  },
  {
    title: "HR Analytics",
    desc: "Track growth, engagement, and retention trends easily.",
  },
  {
    title: "Recognize Excellence",
    desc: "Celebrate employee milestones and achievements.",
  },
  {
    title: "Smart Notifications",
    desc: "Get reminders for contracts, events, and more.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-600">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Features;
