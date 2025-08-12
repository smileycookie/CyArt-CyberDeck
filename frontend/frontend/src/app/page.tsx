// \frontend\src\app\page.tsx
'use client'

import { useState, useEffect } from "react"
import Sidebar from "@/components/feature03/FieldSidebar"
import TimestampGraph from "@/components/feature03/TimestampGraph"
import Header from "@/components/feature03/header"
import SearchBar from "@/components/feature03/searchbar"
import { ChartBarInteractive } from "@/components/feature02/Bargraph"
import { LogEventTable } from "@/components/feature02/LogEventTable"
import { useSocket } from "@/hooks/useSocket"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeviceEventsLineChart } from "@/components/feature04/DeviceEventsLineChart"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"
import Link from "next/link"

export default function SOCDashboardPage() {
  const { logs, agents } = useSocket()
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("00:00")
  const [endTime, setEndTime] = useState("23:59")
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState<{start: Date | null, end: Date | null}>({start: null, end: null})
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [showTimestampGraph, setShowTimestampGraph] = useState(false)
  
  // Find agent when searching by ID or name
  useEffect(() => {
    if (searchQuery) {
      const foundAgent = agents.find(agent => 
        agent.id === searchQuery || 
        agent.name.toLowerCase() === searchQuery.toLowerCase()
      )
      
      if (foundAgent) {
        setSelectedAgent(foundAgent.id)
      } else {
        setSelectedAgent(null)
      }
    } else {
      setSelectedAgent(null)
    }
  }, [searchQuery, agents])
   

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header - spans full width */}
      <Header />
      
      {/* Content area with sidebar and main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="overflow-y-auto">
          <Sidebar onShowTimestampGraph={() => setShowTimestampGraph(true)} />
        </div>
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Inner content */}
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Search + Quick Time */}
            <SearchBar 
              onSearch={setSearchQuery}
              onDateFilter={(start, end) => setDateRange({start, end})}
              onRefresh={() => {
                setSearchQuery('')
                setDateRange({start: null, end: null})
                setSelectedAgent(null)
              }}
            />
            
            {/* Agent Overview (shows when agent is found in search) */}
            {selectedAgent && (
              <Card className="w-full border border-gray-200 shadow-sm mb-6">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl font-bold">Agent Overview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Link href={`/devices/${selectedAgent}`} target="_blank">
                      <Button variant="outline" size="sm" className="h-8">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedAgent(null)} className="h-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {agents.filter(a => a.id === selectedAgent).map(agent => (
                    <div key={agent.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Agent Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{agent.name}</h3>
                          <Badge className={agent.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}>
                            {agent.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Agent ID</p>
                            <p className="font-medium">{agent.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">IP Address</p>
                            <p className="font-medium">{agent.ip}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Operating System</p>
                            <p className="font-medium">{agent.os}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Version</p>
                            <p className="font-medium">{agent.version}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Seen</p>
                            <p className="font-medium">{new Date(agent.lastSeen).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">CVSS</p>
                            <p className="font-medium">{agent.cvss}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Agent Events Chart */}
                      <div className="md:col-span-2 h-[250px]">
                        <DeviceEventsLineChart deviceId={agent.id} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {/* Bar Chart */}
            <ChartBarInteractive />
            
            {/* Log Table */}
            <LogEventTable logs={logs} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
      
      {/* Timestamp Graph Modal */}
      {showTimestampGraph && (
        <TimestampGraph onClose={() => setShowTimestampGraph(false)} />
      )}
    </div>
  )
}