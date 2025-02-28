import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guitar Note Fun - Learn Guitar Notes the Fun Way!",
  description: "An interactive app for kids to learn guitar notation through fun gameplay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-[#fef6e4]">
        <nav className="neo-brutalism bg-[#f3d2c1] mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  href="/"
                  className="flex items-center px-2 py-2 text-black hover:text-[#f582ae] transition-colors"
                >
                  <span className="text-xl font-bold">🎸 Guitar Note Fun</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/game"
                  className="neo-brutalism-button bg-[#f582ae] text-black hover:text-white transition-colors"
                >
                  Play
                </Link>
                <Link
                  href="/settings"
                  className="neo-brutalism-button bg-[#8bd3dd] text-black hover:text-white transition-colors"
                >
                  Settings
                </Link>
                <Link
                  href="/help"
                  className="neo-brutalism-button bg-[#f3d2c1] text-black hover:text-white transition-colors"
                >
                  Help
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
