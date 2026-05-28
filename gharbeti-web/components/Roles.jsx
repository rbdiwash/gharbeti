import { CheckCircle2 } from "lucide-react";

const roles = [
  {
    id: "landlords",
    badge: "For Landlords",
    badgeColor: "bg-navy text-white",
    title: "Run Your Property Like a Pro",
    description:
      "Everything you need to manage tenants, collect rent, and keep your property running smoothly — from one simple app.",
    perks: [
      "Add and manage multiple tenants",
      "Track monthly dues and rent history",
      "Record payments and generate receipts",
      "Send notices to all tenants at once",
      "View and resolve maintenance requests",
      "Chat directly with individual tenants",
      "Store lease agreements digitally",
      "Get financial overview and reports",
    ],
    accent: "brand-green",
    bg: "bg-navy",
    textColor: "text-white",
    descColor: "text-white/70",
    checkColor: "text-brand-green",
  },
  {
    id: "tenants",
    badge: "For Tenants",
    badgeColor: "bg-brand-green text-white",
    title: "Stay On Top of Your Tenancy",
    description:
      "Never miss a rent deadline or maintenance update. Gharbeti keeps you informed and in control of your rental experience.",
    perks: [
      "View rent due and payment history",
      "Pay rent via eSewa, Khalti, and more",
      "Submit and track maintenance requests",
      "Receive notices from your landlord",
      "Access your lease agreement anytime",
      "Chat directly with your landlord",
      "Get push notification reminders",
      "Secure biometric login",
    ],
    accent: "navy",
    bg: "bg-white",
    textColor: "text-navy",
    descColor: "text-gray-500",
    checkColor: "text-brand-green",
  },
];

export default function Roles() {
  return (
    <section id="landlords" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-label">Two Roles, One App</span>
          <h2 className="section-title">Built for Both Sides</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Whether you own the property or rent it, Gharbeti gives you the
            tools tailored to your role.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              id={role.id}
              className={`rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm ${role.bg}`}
            >
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 ${role.badgeColor}`}
              >
                {role.badge}
              </span>

              <h3 className={`text-2xl font-bold mb-3 ${role.textColor}`}>
                {role.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-7 ${role.descColor}`}>
                {role.description}
              </p>

              <ul className="space-y-3">
                {role.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className={`mt-0.5 flex-shrink-0 ${role.checkColor}`}
                    />
                    <span
                      className={`text-sm ${
                        role.textColor === "text-white"
                          ? "text-white/80"
                          : "text-gray-600"
                      }`}
                    >
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
