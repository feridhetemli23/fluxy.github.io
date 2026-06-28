"use client"

import { useState } from "react"
import { Sidebar, navItems } from "./sidebar"
import { MobileNav } from "./mobile-nav"
import { TopBar } from "./top-bar"
import { Feed } from "./feed"
import { FeaturePanel } from "./feature-panel"
import { RightRail } from "./right-rail"

export function Dashboard() {
  const [active, setActive] = useState("home")
  const [safeMode, setSafeMode] = useState(true)

  const title =
    navItems.find((n) => n.id === active)?.label ?? "Home"

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1400px]">
      <Sidebar active={active} onNavigate={setActive} />

      <main className="flex min-w-0 flex-1 border-x border-border pb-20 lg:pb-0">
        <div className="min-w-0 flex-1">
          <TopBar
            title={title}
            safeMode={safeMode}
            onToggleSafeMode={() => setSafeMode((v) => !v)}
          />
          {active === "home" ? (
            <Feed safeMode={safeMode} />
          ) : (
            <FeaturePanel id={active} />
          )}
        </div>
      </main>

      <RightRail
        safeMode={safeMode}
        onToggleSafeMode={() => setSafeMode((v) => !v)}
      />

      <MobileNav active={active} onNavigate={setActive} />
    </div>
  )
}
