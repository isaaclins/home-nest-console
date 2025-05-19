
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ServiceStatus = "online" | "offline" | "warning" | "maintenance";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  status: ServiceStatus;
  url?: string;
}

export function ServiceCard({ name, description, icon, status, url }: ServiceCardProps) {
  const statusMap = {
    online: { label: "Online", class: "status-online" },
    offline: { label: "Offline", class: "status-offline" },
    warning: { label: "Warning", class: "status-warning" },
    maintenance: { label: "Maintenance", class: "status-maintenance" },
  };

  const statusInfo = statusMap[status];

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="border-b border-border/30 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-secondary p-1.5 rounded-md">
              {icon}
            </div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={cn("status-indicator", statusInfo.class)} />
            <span className="text-xs text-muted-foreground">{statusInfo.label}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2 justify-end">
        <Button variant="outline" size="sm">Manage</Button>
        {url && status === "online" && (
          <Button variant="default" size="sm">
            Open
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
