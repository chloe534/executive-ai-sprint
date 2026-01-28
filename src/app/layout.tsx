import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 14-Day Executive AI Sprint",
  description: "Master AI-assisted leadership, one day at a time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-executive-bg font-sans antialiased">
        <main className="px-6 py-12 md:py-20">{children}</main>
      </body>
    </html>
  );
}
