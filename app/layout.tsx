import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDMECA - From Framework to Execution to Evidence",
  description:
    "MBA-level business frameworks accessible to entrepreneurs through hands-on delivery + AI-enabled tooling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
