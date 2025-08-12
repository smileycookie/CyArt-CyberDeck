// src/app/logs/page.tsx
'use client'

import { useSocket } from '@/hooks/useSocket'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'

// Mock comprehensive log data
const mockLogs = [
  {
    id: 'log-1',
    timestamp: new Date().toISOString(),
    agentName: 'wazuh-server',
    agentId: '000',
    agentIp: '100.108.179.83',
    ruleId: '1002',
    level: 'INFO',
    description: 'Logon success',
    location: '/var/log/auth.log',
    decoder: 'sshd',
    fullLog: 'Jan 15 14:30:15 server sshd[12345]: Accepted publickey for user from 192.168.1.100 port 22 ssh2',
    groups: ['authentication_success', 'syslog', 'sshd'],
    hipaa: ['164.312.b'],
    pci_dss: ['10.2.5'],
    rule_description: 'SSH successful login',
    rule_level: 3,
    rule_groups: ['authentication_success', 'syslog', 'sshd'],
    manager: 'wazuh-server',
    input_type: 'log'
  },
  {
    id: 'log-2', 
    timestamp: new Date(Date.now() - 300000).toISOString(),
    agentName: 'web-server-01',
    agentId: '001',
    agentIp: '192.168.1.10',
    ruleId: '31151',
    level: 'WARNING',
    description: 'Multiple authentication failures',
    location: '/var/log/apache2/error.log',
    decoder: 'apache-errorlog',
    fullLog: '[Mon Jan 15 14:25:10.123456 2024] [auth_digest:error] [pid 1234] [client 203.0.113.45:54321] AH01793: invalid nonce received - length is not 32',
    groups: ['web', 'apache', 'authentication_failed'],
    hipaa: ['164.312.a.2.i', '164.312.a.2.ii'],
    pci_dss: ['10.2.4', '10.2.5'],
    rule_description: 'Apache: Multiple authentication failures from same source IP',
    rule_level: 7,
    rule_groups: ['web', 'apache', 'authentication_failed'],
    manager: 'wazuh-server',
    input_type: 'log'
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 600000).toISOString(), 
    agentName: 'db-server-01',
    agentId: '002',
    agentIp: '192.168.1.20',
    ruleId: '40111',
    level: 'ERROR',
    description: 'File integrity monitoring alert',
    location: '/var/log/syscheck.log',
    decoder: 'syscheck',
    fullLog: '2024 Jan 15 14:20:05 (db-server-01) 192.168.1.20->syscheck File "/etc/passwd" was modified. Mode: scheduled. Changed attributes: size,mtime,md5,sha1',
    groups: ['syscheck', 'pci_dss_11.5'],
    hipaa: ['164.312.c.1', '164.312.c.2'],
    pci_dss: ['11.5'],
    rule_description: 'Integrity checksum changed for critical system file',
    rule_level: 12,
    rule_groups: ['syscheck', 'pci_dss_11.5'],
    manager: 'wazuh-server',
    input_type: 'log'
  }
]

