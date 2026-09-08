import "./globals.css";

export const metadata = {
  title: "Portfolio: Kudakwashe Jasi",
  description: "Portfolio of Kudakwashe Jasi, a full stack developer.",
  icons: {
    icon: "/images/portfolio/icons8-portfolio-64.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
