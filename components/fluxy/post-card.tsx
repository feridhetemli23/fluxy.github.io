"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Heart,
  Repeat2,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
  Lock,
  MoreHorizontal,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Post } from "@/lib/fluxy-data"

function formatCount(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "K"
  return String(n)
}

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false)
  const [reposted, setReposted] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const likeCount = post.likes + (liked ? 1 : 0)
  const repostCount = post.reposts + (reposted ? 1 : 0)

  const hidden = post.sensitive && !revealed

  return (
    <article className="border-b border-border p-4 transition-colors hover:bg-card/30 sm:p-5">
      <div className="flex gap-3">
        <Image
          src={post.avatar || "/placeholder.svg"}
          alt={post.author}
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-bold text-foreground">{post.author}</span>
            {post.verified && (
              <BadgeCheck className="size-4 text-accent" aria-label="Verified" />
            )}
            <span className="truncate text-muted-foreground">
              {post.handle}
            </span>
            <span className="text-muted-foreground">· {post.time}</span>
            {post.encrypted && (
              <Lock
                className="ml-auto size-3.5 text-primary"
                aria-label="End-to-end encrypted"
              />
            )}
            <button
              className="ml-1 flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>

          {post.text && (
            <p className="mt-1.5 text-pretty text-[15px] leading-relaxed text-foreground">
              {post.text}
            </p>
          )}

          {post.media && post.media.length > 0 && (
            <div
              className={cn(
                "relative mt-3 grid gap-1.5 overflow-hidden rounded-2xl border border-border",
                post.media.length > 1 ? "grid-cols-2" : "grid-cols-1",
              )}
            >
              {post.media.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-secondary"
                >
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Post media ${i + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-all duration-300",
                      hidden && "scale-110 blur-2xl",
                    )}
                  />
                </div>
              ))}
              {hidden && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/60">
                  <EyeOff className="size-6 text-accent" />
                  <p className="px-6 text-center text-xs font-medium text-foreground">
                    Hidden by Kids Mode
                  </p>
                  <button
                    onClick={() => setRevealed(true)}
                    className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent"
                  >
                    View anyway
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between pr-2 sm:max-w-md">
            <button
              onClick={() => setLiked((v) => !v)}
              className={cn(
                "group flex items-center gap-1.5 text-sm transition-colors",
                liked ? "text-primary" : "text-muted-foreground hover:text-primary",
              )}
              aria-pressed={liked}
            >
              <span className="flex size-8 items-center justify-center rounded-full transition-colors group-hover:bg-primary/10">
                <Heart className={cn("size-[18px]", liked && "fill-current")} />
              </span>
              <span className="tabular-nums">{formatCount(likeCount)}</span>
            </button>

            <button
              onClick={() => setReposted((v) => !v)}
              className={cn(
                "group flex items-center gap-1.5 text-sm transition-colors",
                reposted
                  ? "text-accent"
                  : "text-muted-foreground hover:text-accent",
              )}
              aria-pressed={reposted}
            >
              <span className="flex size-8 items-center justify-center rounded-full transition-colors group-hover:bg-accent/10">
                <Repeat2 className="size-[18px]" />
              </span>
              <span className="tabular-nums">{formatCount(repostCount)}</span>
            </button>

            <button className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <span className="flex size-8 items-center justify-center rounded-full transition-colors group-hover:bg-secondary">
                <MessageCircle className="size-[18px]" />
              </span>
              <span className="tabular-nums">{formatCount(post.comments)}</span>
            </button>

            <button className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              <span className="flex size-8 items-center justify-center rounded-full transition-colors group-hover:bg-primary/10">
                <ShieldCheck className="size-[18px]" />
              </span>
              <span className="hidden sm:inline">Secure Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
