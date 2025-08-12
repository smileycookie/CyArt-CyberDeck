// src/app/devices/[id]/page.tsx
import AgentDetailViewWrapper from "@/components/feature03/AgentDetailViewWrapper"
import { agents } from "@/lib/mock-agents"
import { notFound } from "next/navigation"
import { DeviceEventsLineChart } from "@/components/feature04/DeviceEventsLineChart"
import LayerPieChart from "@/components/feature04/layer-pie-chart"

interface Params {
  params: { id: string }
}

export default async function DeviceDetailPage({ params }: Params) {
  // Await params to fix the Next.js error
  const { id } = await Promise.resolve(params)
  
  // Try to find agent by exact ID match first
  let agent = agents.find((a) => a.id === id)
  
  // If not found, try with AGT- prefix (for when only the number is provided)
  if (!agent && !id.startsWith('AGT-')) {
    agent = agents.find((a) => a.id === `AGT-${id}`)
  }
  
  // If still not found, return 404
  if (!agent) return notFound()

  return (
    <main className="p-1 mb-4">
      <AgentDetailViewWrapper initialAgent={agent} />
      <div className="w-full px-4">
        <div className="flex h-[50vh] gap-4">
          <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <LayerPieChart />
          </div>
          <div className="w-1/2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <DeviceEventsLineChart deviceId={agent.id} />
          </div>
        </div>
      </div>
    </main>
  )
}