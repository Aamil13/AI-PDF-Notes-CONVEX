import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex transition-all duration-700 h-screen">
      <Sidebar />
      <div className="w-full h-full  sm:pe-4">
        <Navbar />
        <div className="w-full heightExcludingNav max-sm:px-4">{children}</div>
      </div>
    </div>
  );
}
