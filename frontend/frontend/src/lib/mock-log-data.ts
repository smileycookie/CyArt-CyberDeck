// 📁\frontend\src\lib\mock-log-data.ts
import { LogEvent } from "@/types/log-event"

export const sampleLogEvents: LogEvent[] = [
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-1",
    "timestamp": "2025-06-13T12:00:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-2",
    "timestamp": "2025-06-13T12:00:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-3",
    "timestamp": "2025-06-13T12:01:00Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-4",
    "timestamp": "2025-06-13T12:01:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-5",
    "timestamp": "2025-06-13T12:02:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-6",
    "timestamp": "2025-06-13T12:02:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "Suspicious connection detected",
    "location": "/var/log/mysql/error.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-7",
    "timestamp": "2025-06-13T12:03:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-8",
    "timestamp": "2025-06-13T12:03:30Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-9",
    "timestamp": "2025-06-13T12:04:00Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-10",
    "timestamp": "2025-06-13T12:04:30Z"
  },
  {
    "agentName": "db-server",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-11",
    "timestamp": "2025-06-13T12:05:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-12",
    "timestamp": "2025-06-13T12:05:30Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-13",
    "timestamp": "2025-06-13T12:06:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-14",
    "timestamp": "2025-06-13T12:06:30Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-15",
    "timestamp": "2025-06-13T12:07:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-16",
    "timestamp": "2025-06-13T12:07:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-17",
    "timestamp": "2025-06-13T12:08:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-18",
    "timestamp": "2025-06-13T12:08:30Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-19",
    "timestamp": "2025-06-13T12:09:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-20",
    "timestamp": "2025-06-13T12:09:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-21",
    "timestamp": "2025-06-13T12:10:00Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/mysql/error.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-22",
    "timestamp": "2025-06-13T12:10:30Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-23",
    "timestamp": "2025-06-13T12:11:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-24",
    "timestamp": "2025-06-13T12:11:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-25",
    "timestamp": "2025-06-13T12:12:00Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-26",
    "timestamp": "2025-06-13T12:12:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-27",
    "timestamp": "2025-06-13T12:13:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-28",
    "timestamp": "2025-06-13T12:13:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-29",
    "timestamp": "2025-06-13T12:14:00Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-30",
    "timestamp": "2025-06-13T12:14:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-31",
    "timestamp": "2025-06-13T12:15:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-32",
    "timestamp": "2025-06-13T12:15:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-33",
    "timestamp": "2025-06-13T12:16:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-34",
    "timestamp": "2025-06-13T12:16:30Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-35",
    "timestamp": "2025-06-13T12:17:00Z"
  },
  {
    "agentName": "web-server",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-36",
    "timestamp": "2025-06-13T12:17:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-37",
    "timestamp": "2025-06-13T12:18:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-38",
    "timestamp": "2025-06-13T12:18:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-39",
    "timestamp": "2025-06-13T12:19:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-40",
    "timestamp": "2025-06-13T12:19:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-41",
    "timestamp": "2025-06-13T12:20:00Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-42",
    "timestamp": "2025-06-13T12:20:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-43",
    "timestamp": "2025-06-13T12:21:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-44",
    "timestamp": "2025-06-13T12:21:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-45",
    "timestamp": "2025-06-13T12:22:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-46",
    "timestamp": "2025-06-13T12:22:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-47",
    "timestamp": "2025-06-13T12:23:00Z"
  },
  {
    "agentName": "web-server",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-48",
    "timestamp": "2025-06-13T12:23:30Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-49",
    "timestamp": "2025-06-13T12:24:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-50",
    "timestamp": "2025-06-13T12:24:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-51",
    "timestamp": "2025-06-13T12:25:00Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-52",
    "timestamp": "2025-06-13T12:25:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-53",
    "timestamp": "2025-06-13T12:26:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-54",
    "timestamp": "2025-06-13T12:26:30Z"
  },
  {
    "agentName": "db-server",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-55",
    "timestamp": "2025-06-13T12:27:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-56",
    "timestamp": "2025-06-13T12:27:30Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-57",
    "timestamp": "2025-06-13T12:28:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-58",
    "timestamp": "2025-06-13T12:28:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-59",
    "timestamp": "2025-06-13T12:29:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 5,
    "description": "Suspicious connection detected",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-60",
    "timestamp": "2025-06-13T12:29:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-61",
    "timestamp": "2025-06-13T12:30:00Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-62",
    "timestamp": "2025-06-13T12:30:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-63",
    "timestamp": "2025-06-13T12:31:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-64",
    "timestamp": "2025-06-13T12:31:30Z"
  },
  {
    "agentName": "db-server",
    "level": 5,
    "description": "User login failed",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-65",
    "timestamp": "2025-06-13T12:32:00Z"
  },
  {
    "agentName": "db-server",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-66",
    "timestamp": "2025-06-13T12:32:30Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-67",
    "timestamp": "2025-06-13T12:33:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-68",
    "timestamp": "2025-06-13T12:33:30Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-69",
    "timestamp": "2025-06-13T12:34:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-70",
    "timestamp": "2025-06-13T12:34:30Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-71",
    "timestamp": "2025-06-13T12:35:00Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-72",
    "timestamp": "2025-06-13T12:35:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-73",
    "timestamp": "2025-06-13T12:36:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-74",
    "timestamp": "2025-06-13T12:36:30Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-75",
    "timestamp": "2025-06-13T12:37:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-76",
    "timestamp": "2025-06-13T12:37:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-77",
    "timestamp": "2025-06-13T12:38:00Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-78",
    "timestamp": "2025-06-13T12:38:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "User login failed",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-79",
    "timestamp": "2025-06-13T12:39:00Z"
  },
  {
    "agentName": "db-server",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-80",
    "timestamp": "2025-06-13T12:39:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-81",
    "timestamp": "2025-06-13T12:40:00Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-82",
    "timestamp": "2025-06-13T12:40:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-83",
    "timestamp": "2025-06-13T12:41:00Z"
  },
  {
    "agentName": "db-server",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-84",
    "timestamp": "2025-06-13T12:41:30Z"
  },
  {
    "agentName": "db-server",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-85",
    "timestamp": "2025-06-13T12:42:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-86",
    "timestamp": "2025-06-13T12:42:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-87",
    "timestamp": "2025-06-13T12:43:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-88",
    "timestamp": "2025-06-13T12:43:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 5,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-89",
    "timestamp": "2025-06-13T12:44:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 1,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-90",
    "timestamp": "2025-06-13T12:44:30Z"
  },
  {
    "agentName": "db-server",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-91",
    "timestamp": "2025-06-13T12:45:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-92",
    "timestamp": "2025-06-13T12:45:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-93",
    "timestamp": "2025-06-13T12:46:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-94",
    "timestamp": "2025-06-13T12:46:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-95",
    "timestamp": "2025-06-13T12:47:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-96",
    "timestamp": "2025-06-13T12:47:30Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-97",
    "timestamp": "2025-06-13T12:48:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-98",
    "timestamp": "2025-06-13T12:48:30Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-99",
    "timestamp": "2025-06-13T12:49:00Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-100",
    "timestamp": "2025-06-13T12:49:30Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-101",
    "timestamp": "2025-06-13T12:50:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-102",
    "timestamp": "2025-06-13T12:50:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-103",
    "timestamp": "2025-06-13T12:51:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-104",
    "timestamp": "2025-06-13T12:51:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-105",
    "timestamp": "2025-06-13T12:52:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-106",
    "timestamp": "2025-06-13T12:52:30Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-107",
    "timestamp": "2025-06-13T12:53:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-108",
    "timestamp": "2025-06-13T12:53:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-109",
    "timestamp": "2025-06-13T12:54:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-110",
    "timestamp": "2025-06-13T12:54:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-111",
    "timestamp": "2025-06-13T12:55:00Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-112",
    "timestamp": "2025-06-13T12:55:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-113",
    "timestamp": "2025-06-13T12:56:00Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-114",
    "timestamp": "2025-06-13T12:56:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-115",
    "timestamp": "2025-06-13T12:57:00Z"
  },
  {
    "agentName": "web-server",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-116",
    "timestamp": "2025-06-13T12:57:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-117",
    "timestamp": "2025-06-13T12:58:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-118",
    "timestamp": "2025-06-13T12:58:30Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Antivirus scan completed",
    "location": "/var/log/auth.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-119",
    "timestamp": "2025-06-13T12:59:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-120",
    "timestamp": "2025-06-13T12:59:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-121",
    "timestamp": "2025-06-13T13:00:00Z"
  },
  {
    "agentName": "web-server",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-122",
    "timestamp": "2025-06-13T13:00:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-123",
    "timestamp": "2025-06-13T13:01:00Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-124",
    "timestamp": "2025-06-13T13:01:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-125",
    "timestamp": "2025-06-13T13:02:00Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-126",
    "timestamp": "2025-06-13T13:02:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-127",
    "timestamp": "2025-06-13T13:03:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-128",
    "timestamp": "2025-06-13T13:03:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-129",
    "timestamp": "2025-06-13T13:04:00Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-130",
    "timestamp": "2025-06-13T13:04:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-131",
    "timestamp": "2025-06-13T13:05:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-132",
    "timestamp": "2025-06-13T13:05:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-133",
    "timestamp": "2025-06-13T13:06:00Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-134",
    "timestamp": "2025-06-13T13:06:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-135",
    "timestamp": "2025-06-13T13:07:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-136",
    "timestamp": "2025-06-13T13:07:30Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-137",
    "timestamp": "2025-06-13T13:08:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-138",
    "timestamp": "2025-06-13T13:08:30Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-139",
    "timestamp": "2025-06-13T13:09:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-140",
    "timestamp": "2025-06-13T13:09:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-141",
    "timestamp": "2025-06-13T13:10:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-142",
    "timestamp": "2025-06-13T13:10:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-143",
    "timestamp": "2025-06-13T13:11:00Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-144",
    "timestamp": "2025-06-13T13:11:30Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-145",
    "timestamp": "2025-06-13T13:12:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-146",
    "timestamp": "2025-06-13T13:12:30Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-147",
    "timestamp": "2025-06-13T13:13:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-148",
    "timestamp": "2025-06-13T13:13:30Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-149",
    "timestamp": "2025-06-13T13:14:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-150",
    "timestamp": "2025-06-13T13:14:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-151",
    "timestamp": "2025-06-13T13:15:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-152",
    "timestamp": "2025-06-13T13:15:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-153",
    "timestamp": "2025-06-13T13:16:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-154",
    "timestamp": "2025-06-13T13:16:30Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-155",
    "timestamp": "2025-06-13T13:17:00Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-156",
    "timestamp": "2025-06-13T13:17:30Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-157",
    "timestamp": "2025-06-13T13:18:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-158",
    "timestamp": "2025-06-13T13:18:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-159",
    "timestamp": "2025-06-13T13:19:00Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-160",
    "timestamp": "2025-06-13T13:19:30Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-161",
    "timestamp": "2025-06-13T13:20:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 5,
    "description": "Suspicious connection detected",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-162",
    "timestamp": "2025-06-13T13:20:30Z"
  },
  {
    "agentName": "web-server",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-163",
    "timestamp": "2025-06-13T13:21:00Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-164",
    "timestamp": "2025-06-13T13:21:30Z"
  },
  {
    "agentName": "db-server",
    "level": 7,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-165",
    "timestamp": "2025-06-13T13:22:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Suspicious connection detected",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-166",
    "timestamp": "2025-06-13T13:22:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-167",
    "timestamp": "2025-06-13T13:23:00Z"
  },
  {
    "agentName": "db-server",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/vpn.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-168",
    "timestamp": "2025-06-13T13:23:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/auth.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-169",
    "timestamp": "2025-06-13T13:24:00Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-170",
    "timestamp": "2025-06-13T13:24:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-171",
    "timestamp": "2025-06-13T13:25:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/nginx/access.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-172",
    "timestamp": "2025-06-13T13:25:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-173",
    "timestamp": "2025-06-13T13:26:00Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/nginx/access.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-174",
    "timestamp": "2025-06-13T13:26:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-175",
    "timestamp": "2025-06-13T13:27:00Z"
  },
  {
    "agentName": "web-server",
    "level": 3,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-176",
    "timestamp": "2025-06-13T13:27:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 7,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-177",
    "timestamp": "2025-06-13T13:28:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 5,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-178",
    "timestamp": "2025-06-13T13:28:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-179",
    "timestamp": "2025-06-13T13:29:00Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/auth.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-180",
    "timestamp": "2025-06-13T13:29:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-181",
    "timestamp": "2025-06-13T13:30:00Z"
  },
  {
    "agentName": "web-server",
    "level": 5,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-182",
    "timestamp": "2025-06-13T13:30:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 5,
    "description": "Firewall port scan blocked",
    "location": "/var/log/nginx/access.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-183",
    "timestamp": "2025-06-13T13:31:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/nginx/access.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-184",
    "timestamp": "2025-06-13T13:31:30Z"
  },
  {
    "agentName": "siem-core",
    "level": 3,
    "description": "User login failed",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-185",
    "timestamp": "2025-06-13T13:32:00Z"
  },
  {
    "agentName": "db-server",
    "level": 1,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-186",
    "timestamp": "2025-06-13T13:32:30Z"
  },
  {
    "agentName": "web-server",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-187",
    "timestamp": "2025-06-13T13:33:00Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Database query timeout",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-188",
    "timestamp": "2025-06-13T13:33:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "User login failed",
    "location": "/var/log/vpn.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-189",
    "timestamp": "2025-06-13T13:34:00Z"
  },
  {
    "agentName": "db-server",
    "level": 9,
    "description": "Database query timeout",
    "location": "/var/log/fw.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-190",
    "timestamp": "2025-06-13T13:34:30Z"
  },
  {
    "agentName": "db-server",
    "level": 3,
    "description": "Database query timeout",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-191",
    "timestamp": "2025-06-13T13:35:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "Firewall port scan blocked",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-192",
    "timestamp": "2025-06-13T13:35:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/auth.log",
    "decoder": "nginx",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-193",
    "timestamp": "2025-06-13T13:36:00Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/mysql/error.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-194",
    "timestamp": "2025-06-13T13:36:30Z"
  },
  {
    "agentName": "vpn-gateway",
    "level": 7,
    "description": "Antivirus scan completed",
    "location": "/var/log/fw.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-195",
    "timestamp": "2025-06-13T13:37:00Z"
  },
  {
    "agentName": "web-server",
    "level": 7,
    "description": "User login failed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-196",
    "timestamp": "2025-06-13T13:37:30Z"
  },
  {
    "agentName": "web-server",
    "level": 1,
    "description": "Suspicious connection detected",
    "location": "/var/log/fw.log",
    "decoder": "mysql",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-197",
    "timestamp": "2025-06-13T13:38:00Z"
  },
  {
    "agentName": "siem-core",
    "level": 9,
    "description": "Antivirus scan completed",
    "location": "/var/log/mysql/error.log",
    "decoder": "iptables",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-198",
    "timestamp": "2025-06-13T13:38:30Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 3,
    "description": "Firewall port scan blocked",
    "location": "/var/log/mysql/error.log",
    "decoder": "openvpn",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-199",
    "timestamp": "2025-06-13T13:39:00Z"
  },
  {
    "agentName": "endpoint-01",
    "level": 1,
    "description": "Firewall port scan blocked",
    "location": "/var/log/fw.log",
    "decoder": "sshd",
    "fullLog": "Mock full log content for testing",
    "groups": [
      "test"
    ],
    "hipaa": [],
    "pci_dss": [],
    "inputType": "log",
    "ruleId": "99999",
    "id": "log-200",
    "timestamp": "2025-06-13T13:39:30Z"
  }
]