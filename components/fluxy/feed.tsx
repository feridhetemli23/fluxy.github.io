"use client"

import { Composer } from "./composer"
import { PostCard } from "./post-card"
import { posts } from "@/lib/fluxy-data"
import { Sparkles, Clock } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Feed({ safeMode }: { safeMode: boolean }) {
  const [tab, setTab] = useState<"foryou" | "following">("foryou")

  // When safe mode is on, mark media-heavy posts as sensitive to demo filtering
  const feedPosts = posts.map((p) => ({
    ...p,
    sensitive: safeMode && Boolean(p.media && p.media.length > 1),
  }))

  return (
    <div>
      <div className="sticky top-[57px] z-20 flex border-b border-border bg-background/80 backdrop-blur-md">
        {(
          [
            { id: "foryou", label: "For You", icon: Sparkles },
            { id: "following", label: "Following", icon: Clock },
          ] as const
        ).map((t) => {
          const Icon = t.icon
          const isActive = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {t.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      <Composer />

      <div>
        {feedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
