import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kim's Store",
  description: "Ecommerce Platform Built with Next.js By K.H.J",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // React에서 렌더링 가능한 모든 것을 의미
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
