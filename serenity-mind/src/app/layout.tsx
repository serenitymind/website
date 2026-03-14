import type { Metadata } from "next";
import "./globals.css";

/**
 * Root layout — wraps all pages
 * SEO metadata for the psychiatry practice
 */
export const metadata: Metadata = {
  title: "Serenity Mind Psychiatry | Expert Mental Health Care",
  description:
    "Compassionate, evidence-based psychiatric care for adults and adolescents. Book your consultation today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
