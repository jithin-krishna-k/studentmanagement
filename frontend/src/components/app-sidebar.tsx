import { Users, UserCheck, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    navigate("/auth/login", { replace: true });
  };

  const items = [
    {
      title: "Home",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      url: "/students",
      icon: Users,
    },
    ...(user?.role === "SuperAdmin"
      ? [
        {
          title: "Staff",
          url: "/staff",
          icon: UserCheck,
        },
      ]
      : []),
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
    },
  ];

  return (
    <div className="relative">
      {/* ✅ Trigger positioned separately and visible on all screens */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <SidebarTrigger />
      </div>

      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl mb-3 mt-2">
              Student Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === "Logout" ? (
                        <a href="#" onClick={handleLogout}>
                          <div className="w-5 h-5 mr-3 ml-4">
                            <item.icon />
                          </div>
                          <span className="text-lg font-sans">
                            {item.title}
                          </span>
                        </a>
                      ) : (
                        <a href={item.url}>
                          <div className="w-5 h-5 mr-3 ml-4">
                            <item.icon />
                          </div>
                          <span className="text-lg font-sans">
                            {item.title}
                          </span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
