// src/types/log-event.ts

export interface LogEvent {
  id: string
  timestamp: string
  agentName: string
  ruleId: string
  level: number
  description: string
  location: string
  decoder: string
  fullLog: string
  inputType: string
  groups?: string[]
  hipaa?: string[]
  pci_dss?: string[]
}
