import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 space-y-6 px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

