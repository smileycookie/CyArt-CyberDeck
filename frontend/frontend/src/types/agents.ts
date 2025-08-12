export type Agent = {
  id: string;
  name: string;
  ip: string;
  mac: string;
  os: string;
  osIcon: 'windows' | 'linux' | 'ubuntu';
  cvss: number;
  status: 'Online' | 'Offline' | 'Maintenance'; 
  lastSeen: string;
  version: string;
  domain: string;
  uptime: string;
  cpu: string;
  memory: string;
  storage: string;
  location: string;
}