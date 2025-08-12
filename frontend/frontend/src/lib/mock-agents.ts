import { Agent } from "@/types/agents"

type OsOption = {
  os: string;
  icon: 'windows' | 'linux' | 'ubuntu';
}

export const agents: Agent[] = Array.from({ length: 120 }, (_, i): Agent => {
  const id = String(i + 1).padStart(3, "0")
  
  const osOptions: OsOption[] = [
    { os: "Windows 11 Pro", icon: "windows" },
    { os: "Ubuntu 22.04 LTS", icon: "ubuntu" },
    { os: "Linux Mint 21", icon: "linux" },
    { os: "Windows Server 2019", icon: "windows" },
  ]
  
  const { os, icon } = osOptions[i % osOptions.length]
  
  const cpuOptions = [
    "Intel Core i7-12700K",
    "AMD Ryzen 9 5900X",
    "Intel Xeon E-2288G",
    "Apple M1 Pro"
  ]
  
  const locations = [
    "Building A, Floor 3",
    "Building B, Floor 1",
    "Remote Office",
    "Data Center Rack 42"
  ]

  return {
    id: `AGT-${id}`,
    name: `DESKTOP-${String.fromCharCode(65 + (i % 26))}${id}`,
    ip: `192.168.1.${(i % 254) + 1}`,
    mac: `00:1A:2B:${(i + 10).toString(16).padStart(2, "0")}:4D:${(i + 50).toString(16).padStart(2, "0")}`,
    os,
    osIcon: icon, 
    cvss: +(Math.random() * 10).toFixed(1),
    status: (() => {
  const rand = Math.random();
  if (rand > 0.7) return "Online";
  if (rand > 0.3) return "Offline";
  return "Maintenance";
})(),
    lastSeen: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
    version: `Agent v2.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`,
    domain: ["CORPORATE", "DMZ", "DEVELOPMENT", "PRODUCTION"][i % 4],
    uptime: `${Math.floor(Math.random() * 30)} days, ${Math.floor(Math.random() * 24)} hours`,
    cpu: cpuOptions[i % cpuOptions.length],
    memory: `${[8, 16, 32, 64][i % 4]} GB ${["DDR4", "DDR5"][i % 2]}`,
    storage: `${[256, 512, 1024, 2048][i % 4]} GB ${["SSD", "NVMe"][i % 2]}`,
    location: locations[i % locations.length]
  }
})