"use client"

import { useSocket } from "@/hooks/useSocket"
import { useEffect, useState } from "react"
import AgentDetailView from "./deviceDetails"

interface AgentDetailViewWrapperProps {
  initialAgent: any
}

export default function AgentDetailViewWrapper({ initialAgent }: AgentDetailViewWrapperProps) {
  const { agents } = useSocket()
  const [agent, setAgent] = useState(initialAgent)
  
  // Debug
  console.log('Socket agents:', agents?.length)
  console.log('Initial agent:', initialAgent?.id)
  
  // Update agent with real-time data when available
  useEffect(() => {
    if (agents && agents.length > 0 && initialAgent) {
      // Try to find agent by ID
      const updatedAgent = agents.find(a => {
        return a.id === initialAgent.id || 
               (initialAgent.id.startsWith('AGT-') && a.id === initialAgent.id.replace('AGT-', '')) ||
               (!initialAgent.id.startsWith('AGT-') && a.id === `AGT-${initialAgent.id}`)
      })
      
      if (updatedAgent) {
        console.log('Found updated agent:', updatedAgent.id, updatedAgent.status)
        setAgent({
          ...initialAgent,
          ...updatedAgent,
          status: updatedAgent.status // Ensure status is updated
        })
      }
    }
  }, [agents, initialAgent])
  
  // Debug log to see all available agents
  useEffect(() => {
    if (agents && agents.length > 0) {
      console.log(`Available agents (${agents.length}):`, agents.map(a => `${a.id} (${a.name}) - ${a.status}`))
    }
  }, [agents])
  
  return <AgentDetailView agent={agent} />
}