# CyArt-CyberDeck

![Static Badge](https://img.shields.io/badge/Status-Completed%20-blue)
### This project is being developed as an assignment during the SOC Internship provided by CyArt I.T Consulting.
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

## 🖥️ Starting the Wazuh Server

Follow these steps to start your Wazuh Server and verify it’s accessible.

---

### **Step 1: Login to the Wazuh Server**
```bash
- Use your Wazuh server credentials (default is often `wazuh-user:wazuh`).
```
---

### **Step 2: Switch to Root Mode**
```bash
sudo -i
```
### **Step 3: Start Wazuh Services
Run the following commands to start the necessary Wazuh components:
```bash
systemctl start wazuh-manager
systemctl start wazuh-indexer
systemctl start wazuh-dashboard
```
Step 4: Check Tailscale Connection
Verify that Tailscale is active:
```bash
tailscale status
```
Step 5: Get the Server IP
List all IP addresses assigned to the server:
```bash
ip a s
```
Look for the Tailscale IP and use it to log into the Wazuh Dashboard via your browser.

Example Dashboard Login
If your Tailscale IP is 100.66.240.63:
```bash
https://100.66.240.63
```

---

## 🖥️ Deploying a New Wazuh Agent from the Server

This section explains how to **deploy and configure a Wazuh Agent** directly from the Wazuh Server dashboard.

---

### **Step 1: Initiate Agent Deployment**
From the **Wazuh Server dashboard**, click on: Menu → Agents → Deploy new agent

---

### **Step 2: Select the Agent’s Operating System**
Identify the operating system of the agent machine and select the appropriate package:

- 🐧 **Linux / Ubuntu** → `DEB aarch64`
- 🪟 **Windows** → `MSI 32/64-bit`
- 🍏 **MacOS** → `Intel` or `Apple Silicon`

---

### **Step 3: Configure the Server Address**
In the **Server address** field, enter your **Wazuh server’s Tailscale IP**.

Example: 100.63.12.55

---

### **Step 4: Download and Install the Agent**
Once configured, the Wazuh Server will generate a command.

📌 **Run the provided command on the agent machine** to download and install the Wazuh Agent.

Example command for Linux:
```bash
wget https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent_VERSION_arm64.deb
sudo WAZUH_MANAGER='100.66.240.63' dpkg -i ./wazuh-agent_VERSION_arm64.deb
```

🔒 Tips:

Ensure the agent machine is connected to the Tailscale VPN.

Double-check the auth key and server IP before running the command.

Use systemctl status wazuh-agent  to verify the agent is running after installation.

#### 🛠️ Prerequisites

- A machine (agent) running a compatible Linux distribution (e.g., Debian/Ubuntu on ARM64)
- Access to the internet
- A valid **Tailscale Auth Key**
- Wazuh server with a static Tailscale IP

---

#### Step 1: Connect the Agent to Tailscale VPN

Use the command below to install and authenticate Tailscale on your agent:
 ```bash
curl -fsSL https://tailscale.com/install.sh | sh 
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
```
```
sudo systemctl daemon-reload
sudo systemctl enable wazuh-agent
sudo systemctl start wazuh-agent
 ```
### Possible Installation Error:
--------------------------------------------------
Job for wazuh-agent.Service failed because the control process exited with an error code.
See "systemctl status wazuh-agent.service" and "journalctl -xeu wazuh-agent.service" for details.
--------------------------------------------------

Fix:
1. Edit the Wazuh Agent configuration file:
   ```bash
   sudo nano /var/ossec/etc/ossec.conf

3. Locate the <address> tag and update it with your Wazuh server IP:
   ```bash
   <address>100.66.240.63</address>

4. Save the file and exit (CTRL + O, Enter, CTRL + X).

5. Restart the Wazuh Agent:
   ```bash
   sudo systemctl restart wazuh-agent

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
