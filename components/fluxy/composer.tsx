"use client"

import { useState } from "react"
import Image from "next/image"
import { ImagePlus, Smile, Lock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Composer() {
  const [value, setValue] = useState("")
  const max = 280

  return (
    <div className="border-b border-border bg-card/40 p-4 sm:p-5">
      <div className="flex gap-3">
        <Image
          src="/avatars/me.png"
          alt="Your avatar"
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, max))}
            placeholder="Share something safe & fun…"
            rows={2}
            className="w-full resize-none bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-1 text-primary">
              <button
                className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-primary/10"
                aria-label="Add image"
              >
                <ImagePlus className="size-5" />
              </button>
              <button
                className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-primary/10"
                aria-label="Add emoji"
              >
                <Smile className="size-5" />
              </button>
              <span className="ml-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Lock className="size-3" />
                Encrypted
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs tabular-nums text-muted-foreground">
                {value.length}/{max}
              </span>
              <Button
                disabled={!value.trim()}
                className="gap-1.5 rounded-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="size-4" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
