import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopNav } from "@/components/sidebar/mobileNav";
import { Sidebar } from "@/components/sidebar/sidebar";
import { MobileSidebar } from "@/components/sidebar/mobileSlider";

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
  
      <TopNav onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
      
        <div className="hidden md:block">
          <Sidebar />
        </div>

      
        <MobileSidebar
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}