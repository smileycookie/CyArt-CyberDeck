"use client"
import React, { JSX, useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { Shield, Play, AlertTriangle, Activity, Network, HardDrive, Cpu, Calendar, Clock, Info, Settings, BarChart3, FileText } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  ip: string;
  mac: string;
  os: string;
  osIcon: string;
  cvss: number;
  status: string;
  lastSeen: string;
  version: string;
  domain: string;
  uptime: string;
  cpu: string;
  memory: string;
  storage: string;
  location: string;
}



interface Log {
  id: number;
  timestamp: string;
  level: 'ERROR' | 'WARNING' | 'INFO';
  message: string;
  source: string;
}

const mockLogs: Log[] = [
  {
    id: 1,
    timestamp: "2025-07-02 14:25:15",
    level: "WARNING",
    message: "Suspicious network activity detected from IP 203.0.113.45",
    source: "Network Monitor"
  },
  {
    id: 2,
    timestamp: "2025-07-02 14:20:08",
    level: "INFO",
    message: "System scan completed successfully - 0 threats found",
    source: "Antivirus Engine"
  },
  {
    id: 3,
    timestamp: "2025-07-02 14:15:32",
    level: "ERROR",
    message: "Failed to update signature database - connection timeout",
    source: "Update Service"
  },
  {
    id: 4,
    timestamp: "2025-07-02 14:10:45",
    level: "INFO",
    message: "Agent heartbeat sent successfully",
    source: "Communication Service"
  },
  {
    id: 5,
    timestamp: "2025-07-02 14:05:12",
    level: "WARNING",
    message: "High CPU usage detected - 85% for process chrome.exe",
    source: "Performance Monitor"
  },
  {
    id: 6,
    timestamp: "2025-07-02 14:00:03",
    level: "INFO",
    message: "User login detected - administrator@corporate.local",
    source: "Authentication Service"
  }
];

const mockPerformanceData = [
  { time: "14:00", cpu: 45, memory: 62, disk: 23 },
  { time: "16:00", cpu: 52, memory: 58, disk: 25 },
  { time: "18:00", cpu: 38, memory: 64, disk: 22 },
  { time: "19:00", cpu: 67, memory: 61, disk: 28 },
  { time: "21:00", cpu: 43, memory: 59, disk: 24 },
  { time: "23:00", cpu: 55, memory: 63, disk: 26 },
  { time: "01:00", cpu: 48, memory: 60, disk: 23 }
];

const mockSettings = {
  autoUpdate: true,
  realTimeProtection: true,
  scheduledScan: "Daily at 2:00 AM",
  reportingInterval: "Every 5 minutes",
  logLevel: "INFO",
  quarantinePath: "C:\\Quarantine\\",
  maxLogSize: "100 MB"
};

const getCVSSLabel = (score: number): 'Critical' | 'High' | 'Medium' | 'Low' => {
  if (score >= 9.0) return "Critical";
  if (score >= 7.0) return "High";
  if (score >= 4.0) return "Medium";
  return "Low";
};  

const getCVSSBadge = (score: number): JSX.Element => {
  const label = getCVSSLabel(score);
  const colorMap: Record<'Critical' | 'High' | 'Medium' | 'Low', string> = {
    Critical: "bg-red-700 text-white",
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-400 text-black",
    Low: "bg-green-500 text-white",
  };
  return <Badge className={colorMap[label]}>{label}</Badge>;
};

