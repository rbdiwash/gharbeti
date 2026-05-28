const links = {
  Product: ["Features", "How It Works", "For Landlords", "For Tenants"],
  Company: ["About Us", "Privacy Policy", "Terms of Service", "Contact"],
  Support: ["Help Center", "FAQ", "Report a Bug", "Feedback"],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark border-t border-white/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-white font-bold text-xl">Gharbeti</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Smart rental management for Nepal's landlords and tenants. Simple,
              digital, and built for you.
            </p>
            <p className="text-white/30 text-xs mt-4">
              Gharbeti Technologies Pvt. Ltd.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="text-white font-semibold text-sm mb-4">{group}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {year} Gharbeti Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-white/20 text-sm">Made with ♥ in Nepal 🇳🇵</p>
        </div>
      </div>
    </footer>
  );
}
