import {
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
export const navigation = {
  RH: [
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Employés", href: "/employees", icon: UsersIcon },
    { name: "Fiches de paies", href: "/payslip", icon: DocumentTextIcon },
    { name: "Mes Congés", href: "/my-leaves", icon: CalendarIcon },
    { name: "Liste des congés", href: "/leaves", icon: CalendarIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
  Admin: [
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Employés", href: "/employees", icon: UsersIcon },
    { name: "Gestion des utilisateurs", href: "/users", icon: UsersIcon },
    { name: "Liste des congés", href: "/leaves", icon: CalendarIcon },
    { name: "Liste des équipes", href: "/teams", icon: UserGroupIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
  Manager: [
    { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    { name: "Mon Équipe", href: "/my-team", icon: UsersIcon },
    { name: "Collaborateurs", href: "/employees", icon: UsersIcon },
    { name: "Fiches de paies", href: "/payslip", icon: DocumentTextIcon },
    { name: "Mes Congés", href: "/my-leaves", icon: CalendarIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
  Employee: [
    { name: "Mes Congés", href: "/my-leaves", icon: CalendarIcon },
    { name: "Mon Équipe", href: "/my-team", icon: UsersIcon },
    { name: "Fiches de paies", href: "/payslip", icon: DocumentTextIcon },
    { name: "Collaborateurs", href: "/employees", icon: UsersIcon },
    { name: "Paramètres", href: "/settings", icon: Cog6ToothIcon },
  ],
};
