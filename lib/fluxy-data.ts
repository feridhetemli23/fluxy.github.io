export type Post = {
  id: string
  author: string
  handle: string
  avatar: string
  time: string
  verified?: boolean
  encrypted?: boolean
  text?: string
  media?: string[]
  likes: number
  reposts: number
  comments: number
  sensitive?: boolean
}

export const posts: Post[] = [
  {
    id: "1",
    author: "Mia Carter",
    handle: "@miaskates",
    avatar: "/avatars/avatar-1.png",
    time: "12m",
    verified: true,
    encrypted: true,
    text: "Landed my first kickflip today after months of trying 🛹 the grind is real but so worth it. Who else is learning something new this week?",
    media: ["/feed/skate-park.png"],
    likes: 1284,
    reposts: 212,
    comments: 96,
  },
  {
    id: "2",
    author: "Leo Nguyen",
    handle: "@leobuilds",
    avatar: "/avatars/avatar-2.png",
    time: "34m",
    encrypted: true,
    text: "hot take: the best part of the internet should feel safe AND fun at the same time. you shouldn't have to choose. that's why I'm all in on Fluxy 🔥",
    likes: 842,
    reposts: 134,
    comments: 58,
  },
  {
    id: "3",
    author: "Aria Studio",
    handle: "@ariacreates",
    avatar: "/avatars/avatar-3.png",
    time: "1h",
    verified: true,
    encrypted: true,
    text: "Spent the afternoon experimenting with bold shapes and neon. Swipe through my latest digital art drop ✨",
    media: ["/feed/digital-art.png", "/feed/gaming-setup.png"],
    likes: 3102,
    reposts: 489,
    comments: 221,
  },
  {
    id: "4",
    author: "Trail Crew",
    handle: "@trailcrew",
    avatar: "/avatars/avatar-2.png",
    time: "2h",
    encrypted: true,
    text: "Golden hour from the summit. Touch grass, it's good for you 🌄",
    media: ["/feed/sunset-hike.png"],
    likes: 967,
    reposts: 88,
    comments: 41,
  },
]

export type TrendItem = {
  topic: string
  category: string
  posts: string
}

export const trends: TrendItem[] = [
  { category: "Creativity", topic: "#DigitalArtDrop", posts: "24.1K posts" },
  { category: "Sports", topic: "#SkateSeason", posts: "18.7K posts" },
  { category: "Gaming", topic: "#SetupGoals", posts: "12.3K posts" },
  { category: "Outdoors", topic: "#TouchGrass", posts: "9.8K posts" },
]

export type SecurityMetric = {
  label: string
  value: string
  status: "active" | "blocked" | "secure"
  detail: string
}

export const securityMetrics: SecurityMetric[] = [
  {
    label: "Cloudflare DDoS Protection",
    value: "Active",
    status: "active",
    detail: "0 ongoing attacks · 99.99% uptime",
  },
  {
    label: "Anti-Bot Firewall",
    value: "4,182",
    status: "blocked",
    detail: "Automated threats blocked today",
  },
  {
    label: "Data Encryption",
    value: "AES-256",
    status: "secure",
    detail: "End-to-end on every message & post",
  },
]