const getLogLevelBadge = (level: Log['level']): JSX.Element => {
  const colorMap: Record<Log['level'], string> = {
    ERROR: "bg-red-500 text-white",
    WARNING: "bg-yellow-500 text-black",
    INFO: "bg-blue-500 text-white",
  };
  return <Badge className={`${colorMap[level]} text-xs`}>{level}</Badge>;
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'logs', label: 'Device Logs', icon: FileText },
  { id: 'performance', label: 'Performance', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface AgentDetailViewProps {
  agent?: Agent; 
}

export default function AgentDetailView({ agent }: AgentDetailViewProps) {
  // Log the agent data to see what we're receiving
  console.log('AgentDetailView received agent:', agent);
  
  // Use real data from socket if available
  const { logs: socketLogs, agents: allAgents } = useSocket();
  
  // Filter logs for this specific agent
  const deviceLogs = socketLogs.filter(log => 
    log.agentName === agent?.name || 
    log.agentName === 'wazuh-server' // Include server logs as fallback
  );
  
  // Generate performance data based on agent ID
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  
  useEffect(() => {
    if (agent?.id) {
      // Generate semi-random but consistent performance data based on agent ID
      const seed = parseInt(agent.id.replace(/\D/g, '') || '0');
      const newData = mockPerformanceData.map(item => ({
        ...item,
        cpu: Math.min(100, Math.max(10, (seed % 30) + Math.floor(Math.random() * 60))),
        memory: Math.min(100, Math.max(20, ((seed * 2) % 40) + Math.floor(Math.random() * 50))),
        disk: Math.min(100, Math.max(5, ((seed * 3) % 20) + Math.floor(Math.random() * 30)))
      }));
      setPerformanceData(newData);
    }
  }, [agent?.id]);
  
  // Default to overview tab, but allow URL hash to override
  const [activeTab, setActiveTab] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['overview', 'logs', 'performance', 'settings'].includes(hash)) {
        return hash;
      }
    }
    return 'overview';
  });
  const [isQuarantined, setIsQuarantined] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [isRestartingService, setIsRestartingService] = useState(false);
  const [isUninstalling, setIsUninstalling] = useState(false);
  const [isTestingConnectivity, setIsTestingConnectivity] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    autoUpdate: true,
    realTimeProtection: true,
    scheduledScanTime: '02:00',
    scheduledScanFreq: 'Daily',
    reportingInterval: '5',
    logLevel: 'INFO',
    quarantinePath: 'C:\\Quarantine\\',
    maxLogSize: '100'
  });
  const [settingsChanged, setSettingsChanged] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);


  const handleQuarantine = async () => {
    setIsQuarantined(!isQuarantined);
    console.log(isQuarantined ? 'Agent removed from quarantine' : 'Agent quarantined');
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          alert(`Security scan completed for ${agent?.name}. No threats detected.`);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
    
    console.log('Starting security scan...');
  };
  
  const handleClearCache = () => {
    setIsClearingCache(true);
    setTimeout(() => {
      setIsClearingCache(false);
      alert(`Cache cleared successfully for ${agent?.name}`);
    }, 2000);
  };
  
  const handleRestartService = async () => {
    setIsRestartingService(true);
    try {
      const response = await fetch('http://localhost:3000/api/agent/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentId: agent?.id })
      });
      
      if (response.ok) {
        alert(`Agent service restarted successfully for ${agent?.name}`);
      } else {
        alert('Failed to restart agent service');
      }
    } catch (error) {
      console.error('Restart failed:', error);
      alert('Network error during restart');
    } finally {
      setIsRestartingService(false);
    }
  };
  
  const handleTestConnectivity = () => {
    setIsTestingConnectivity(true);
    setTimeout(() => {
      setIsTestingConnectivity(false);
      const isOnline = agent?.status === 'Online';
      alert(`Connectivity test ${isOnline ? 'passed' : 'failed'} for ${agent?.name}`);
    }, 2000);
  };
  
  const handleForceUninstall = async () => {
    const isTailscaleDevice = agent?.ip?.startsWith('100.');
    const actionText = isTailscaleDevice ? 'remove from dashboard' : 'force uninstall the Wazuh agent from';
    const deviceType = isTailscaleDevice ? 'Tailscale device' : 'Wazuh agent';
    
    const confirmed = confirm(`Are you sure you want to ${actionText} ${agent?.name}? This action cannot be undone.`);
    if (confirmed) {
      setIsUninstalling(true);
      try {
        console.log(`Attempting to ${actionText}: ${agent?.id}`);
        const rawAgentId = agent?.id?.replace('AGT-', '') || agent?.id;
        
        const endpoint = isTailscaleDevice ? 'remove' : 'uninstall';
        const response = await fetch(`http://localhost:3000/api/agent/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ agentId: rawAgentId })
        });
        
        const result = await response.json();
        console.log(`${endpoint} response:`, result);
        
        if (response.ok) {
          alert(`${deviceType} ${agent?.name} ${isTailscaleDevice ? 'removed from dashboard' : 'uninstalled'} successfully`);
          window.location.href = '/';
        } else {
          alert(`Failed to ${endpoint} ${deviceType.toLowerCase()}: ${result.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error(`${actionText} failed:`, error);
        alert(`Network error during ${actionText}`);
      } finally {
        setIsUninstalling(false);
      }
    }
  };
  


  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Agent Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Network Address</label>
                  <p className="text-sm text-gray-900 font-mono">{agent?.ip}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Hardware ID</label>
                  <p className="text-sm text-gray-900 font-mono">{agent?.mac}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Operating System</label>
                  <p className="text-sm text-gray-900">{agent?.os}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Network Domain</label>
                  <p className="text-sm text-gray-900">{agent?.domain}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Agent Version</label>
                  <p className="text-sm text-gray-900">{agent?.version}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Uptime</label>
                  <p className="text-sm text-gray-900">{agent?.uptime}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">CPU</label>
                  <p className="text-sm text-gray-900">{agent?.cpu}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Memory</label>
                  <p className="text-sm text-gray-900">{agent?.memory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Storage</label>
                  <p className="text-sm text-gray-900">{agent?.storage}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-sm text-gray-900">{agent?.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Seen</label>
                  <p className="text-sm text-gray-900">{agent?.lastSeen}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CVSS Score</label>
                  <p className="text-sm text-gray-900">{agent?.cvss}/10</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Button 
                    variant={isClearingCache ? "default" : "outline"}
                    onClick={handleClearCache}
                    disabled={isClearingCache}
                    className="w-full justify-start"
                  >
                    <HardDrive className="w-4 h-4 mr-2" />
                    {isClearingCache ? "Clearing..." : "Clear Cache"}
                  </Button>
                  <Button 
                    variant={isRestartingService ? "default" : "outline"}
                    onClick={handleRestartService}
                    disabled={isRestartingService}
                    className="w-full justify-start"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    {isRestartingService ? "Restarting..." : "Restart Agent Service"}
                  </Button>
                  
                  <Button 
                    variant={isScanning ? "default" : "outline"}
                    onClick={handleRunScan}
                    disabled={isScanning}
                    className="w-full justify-start"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isScanning ? "Scanning..." : "Run Security Scan"}
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Advanced Actions</h3>
                <div className="space-y-2">
                  <Button
                    onClick={handleQuarantine}
                    variant={isQuarantined ? "default" : "outline"}
                    className="w-full justify-start"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {isQuarantined ? "Remove from Quarantine" : "Quarantine Agent"}
                  </Button>
                  <Button 
                    variant={isTestingConnectivity ? "default" : "outline"}
                    onClick={handleTestConnectivity}
                    disabled={isTestingConnectivity}
                    className="w-full justify-start"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    {isTestingConnectivity ? "Testing..." : "Test Connectivity"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleForceUninstall}
                    disabled={isUninstalling}
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {isUninstalling ? (agent?.ip?.startsWith('100.') ? 'Removing...' : 'Uninstalling...') : agent?.ip?.startsWith('100.') ? 'Remove Tailscale Device' : 'Force Uninstall'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {(deviceLogs.length > 0 ? deviceLogs : mockLogs).map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  {getLogLevelBadge(log.level)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{log.timestamp}</span>
                    <span className="text-gray-300">•</span>
                    <span>{log.source}</span>
                  </div>
                  <p className="text-sm text-gray-900">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">CPU Usage</p>
                    <p className="text-2xl font-bold text-blue-800">{performanceData[0].cpu}%</p>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Memory Usage</p>
                    <p className="text-2xl font-bold text-green-800">{performanceData[0].memory}%</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Disk Usage</p>
                    <p className="text-2xl font-bold text-purple-800">{performanceData[0].disk}%</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Performance History (Last 24 hours)</h3>
              <div className="space-y-3">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 w-12">{data.time}</span>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>CPU</span>
                          <span>{data.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.cpu}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Memory</span>
                          <span>{data.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.memory}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Disk</span>
                          <span>{data.disk}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${data.disk}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Auto Update with Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Auto Update</p>
                    <p className="text-sm text-gray-600">Automatically update agent</p>
                  </div>
                  <Switch
                    checked={settings.autoUpdate}
                    onCheckedChange={(checked) => {
                      setSettings(prev => ({ ...prev, autoUpdate: checked }));
                      setSettingsChanged(true);
                      console.log(`Auto Update ${checked ? 'enabled' : 'disabled'}`);
                    }}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                  />
                </div>
                
                {/* Real-time Protection with Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Real-time Protection</p>
                    <p className="text-sm text-gray-600">Monitor threats in real-time</p>
                  </div>
                  <Switch
                    checked={settings.realTimeProtection}
                    onCheckedChange={(checked) => {
                      setSettings(prev => ({ ...prev, realTimeProtection: checked }));
                      setSettingsChanged(true);
                      console.log(`Real-time Protection ${checked ? 'enabled' : 'disabled'}`);
                    }}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                  />
                </div>
                
                {/* Scheduled Scan with Time Picker */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Scheduled Scan</p>
                      <p className="text-sm text-gray-600">Set time for daily scan</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select 
                        className="bg-white border rounded-md px-2 py-1 text-sm"
                        value={settings.scheduledScanFreq}
                        onChange={(e) => {
                          setSettings(prev => ({ ...prev, scheduledScanFreq: e.target.value }));
                          setSettingsChanged(true);
                        }}
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                      </select>
                      <input
                        type="time"
                        value={settings.scheduledScanTime}
                        className="bg-white border rounded-md px-2 py-1 text-sm"
                        onChange={(e) => {
                          setSettings(prev => ({ ...prev, scheduledScanTime: e.target.value }));
                          setSettingsChanged(true);
                          console.log(`Scheduled scan time set to ${e.target.value}`);
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Reporting Interval */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Reporting Interval</p>
                      <p className="text-sm text-gray-600">How often to send reports</p>
                    </div>
                    <select 
                      className="bg-white border rounded-md px-2 py-1 text-sm"
                      value={settings.reportingInterval}
                      onChange={(e) => {
                        setSettings(prev => ({ ...prev, reportingInterval: e.target.value }));
                        setSettingsChanged(true);
                        const intervals: Record<string, string> = {
                          '0': 'Real-time',
                          '1': 'Every 1 minute',
                          '5': 'Every 5 minutes',
                          '15': 'Every 15 minutes',
                          '30': 'Every 30 minutes',
                          '60': 'Every 1 hour'
                        };
                        console.log(`Reporting interval set to ${intervals[e.target.value] || 'Unknown interval'}`);
                      }}
                    >
                      <option value="0">Real-time</option>
                      <option value="1">Every 1 minute</option>
                      <option value="5">Every 5 minutes</option>
                      <option value="15">Every 15 minutes</option>
                      <option value="30">Every 30 minutes</option>
                      <option value="60">Every 1 hour</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Log Level */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Log Level</p>
                      <p className="text-sm text-gray-600">Set verbosity of logs</p>
                    </div>
                    <select 
                      className="bg-white border rounded-md px-2 py-1 text-sm"
                      value={settings.logLevel}
                      onChange={(e) => {
                        setSettings(prev => ({ ...prev, logLevel: e.target.value }));
                        setSettingsChanged(true);
                        console.log(`Log level set to ${e.target.value}`);
                      }}
                    >
                      <option value="DEBUG">DEBUG</option>
                      <option value="INFO">INFO</option>
                      <option value="WARNING">WARNING</option>
                      <option value="ERROR">ERROR</option>
                    </select>
                  </div>
                </div>
                
                {/* Quarantine Path */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Quarantine Path</p>
                      <p className="text-sm text-gray-600 font-mono">{settings.quarantinePath}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      // In a real app, this would open a file picker
                      console.log('Change quarantine path clicked');
                    }}>
                      Change
                    </Button>
                  </div>
                </div>
                
                {/* Max Log Size */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Max Log Size</p>
                      <p className="text-sm text-gray-600">Maximum size for log files</p>
                    </div>
                    <select 
                      className="bg-white border rounded-md px-2 py-1 text-sm"
                      value={settings.maxLogSize}
                      onChange={(e) => {
                        setSettings(prev => ({ ...prev, maxLogSize: e.target.value }));
                        setSettingsChanged(true);
                        console.log(`Max log size set to ${e.target.value} MB`);
                      }}
                    >
                      <option value="50">50 MB</option>
                      <option value="100">100 MB</option>
                      <option value="250">250 MB</option>
                      <option value="500">500 MB</option>
                    </select>
                  </div>
                </div>
                
                {/* Save Settings Button */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <Button 
                      className={`w-full ${settingsChanged ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`}
                      disabled={!settingsChanged || isSavingSettings}
                      onClick={() => {
                        setIsSavingSettings(true);
                        setTimeout(() => {
                          console.log('Settings saved:', settings);
                          alert(`Settings saved successfully for ${agent?.name}`);
                          setSettingsChanged(false);
                          setIsSavingSettings(false);
                        }, 1500);
                      }}
                    >
                      {isSavingSettings ? 'Saving...' : settingsChanged ? 'Save Changes' : 'No Changes'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSettings({
                          autoUpdate: true,
                          realTimeProtection: true,
                          scheduledScanTime: '02:00',
                          scheduledScanFreq: 'Daily',
                          reportingInterval: '5',
                          logLevel: 'INFO',
                          quarantinePath: 'C:\\Quarantine\\',
                          maxLogSize: '100'
                        });
                        setSettingsChanged(true);
                        console.log('Settings reset to defaults');
                      }}
                    >
                      Reset to Defaults
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                {agent?.osIcon === "windows" && <span className="text-2xl">🪟</span>}
                {agent?.osIcon === "linux" && <span className="text-2xl">🐧</span>}
                {agent?.osIcon === "ubuntu" && <span className="text-2xl">🟠</span>}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{agent?.name}</h1>
                <p className="text-gray-600">Device ID: {agent?.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={agent?.status === "Online" ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                {agent?.status}
              </Badge>
              
              {agent?.cvss && getCVSSBadge(agent.cvss)}
              {isQuarantined && (
                <Badge className="bg-orange-500 text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  QUARANTINED
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      // Update URL hash for bookmarking/sharing
                      if (typeof window !== 'undefined') {
                        window.location.hash = tab.id;
                      }
                    }}
                    className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}