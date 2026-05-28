const steps = [
  {
    step: "01",
    role: "Landlord",
    title: "Sign Up & Add Your Property",
    description:
      "Create a landlord account, set up your profile, and add your rental property details.",
  },
  {
    step: "02",
    role: "Landlord",
    title: "Invite Your Tenants",
    description:
      "Generate a unique invitation code and share it with your tenant. They register using that code.",
  },
  {
    step: "03",
    role: "Tenant",
    title: "Tenant Sets Up Their Account",
    description:
      "The tenant verifies the invitation, sets a password, and logs in to their personal dashboard.",
  },
  {
    step: "04",
    role: "Both",
    title: "Manage & Communicate",
    description:
      "Landlords record rent, send notices, and manage maintenance. Tenants pay, request repairs, and stay updated.",
  },
];

const roleColors = {
  Landlord: "bg-navy text-white",
  Tenant: "bg-brand-green text-white",
  Both: "bg-brand-orange text-white",
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-label">Simple Process</span>
          <h2 className="section-title">How Gharbeti Works</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Getting started is quick. You can be up and running in minutes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <div key={item.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-200 z-0 -translate-x-1/2" />
              )}

              <div className="card relative z-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-gray-100">
                    {item.step}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColors[item.role]}`}
                  >
                    {item.role}
                  </span>
                </div>
                <h3 className="font-semibold text-navy text-[15px] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
