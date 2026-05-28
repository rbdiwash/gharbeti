import {
  CreditCard,
  Wrench,
  Bell,
  MessageSquare,
  FileText,
  Shield,
  Users,
  BarChart2,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Digital Rent Tracking",
    description:
      "Record and view payment history with automatic calculations. No more spreadsheets or paperwork.",
    color: "bg-brand-green/10 text-brand-green",
  },
  {
    icon: Wrench,
    title: "Maintenance Requests",
    description:
      "Tenants submit requests instantly. Landlords track and update statuses in real time.",
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    icon: Bell,
    title: "Notices & Announcements",
    description:
      "Landlords broadcast notices to all tenants instantly — water cuts, events, or policy changes.",
    color: "bg-brand-orange/10 text-brand-orange",
  },
  {
    icon: MessageSquare,
    title: "In-App Chat",
    description:
      "Direct messaging between landlords and tenants. No need to exchange personal numbers.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: FileText,
    title: "Lease Management",
    description:
      "Store and view lease agreements digitally. Both parties can access them anytime.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Shield,
    title: "Biometric Login",
    description:
      "Secure your account with fingerprint or face authentication for quick, safe access.",
    color: "bg-red-100 text-brand-red",
  },
  {
    icon: Users,
    title: "Tenant Onboarding",
    description:
      "Invite tenants via a unique code. They set up their own account — hassle-free.",
    color: "bg-brand-green/10 text-brand-green",
  },
  {
    icon: BarChart2,
    title: "Financial Reports",
    description:
      "Get a clear overview of dues, collections, and expenses to stay on top of your property.",
    color: "bg-brand-blue/10 text-brand-blue",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Everything You Need</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            From rent collection to maintenance — Gharbeti handles the full
            lifecycle of the landlord–tenant relationship.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card group">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                >
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-navy mb-2 text-[15px]">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
