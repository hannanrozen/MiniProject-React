import Background from "../assets/icons/background.svg";

const CallToAction = () => {
  return (
    <section className="py-16 px-6 md:px-12">
      <div
        className="max-w-5xl mx-auto bg-white/60 backdrop-blur-sm rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-lg  bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Background})`,
          backfaceVisibility: "hidden",
        }}
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">
            We’d love to walk you through the platform
          </h2>
          <p className="text-indigo-700">
            Fill in the form and we’ll schedule a free demo!
          </p>
        </div>

        {/* Form Section */}
        <form className="md:w-1/2 space-y-4 w-full">
          <input
            type="text"
            placeholder="Enter Your Name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="tel"
            placeholder="Enter Your Phone Number"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Enter Your City"
            className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CallToAction;
