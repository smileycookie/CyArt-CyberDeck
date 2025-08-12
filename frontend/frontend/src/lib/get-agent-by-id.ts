// 📁 /lib/get-agent-by-id.ts
import { useSocket } from "@/hooks/useSocket"

export function useAgentById(id: string) {
  const { agents } = useSocket()
  return agents.find((agent) => agent.id === id)
}
