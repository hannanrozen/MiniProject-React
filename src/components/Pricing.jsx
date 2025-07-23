import React from "react";

const plans = [
  {
    title: "Basic",
    subtitle: "For individuals",
    price: "$10",
    desc: "This plan offers the essential features to start your journey to success without spending a lot of money.",
    features: [
      "All analytics features",
      "Normal support",
      "Up to 3 team members",
    ],
    button: "Get started",
    highlight: false,
    action: "/register",
  },
  {
    title: "Pro",
    subtitle: "For startups",
    price: "$50",
    desc: "It is the choice of professionals and businesses who aim to improve their performance and capabilities.",
    features: [
      "All analytics features",
      "Premium support",
      "Up to 40 team members",
    ],
    button: "Get started",
    highlight: true,
    action: "/register",
  },
  {
    title: "Enterprise",
    subtitle: "For big companies",
    price: "$100",
    desc: "Designed offers a comprehensive set of features and services to drive your success.",
    features: [
      "All analytics features",
      "Normal support",
      "Up to 100 team members",
    ],
    button: "Call sales",
    highlight: false,
    action: "#contact",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6 md:px-12 bg-white text-center">
      <h2 className="text-3xl font-bold text-dark mb-4">
        Our Plans Suit Your Business
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Choose the plan that suits your business best and take a step closer to
        achieving your objectives with ease
      </p>

      {/* Toggle */}
      <div className="mb-12 flex justify-center items-center gap-4 text-sm font-medium">
        <span className="text-gray-500">Monthly</span>
        <div className="w-12 h-6 bg-[#4F46E5] rounded-full flex items-center px-1">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <span className="text-gray-400">Annually</span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 border ${
              plan.highlight
                ? "bg-[#4F46E5] text-white border-[#4F46E5]"
                : "bg-white text-dark border-gray-200"
            } shadow-md transition hover:shadow-lg`}
          >
            <p
              className={`text-sm ${
                plan.highlight ? "text-white" : "text-gray-500"
              }`}
            >
              {plan.subtitle}
            </p>
            <h3 className={`text-2xl font-bold mt-1 mb-2`}>{plan.title}</h3>
            <p
              className={`text-sm mb-4 ${
                plan.highlight ? "text-white/90" : "text-gray-600"
              }`}
            >
              {plan.desc}
            </p>
            <div className="text-3xl font-bold mb-1">{plan.price}</div>
            <div className="text-sm text-gray-400 mb-6">/monthly</div>

            <ul
              className={`space-y-2 text-left mb-6 ${
                plan.highlight ? "text-white" : "text-gray-700"
              }`}
            >
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#10B981]">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a href={plan.action}>
              <button
                className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-white text-[#4F46E5] hover:bg-gray-100"
                    : "bg-[#4F46E5] text-white hover:bg-[#4338ca]"
                }`}
              >
                {plan.button}
              </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
