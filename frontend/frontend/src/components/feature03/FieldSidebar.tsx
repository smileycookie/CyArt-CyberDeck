// frontend\src\components\feature03\FieldSidebar.tsx
'use client'

import { useState, useEffect } from 'react'
import { Search, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useSocket } from '@/hooks/useSocket'

const availableFields = [
  //'🕐 @timestamp',
   '📊 _index', '🤖 ID', '🌐 IP', '👤 Agent Name',
//  '🔧 decoder.name', 
  // '📍 location', 
  //'👨‍💼 manager.name', '📥 input.type',
   '💬 Log'
]

// Map emojis to original field names
const emojiToField = {
  '📊 _index': '_index',
  '🤖 ID': 'agent.id',
  '🌐 IP': 'agent.ip',
  '👤 Agent Name': 'agent.name',
  '💬 Log': 'full_log'
}


interface FieldSidebarProps {
  onShowTimestampGraph?: () => void;
  onShowAgentRadarChart?: () => void;
  onShowTailscaleStatus?: () => void;
}

export default function FieldSidebar({ onShowTimestampGraph, onShowAgentRadarChart, onShowTailscaleStatus }: FieldSidebarProps) {
  const { agents } = useSocket()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [availableFieldsList, setAvailableFieldsList] = useState(availableFields)
  const [fieldData, setFieldData] = useState<{[key: string]: string[]}>({})  
  const [searchQuery, setSearchQuery] = useState('')
  const [openSections, setOpenSections] = useState({
    selected: true,
    available: false
  })
  const [showAgentIds, setShowAgentIds] = useState(false)
  const [showTailscaleStatus, setShowTailscaleStatus] = useState(false)
  const [elasticsearchData, setElasticsearchData] = useState<any[]>([])
  const [fieldClickInfo, setFieldClickInfo] = useState<any>(null)

  // Fetch real Elasticsearch data
  useEffect(() => {
    const fetchElasticsearchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/elasticsearch/alerts?limit=100')
        if (!response.ok) {
          console.warn('Elasticsearch API not available, using fallback data')
          return
        }
        const text = await response.text()
        if (!text) {
          console.warn('Empty response from Elasticsearch API')
          return
        }
        const result = JSON.parse(text)
        if (result.success && result.data) {
          setElasticsearchData(result.data)
          console.log('Loaded Elasticsearch data:', result.data.length, 'alerts')
        }
      } catch (error) {
    //    console.warn('Elasticsearch not available, using fallback data:', error.message)
      }
    }
    fetchElasticsearchData()
  }, [])

  const getFieldData = (field: string): string[] => {
    if (elasticsearchData.length > 0) {
      switch(field) {
        case '@timestamp':
          return elasticsearchData.map(item => new Date(item.timestamp).toLocaleString()).filter(Boolean)
        case '_index':
          return elasticsearchData.map(item => item.index)
        case 'agent.id':
          return elasticsearchData.map(item => item.agentId)
        case 'agent.ip':
          return elasticsearchData.map(item => item.agentIp)
        case 'agent.name':
          return elasticsearchData.map(item => item.agentName)
        case 'decoder.name':
          return elasticsearchData.map(item => item.decoderName)
        case 'location':
          return elasticsearchData.map(item => item.location)
        case 'manager.name':
          return elasticsearchData.map(item => item.managerName)
        case 'input.type':
          return elasticsearchData.map(item => item.inputType)
        case 'rule.description':
          return elasticsearchData.map(item => item.ruleDescription)
        case 'rule.level':
          return elasticsearchData.map(item => item.ruleLevel.toString())
        case 'rule.id':
          return elasticsearchData.map(item => item.ruleId.toString())
        case 'rule.groups':
          return elasticsearchData.map(item => Array.isArray(item.ruleGroups) ? item.ruleGroups.join(',') : item.ruleGroups)
        case 'rule.firedtimes':
          return elasticsearchData.map(item => item.ruleFiredtimes.toString())
        case 'full_log':
          return elasticsearchData.map(item => item.fullLog)
        default:
          return []
      }
    }
    
    // Fallback to mock data if Elasticsearch data not available
    switch(field) {
      case '@timestamp':
        return agents.map(agent => new Date(agent.lastSeen).toLocaleString()).filter(Boolean)
      case '_index':
        return agents.map(() => `wazuh-alerts-4.x-${new Date().toISOString().split('T')[0]}`)
      case 'agent.id':
        return agents.map(agent => agent.id)
      case 'agent.ip':
        return agents.map(agent => agent.ip || 'N/A')
      case 'agent.name':
        return agents.map(agent => agent.name)
      case 'decoder.name':
        return agents.map(() => 'wazuh')
      case 'location':
        return agents.map(() => 'rules')
      case 'manager.name':
        return agents.map(() => 'wazuh-server')
      case 'input.type':
        return agents.map(() => 'log')
      case 'rule.description':
        return agents.map(agent => `Security event detected on ${agent.name}`)
      case 'rule.level':
        return agents.map(agent => agent.cvss > 7 ? '10' : agent.cvss > 4 ? '5' : '3')
      case 'rule.id':
        return agents.map(() => `${Math.floor(Math.random() * 90000) + 10000}`)
      case 'rule.groups':
        return agents.map(() => 'syscheck,pci_dss_11.5')
      case 'rule.firedtimes':
        return agents.map(() => `${Math.floor(Math.random() * 100) + 1}`)
      case 'full_log':
        return agents.map(agent => `Full security log from ${agent.name}`)
      default:
        return []
    }
  }

  const toggleSection = (section: 'selected' | 'available') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  


  const moveToAvailable = (field: string) => {
    setSelectedFields(prev => prev.filter(f => f !== field))
    if (!availableFieldsList.includes(field)) {
      setAvailableFieldsList(prev => [...prev, field])
    }
  }

  const handleFieldClick = async (field: string) => {
    // Convert emoji to original field name for data retrieval
    const originalFieldName = emojiToField[field as keyof typeof emojiToField] || field
    const fieldData = getFieldData(originalFieldName)
    const logData = {
      field: originalFieldName,
      data: fieldData,
      timestamp: new Date().toISOString(),
      agentCount: agents.length
    }
    
    // Update frontend display
    setFieldClickInfo(logData)
    
    try {
      await fetch('http://localhost:3000/api/field-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData)
      })
    } catch (error) {
      console.error('Failed to send field click to backend:', error)
    }
    
    moveToSelected(field)
  }

  const moveToSelected = (field: string) => {
    setAvailableFieldsList(prev => prev.filter(f => f !== field))
    if (!selectedFields.includes(field)) {
      setSelectedFields(prev => [...prev, field])
      const originalFieldName = emojiToField[field as keyof typeof emojiToField] || field
      const data = getFieldData(originalFieldName)
      setFieldData(prev => ({ ...prev, [field]: data }))
    }
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 h-screen flex flex-col items-center py-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="mb-4"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col overflow-hidden">
      {/* Top Controls */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(true)}
          >
            <ChevronDown className="h-4 w-4 rotate-90" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setFieldClickInfo(null)}
            title="Clear field info"
          >
            ❌
          </Button>
        </div>

        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
          <Input
            placeholder="Search fields"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Timestamp Graph Button */}
        <Button 
          onClick={onShowTimestampGraph}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white"
          size="sm"
        >
          📅 Timestamp Graph
        </Button>
        
        {/* Agent Radar Chart Button */}
        <Button 
          onClick={() => {
            setShowAgentIds(!showAgentIds)
            onShowAgentRadarChart?.()
          }}
          className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          📊 Agent Status
        </Button>
        
        {/* Agent Tailscale Status Button */}
        <Button 
          onClick={() => {
            setShowTailscaleStatus(!showTailscaleStatus)
            onShowTailscaleStatus?.()
          }}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          🔗 Tailscale Status
        </Button>
        
        {/* Agent IDs Display */}
        {showAgentIds && (
          <div className="mt-3 p-3 bg-gray-50 rounded border">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Agent IDs ({agents.length})</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {agents.map(agent => (
                <div key={agent.id} className="text-xs text-gray-600 py-1 px-2 bg-white rounded">
                  {agent.id} - {agent.name}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Tailscale Status Display */}
        {showTailscaleStatus && (
          <div className="mt-3 p-3 bg-blue-50 rounded border">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tailscale Status ({agents.length})</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {agents.map(agent => (
                <div key={agent.id} className="text-xs py-1 px-2 bg-white rounded flex justify-between">
                  <span className="text-gray-600">{agent.name}</span>
                  <span className={`font-medium ${
                    agent.status === 'Online' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {agent.status === 'Online' ? '🟢 Connected' : '🔴 Disconnected'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Field Click Info Display */}
        {fieldClickInfo && (
          <div className="mt-3 p-3 bg-green-50 rounded border">
            <h4 className="text-sm font-medium text-gray-700 mb-2">🔍 Field Clicked: {fieldClickInfo.field.toUpperCase()}</h4>
            <div className="text-xs space-y-1">
              <div>⏰ {new Date(fieldClickInfo.timestamp).toLocaleString()}</div>
              <div>👥 Agent Count: {fieldClickInfo.agentCount}</div>
              <div>📊 Data Count: {fieldClickInfo.data?.length || 0}</div>
              <div className="mt-2">
                <div className="font-medium">📋 Field Data:</div>
                <div className="max-h-24 overflow-y-auto bg-white p-2 rounded mt-1">
                  {fieldClickInfo.data?.slice(0, 10).map((item: string, index: number) => (
                    <div key={index} className="text-xs">{index + 1}. {item}</div>
                  ))}
                  {fieldClickInfo.data?.length > 10 && (
                    <div className="text-xs text-gray-500">... and {fieldClickInfo.data.length - 10} more items</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        

      </div>

      {/* Scrollable Section */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Selected Fields */}
          <Collapsible
            open={openSections.selected}
            onOpenChange={() => toggleSection('selected')}
            className="mb-4"
          >
            <CollapsibleTrigger className="flex items-center text-sm font-medium text-gray-700 mb-2 w-full">
              {openSections.selected ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Selected fields ({selectedFields.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5 space-y-1">
              {selectedFields
                .filter(field => searchQuery ? field.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                .map((field) => (
                <div key={field}>
                  <div 
                    className="flex items-center text-sm text-gray-600 py-1 hover:bg-gray-50 rounded px-2 cursor-pointer"
                    onClick={() => moveToAvailable(field)}
                  >
                    <span className="w-4 h-4 bg-gray-300 rounded mr-2"></span>
                    {field}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Available Fields */}
          <Collapsible
            open={openSections.available}
            onOpenChange={() => toggleSection('available')}
          >
            <CollapsibleTrigger className="flex items-center text-sm font-medium text-gray-700 mb-2 w-full">
              {openSections.available ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              Available fields ({availableFields.length})
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-5 space-y-1">
              {availableFieldsList
                .filter(field => searchQuery ? field.toLowerCase().includes(searchQuery.toLowerCase()) : true)
                .map((field) => (
                <div 
                  key={field} 
                  className="flex items-center text-sm text-gray-600 py-1 hover:bg-gray-50 rounded px-2 cursor-pointer"
                  onClick={() => handleFieldClick(field)}
                >
                  <span className="w-4 h-4 bg-gray-200 rounded mr-2"></span>
                  {field}
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
    </div>
  )
}
