import useAppStore from "@/Store/useAppStore";

export const PricingSection = () => {
  const { theme } = useAppStore();
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-4xl font-bold mb-6 ${
            theme === "light"
              ? "bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          }`}
        >
          Simple Pricing
        </h2>
        <p
          className={`text-xl mb-12 ${
            theme === "light" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Choose the plan that works best for you
        </p>
        <div
          className={`backdrop-blur-lg rounded-2xl p-8 border transition-all hover:scale-105 ${
            theme === "light"
              ? "bg-white/80 border-gray-200 hover:shadow-xl"
              : "bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:shadow-2xl"
          }`}
        >
          <p className="text-lg">Pricing details coming soon...</p>
        </div>
      </div>
    </section>
  );
};
