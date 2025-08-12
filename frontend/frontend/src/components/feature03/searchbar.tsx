// frontend\src\components\feature03\searchbar.tsx
'use client'

import { useState } from 'react'
import { Search, Calendar, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSocket } from '@/hooks/useSocket'

// Timestamp Visualization Component
function TimestampVisualization({ logs }: { logs: any[] }) {
  const [showAll, setShowAll] = useState(false)
  const displayLogs = showAll ? logs : logs.slice(0, 5)
  
  return (
    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-medium text-blue-800 mb-2">📅 Timestamp Visualization</h4>
      <div className="space-y-1 text-xs max-h-60 overflow-y-auto">
        {displayLogs.map((log, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
            <span className="font-mono text-blue-700">{log.timestamp}</span>
            <span className="text-gray-600">- {log.agentName}</span>
          </div>
        ))}
      </div>
      {logs.length > 5 && (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-blue-600 text-xs">
            {showAll ? `Showing all ${logs.length} timestamps` : `Showing 5 of ${logs.length} timestamps`}
          </span>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 text-xs font-medium underline"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  )
}

interface SearchBarProps {
  onSearch?: (query: string) => void
  onDateFilter?: (start: Date | null, end: Date | null) => void
  onRefresh?: () => void
}

export default function SearchBar({ onSearch, onDateFilter, onRefresh }: SearchBarProps) {
  const { agents, logs } = useSocket()
  const [searchQuery, setSearchQuery] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [formattedStart, setFormattedStart] = useState('')
  const [formattedEnd, setFormattedEnd] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)

  const formatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  } as const

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleQuickSelect = (range: string) => {
    const now = new Date()
    let start: Date
    let dateStr = ''
    
    switch(range) {
      case 'Last 1 hour':
        start = new Date(now.getTime() - 60 * 60 * 1000)
        break
      case 'Last 12 hours':
        start = new Date(now.getTime() - 12 * 60 * 60 * 1000)
        break
      case 'Last 24 hours':
        start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        dateStr = now.toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
        break
      case 'Last 3 days':
        start = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
        break
      case 'Last 7 days':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      default:
        start = now
    }
    
    onDateFilter?.(start, now)
    setFormattedStart(new Intl.DateTimeFormat('en-US', formatOptions).format(start))
    setFormattedEnd(new Intl.DateTimeFormat('en-US', formatOptions).format(now))
    
    // Set search query to date string for 'Last 24 hours' to show today's timestamps
    if (dateStr) {
      setSearchQuery(dateStr)
      onSearch?.(dateStr)
    }
  }

  const handleApply = () => {
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null
    
    if (start) {
      const formatted = new Intl.DateTimeFormat('en-US', formatOptions).format(start)
      setFormattedStart(formatted)
    }
    if (end) {
      const formatted = new Intl.DateTimeFormat('en-US', formatOptions).format(end)
      setFormattedEnd(formatted)
    }

    onDateFilter?.(start, end)
    setPopoverOpen(false)
  }

  const handleRefresh = () => {
    setSearchQuery('')
    setStartDate('')
    setEndDate('')
    setFormattedStart('')
    setFormattedEnd('')
    onRefresh?.()
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        {/* Search Field */}
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search agents, IPs, timestamps, or logs..." 
            className="w-full pl-10" 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Quick Time Range Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Quick Select
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            {['Last 1 hour', 'Last 12 hours', 'Last 24 hours', 'Last 3 days', 'Last 7 days'].map((label) => (
              <DropdownMenuItem key={label} onClick={() => handleQuickSelect(label)}>
                {label} {label === 'Last 24 hours' && <span className="text-xs text-gray-500 ml-1">(show today)</span>}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Custom DateTime Picker in Popover */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            
          </PopoverTrigger>
          <PopoverContent className="w-80 space-y-4">
            <div className="space-y-2">
              <Label>Absolute Start</Label>
              <Input
                type="datetime-local"
                step="1" // Enable seconds
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Absolute End</Label>
              <Input
                type="datetime-local"
                step="1" // Enable seconds
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleApply}>
              Apply
            </Button>
          </PopoverContent>
        </Popover>

        {/* Refresh Button */}
        <Button variant="ghost" className="text-orange-600 hover:bg-orange-50" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh 
        </Button>
      </div>

      {/* Display Search Results Summary */}
      {searchQuery && (
        <div className="text-sm text-gray-600 mt-2">
          <strong>Search:</strong> "{searchQuery}" - Found {agents.filter(a => 
            a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.ip.includes(searchQuery) ||
            a.status.toLowerCase().includes(searchQuery.toLowerCase())
          ).length} agents
          
          {/* Column filter search results */}
          {/agent|rule\s*id|level|decoder|location/i.test(searchQuery) && (
            <div className="mt-1 p-2 bg-teal-50 rounded border border-teal-200">
              📊 <strong>Column Filter:</strong> Showing only {searchQuery.split(/[,\s]+/).filter(s => s.trim()).join(', ')} columns
            </div>
          )}
          
          {/* ISO timestamp search results */}
          {/\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}z?/i.test(searchQuery) && (
            <div className="mt-1 p-2 bg-indigo-50 rounded border border-indigo-200">
              ⏰ <strong>ISO Timestamp Filter:</strong> Exact match for {searchQuery} - Found {logs.filter(log => 
                log.timestamp && log.timestamp.toLowerCase().includes(searchQuery.toLowerCase())
              ).length} matching logs
            </div>
          )}
          
          {/* Show timestamp search results if query looks like a date/time */}
          {(searchQuery.includes(':') || searchQuery.includes('/') || searchQuery.includes('-')) && !/\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}z?/i.test(searchQuery) && (
            <div className="mt-1">
              Found {logs.filter(log => 
                log.timestamp && log.timestamp.toLowerCase().includes(searchQuery.toLowerCase())
              ).length} logs with matching timestamps
            </div>
          )}
          
          {/* Show timestamp visualization when searching for "timestamp" */}
          {searchQuery.toLowerCase().includes('timestamp') && (
            <TimestampVisualization logs={logs} />
          )}
        </div>
      )}
      
      {/* Display Formatted Dates */}
      {(formattedStart || formattedEnd) && (
        <div className="text-sm text-gray-600 mt-2">
          {formattedStart && <div><strong>Start:</strong> {formattedStart}</div>}
          {formattedEnd && <div><strong>End:</strong> {formattedEnd}</div>}
        </div>
      )}
    </div>
  )
}
