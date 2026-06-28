"use client"

import {
  ShieldCheck,
  Cloud,
  Bot,
  KeyRound,
  TrendingUp,
  Baby,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { securityMetrics, trends } from "@/lib/fluxy-data"

const statusIcon = {
  active: Cloud,
  blocked: Bot,
  secure: KeyRound,
}

export function RightRail({
  safeMode,
  onToggleSafeMode,
}: {
  safeMode: boolean
  onToggleSafeMode: () => void
}) {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-4 py-5 pr-6 xl:flex">
      {/* Privacy Shield card */}
      <section className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 to-card p-5">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <h2 className="text-sm font-bold">Privacy Shield</h2>
            <p className="text-xs text-primary">Fully protected</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-semibold text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            E2E On
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Your posts, DMs, and profile are encrypted end-to-end. No ads, no
          data selling, no tracking — ever.
        </p>
      </section>

      {/* Security Dashboard widget */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <ShieldCheck className="size-4 text-primary" />
            Security Dashboard
          </h2>
          <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            Live
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {securityMetrics.map((m) => {
            const Icon = statusIcon[m.status]
            return (
              <div
                key={m.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3"
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    m.status === "blocked"
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/15 text-primary",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {m.label}
                    </p>
                    <span
                      className={cn(
                        "shrink-0 text-xs font-bold",
                        m.status === "blocked" ? "text-accent" : "text-primary",
                      )}
                    >
                      {m.value}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {m.detail}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Safe / Kids Mode toggle */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 p-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-accent/20 text-accent">
            <Baby className="size-4" />
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">
              Safe Mode / Kids Mode
            </p>
            <p className="text-[11px] text-muted-foreground">
              Auto-filters sensitive content
            </p>
          </div>
          <button
            onClick={onToggleSafeMode}
            role="switch"
            aria-checked={safeMode}
            aria-label="Toggle Safe Mode"
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              safeMode ? "bg-accent" : "bg-muted-foreground/40",
            )}
          >
            <span
              className={cn(
                "absolute top-1 size-4 rounded-full bg-background transition-all",
                safeMode ? "left-6" : "left-1",
              )}
            />
          </button>
        </div>
      </section>

      {/* Trends */}
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold">
          <TrendingUp className="size-4 text-accent" />
          Trending Safely
        </h2>
        <div className="flex flex-col">
          {trends.map((t) => (
            <button
              key={t.topic}
              className="group -mx-2 flex items-center gap-2 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-secondary/60"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-muted-foreground">
                  {t.category}
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  {t.topic}
                </p>
                <p className="text-[11px] text-muted-foreground">{t.posts}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      <p className="px-2 text-[11px] leading-relaxed text-muted-foreground">
        Fluxy · Built for freedom, privacy & safety. © 2026
      </p>
    </aside>
  )
}
