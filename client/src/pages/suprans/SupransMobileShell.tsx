export default function SupransMobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative w-[375px] h-[812px] overflow-hidden shadow-2xl"
        style={{ fontFamily: "var(--suprans-font)" }}
      >
        {children}
      </div>
    </div>
  );
}
