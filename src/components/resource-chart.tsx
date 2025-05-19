
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ResourceChartProps {
  title: string;
  resource: "cpu" | "memory" | "network" | "storage";
  className?: string;
}

type DataPoint = {
  time: string;
  value: number;
};

export function ResourceChart({ title, resource, className }: ResourceChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  
  // Generate mock data
  useEffect(() => {
    const generateData = () => {
      const baseValue = {
        cpu: 30,
        memory: 45,
        network: 20,
        storage: 60,
      }[resource];
      
      const variance = {
        cpu: 20,
        memory: 15,
        network: 30,
        storage: 5,
      }[resource];
      
      const now = new Date();
      const points: DataPoint[] = [];
      
      for (let i = 10; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 30000);
        points.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: Math.max(0, Math.min(100, baseValue + Math.random() * variance - variance / 2)),
        });
      }
      
      setData(points);
    };
    
    generateData();
    const interval = setInterval(generateData, 30000);
    
    return () => clearInterval(interval);
  }, [resource]);
  
  const chartColor = {
    cpu: "#3b82f6", // blue
    memory: "#10b981", // green
    network: "#8b5cf6", // purple
    storage: "#f97316", // orange
  }[resource];

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: "#444" }}
                tickLine={{ stroke: "#444" }}
              />
              <YAxis 
                domain={[0, 100]} 
                tickCount={3} 
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: "#444" }}
                tickLine={{ stroke: "#444" }}
                width={25}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(222.2 84% 4.9%)",
                  borderColor: "hsl(217.2 32.6% 17.5%)",
                  fontSize: "12px",
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={chartColor} 
                strokeWidth={2}
                dot={false}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Current: {data[data.length - 1]?.value.toFixed(1)}%</span>
          <span>Max: {Math.max(...data.map(d => d.value)).toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
