"use client"

import { cn } from "@/lib/utils"
import { navItems } from "./sidebar"

export function MobileNav({
  active,
  onNavigate,
}: {
  active: string
  onNavigate: (id: string) => void
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-sidebar/95 px-2 py-2 backdrop-blur lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "relative flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="relative">
              <Icon className="size-5" />
              {item.badge > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                  {item.badge}
                </span>
              )}
            </span>
            <span className="max-[400px]:hidden">{item.label.split(" ")[0]}</span>
          </button>
        )
      })}
    </nav>
  )
}
