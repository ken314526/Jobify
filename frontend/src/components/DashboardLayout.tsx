import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

const DashboardLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-6 shadow-sm">
            <SidebarTrigger />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">Job Portal Dashboard</h2>
            </div>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
