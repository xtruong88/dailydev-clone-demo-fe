import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0E1217] text-white`}>
        <Navbar />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-56 mt-16 p-4">
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-[1fr_300px] gap-4">
                {children}
                {/* Right Panel */}
                <aside className="hidden xl:block space-y-4">
                  <div className="bg-[#1A1F26] rounded-xl p-4">
                    <h3 className="text-sm font-medium mb-2">Promoted</h3>
                    {/* Promoted content goes here */}
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
