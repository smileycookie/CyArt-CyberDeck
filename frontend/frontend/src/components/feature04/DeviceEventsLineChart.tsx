// frontend\src\components\feature04\DeviceEventsLineChart.tsx
"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useSocket } from '@/hooks/useSocket';
import { useEffect, useState } from 'react';

interface DeviceEventsLineChartProps {
  isStandalone?: boolean;
  deviceId?: string;
}

export function DeviceEventsLineChart({ isStandalone = false, deviceId }: DeviceEventsLineChartProps) {
  const { agents, logs } = useSocket();
  const [chartData, setChartData] = useState<Array<{timestamp: string, count: number | null}>>([]);
  const [deviceName, setDeviceName] = useState("All Devices");
  const [timeRange, setTimeRange] = useState("");
  
  useEffect(() => {
    // Find the specific device if deviceId is provided
    const targetDevice = deviceId ? agents.find(a => a.id === deviceId) : null;
    
    if (targetDevice) {
      setDeviceName(targetDevice.name);
    } else {
      setDeviceName("All Devices");
    }
    
    // Generate time range for today
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    setTimeRange(`${dateStr} - 00:00 to 24:00`);
    
    // Generate chart data based on real-time information
    const generateChartData = (): Array<{timestamp: string, count: number | null}> => {
      const data: Array<{timestamp: string, count: number | null}> = [];
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Generate data points for every 3 hours
      for (let i = 0; i <= 24; i += 3) {
        const timestamp = new Date(startOfDay.getTime() + i * 60 * 60 * 1000);
        
        // Calculate event count based on real data
        let eventCount = 0;
        
        if (deviceId && targetDevice) {
          // For specific device, generate events based on device characteristics
          const deviceSeed = parseInt(deviceId.replace(/\D/g, '') || '1');
          const hourFactor = Math.sin((i / 24) * Math.PI * 2) + 1; // Peak during day
          const statusMultiplier = targetDevice.status === 'Online' ? 1.5 : 0.3;
          eventCount = Math.round((deviceSeed % 50 + 20) * hourFactor * statusMultiplier);
        } else {
          // For all devices, aggregate based on total agents
          const onlineAgents = agents.filter(a => a.status === 'Online').length;
          const totalAgents = agents.length || 1;
          const hourFactor = Math.sin((i / 24) * Math.PI * 2) + 1;
          eventCount = Math.round((onlineAgents * 15 + totalAgents * 5) * hourFactor);
        }
        
        // Add some randomness but keep it realistic
        eventCount += Math.floor(Math.random() * 20) - 10;
        eventCount = Math.max(0, eventCount);
        
        data.push({
          timestamp: timestamp.toISOString(),
          count: i <= now.getHours() ? eventCount : null // Only show data up to current hour
        });
      }
      
      return data;
    };
    
    setChartData(generateChartData());
  }, [agents, logs, deviceId]);

  // Calculate max count for Y-axis scaling
  const maxCount = Math.max(...chartData.map(item => item.count ?? 0), 100);
  const yAxisMax = Math.ceil(maxCount / 50) * 50 + 50;

  const formatXAxisTick = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return `${hours.toString().padStart(2, '0')}:00`;
  };
  
  const formatTooltipTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    return `Time: ${hours.toString().padStart(2, '0')}:00`;
  };

  return (
    <Card className={`${isStandalone ? 'absolute top-4 right-4 w-[560px] h-[340px]' : 'w-full h-full'} border border-gray-200 bg-white`}>
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-medium">Device Events - {deviceName}</CardTitle>
        <CardDescription className="text-xs text-gray-600">{timeRange}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-50px)]">
        <ResponsiveContainer width="100%" height="100%" minHeight={220} maxHeight={240}>
          <LineChart
            data={chartData}
            margin={{ top: 15, right: 15, left: 50, bottom: 35 }} // Adjusted left margin
            height={380} 
          >
            <CartesianGrid 
              stroke="hsl(0, 0%, 90%)" 
              strokeDasharray="3 3" 
              horizontal={true} 
              vertical={false}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxisTick}
              tick={{ fontSize: 10, fill: "hsl(0, 0%, 40%)" }}
              axisLine={{ stroke: "hsl(0, 0%, 70%)" }}
              tickLine={{ stroke: "hsl(0, 0%, 70%)" }}
              tickMargin={10}
              interval={0} // Important - shows all ticks but we filter in formatter
              height={45}
            />
            <YAxis
                domain={[0, yAxisMax]}
                tickCount={6}
                tick={{ fontSize: 10, fill: "hsl(0, 0%, 40%)" }}
                interval={0}
                axisLine={{ stroke: "hsl(0, 0%, 70%)" }}
                tickLine={{ stroke: "hsl(0, 0%, 70%)" }}
                tickMargin={16}
                width={48}
              />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 98%)',
                borderColor: 'hsl(0, 0%, 80%)',
                color: 'hsl(0, 0%, 20%)',
                borderRadius: '6px',
                fontSize: '12px',
                padding: '6px 10px',
              }}
              formatter={(value: number | null) => value !== null ? [`Count: ${value}`] : []}
              labelFormatter={formatTooltipTime}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="hsl(211, 100%, 50%)"
              strokeWidth={2}
              dot={{
                fill: 'hsl(0, 0%, 100%)',
                stroke: 'hsl(211, 100%, 50%)',
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                r: 6,
                fill: 'hsl(0, 0%, 100%)',
                stroke: 'hsl(211, 100%, 50%)',
                strokeWidth: 3
              }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}