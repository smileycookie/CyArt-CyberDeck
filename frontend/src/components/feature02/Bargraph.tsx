// \\components\feature02\Bargraph.tsx

"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useSocket } from "@/hooks/useSocket"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TimeRange = "1h" | "24h" | "7d" | "30d" | "90d"


const chartConfig = {
  windows: { label: "Windows", color: "var(--chart-1)" },
  linux: { label: "Linux", color: "var(--chart-3)" },
} satisfies ChartConfig

const timeLabel: Record<TimeRange, string> = {
  "1h": "Last hour",
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 3 months",
}

export function ChartBarInteractive() {
  const { agents } = useSocket()
  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d")
  
  const generateChartData = () => {
    const days = timeRange === "1h" ? 1 : timeRange === "24h" ? 1 : 
                timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    
    const data = []
    const windowsAgents = agents.filter(a => a.osIcon === 'windows').length
    const linuxAgents = agents.filter(a => a.osIcon === 'ubuntu' || a.osIcon === 'linux').length
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      const windowsActivity = Math.floor(Math.random() * windowsAgents * 10) + windowsAgents * 5
      const linuxActivity = Math.floor(Math.random() * linuxAgents * 8) + linuxAgents * 3
      
      data.push({
        date: date.toISOString().split('T')[0],
        windows: windowsActivity,
        linux: linuxActivity
      })
    }
    return data
  }
  
  const chartData = generateChartData()

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Events Visualisation</CardTitle>
          <CardDescription>
            Showing agent activity by OS for {timeLabel[timeRange]} • {agents.length} agents
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex" aria-label="Select time range">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Bar dataKey="windows" stackId="a" fill="var(--color-windows)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="linux" stackId="a" fill="var(--color-linux)" radius={[0, 0, 4, 4]} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
