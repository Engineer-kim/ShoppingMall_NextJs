export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // React에서 렌더링 가능한 모든 것을 의미
}>) {
  return (
    <div className="flex-center min-h-screen w-full">
      {children}
    </div>
  );
}