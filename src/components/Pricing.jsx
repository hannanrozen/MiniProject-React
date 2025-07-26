import React, { useState } from "react";

const plans = [
  {
    title: "Starter",
    subtitle: "Perfect for individuals",
    price: "$10",
    yearlyPrice: "$96",
    desc: "Essential features to kickstart your team management journey with professional-grade tools.",
    features: [
      "Advanced Analytics Dashboard",
      "Email Support (24h response)",
      "Up to 5 team members",
      "Basic reporting tools",
      "Mobile app access",
    ],
    button: "Start Free Trial",
    highlight: false,
    action: "/register",
    popular: false,
  },
  {
    title: "Professional",
    subtitle: "Best for growing teams",
    price: "$50",
    yearlyPrice: "$480",
    desc: "Comprehensive solution for businesses scaling their operations with advanced collaboration features.",
    features: [
      "Everything in Starter",
      "Priority Support (2h response)",
      "Up to 50 team members",
      "Advanced analytics & insights",
      "Custom integrations",
      "Team collaboration tools",
    ],
    button: "Start Free Trial",
    highlight: true,
    action: "/register",
    popular: true,
  },
  {
    title: "Enterprise",
    subtitle: "For large organizations",
    price: "$100",
    yearlyPrice: "$960",
    desc: "Enterprise-grade features with unlimited scalability and dedicated support for large organizations.",
    features: [
      "Everything in Professional",
      "Dedicated Account Manager",
      "Unlimited team members",
      "Custom white-label solution",
      "API access & webhooks",
      "Advanced security features",
      "Custom training sessions",
    ],
    button: "Contact Sales",
    highlight: false,
    action: "#contact",
    popular: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="py-20 px-6 md:px-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#4F46E5]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#4F46E5]/10 rounded-full text-[#4F46E5] text-sm font-medium mb-6">
            Flexible Pricing Plans
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-[#4F46E5] to-purple-600 bg-clip-text text-transparent">
              Growth Plan
            </span>
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Unlock your team's potential with our comprehensive plans designed
            to scale with your business. Start free and upgrade as you grow.
          </p>

          {/* Pricing Toggle */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-lg">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                !isYearly
                  ? "bg-[#4F46E5] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#4F46E5]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                isYearly
                  ? "bg-[#4F46E5] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#4F46E5]"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 border-2 backdrop-blur-sm transition-all duration-300 hover:transform hover:-translate-y-2 ${
                plan.highlight
                  ? "bg-[#4F46E5] text-white border-[#4F46E5] shadow-2xl scale-105"
                  : "bg-white/80 text-gray-900 border-white/20 shadow-xl hover:shadow-2xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <p
                  className={`text-sm font-medium mb-2 ${
                    plan.highlight ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {plan.subtitle}
                </p>

                <h3 className="text-2xl font-black mb-4">{plan.title}</h3>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black">
                      {isYearly ? plan.yearlyPrice : plan.price}
                    </span>
                    <span
                      className={`ml-2 text-sm ${
                        plan.highlight ? "text-white/70" : "text-gray-500"
                      }`}
                    >
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>

                  {isYearly && (
                    <p
                      className={`text-sm mt-2 ${
                        plan.highlight ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      Save $
                      {parseInt(plan.price) * 12 - parseInt(plan.yearlyPrice)}{" "}
                      annually
                    </p>
                  )}
                </div>

                <p
                  className={`text-sm leading-relaxed ${
                    plan.highlight ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {plan.desc}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-white/20" : "bg-emerald-100"
                      }`}
                    >
                      <svg
                        className={`w-3 h-3 ${
                          plan.highlight ? "text-white" : "text-emerald-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-sm ${
                        plan.highlight ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a href={plan.action} className="block">
                <button
                  className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 ${
                    plan.highlight
                      ? "bg-white text-[#4F46E5] hover:bg-gray-100 shadow-lg"
                      : "bg-gradient-to-r from-[#4F46E5] to-purple-600 text-white hover:from-[#4F46E5]/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {plan.button}
                  {plan.title !== "Enterprise" && (
                    <span className="block text-xs mt-1 opacity-80">
                      14-day free trial • No credit card required
                    </span>
                  )}
                </button>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Need a custom solution? Our enterprise team is here to help.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-[#4F46E5] font-semibold rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Talk to Sales Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
