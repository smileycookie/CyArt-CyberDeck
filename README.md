# CyArt-CyberDeck

![Static Badge](https://img.shields.io/badge/Status-Completed%20-blue)

A robust **Log and Data Monitoring System** designed for seamless security oversight.

---

## 📖 Project Overview

CyArt-CyberDeck is a powerful solution for collecting, aggregating, and monitoring logs and security events from multiple systems. It provides real-time insights at both the server and individual system levels. While built for flexible integration, this project is specifically configured to work with **Wazuh** as its primary SIEM tool.

This repository is your complete guide, with two key sections:

-   **Agent Setup**: Instructions for connecting systems to the central Wazuh server.
-   **Project Installation**: A step-by-step guide to get the backend and frontend up and running.

---

## 🚀 Quick Start

Follow these simple steps to get the CyArt-CyberDeck system running on your machine.

### Agent Setup for Tailscale VPN and Wazuh Server Integration

This guide explains how to connect an agent machine to a **Tailscale VPN** and then link it to a **Wazuh server** for monitoring and management.

---

#### 🛠️ Prerequisites

- A machine (agent) running a compatible Linux distribution (e.g., Debian/Ubuntu on ARM64)
- Access to the internet
- A valid **Tailscale Auth Key**
- Wazuh server with a static Tailscale IP

---

#### Step 1: Connect the Agent to Tailscale VPN

Use the command below to install and authenticate Tailscale on your agent:
 ```bash
curl -fsSL https://tailscale.com/install.sh | sh && \
```
 ```bash
sudo tailscale up --auth-key=TAILSCALE_AUTH_KEY
```
🔒 Note: Ensure your auth key is active and valid. Rotate it if necessary from your Tailscale dashboard.

#### Step 2: Install and Configure Wazuh Agent
Run the following command to download and install the Wazuh Agent package, and automatically configure it to connect to the Wazuh Manager over Tailscale:

##### 🔧 For Ubuntu / Kali Linux
 ```bash
wget https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_4.12.0-1_arm64.deb
sudo WAZUH_MANAGER='100.66.240.63' dpkg -i ./wazuh-agent_4.12.0-1_arm64.deb
sudo systemctl daemon-reload
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent
 ```
##### 🪟 For Windows
```bash
Invoke-WebRequest -Uri https://packages.wazuh.com/4.x/windows/wazuh-agent-4.12.0-1.msi -OutFile $env:tmp \wazuh-agent
msiexec.exe /i $env:tmp\wazuh-agent /q WAZUH_MANAGER='100.66.240.63'
```
```bash
NET START WazuhSvc
```
##### 🍎 For macOS
```bash 
curl -so wazuh-agent.pkg https://packages.wazuh.com/4.x/macos/wazuh-agent-4.12.0-1.intel64.pkg
```
```bash 
echo "WAZUH_MANAGER='100.66.240.63'" > /tmp/wazuh_envs
```
```bash 
sudo installer -pkg ./wazuh-agent.pkg -target /
```
```bash
sudo /Library/Ossec/bin/wazuh-control start
```
✅ These command installs the agent and set  100.66.240.63 (Wazuh Server's Tailscale IP) as the manager.

#### Step 3: Verify Connection to Wazuh Server

Open your browser and go to the following Tailscale IP address of the Wazuh server:
```bash
https://100.66.240.63
```
✅ If successful, you should see the Wazuh dashboard/login screen.

#### Notes:
- Make sure the machine running the Wazuh server is also connected to the same Tailscale network.
- For help with Tailscale authentication or key renewal, refer to the Tailscale documentation.


## Backend Setup

1.  Unzip the `backend` folder.
2.  Navigate to the `src` directory in your terminal.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Launch the backend server:
    ```bash
    node server-minimal.js
    ```

## Frontend Setup

1.  Unzip the `frontend` folder and open it in your terminal.
2.  *Optional but recommended*: Clear any old dependencies.
    ```bash
    rm -rf node_modules package-lock.json .next
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```
4.  Start the frontend application:
    ```bash
    npm run dev
    ```

---

### 🛠️ Requirements

To run this project, you will need:

-   **Node.js & npm**: For managing dependencies and running the applications.
-   **Tailscale account**: To establish a secure network connection.
-   **Wazuh server**: The central hub for log and data analysis.

---

## 📂 Repository Structure

The project is organized as follows:

```plaintext
📂 Project Root
├── 📄 Readme.md          # 📜 Detailed backend/frontend setup steps
├── 📁 frontend/          # 🎨 Frontend source code
└── 📁 backend/           # ⚙️ Backend source code
