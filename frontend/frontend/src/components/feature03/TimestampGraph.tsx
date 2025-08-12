'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useSocket } from '@/hooks/useSocket'

interface TimestampGraphProps {
  onClose: () => void
}

export default function TimestampGraph({ onClose }: TimestampGraphProps) {
  const { agents, logs } = useSocket()
  const [chartData, setChartData] = useState<Array<{hour: string, count: number}>>([])

  useEffect(() => {
    // Process timestamps to create hourly distribution
    const hourCounts: {[key: string]: number} = {}
    
    // Initialize all hours
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0') + ':00'
      hourCounts[hour] = 0
    }
    
    // Count agent last seen times by hour
    agents.forEach(agent => {
      if (agent.lastSeen) {
        const date = new Date(agent.lastSeen)
        const hour = date.getHours().toString().padStart(2, '0') + ':00'
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
      }
    })
    
    // Count log timestamps by hour
    logs.forEach(log => {
      if (log.timestamp) {
        const date = new Date(log.timestamp)
        const hour = date.getHours().toString().padStart(2, '0') + ':00'
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
      }
    })
    
    // Convert to chart data
    const data = Object.entries(hourCounts).map(([hour, count]) => ({
      hour,
      count
    }))
    
    setChartData(data)
  }, [agents, logs])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[800px] h-[600px] max-w-[90vw] max-h-[90vh]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">📅 Timestamp Distribution</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[calc(100%-80px)]">
          <div className="mb-4 text-sm text-gray-600">
            Distribution of timestamps across 24-hour period (Agent activity + Log events)
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                tick={{ fontSize: 12 }}
                interval={2}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                formatter={(value: number) => [`${value} events`, 'Count']}
                labelFormatter={(label: string) => `Time: ${label}`}
              />
              <Bar 
                dataKey="count" 
                fill="#3B82F6" 
                radius={[2, 2, 0, 0]}
                name="Events"
              />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <div className="font-medium text-blue-800">Total Events</div>
              <div className="text-2xl font-bold text-blue-900">
                {chartData.reduce((sum, item) => sum + item.count, 0)}
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <div className="font-medium text-green-800">Peak Hour</div>
              <div className="text-2xl font-bold text-green-900">
                {chartData.reduce((max, item) => item.count > max.count ? item : max, {hour: 'N/A', count: 0}).hour}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}