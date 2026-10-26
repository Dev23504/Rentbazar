
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  CalendarCheck,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/kyc", label: "KYC Verification", icon: ShieldCheck },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login", { replace: true });
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-bold">RentBazar</h2>
        <p className="mt-1 text-xs tracking-widest text-slate-400">
          ADMIN PANEL
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="m-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-300"
      >
        <LogOut size={19} />
        Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close sidebar overlay"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <aside className="relative h-full w-72">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-5 z-10 text-white"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-4 sm:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-semibold text-slate-800">
            Administration
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
            Admin
          </span>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
