// Every brand / app fact lives here so names, IDs and emails are never duplicated.


export const site = {
  brand: "Getting Out",
  tagline: "Stay close. Even from here.",
  email: "katharina@weberapp.click",
  year: new Date().getFullYear(),
  operator: "Katharina Weber",
  // follows Terms §4 and §15 — the app is not a government service or an emergency line
  disclaimer:
    "Feature availability varies by facility and communication provider. Not a government-operated correctional service and not an emergency communication service.",
};

export const app = {
  id: "6820070749",
  url: "https://apps.apple.com/app/id6820070749",
  // App isn't live yet (iTunes lookup returns 0 results, 2026-10-13). After release,
  // fill these from https://itunes.apple.com/lookup?id=6820070749 — specs hide empty values.
  minIOS: "",
  category: "",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/app", label: "App" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
];

// Everything below follows Terms §2 (feature list) and the app's own screens.
// Home S02 — tabs over the product stage
export const stageTabs = [
  { title: "Messages", img: "/images/phone-stage.webp", tilted: true, alt: "Getting Out home: last conversation, Ask AI and the message list" },
  { title: "Ask AI", img: "/images/phone-ai.webp", alt: "AI Assistant screen: Ask AI to write a message" },
  { title: "Favorites", img: "/images/phone-requests.webp", alt: "Requests screen with pending requests and My Contacts" },
];

export const homeFeatures = {
  main: {
    tag: "01 / Messages",
    title: "Keep the conversation going.",
    text: "Exchange text messages with approved contacts. Pick up right where you left off.",
    img: "/images/phone-messages.webp",
  },
  side: [
    { tag: "02 / AI writing", title: "Find the right words.", text: "Ask AI to draft or improve a message. You review it before you send. AI chats are saved on your device.", icon: "ai" },
    { tag: "03 / Favorites", title: "Your people, close at hand.", text: "Save favorite contacts and get a local notification when a request or message needs you.", icon: "fav" },
  ],
};

// Home S05 — sample rows for the request-status block (illustrative names)
export const requestRows = [
  { initials: "RD", name: "Rosa Delgado", meta: "Sister · Sample County Facility", status: "approved", note: "Approved — you can start exchanging messages." },
  { initials: "MB", name: "Marcus Bell", meta: "Son · Sample State Prison", status: "pending", note: "Pending — waiting for the facility, provider or contact to decide." },
  { initials: "TF", name: "Tanya Fields", meta: "Friend · Sample County Jail", status: "rejected", note: "Rejected — the facility or provider declined it. Approval is never guaranteed." },
] as const;

// Home S06 — only facts from the Privacy Policy
export const promises = [
  { title: "AI chats stay on your phone", text: "Your AI conversation history is stored locally on your device." },
  { title: "No ad tracking", text: "No analytics SDKs and no cross-app advertising tracking." },
  { title: "Your data isn’t sold", text: "We don’t sell the personal information you share in the app." },
  { title: "Cancel anytime", text: "Manage or cancel your subscription in your Apple ID settings." },
];

export const steps = [
  { n: "01", title: "Download the app", text: "Get Getting Out for iPhone from the App Store." },
  { n: "02", title: "Find your person", text: "Search by name or inmate ID, then choose the facility." },
  { n: "03", title: "Send a request, then a message", text: "Add your relationship and send a connection request. Once it’s approved, say hello." },
];

// App page — feature switcher, one real screenshot per tab
export const appScreens = [
  { title: "Messages", img: "/images/phone-home.webp", text: "Your last conversation up top, unread counts and pinned contacts. One tap to ask AI for help." },
  { title: "Select Facility", img: "/images/phone-facility.webp", text: "Choose the correctional facility, then find your person by name or inmate ID and add your relationship." },
  { title: "Requests", img: "/images/phone-requests.webp", text: "See every connection request as sent, pending or approved — and your contacts with their last message." },
  { title: "Conversation", img: "/images/phone-messages.webp", text: "Exchange text messages with approved contacts. Messages may be reviewed by the facility." },
  { title: "AI Assistant", img: "/images/phone-ai.webp", text: "Ask AI to write or improve a message, then review it before sending. Saved AI chats stay on your device." },
];

export const specs: [string, string][] = (
  [
    ["Platform", app.minIOS ? `iPhone · iOS ${app.minIOS} or later` : "iPhone"],
    ["Category", app.category],
    ["Developer", site.operator],
    ["Price", "Free download · subscription in app"],
  ] as [string, string][]
).filter(([, v]) => v);

export const principles = [
  { title: "Simple from the first step", text: "Find your person, send a request and see its status. No guessing what happens next." },
  { title: "Honest about what we control", text: "Facilities and communication providers decide on approvals, monitoring and access. We say so up front." },
  { title: "Private by design", text: "AI chats stay on your device. No analytics SDKs, no ad tracking, and your data is never sold." },
];

// Answers paraphrase the Terms / Privacy sections named in brackets (draft — owner to confirm).
export const faq = [
  { q: "How do I find and connect with someone?", a: "Search by name or inmate ID and select the correctional facility. Choose your relationship and send a connection request. Once it’s approved, you can exchange messages." },
  { q: "Why is my request still pending or rejected?", a: "Approval is decided by the facility, the communication provider or your contact. We can’t speed it up or guarantee approval." },
  { q: "Are my messages private?", a: "Messages may be monitored, reviewed, recorded or restricted by the facility or communication provider. Don’t assume they are confidential." },
  { q: "How does the AI helper work?", a: "Ask AI drafts or improves a message, and you review it before sending. Text you submit goes to an external AI provider; your AI chat history stays on your device." },
  { q: "How do I restore a purchase?", a: "Restore previous purchases in the app with the same Apple ID they were made with. Refunds are handled under Apple’s policies." },
  { q: "Why am I not getting notifications?", a: "Notifications are local. Allow them in iPhone Settings → Notifications → Getting Out, and check the app directly when timing matters." },
  { q: "How do I delete my data?", a: "Saved chats and favorites live on your device — delete them in the app or remove the app. Data kept by facilities, Apple or Apphud follows their own policies. Email us for privacy requests." },
  { q: "How do I cancel my subscription?", a: "Subscriptions are billed through your Apple ID. Cancel in iPhone Settings → your name → Subscriptions. Deleting the app doesn’t cancel an active subscription." },
];
