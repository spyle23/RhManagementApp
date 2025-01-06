import { Role } from "@/types/user";
import {
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = {
  RH: [
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Employés", href: "/employees", icon: UsersIcon },
    { name: "Mes Congés", href: "/my-leaves", icon: CalendarIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
  Admin: [
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Employés", href: "/employees", icon: UsersIcon },
    { name: "Gestion des utilisateurs", href: "/users", icon: UsersIcon },
    { name: "Liste des congés", href: "/leaves", icon: CalendarIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
  Manager: [
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Équipe", href: "/team", icon: UsersIcon },
    { name: "Employés", href: "/employees", icon: UsersIcon },
    { name: "Liste des équipes", href: "/teams", icon: UserGroupIcon },
    { name: "Mes Congés", href: "/my-leaves", icon: CalendarIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
  Employee: [
    { name: "Mes Congés", href: "/my-leaves", icon: CalendarIcon },
    { name: "Équipe", href: "/team", icon: UsersIcon },
    { name: "Employés", href: "/employees", icon: UsersIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
};

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navigation[role] || [];

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-primary-700" : "text-gray-400"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