export default function LogsPage() {
  const { logs } = useSocket()
  
  // Use real logs if available, otherwise use mock data
  const displayLogs = logs.length > 0 ? logs : mockLogs
  
  // Debug: Log the actual data structure
  console.log('Logs data:', displayLogs)

  const getLogLevelBadge = (level: string) => {
    const colorMap: Record<string, string> = {
      ERROR: "bg-red-500 text-white",
      WARNING: "bg-yellow-500 text-black", 
      INFO: "bg-blue-500 text-white",
      HIGH: "bg-red-500 text-white",
      MEDIUM: "bg-yellow-500 text-black",
      LOW: "bg-green-500 text-white"
    }
    return <Badge className={`${colorMap[level] || 'bg-gray-500 text-white'} text-xs`}>{level}</Badge>
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      // Use consistent formatting to avoid hydration mismatch
      const date = new Date(timestamp)
      return date.toISOString().replace('T', ' ').replace('Z', '')
    } catch {
      return timestamp
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Wazuh Security Alerts</h1>
          <p className="text-gray-600 mt-2">Real-time security events and system logs from Wazuh agents</p>
        </div>

        <div className="space-y-4">
          {displayLogs.length > 0 ? (
            displayLogs.map((log, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-3">
                  {/* Header with timestamp and level */}
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">Alert #{log.ruleId || 'N/A'}</h3>
                      {getLogLevelBadge(log.level)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatTimestamp(log.timestamp)}
                    </div>
                  </div>

                  {/* Alert Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">@timestamp:</span>
                      <p className="text-gray-900 font-mono">{log.timestamp}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">_index:</span>
                      <p className="text-gray-900 font-mono">wazuh-alerts-4.x-{new Date().toISOString().split('T')[0]}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">agent.id:</span>
                      <p className="text-gray-900 font-mono">{log.agentId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">agent.ip:</span>
                      <p className="text-gray-900 font-mono">{log.agentIp || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">agent.name:</span>
                      <p className="text-gray-900 font-mono">{log.agentName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">decoder.name:</span>
                      <p className="text-gray-900 font-mono">{log.decoder}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">location:</span>
                      <p className="text-gray-900 font-mono">{log.location}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">manager.name:</span>
                      <p className="text-gray-900 font-mono">{log.manager}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">input.type:</span>
                      <p className="text-gray-900 font-mono bg-blue-50 px-2 py-1 rounded">{log.input_type || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">rule.id:</span>
                      <p className="text-gray-900 font-mono">{log.ruleId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">rule.level:</span>
                      <p className="text-gray-900 font-mono">{log.rule_level || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">rule.groups:</span>
                      <p className="text-gray-900 font-mono text-xs">{Array.isArray(log.rule_groups) ? log.rule_groups.join(', ') : log.rule_groups || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Compliance Information */}
                  {(log.rule_pci_dss || log.rule_gdpr) && (
                    <div className="border-t pt-3">
                      <span className="font-medium text-gray-700">Compliance:</span>
                      <div className="flex gap-4 mt-2">
                        {log.rule_pci_dss && Array.isArray(log.rule_pci_dss) && log.rule_pci_dss.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-blue-600">PCI DSS:</span>
                            <p className="text-xs text-gray-700">{log.rule_pci_dss.join(', ')}</p>
                          </div>
                        )}
                        {log.rule_gdpr && Array.isArray(log.rule_gdpr) && log.rule_gdpr.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-green-600">GDPR:</span>
                            <p className="text-xs text-gray-700">{log.rule_gdpr.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Rule Description */}
                  <div className="border-t pt-3">
                    <span className="font-medium text-gray-700">rule.description:</span>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mt-2">
                      <p className="text-gray-900 font-medium">{log.rule_description || log.description || log.message || 'No description available'}</p>
                      {(log.rule_level || log.level) && (
                        <p className="text-sm text-gray-600 mt-1">Severity Level: {log.rule_level || log.level}</p>
                      )}
                    </div>
                  </div>

                  {/* Full Log */}
                  {log.full_log && (
                    <div className="border-t pt-3">
                      <span className="font-medium text-gray-700">full_log:</span>
                      <pre className="text-xs text-gray-800 bg-gray-100 p-3 rounded mt-2 overflow-x-auto whitespace-pre-wrap">
                        {log.full_log}
                      </pre>
                    </div>
                  )}

                  {/* Previous Output */}
                  {log.previous_output && (
                    <div className="border-t pt-3">
                      <span className="font-medium text-gray-700">previous_output:</span>
                      <pre className="text-xs text-gray-800 bg-gray-100 p-3 rounded mt-2 overflow-x-auto whitespace-pre-wrap">
                        {log.previous_output}
                      </pre>
                    </div>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <p className="text-gray-500">No Wazuh alerts available</p>
                <p className="text-sm text-gray-400 mt-2">Check your Wazuh server connection</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}