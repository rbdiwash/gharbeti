const methods = [
  { name: "eSewa", color: "#60B246", description: "Nepal's leading digital wallet" },
  { name: "Khalti", color: "#5C2D91", description: "Fast & secure mobile payments" },
  { name: "Connect IPS", color: "#003087", description: "Interbank payment system" },
  { name: "FonePay", color: "#E8131B", description: "QR-based payment network" },
];

export default function PaymentMethods() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="section-label">Payments</span>
          <h2 className="section-title">Pay the Nepal Way</h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Gharbeti supports all major Nepali digital payment methods so
            tenants can pay rent with what they already use.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {methods.map((method) => (
            <div
              key={method.name}
              className="card flex flex-col items-center text-center gap-3 py-8"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: method.color }}
              >
                {method.name[0]}
              </div>
              <div>
                <p className="font-semibold text-navy">{method.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
