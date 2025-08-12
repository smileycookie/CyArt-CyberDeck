'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { Agent } from '@/types/agents'

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [agents, setAgents] = useState<Agent[]>([])
  const [logs, setLogs] = useState<any[]>(() => {
    // Load logs from localStorage on init
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wazuh-logs')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Dynamically determine the backend URL based on current host
    const getBackendUrl = () => {
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname
        // If accessing via IP or domain, use that for backend
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
          return `http://${hostname}:3000`
        }
      }
      return 'http://localhost:3000'
    }
    
    const backendUrl = getBackendUrl()
    console.log('Connecting to backend:', backendUrl)
    const socketInstance = io(backendUrl, {
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })
    
    socketInstance.on('connect', () => {
      setConnected(true)
      console.log('Connected to Wazuh backend')
      // Clear localStorage and request fresh data
      localStorage.removeItem('wazuh-logs')
    })

    socketInstance.on('disconnect', () => {
      setConnected(false)
      console.log('Disconnected from Wazuh backend')
    })

    socketInstance.on('reconnect', () => {
      console.log('Reconnected to Wazuh backend')
      setConnected(true)
    })

    socketInstance.on('agents:initial', (data: any[]) => {
      console.log('Received initial agents:', data.length)
      setAgents(formatAgents(data))
    })

    socketInstance.on('agents:update', (data: any[]) => {
      console.log('Agents updated:', data.length)
      setAgents(formatAgents(data))
    })

    socketInstance.on('logs:initial', (data: any[]) => {
      console.log('Received initial logs:', data.length)
      if (data && data.length > 0) {
        const formattedLogs = formatLogs(data)
        setLogs(formattedLogs)
        localStorage.setItem('wazuh-logs', JSON.stringify(formattedLogs))
      }
    })

    socketInstance.on('logs:update', (data: any[]) => {
      console.log('Logs updated:', data.length)
      if (data && data.length > 0) {
        const formattedLogs = formatLogs(data)
        setLogs(formattedLogs)
        localStorage.setItem('wazuh-logs', JSON.stringify(formattedLogs))
      }
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const formatAgents = (data: any[]): Agent[] => {
    console.log('Formatting agents:', data)
    return data.map(agent => {
      // Ensure ID format is consistent with mock data
      let agentId = agent.id
      if (!agentId.startsWith('AGT-') && !isNaN(Number(agentId))) {
        agentId = `AGT-${agentId.padStart(3, '0')}`
      }
      const osName = agent.os?.name || 'Unknown'
      const osIcon = osName.toLowerCase().includes('windows') ? 'windows' : 
                    osName.toLowerCase().includes('ubuntu') ? 'ubuntu' : 'linux'
      
      // Check if agent is disconnected (status_code 4 or 5 means disconnected)
      const isDisconnected = agent.status_code === 4 || agent.status_code === 5 || agent.status === 'disconnected'
      
      return {
        id: agentId,
        name: agent.name,
        ip: agent.ip || 'N/A',
        mac: agent.mac || `00:1A:2B:${Math.random().toString(16).substr(2, 2)}:4D:${Math.random().toString(16).substr(2, 2)}`,
        os: `${osName} ${agent.os?.version || ''}`.trim(),
        osIcon: osIcon as 'windows' | 'linux' | 'ubuntu',
        cvss: Math.floor(Math.random() * 10),
        status: isDisconnected ? 'Offline' : 'Online',
        lastSeen: agent.lastKeepAlive || agent.dateAdd || new Date().toISOString(),
        version: agent.version || 'Unknown',
        domain: 'PRODUCTION',
        uptime: 'N/A',
        cpu: 'N/A',
        memory: 'N/A',
        storage: 'N/A',
        location: 'Data Center'
      }
    })
  }

  const formatLogs = (data: any[]): any[] => {
    console.log('Raw log data sample:', data.slice(0, 2))
    return data.map((log, index) => {
      // Preserve all backend fields
      return {
        ...log, // Keep all original fields
        id: log.id || `log-${index}`,
        timestamp: log.timestamp || new Date().toISOString(),
        agentName: log.agentName || 'wazuh-server',
        agentId: log.agentId || '000',
        agentIp: log.agentIp || 'N/A',
        ruleId: log.ruleId || 'N/A',
        level: log.level || 'INFO',
        message: log.message || log.description || 'Security alert',
        location: log.location || 'unknown',
        decoder: log.decoder || 'wazuh',
        full_log: log.full_log || '',
        manager: log.manager || 'wazuh-server',
        input_type: log.input_type || 'log',
        rule_level: log.rule_level,
        rule_groups: log.rule_groups || [],
        rule_description: log.rule_description || log.message,
        _index: log._index
      }
    })
  }

  return { socket, agents, logs, connected }
}