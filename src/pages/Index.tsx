
import { DashboardShell } from "@/components/dashboard-shell";
import { ServiceCard } from "@/components/service-card";
import { SystemStats } from "@/components/system-stats";
import { ResourceChart } from "@/components/resource-chart";
import { Terminal, Code, Database, Globe, Users, Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your home server services.
          </p>
        </div>
        
        <Separator />
        
        <SystemStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResourceChart title="CPU Usage" resource="cpu" />
          <ResourceChart title="Memory Usage" resource="memory" />
          <ResourceChart title="Network Activity" resource="network" />
          <ResourceChart title="Storage Usage" resource="storage" />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Services</h2>
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
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Index;
