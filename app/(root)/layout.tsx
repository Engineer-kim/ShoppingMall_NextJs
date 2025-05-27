import type { Metadata } from "next";
import "@/assets/styles/globals.css";


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
    <div className="flex h-screen flex-col">
      <main className="flex-1 wrapper">
        {children}
      </main>
    </div>
  );
}