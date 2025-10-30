import { NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, BarChart3, User, LogOut, PlusCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toast } from 'sonner';

const menuItems = [
  { title: 'Post Job', url: '/dashboard', icon: PlusCircle },
  { title: 'Jobs Posted', url: '/dashboard/jobs', icon: Briefcase },
  { title: 'Customer Analysis', url: '/dashboard/analysis', icon: BarChart3 },
  { title: 'Profile', url: '/dashboard/profile', icon: User },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={({ isActive }) =>
                        `transition-smooth ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : 'hover:bg-sidebar-accent/50'
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
