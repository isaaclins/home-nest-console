
import { DashboardShell } from "@/components/dashboard-shell";
import { ServiceCard } from "@/components/service-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal, Code, Database, Globe, Activity, Server, Monitor, Wifi } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Services = () => {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage and configure your home server services.
          </p>
        </div>
        
        <Separator />

        <div className="flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search services..." className="pl-8" />
          </div>
          <Button>
            <Server className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
            <TabsTrigger value="stopped">Stopped</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                name="Ollama Chat"
                description="Local AI chat interface powered by Ollama"
                icon={<Terminal className="h-4 w-4" />}
                status="online"
                url="/services/ollama"
              />
              <ServiceCard
                name="Git Repositories"
                description="Self-hosted Git repository management"
                icon={<Code className="h-4 w-4" />}
                status="online"
                url="/repositories"
              />
              <ServiceCard
                name="Web Terminal"
                description="Browser-based terminal access to server"
                icon={<Terminal className="h-4 w-4" />}
                status="warning"
                url="/terminal"
              />
              <ServiceCard
                name="File Server"
                description="Network file storage and sharing solution"
                icon={<Database className="h-4 w-4" />}
                status="online"
                url="/files"
              />
              <ServiceCard
                name="User Management"
                description="Manage user accounts and permissions"
                icon={<Users className="h-4 w-4" />}
                status="maintenance"
              />
              <ServiceCard
                name="Activity Monitor"
                description="Real-time server activity tracking"
                icon={<Activity className="h-4 w-4" />}
                status="offline"
              />
              <ServiceCard
                name="Web Proxy"
                description="Reverse proxy for web services"
                icon={<Globe className="h-4 w-4" />}
                status="online"
              />
              <ServiceCard
                name="Docker Manager"
                description="Container management interface"
                icon={<Server className="h-4 w-4" />}
                status="online"
              />
              <ServiceCard
                name="Network Monitor"
                description="Local network monitoring and analytics"
                icon={<Wifi className="h-4 w-4" />}
                status="warning"
              />
            </div>
          </TabsContent>
          <TabsContent value="running" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                name="Ollama Chat"
                description="Local AI chat interface powered by Ollama"
                icon={<Terminal className="h-4 w-4" />}
                status="online"
                url="/services/ollama"
              />
              <ServiceCard
                name="Git Repositories"
                description="Self-hosted Git repository management"
                icon={<Code className="h-4 w-4" />}
                status="online"
                url="/repositories"
              />
              <ServiceCard
                name="Web Terminal"
                description="Browser-based terminal access to server"
                icon={<Terminal className="h-4 w-4" />}
                status="warning"
                url="/terminal"
              />
              <ServiceCard
                name="File Server"
                description="Network file storage and sharing solution"
                icon={<Database className="h-4 w-4" />}
                status="online"
                url="/files"
              />
              <ServiceCard
                name="Web Proxy"
                description="Reverse proxy for web services"
                icon={<Globe className="h-4 w-4" />}
                status="online"
              />
              <ServiceCard
                name="Docker Manager"
                description="Container management interface"
                icon={<Server className="h-4 w-4" />}
                status="online"
              />
            </div>
          </TabsContent>
          <TabsContent value="stopped" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                name="Activity Monitor"
                description="Real-time server activity tracking"
                icon={<Activity className="h-4 w-4" />}
                status="offline"
              />
            </div>
          </TabsContent>
          <TabsContent value="system" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                name="User Management"
                description="Manage user accounts and permissions"
                icon={<Users className="h-4 w-4" />}
                status="maintenance"
              />
              <ServiceCard
                name="Network Monitor"
                description="Local network monitoring and analytics"
                icon={<Wifi className="h-4 w-4" />}
                status="warning"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
};

const Search = ({ className, ...props }: React.ComponentProps<typeof Wifi>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Users = ({ className, ...props }: React.ComponentProps<typeof Wifi>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default Services;
