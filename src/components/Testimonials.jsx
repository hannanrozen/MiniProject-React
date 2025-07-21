const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-gray-50 py-20 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        What People Say
      </h2>
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600 italic">
            "Staffinity has completely changed how our HR team operates. We’re
            more connected and efficient."
          </p>
          <div className="mt-4 font-semibold text-indigo-600">
            — Nina, HR Manager
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600 italic">
            "The analytics and notifications helped us streamline team
            performance tracking."
          </p>
          <div className="mt-4 font-semibold text-indigo-600">
            — Reza, Head of People
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
