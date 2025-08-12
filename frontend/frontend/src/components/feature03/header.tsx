//  \components\feature03\header.tsx

'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  // Check current route to select the active tab
  const currentTab = pathname.startsWith('/individual_dashboard') ? 'Individual' : 'Unified'

  const handleTabChange = (value: string) => {
    if (value === 'Unified') {
      router.push('/') // Goes to app/page.tsx
    } else if (value === 'Individual') {
      router.push('/individual_dashboard') // Goes to app/agents/page.tsx
    }
  }

  return (
    <Card className="border-b rounded-none sticky top-0 z-10">
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Left Side - Tabs */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-22 h-8 bg-orange-600 rounded text-white font-bold flex items-center justify-center text-sm">
              CyberDeck
            </div>
            <Tabs value={currentTab} onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="Unified">Unified</TabsTrigger>
                <TabsTrigger value="Individual">Individual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Right Side - User Menu */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <Link href="/logs" className="text-muted-foreground hover:text-foreground">Logs</Link>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel onClick={() => {alert('CyArt Project')}}>  My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem></DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                alert('CyArt Team: \n\nBackend:\nAnujith\nDanish\ T\n\nFrontend:\nRipunjay\nRagini\nSwaraj\n\nData:\nJignesh\nHarish\nAbhinay \n\nSupport:\nAnujith\nSreenithi\nVineel')
              }}>
                Support 
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}
