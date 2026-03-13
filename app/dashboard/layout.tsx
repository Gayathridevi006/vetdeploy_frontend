import ProtectedRoute from "@/components/home/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      {/* Since this is a dashboard, you usually want a 
          shared Sidebar or Header for all sub-pages. 
      */}
      <div className="">
        <main className="w-full bg-white text-white">
          {children} {/* This renders the specific sub-page */}
        </main>
      </div>
    </ProtectedRoute>
  );
}