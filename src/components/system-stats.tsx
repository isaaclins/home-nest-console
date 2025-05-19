
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Cpu, HardDrive, Wifi } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function SystemStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="CPU Load"
        value="32%"
        description="4 cores @ 3.5GHz"
        icon={<Cpu className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Memory Usage"
        value="2.6GB / 8GB"
        description="32.5% utilization"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Storage"
        value="1.2TB / 4TB"
        description="30% capacity used"
        icon={<HardDrive className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Network"
        value="12.4 MB/s"
        description="Current throughput"
        icon={<Wifi className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
