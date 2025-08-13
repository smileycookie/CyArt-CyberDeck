---

## 🖥️ Starting the Wazuh Server

Follow these steps to start your Wazuh Server and verify it’s accessible.

---
```bash
### **Step 1: Login to the Wazuh Server**
- Use your Wazuh server credentials (default is often `wazuh-user:wazuh`).

---

### **Step 2: Switch to Root Mode**

sudo -i

### **Step 3: Start Wazuh Services
Run the following commands to start the necessary Wazuh components:
systemctl start wazuh-manager
systemctl start wazuh-indexer
systemctl start wazuh-dashboard

Step 4: Check Tailscale Connection
Verify that Tailscale is active:
tailscale status

Step 5: Get the Server IP
List all IP addresses assigned to the server:
ip a s
Look for the Tailscale IP and use it to log into the Wazuh Dashboard via your browser.

Example Dashboard Login
If your Tailscale IP is 100.66.240.63:
https://100.66.240.63


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


🔒 Tips:

Ensure the agent machine is connected to the Tailscale VPN.

Double-check the auth key and server IP before running the command.

Use systemctl status wazuh-agent  to verify the agent is running after installation.
