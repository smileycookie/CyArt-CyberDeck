'use client'

import { useState } from "react"
import { useSocket } from "@/hooks/useSocket"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Agent } from "@/types/agents"

interface TableColumn {
  key: keyof Agent | string
  label: string
}

const getCVSSLabel = (score: number): "Critical" | "High" | "Medium" | "Low" => {
  if (score >= 9.0) return "Critical"
  if (score >= 7.0) return "High"
  if (score >= 4.0) return "Medium"
  return "Low"
}

const getCVSSBadge = (score: number) => {
  const label = getCVSSLabel(score)
  const colorMap = {
    Critical: "bg-red-700 text-white",
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white",
  }
  return <Badge className={colorMap[label]}>{label}</Badge>
}

const exportToCSV = (data: Agent[]) => {
  const header = ["ID", "Name", "IP", "MAC", "OS", "CVSS", "Status"]
  const rows = data.map((a) => [
    a.id,
    a.name,
    a.ip,
    a.mac,
    a.os,
    getCVSSLabel(a.cvss),
    a.status,
  ])
  const csvContent = [header, ...rows].map((r) => r.join(",")).join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", "agents.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function AgentTable() {
  const { agents, connected } = useSocket()
  const [search, setSearch] = useState("")
  const [cvssFilter, setCvssFilter] = useState<"all" | "low" | "medium" | "high" | "critical">("all")

  const filtered = agents.filter((agent) => {
    const matchSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.ip.includes(search) ||
      agent.mac.includes(search) ||
      agent.os.toLowerCase().includes(search.toLowerCase())
    const label = getCVSSLabel(agent.cvss).toLowerCase()
    const matchCVSS = cvssFilter === "all" || label === cvssFilter
    return matchSearch && matchCVSS
  })

  const handleRowClick = (agent: Agent) => {
    const url = `/devices/${agent.id}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const tableColumns: TableColumn[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "ip", label: "IP" },
    { key: "status", label: "Status" },
    { key: "os", label: "OS" },
    { key: "cvss", label: "CVSS" },
    { key: "lastSeen", label: "Last Seen" }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-muted-foreground">
          {connected ? 'Connected to Wazuh' : 'Disconnected'} • {agents.length} {agents.length === 1 ? 'agent' : 'agents'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search size={18} />
          <Input
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <select
            value={cvssFilter}
            onChange={(e) => setCvssFilter(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All CVSS</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <Button onClick={() => exportToCSV(filtered)}>Export CSV</Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border max-h-[400px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted">
            <tr>
              {tableColumns.map((col) => (
                <th key={col.key} className="px-2 py-2 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((agent) => (
              <tr
                key={agent.id}
                onDoubleClick={() => handleRowClick(agent)}
                className="hover:bg-muted cursor-pointer transition"
                title="Double click to view agent details"
              >
                {tableColumns.map((col) => (
                  <td key={`${agent.id}-${col.key}`} className="px-2 py-2">
                    {col.key === "status" ? (
                      <Badge className={agent.status === "Online" ? "bg-green-500" : "bg-red-500"}>
                        {agent.status}
                      </Badge>
                    ) : col.key === "cvss" ? (
                      getCVSSBadge(agent.cvss)
                    ) : col.key === "os" ? (
                      <span className="inline-flex items-center gap-1">
                        {agent.osIcon === "windows" && "🪟"}
                        {agent.osIcon === "linux" && "🐧"}
                        {agent.osIcon === "ubuntu" && "🟠"}
                        {agent.os}
                      </span>
                    ) : col.key === "lastSeen" ? (
                      new Date(agent.lastSeen).toLocaleString()
                    ) : (
                      agent[col.key as keyof Agent]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}