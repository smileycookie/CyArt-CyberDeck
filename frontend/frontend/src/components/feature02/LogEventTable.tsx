// \components\feature02\LogEventTable.tsx

"use client"

import React, { useState, useEffect } from "react"
import { LogEvent } from "@/types/log-event"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useSocket } from "@/hooks/useSocket"

interface LogEventTableProps {
  logs?: LogEvent[]
  searchQuery?: string
}

export function LogEventTable({ logs: propLogs, searchQuery = '' }: LogEventTableProps) {
  const { logs: socketLogs } = useSocket()
  const allLogs = propLogs || socketLogs
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Check if search is for timestamp only
  const showOnlyTimestamp = searchQuery.toLowerCase().includes('timestamp')
  
  // Check if search is for specific columns
  const isColumnSearch = /agent|rule\s*id|level|decoder|location/i.test(searchQuery)
  const searchedColumns = {
    agent: /agent/i.test(searchQuery),
    ruleId: /rule\s*id/i.test(searchQuery),
    level: /level/i.test(searchQuery),
    decoder: /decoder/i.test(searchQuery),
    location: /location/i.test(searchQuery)
  }
  
  // Filter logs based on search query
  const logs = allLogs.filter(log => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    
    // Check if searching for ISO timestamp format (YYYY-MM-DDTHH:MM:SSZ)
    if (/\d{4}-\d{2}-\d{2}t\d{2}:\d{2}:\d{2}z?/i.test(query)) {
      return log.timestamp && log.timestamp.toLowerCase().includes(query)
    }
    
    // Check if searching for a specific date (YYYY-MM-DD format)
    if (/\d{4}-\d{2}-\d{2}/.test(query)) {
      return log.timestamp && log.timestamp.includes(query)
    }
    
    // Check if searching for a specific time (HH:MM format)
    if (/\d{1,2}:\d{2}/.test(query)) {
      return log.timestamp && log.timestamp.includes(query)
    }
    
    // General search across all fields
    return (
      log.timestamp?.toLowerCase().includes(query) ||
      log.agentName?.toLowerCase().includes(query) ||
      String(log.ruleId || '').toLowerCase().includes(query) ||
      log.level?.toString().toLowerCase().includes(query) ||
      log.decoder?.toLowerCase().includes(query) ||
      log.location?.toLowerCase().includes(query) ||
      log.description?.toLowerCase().includes(query)
    )
  })

  console.log('LogEventTable - allLogs:', allLogs, 'length:', allLogs?.length)
  console.log('LogEventTable - socketLogs:', socketLogs, 'length:', socketLogs?.length)
  console.log('LogEventTable - filtered logs:', logs, 'length:', logs?.length)

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id))
  }

  return (
    <div className="border rounded-md overflow-auto max-h-[600px]">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 w-10"></th>
            <th className="px-4 py-2">Timestamp</th>
            {!showOnlyTimestamp && (
              <>
                {(!isColumnSearch || searchedColumns.agent) && <th className="px-4 py-2">Agent</th>}
                {(!isColumnSearch || searchedColumns.ruleId) && <th className="px-4 py-2">Rule ID</th>}
                {(!isColumnSearch || searchedColumns.level) && <th className="px-4 py-2">Level</th>}
                {(!isColumnSearch || searchedColumns.decoder) && <th className="px-4 py-2">Decoder</th>}
                {(!isColumnSearch || searchedColumns.location) && <th className="px-4 py-2">Location</th>}
              </>
            )}
          </tr>
        </thead>
      <tbody>
          {logs && logs.length > 0 ? logs.map((log) => (
            <React.Fragment key={log.id}>
              <tr
                className="border-b hover:bg-accent cursor-pointer"
                onClick={() => toggleRow(log.id)}
              >
                <td className="px-4">
                  {expandedRow === log.id ? (
                    <ChevronDown key="down" size={16} />
                  ) : (
                    <ChevronRight key="right" size={16} />
                  )}
                </td>
                <td className="px-4 py-2">{log.timestamp}</td>
                {!showOnlyTimestamp && (
                  <>
                    {(!isColumnSearch || searchedColumns.agent) && <td className="px-4 py-2">{log.agentName}</td>}
                    {(!isColumnSearch || searchedColumns.ruleId) && <td className="px-4 py-2">{log.ruleId}</td>}
                    {(!isColumnSearch || searchedColumns.level) && <td className="px-4 py-2 font-semibold text-orange-600">{log.level}</td>}
                    {(!isColumnSearch || searchedColumns.decoder) && <td className="px-4 py-2">{log.decoder}</td>}
                    {(!isColumnSearch || searchedColumns.location) && <td className="px-4 py-2">{log.location}</td>}
                  </>
                )}
              </tr>

              {expandedRow === log.id && (
                <tr className="bg-muted">
                  <td colSpan={showOnlyTimestamp ? 2 : (isColumnSearch ? 
                    1 + (searchedColumns.agent ? 1 : 0) + (searchedColumns.ruleId ? 1 : 0) + 
                    (searchedColumns.level ? 1 : 0) + (searchedColumns.decoder ? 1 : 0) + 
                    (searchedColumns.location ? 1 : 0) : 7)} className="px-4 py-3 border-b">
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Description:</strong> {log.rule_description || log.description || log.message || 'N/A'}
                      </p>
                      <p>
                        <strong>Groups:</strong>{" "}
                        {(log.rule_groups && Array.isArray(log.rule_groups) ? log.rule_groups.join(", ") : log.groups?.join(", ")) || "N/A"}
                      </p>
                      <p>
                        <strong>HIPAA:</strong>{" "}
                        {log.hipaa?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>PCI-DSS:</strong>{" "}
                        {log.pci_dss?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>Full Log:</strong>{" "}
                        <code className="block bg-background p-2 rounded text-xs whitespace-pre-wrap">
                          {(log.full_log || log.fullLog || 'N/A').substring(0, 100)}...
                        </code>
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          )) : (
            <tr>
              <td colSpan={showOnlyTimestamp ? 2 : (isColumnSearch ? 
                1 + (searchedColumns.agent ? 1 : 0) + (searchedColumns.ruleId ? 1 : 0) + 
                (searchedColumns.level ? 1 : 0) + (searchedColumns.decoder ? 1 : 0) + 
                (searchedColumns.location ? 1 : 0) : 7)} className="px-4 py-8 text-center text-muted-foreground">
                {logs === undefined ? 'Loading logs...' : 'No log events found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
