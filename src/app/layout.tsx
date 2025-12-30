import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Questly - Learn Smarter, Score Higher",
  description: "Free global education platform with AI-powered questions. Practice Math, Science, Physics, Chemistry, Biology and more. Join students worldwide!",
  keywords: ["education", "learning", "quiz", "questions", "math", "science", "physics", "chemistry", "biology", "free"],
  openGraph: {
    title: "Questly - Learn Smarter, Score Higher",
    description: "Free global education platform with AI-powered questions",
    url: "https://questlyonline.com",
    siteName: "Questly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${inter.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
