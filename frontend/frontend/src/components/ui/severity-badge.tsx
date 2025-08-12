import { Badge } from "@/components/ui/badge"

type Severity = "low" | "medium" | "high" | "critical"

interface SeverityBadgeProps {
  severity: Severity
}

const severityColorMap: Record<Severity, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-600",
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <Badge className={`${severityColorMap[severity]} text-white capitalize`}>
      {severity}
    </Badge>
  )
}
