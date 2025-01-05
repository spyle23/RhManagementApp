import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Role } from '@/types/user';

interface DashboardLayoutProps {
  children: ReactNode;
  role: Role;
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar role={role} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 