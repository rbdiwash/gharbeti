import { Smartphone, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="download" className="py-24 bg-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 text-center">
          <div className="w-14 h-14 bg-brand-green/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone size={28} className="text-brand-green" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Simplify
            <span className="text-brand-green"> Renting?</span>
          </h2>

          <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
            Join landlords and tenants across Nepal who are managing their
            rental relationship the smart way with Gharbeti.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white text-navy font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.4.07 2.38.74 3.2.8 1.22-.24 2.39-.93 3.7-.84 1.58.13 2.77.74 3.54 1.9-3.24 1.94-2.47 5.9.56 7.02-.65 1.63-1.49 3.24-3 4zm-3.6-17.7c.06 2.3-1.7 4.16-3.87 4.09C9.18 4.23 11.06 2 13.45 2.58z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-brand-green text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76a2 2 0 0 0 2.73.74l10.42-6.01-2.84-2.84-10.31 8.11zm15.8-12.18L5.56.53A2 2 0 0 0 3 1.33L14.15 12.5l4.83-.92zm2.09 4.66-3.08-1.78-3.27 3.27 3.27 3.27 3.1-1.79a2 2 0 0 0 0-3.47zm-17.89.83L5.56 18.6l13.42-7.74-2.83-2.83L3.18 17.07z" />
              </svg>
              Google Play
              <ArrowRight size={16} />
            </a>
          </div>

          <p className="text-white/30 text-sm mt-6">
            Available for iOS and Android · Free to download
          </p>
        </div>
      </div>
    </section>
  );
}
