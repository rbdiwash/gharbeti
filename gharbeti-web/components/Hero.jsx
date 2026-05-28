import { ArrowRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-navy min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star size={13} className="text-brand-green fill-brand-green" />
            Built for Nepal's rental market
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Smarter Rental
            <span className="text-brand-green block">Management</span>
            for Everyone
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
            Gharbeti bridges the gap between landlords and tenants — making rent
            tracking, maintenance, notices, and digital payments effortless in
            Nepal.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#download" className="btn-primary">
              Download the App
              <ArrowRight size={16} />
            </a>
            <a href="#features" className="btn-secondary">
              See Features
            </a>
          </div>

          <div className="mt-12 flex gap-8">
            {[
              { value: "2", label: "User Roles" },
              { value: "10+", label: "Core Features" },
              { value: "4", label: "Payment Methods" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-white/50 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:flex justify-center relative">
          <div className="w-64 h-[500px] bg-white/5 border border-white/20 rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
            <div className="bg-navy-dark px-6 pt-10 pb-6">
              <p className="text-white/50 text-xs mb-1">Good morning 👋</p>
              <p className="text-white font-semibold text-lg">Ram Bahadur</p>
            </div>
            <div className="flex-1 bg-gray-50 p-4 space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-1">Rent Due</p>
                <p className="text-2xl font-bold text-navy">Rs 15,000</p>
                <span className="text-xs text-red-500 font-medium">● Due this month</span>
              </div>
              <div className="bg-brand-green rounded-xl p-4">
                <p className="text-xs text-white/70 mb-1">Last Payment</p>
                <p className="text-lg font-bold text-white">Rs 15,000</p>
                <p className="text-xs text-white/70 mt-0.5">Paid on Magh 1, 2081</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-2">Quick Actions</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Pay Rent", "Notices", "Chat"].map((a) => (
                    <div key={a} className="bg-gray-50 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-navy font-medium">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 top-20 bg-white rounded-2xl p-3 shadow-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-green/10 rounded-full flex items-center justify-center">
              <span className="text-brand-green text-xs">✓</span>
            </div>
            <div>
              <p className="text-navy text-xs font-semibold">Rent Recorded</p>
              <p className="text-gray-400 text-[10px]">Just now</p>
            </div>
          </div>

          <div className="absolute -left-4 bottom-24 bg-white rounded-2xl p-3 shadow-lg">
            <p className="text-navy text-xs font-semibold">🔔 New Notice</p>
            <p className="text-gray-400 text-[10px] mt-0.5">Water outage tomorrow</p>
          </div>
        </div>
      </div>
    </section>
  );
}
