"use client"

import {
  Compass,
  Bell,
  ShieldCheck,
  Users,
  User,
  Lock,
  Cloud,
  Bot,
  KeyRound,
  Heart,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { securityMetrics } from "@/lib/fluxy-data"
import { cn } from "@/lib/utils"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const config: Record<string, Feature> = {
  explore: {
    icon: Compass,
    title: "Explore",
    description:
      "Discover creators, communities, and trending moments — all pre-screened by Fluxy's safety engine.",
  },
  notifications: {
    icon: Bell,
    title: "Notifications",
    description: "Stay in the loop with likes, reposts, and secure mentions.",
  },
  security: {
    icon: ShieldCheck,
    title: "Security Hub",
    description:
      "Real-time visibility into the protections keeping Fluxy safe around the clock.",
  },
  parental: {
    icon: Users,
    title: "Parental Controls",
    description:
      "Manage screen time, content filters, and approve who your kids connect with.",
  },
  profile: {
    icon: User,
    title: "Profile",
    description: "Your private, encrypted corner of Fluxy.",
  },
}

const statusIcon = { active: Cloud, blocked: Bot, secure: KeyRound }

const notifications = [
  { icon: Heart, text: "Mia Carter and 1,283 others liked your post", time: "8m", tone: "primary" },
  { icon: MessageCircle, text: "Leo Nguyen commented: this is so cool!", time: "22m", tone: "muted" },
  { icon: ShieldCheck, text: "Your account passed today's security scan", time: "1h", tone: "primary" },
]

const parentalControls = [
  { label: "Daily Screen Time", value: "2h 30m", detail: "1h 12m used today" },
  { label: "Content Filter Level", value: "Strict", detail: "Sensitive media blocked" },
  { label: "Approved Contacts", value: "18 friends", detail: "All parent-approved" },
  { label: "Bedtime Lock", value: "9:00 PM", detail: "Auto sign-out enabled" },
]

export function FeaturePanel({ id }: { id: string }) {
  const feature = config[id] ?? config.explore
  const Icon = feature.icon

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon className="size-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold">{feature.title}</h2>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      </div>

      {id === "security" && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {securityMetrics.map((m) => {
            const SIcon = statusIcon[m.status]
            return (
              <div
                key={m.label}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl",
                    m.status === "blocked"
                      ? "bg-accent/15 text-accent"
                      : "bg-primary/15 text-primary",
                  )}
                >
                  <SIcon className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold">{m.label}</p>
                <p
                  className={cn(
                    "text-lg font-bold",
                    m.status === "blocked" ? "text-accent" : "text-primary",
                  )}
                >
                  {m.value}
                </p>
                <p className="text-xs text-muted-foreground">{m.detail}</p>
              </div>
            )
          })}
        </div>
      )}

      {id === "notifications" && (
        <div className="mt-4 flex flex-col gap-2">
          {notifications.map((n, i) => {
            const NIcon = n.icon
            return (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg",
                    n.tone === "primary"
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  <NIcon className="size-4" />
                </span>
                <p className="flex-1 text-sm text-foreground">{n.text}</p>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
            )
          })}
        </div>
      )}

      {id === "parental" && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {parentalControls.map((c) => (
            <div
              key={c.label}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4"
            >
              <div>
                <p className="text-sm font-semibold">{c.label}</p>
                <p className="text-xs text-muted-foreground">{c.detail}</p>
              </div>
              <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {id === "profile" && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="h-24 bg-gradient-to-r from-primary/30 to-accent/30" />
          <div className="px-5 pb-5">
            <Image
              src="/avatars/me.png"
              alt="Your avatar"
              width={80}
              height={80}
              className="-mt-10 size-20 rounded-full border-4 border-card object-cover"
            />
            <div className="mt-2 flex items-center gap-1.5">
              <h3 className="text-lg font-bold">You</h3>
              <Lock className="size-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">@you · Joined 2026</p>
            <p className="mt-2 text-sm text-foreground">
              Just here to have fun and stay safe. 🔒🔥
            </p>
            <div className="mt-3 flex gap-5 text-sm">
              <span>
                <strong className="font-bold">248</strong>{" "}
                <span className="text-muted-foreground">Following</span>
              </span>
              <span>
                <strong className="font-bold">1.2K</strong>{" "}
                <span className="text-muted-foreground">Followers</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
