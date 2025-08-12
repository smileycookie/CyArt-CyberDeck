---

## 🖥️ Deploying a New Wazuh Agent from the Server

This section explains how to **deploy and configure a Wazuh Agent** directly from the Wazuh Server dashboard.

---

### **Step 1: Initiate Agent Deployment**
From the **Wazuh Server dashboard**, click on:

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

Use 
'''bash 
systemctl status wazuh-agent 
to verify the agent is running after installation.
