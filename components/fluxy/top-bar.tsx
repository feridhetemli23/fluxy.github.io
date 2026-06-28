"use client"

import { Search, Zap, Lock, Baby } from "lucide-react"
import { cn } from "@/lib/utils"

export function TopBar({
  title,
  safeMode,
  onToggleSafeMode,
}: {
  title: string
  safeMode: boolean
  onToggleSafeMode: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-5 fill-current" />
          </span>
          <span className="text-lg font-bold">Fluxy</span>
        </div>

        <h1 className="hidden text-xl font-bold lg:block">{title}</h1>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-xs flex-1 sm:block lg:ml-6">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search Fluxy"
            className="w-full rounded-full border border-border bg-secondary/60 py-2 pl-9 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-secondary"
          />
        </div>

        {/* Privacy Shield badge */}
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <Lock className="size-3.5" />
            <span className="hidden sm:inline">Privacy Shield · E2E</span>
            <span className="sm:hidden">E2E</span>
          </div>

          {/* Safe Mode toggle */}
          <button
            onClick={onToggleSafeMode}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              safeMode
                ? "border-accent/40 bg-accent/15 text-accent"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground",
            )}
            role="switch"
            aria-checked={safeMode}
            aria-label="Toggle Safe Mode"
          >
            <Baby className="size-3.5" />
            <span className="hidden sm:inline">
              {safeMode ? "Kids Mode On" : "Kids Mode Off"}
            </span>
            <span
              className={cn(
                "relative h-4 w-7 rounded-full transition-colors",
                safeMode ? "bg-accent" : "bg-muted-foreground/40",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-3 rounded-full bg-background transition-all",
                  safeMode ? "left-3.5" : "left-0.5",
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
