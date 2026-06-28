"use client"

import {
  Home,
  Compass,
  Bell,
  ShieldCheck,
  Users,
  User,
  Zap,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const navItems = [
  { id: "home", label: "Home", icon: Home, badge: 0 },
  { id: "explore", label: "Explore", icon: Compass, badge: 0 },
  { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
  { id: "security", label: "Security Hub", icon: ShieldCheck, badge: 0 },
  { id: "parental", label: "Parental Controls", icon: Users, badge: 0 },
  { id: "profile", label: "Profile", icon: User, badge: 0 },
]

export function Sidebar({
  active,
  onNavigate,
}: {
  active: string
  onNavigate: (id: string) => void
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-20 shrink-0 flex-col border-r border-border bg-sidebar px-3 py-6 lg:flex xl:w-72">
      <div className="flex items-center gap-3 px-2 xl:px-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Zap className="size-6 fill-current" />
        </span>
        <span className="hidden text-2xl font-bold tracking-tight xl:block">
          Fluxy
        </span>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "group relative flex items-center gap-4 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                "justify-center xl:justify-start",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative">
                <Icon className="size-6" />
                {item.badge > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className="hidden xl:block">{item.label}</span>
              {isActive && (
                <span className="absolute left-0 top-1/2 hidden h-6 -translate-y-1/2 rounded-r-full bg-primary xl:block xl:w-1" />
              )}
            </button>
          )
        })}
      </nav>

      <Button className="mt-4 w-full gap-2 rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
        <Plus className="size-5" />
        <span className="hidden xl:block">New Post</span>
      </Button>
    </aside>
  )
}
