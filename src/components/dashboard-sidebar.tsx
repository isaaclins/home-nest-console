
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Server,
  Terminal,
  Code,
  Database,
  Settings,
  Users,
  Activity,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  collapsed: boolean;
  active: boolean;
}

const SidebarItem = ({ icon, label, path, collapsed, active }: SidebarItemProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={path}>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center justify-start w-full gap-3 px-3 py-2 h-auto",
                active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50",
                collapsed ? "justify-center px-2" : ""
              )}
            >
              <span className={cn("h-5 w-5", active ? "text-primary" : "")}>{icon}</span>
              {!collapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

interface NavigationSectionProps {
  title: string;
  items: Array<{ icon: React.ReactNode; label: string; path: string }>;
  collapsed: boolean;
}

const NavigationSection = ({ title, items, collapsed }: NavigationSectionProps) => {
  const location = useLocation();
  
  return (
    <div className="space-y-1">
      {!collapsed && (
        <div className="px-3 py-1">
          <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider">{title}</p>
        </div>
      )}
      {items.map((item) => (
        <SidebarItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          path={item.path}
          collapsed={collapsed}
          active={location.pathname === item.path}
        />
      ))}
    </div>
  );
};

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { icon: <LayoutDashboard />, label: "Dashboard", path: "/" },
    { icon: <Server />, label: "Services", path: "/services" },
    { icon: <Terminal />, label: "Terminal", path: "/terminal" },
    { icon: <Code />, label: "Git Repos", path: "/repositories" },
  ];

  const systemNavItems = [
    { icon: <Database />, label: "Storage", path: "/storage" },
    { icon: <Users />, label: "Users", path: "/users" },
    { icon: <Activity />, label: "Activity", path: "/activity" },
    { icon: <Settings />, label: "Settings", path: "/settings" },
    { icon: <Folder />, label: "File Browser", path: "/files" },
  ];

  return (
    <div 
      className={cn(
        "flex flex-col h-screen border-r bg-sidebar border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-3">
        {!collapsed && (
          <div className="flex items-center space-x-2 px-1">
            <Server className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sidebar-foreground">HomeServer</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8 text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>
      <Separator className="bg-sidebar-border" />
      <ScrollArea className="flex-1 py-2">
        <div className="space-y-4 px-2">
          <NavigationSection title="Main" items={mainNavItems} collapsed={collapsed} />
          <Separator className="bg-sidebar-border/50 mx-2" />
          <NavigationSection title="System" items={systemNavItems} collapsed={collapsed} />
        </div>
      </ScrollArea>
      <Separator className="bg-sidebar-border" />
      <div className="p-3 flex items-center">
        <div className="status-indicator status-online mr-2" />
        <span className={cn("text-xs text-sidebar-foreground/70", collapsed && "hidden")}>System Online</span>
      </div>
    </div>
  );
}
