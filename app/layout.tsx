import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from 'sonner';
// 1. Import your provider (adjust the path to where your file is located)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VetDeploy | Ministry of Defence Veteran Transition Platform",
  description:
    "VetDeploy helps military veterans transition into civilian careers by connecting them with trusted employers.",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          background: "#e9eff8",
          color: "#0f172a",
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}