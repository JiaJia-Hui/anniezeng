import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JZ — Jiahui Zeng",
  description: "Personal portfolio of Jiahui Zeng, a passionate developer building thoughtful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
