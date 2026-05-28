import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exotic Pets World Pollachi",
  description:
    "Explore exotic pets, premium pet food, accessories, and expert guidance in Pollachi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
