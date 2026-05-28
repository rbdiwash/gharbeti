import "./globals.css";

export const metadata = {
  title: "Gharbeti — Smart Rental Management for Nepal",
  description:
    "Gharbeti connects landlords and tenants with digital rent tracking, maintenance requests, notices, and payment tools built for Nepal.",
  keywords: "gharbeti, rental management, nepal, landlord, tenant, rent, property",
  openGraph: {
    title: "Gharbeti — Smart Rental Management for Nepal",
    description:
      "The all-in-one app for landlords and tenants in Nepal. Track rent, manage maintenance, send notices, and pay digitally.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
