# Nail Palette — Product & Design Documentation

> A mobile-first nail beauty platform for Gen Z — built as a single-file React artifact, designed like a Glossier × Pinterest × TikTok hybrid.

---

## Table of contents

1. [Executive summary](#1-executive-summary)
2. [Brand & visual design system](#2-brand--visual-design-system)
3. [Information architecture & navigation map](#3-information-architecture--navigation-map)
4. [Screen-by-screen walkthrough](#4-screen-by-screen-walkthrough)
5. [Cross-cutting features](#5-cross-cutting-features)
6. [Social media features](#6-social-media-features)
7. [Booking flow features](#7-booking-flow-features)
8. [Review & rating system](#8-review--rating-system)
9. [Gen Z polish details](#9-gen-z-polish-details)
10. [Tech stack notes](#10-tech-stack-notes)
11. [Suggested next steps](#11-suggested-next-steps)
12. [Project organization](#12-project-organization)

---

## 1. Executive summary

**Nail Palette** is a mobile-first nail beauty platform that lives at the intersection of three things Gen Z already loves: scrolling for inspiration, saving aesthetic content into collections, and booking the actual service without leaving the app. It's Pinterest for nail looks, Instagram for nail creators, and OpenTable for nail salons — collapsed into one soft-pastel, glass-cardded, sparkle-laden surface.

The product vision is simple: **the entire customer journey of "I saw a cute nail look → I booked the appointment" should happen on one screen, without app-switching, without copy-pasting a screenshot into a salon's DMs, without forgetting the inspo by Tuesday.** Discovery, saving, salon shopping, and booking aren't separate apps — they're separate tabs in the same flow.

**The target audience is 16–28 year old nail enthusiasts** who already think in lowercase captions and emoji shorthand, who screenshot looks they want to recreate, who care about which artist did the work as much as the work itself, and who would rather book a salon through a beautifully designed mobile app than over the phone. The voice across the app reflects that — captions like `"chrome glaze era 💅✨"` and `"barbie pink bows 🩷"` aren't decorations, they're the register the audience actually speaks in.

**The aesthetic direction is elegant and cute, not cluttered or childish.** The brief was "Glossier meets TikTok meets Pinterest" — that translates to a refined, soft pastel palette (blush pink, lavender, peach, cream, rose gold), generous corner radii, glassmorphism everywhere, gradient text on the wordmark, and one tasteful emoji per moment instead of a confetti dump. The result feels premium and sparkly without ever feeling juvenile.

The artifact ships as a single self-contained React component rendered inside a faux iPhone frame. It's feature-complete on the UI dimension and intentionally hollow on the data dimension — every screen, interaction, modal, drawer, and toast is fully wired, but persistence and a real backend aren't (yet) part of the build.

---

## 2. Brand & visual design system

### 2.1 Color palette

The palette is anchored on **five soft pastels with rose gold accents.** Contrast comes from saturation jumps within that narrow tonal range rather than from light/dark inversion — that's what gives the app its Glossier feel.

| Token | Hex | Closest Tailwind | Role |
|---|---|---|---|
| Blush pink | `#FFC8DD` | `pink-200` / `pink-300` | Primary brand color, action gradients |
| Lavender | `#CDB4DB` | `purple-200` | Secondary accent, "this week's vibe" hero |
| Peach | `#FFCFD2` | `rose-100` / `orange-100` | Warmth accents in feed |
| Cream | `#FFF1E6` | `rose-50` / `pink-50` | App canvas background |
| Rose gold | `#E8B4B8` | `rose-300` | Highlights, premium accents |

**Functional colors layered on top:**

| Use case | Color |
|---|---|
| Primary action gradient | `from-pink-400 to-rose-500` |
| Selected state gradient | `from-pink-300 to-rose-400` |
| Wordmark gradient text | `from-pink-500 via-rose-500 to-purple-500` |
| Star ratings (filled) | `amber-400` |
| Star ratings (empty) | `gray-200` |
| Body text | `gray-700` to `gray-900` |
| Subtle text / metadata | `gray-400` to `gray-500` |

Every prominent gradient surface is layered with a translucent shine overlay — a `bg-gradient-to-tr from-transparent via-white/40 to-transparent` div sitting on top of the base gradient. This single trick turns a flat color block into something that reads as glossy rather than filled.

### 2.2 Typography

The typographic system relies on **dramatic contrast between two voices.** A refined functional sans-serif handles all body work; a cursive serif italic handles the brand voice.

| Use case | Font | Notes |
|---|---|---|
| Body & UI | `Inter, system-ui, -apple-system` | Applied via inline style on the root |
| Brand wordmark | Tailwind `font-serif italic` | With gradient text fill |
| Section headers | Tailwind `font-serif italic` | Smaller scale, same family |

Sizes are tuned tight for a mobile viewport. Most body text sits at `text-[11px]` or `text-[12px]`, with frequent half-step bracket sizes (`text-[10.5px]`, `text-[12.5px]`) to make dense information layouts fit cleanly inside a 380px-wide phone frame. The largest in-app text is `text-2xl` for the header wordmark; the splash bumps it up to `text-5xl` for one dramatic moment.

The wordmark contrast — serif italic gradient against everything else being sans-serif neutral — does roughly 80% of the brand-character work in the app. It's the single strongest typography decision.

### 2.3 Iconography

All icons come from **lucide-react**, used at consistent sizes:

| Context | Size |
|---|---|
| Bottom nav | `w-4.5 h-4.5` |
| Header buttons | `w-4 h-4` |
| Inline metadata icons | `w-3 h-3` |
| Modal accents | `w-5 h-5` |

Active bottom-nav icons get `strokeWidth={2.5}`; inactive get the default `2`. This slight weight difference reinforces the active state on top of the gradient pill behind it.

Key icons in use: `Home`, `Compass`, `ShoppingBag`, `Heart`, `User`, `Menu`, `Bell`, `Search`, `Star`, `Bookmark`, `Sparkles`, `Camera`, `Send`, `Edit3`, `MessageCircle`, `Settings`, `Users`, `Check`, `MapPin`, `Clock`, `ThumbsUp`, `Reply`, `ChevronLeft`, `ChevronRight`, `X`, `Plus`, `ArrowRight`, `MoreHorizontal`.

### 2.4 Glassmorphism

Every "glass" surface follows one recipe:

```
bg-white/70 backdrop-blur-xl border border-white/80
```

Variations:
- **High-content surfaces** (bottom nav, sticky book bar): `bg-white/80 backdrop-blur-2xl`
- **Critical readability** (toasts): `bg-white/95 backdrop-blur-xl`
- **Subtle overlays** (drawer backdrop): `bg-gray-900/30 backdrop-blur-sm`

The 70% white opacity is deliberate — enough contrast to read black text on, but translucent enough that the background gradient bleeds through and ties the surface to the page. Borders stay at `white/80` (not the more common `white/40`) so card edges read crisply against the colored backdrop.

### 2.5 Gradients

Three gradient patterns recur throughout:

1. **Brand gradients** — `from-pink-300 to-rose-400` (actions), `from-pink-500 via-rose-500 to-purple-500` (wordmark text)
2. **Surface gradients** — three-stop pastels like `from-pink-200 via-rose-200 to-purple-200` for hero cards and banners
3. **Tile gradients** — varied per item, giving each post, trend, or artist its own signature

`bg-gradient-to-br` is the default direction. `bg-gradient-to-r` is reserved for horizontal action elements. `bg-gradient-to-tr` is the standard for shine overlays.

### 2.6 Corner radii

Almost nothing is square. The system uses a deliberate ladder:

| Element | Radius |
|---|---|
| Small chips, pills | `rounded-full` |
| Inputs, small cards | `rounded-2xl` (1rem) |
| Standard cards | `rounded-3xl` / `rounded-[1.5rem]` |
| Feed tiles, large cards | `rounded-[1.75rem]` |
| Modals, sheets | `rounded-t-[2rem]` |
| Phone shell | `rounded-[3rem]` |

Bracket-syntax radii are picked to feel distinct from their neighbors, not interchangeable. `rounded-[1.75rem]` on a feed tile feels softer than `rounded-2xl` on a small chip — that softness is what reads as "Pinterest pin" instead of "card component."

### 2.7 Motion principles

Three classes of motion are in active use:

1. **Continuous transitions** — `transition-all duration-300` is the default on any state-changing element. Tap responses (scale, color shift) all happen in this layer.
2. **One-shot animations** — reserved for specific moments: heart `animate-ping` burst on like, splash dots `animate-pulse` staggered by 200ms, modal `@keyframes slideUp` entrance.
3. **Visual rest states** — slow ambient animations (the bell notification dot, sparkle emojis on the hero card) pulse continuously to keep the surface feeling living rather than frozen.

The guiding principle: **motion should reward an action, not announce itself.** A liked heart should pop. A booked appointment should slide a toast down. Nothing should jiggle for attention.

---

## 3. Information architecture & navigation map

The app has two parallel navigation systems: a **5-tab bottom nav** for the primary loop, and a **6-item side drawer** for account-level destinations and secondary screens.

### 3.1 Bottom navigation

The bottom nav is the primary navigation system and holds the five core user loops.

| Tab | Icon | Label | Purpose |
|---|---|---|---|
| `home` | `Home` | Home | The Pinterest-style feed of nail looks |
| `discover` | `Compass` | Discover | Trending styles, hashtags, artist directory |
| `book` | `ShoppingBag` | Book | The full appointment booking flow |
| `favorites` | `Heart` | Saved | Saved looks with Wishlist / Tried / Inspo tabs |
| `profile` | `User` | Profile | The user's own profile, stats, posts |

Discover and Saved carry small pink notification dots when they're not the active tab — used to signal "new content" or "your saved item updated." The active tab is rendered with a pink-to-rose gradient pill behind the icon, white icon stroke, thicker weight, 110% scale, and pink label.

### 3.2 Side drawer

The drawer holds the six account-level destinations. It's reached by tapping the hamburger icon in the top-left of the header.

| Item | Icon | Subtitle | Wired to |
|---|---|---|---|
| My Shopping | `ShoppingBag` | "3 in cart" | (placeholder) |
| My Profile | `User` | "@khamzat" | `profile` tab |
| Messages | `MessageCircle` | "2 new ✨" | (placeholder) |
| Reviews | `Star` | "Luxe Nails" | `reviews` screen |
| Settings | `Settings` | "preferences" | (placeholder) |
| Community | `Users` | "12k members 🩷" | (placeholder) |

The drawer also houses a profile mini-card at the top (avatar + username + "view your profile →") and a "go premium" gradient card at the bottom — both common upsell patterns in social-commerce apps.

### 3.3 The sixth screen — Reviews

Reviews is the **sixth screen** and gets a special access pattern: it's not in the bottom nav (which is capped at five tabs by convention), but it's reachable from two places:

1. The drawer (`Reviews` item)
2. The Profile quick-links grid (`Reviews` button)

This pattern is used in real apps (Instagram, Airbnb) — secondary screens that don't earn a permanent tab still get multiple discoverable entry points.

### 3.4 Navigation map

```
┌─────────────────────────────────────────────────────────────┐
│                         App Header                          │
│   [☰ drawer] ────────── Nail Palette ────────── [bell 🔔]   │
└─────────────────────────────────────────────────────────────┘
            │                                       │
            ▼                                       ▼
   ┌────────────────┐                       ┌──────────────┐
   │  Side Drawer   │                       │ Notifications│
   │                │                       │   (future)   │
   │ • Shopping     │                       └──────────────┘
   │ • Profile ─────┼──┐
   │ • Messages     │  │
   │ • Reviews ─────┼──┼──┐
   │ • Settings     │  │  │
   │ • Community    │  │  │
   └────────────────┘  │  │
                       │  │
   ┌───────────────────▼──▼──────────────────────────────────┐
   │                    Active Tab Content                   │
   │ ┌──────┐ ┌────────┐ ┌──────┐ ┌─────────┐ ┌───────────┐  │
   │ │ Home │ │Discover│ │ Book │ │Favorites│ │  Profile  │  │
   │ └──────┘ └────────┘ └──────┘ └─────────┘ └───────────┘  │
   │                                              │          │
   │                                              └──► Reviews│
   └─────────────────────────────────────────────────────────┘
                              │
   ┌──────────────────────────▼──────────────────────────────┐
   │                  Bottom Navigation                      │
   │  🏠 Home │ 🧭 Discover │ 🛍 Book │ 💜 Saved │ 👤 Profile │
   └─────────────────────────────────────────────────────────┘
```

---

## 4. Screen-by-screen walkthrough

### 4.1 Home Feed

The home feed is where most users will spend most of their time. It's structured as five stacked regions, each doing one job well.

**Components, top to bottom:**

1. **Search bar** — a pill-shaped input with a `Search` icon on the left, placeholder text `"search nail looks…"`, and a circular `Sparkles` gradient button on the right (visually a brand anchor, functionally a future hook for AI-assisted search).
2. **Category pills** — a horizontally scrollable row of six category filters: `Reference`, `Colour`, `Service`, `Feet`, `Product`, `Trends`. The active pill renders with a pink-to-rose gradient, white text, shadow, and a 105% scale. Inactive pills sit as glass cards.
3. **Spotlight strip** — a horizontal editorial banner card with the label `SPOTLIGHT`, the title `"glazed donut summer 🍩"`, a `💅` emoji on the left, a large `✨` on the right, and a `"explore the trend →"` call to action.
4. **Masonry feed** — a `columns-2` Pinterest-style grid of all 8 nail posts, with staggered tile heights for visual rhythm.

**Sample feed content — 8 posts:**

| # | Username | Caption | Likes | Accent |
|---|---|---|---|---|
| 1 | `@jennieblackwing` | chrome glaze era 💅✨ | 12.4k | 🎀 |
| 2 | `@kimmylee` | soft girl french 🤍 | 8.2k | ✨ |
| 3 | `@nickiminos` | barbie pink bows 🩷 | 24.1k | 🎀 |
| 4 | `@obamyslayy26` | y2k aura nails 💜 | 5.7k | 💫 |
| 5 | `@cherrybloom` | cherry red gloss 🍒 | 15.9k | 🍒 |
| 6 | `@y2kbarbie` | glitter french tip ✨ | 9.3k | ✨ |
| 7 | `@lunavibes` | milky lavender 🦋 | 6.8k | 🦋 |
| 8 | `@sugarpeach` | peachy ombré 🍑 | 11.2k | 🍑 |

**Each post tile carries:**

- A gradient background unique to the post
- A centered `💅` emoji as the nail rendering
- An accent emoji floating in the bottom-right
- A bookmark toggle in the top-right (pink filled when saved)
- A small gradient avatar dot + username below the tile
- The caption below the username
- A heart icon + like count below the caption

**Interactions:**

- Tapping the bookmark adds/removes the post from `savedPosts`. The icon fills pink and the button scales up 10%.
- Tapping the heart adds/removes the post from `likedPosts`. On add, a large pink heart pings over the tile for 600ms via the `heartBurst` state pattern.
- Hovering any tile scales it to 102% and rotates it −1deg for a tactile feel.
- Tapping a category pill swaps the active filter (state is captured; filtering logic is left as future work).

---

### 4.2 Discover

The Discover screen is the editorial discovery surface. It leads with a hero, then descends through three sub-sections.

**Components, top to bottom:**

1. **"This Week's Vibe" hero card** — a tall pastel gradient card with the uppercase tracked eyebrow `THIS WEEK'S VIBE`, the serif italic display title `"glazed lavender aura"`, the description `"soft, dreamy, with that just-out-of-the-salon shine 💜"`, and a `"get the look →"` action button. A pulsing `✨` sits in the top-right; a `🎀` anchors the bottom-right.
2. **Trending styles grid** — a 2×3 grid of six trending nail styles.
3. **Trending hashtags row** — a horizontally scrollable row of six hashtag chips.
4. **Artists for you carousel** — a horizontally scrollable carousel of three suggested artist cards.

**Trending styles (2×3 grid):**

| Style | Emoji | Gradient |
|---|---|---|
| Chrome | 💅 | slate → pink → purple |
| French Tip | 🤍 | pink → rose → pink |
| Aura | 💫 | purple → pink → fuchsia |
| Cat Eye | 🐈 | fuchsia → violet → indigo |
| Jelly | 🍓 | rose → pink → red |
| Bows | 🎀 | pink → rose → pink |

Each tile has a soft `hover:scale-[1.03] hover:-rotate-1` transform and a small `ArrowRight` button in the bottom-right.

**Trending hashtags:**

| Hashtag | Sample post count |
|---|---|
| `#chromenails` | 45.0k posts |
| `#frenchtip` | 39.0k posts |
| `#y2knails` | 33.0k posts |
| `#cleangirl` | 27.0k posts |
| `#bowsonbows` | 21.0k posts |
| `#milkynails` | 15.0k posts |

**Artists carousel:** the same three artists from the booking flow (Bella, Aria, Mia) are previewed here as discoverable creators, each with a gradient header, avatar, name, salon, and star rating.

**Interactions:**

- Tapping any trend tile (planned) opens a filtered feed of that style.
- Tapping a hashtag (planned) opens a hashtag-filtered view.
- Tapping an artist card (planned) opens their profile.

---

### 4.3 Book Appointment

The Book screen is the longest and most interactive — it progresses top-to-bottom through four decisions and closes with a sticky CTA.

**Components, top to bottom:**

1. **Month header** — "May 2026" in serif italic, with `ChevronLeft` and `ChevronRight` buttons for month navigation.
2. **Calendar grid** — a 7-column grid with day-of-week labels (S/M/T/W/T/F/S) and the 31 days of May, with one leading offset row of 5 blanks (May 1, 2026 is a Friday).
3. **Service selector** — a horizontally scrollable row of pills for the five services.
4. **Time slot grid** — a 3-column grid of six time slots.
5. **Artist selector** — a vertical stack of three rich artist cards.
6. **Sticky Book Now bar** — floats above the bottom nav with the live booking summary and action.

**Services:**

`Manicure` · `Gel` · `Acrylic` · `Pedicure` · `Nail Art`

**Time slots:**

`10:00 AM` · `11:30 AM` · `1:00 PM` · `2:30 PM` · `4:00 PM` · `5:30 PM`

**Artists (sample data):**

| Artist | Salon | Rating | Reviews | Price |
|---|---|---|---|---|
| Bella Rose | Luxe Nails | ⭐ 4.9 | 312 | $45 |
| Aria Lin | Glow Bar | ⭐ 4.8 | 198 | $55 |
| Mia Chen | Pink Studio | ⭐ 5.0 | 421 | $60 |

Each artist card carries a gradient avatar tile with `💅`, name, salon with `MapPin` icon, star rating, review count, and price in bold pink. The selected artist card gets a pink-tinted background, 2px pink border, and shadow.

**Calendar interactions:**

- Today's date (15) is highlighted with a thin pink ring.
- Selected date is rendered with a pink-to-rose gradient pill, white text, shadow, and 105% scale.
- Past dates (1–14) are dimmed to gray and disabled.
- Future dates respond to tap with a soft pink-50 hover state.

**Sticky CTA:**

The Book Now bar floats at the bottom of the scroll area, just above the bottom nav. It's a glass-pill container with three regions:

- A summary line: `"{service} · May {date} · {time}"` — e.g. `"Gel · May 15 · 2:30 PM"`
- A price in bold (pulled from the selected artist): `"$45.00"`
- A gradient action button with a Sparkles icon: `"Book Now ✨"`

Tapping `Book Now` fires `handleBook()`, which surfaces the booking confirmation toast.

---

### 4.4 Favorites / Saved

The Favorites screen organizes saved content into three collections via a segmented control.

**Components, top to bottom:**

1. **Collection tabs** — a glass pill with three options: `Wishlist`, `Tried`, `Inspo`. The active tab gets a pink-to-rose gradient pill.
2. **Status row** — shows `"{count} saved looks 💖"` on the left and a `"+ new collection"` link on the right.
3. **Saved looks masonry** — a `columns-2` grid of saved posts.

**Sample state:** the user starts with posts 2, 4, and 5 already saved — `@kimmylee`, `@obamyslayy26`, and `@cherrybloom`.

**Interactions:**

- Tapping a collection tab switches the view (Wishlist filters to `savedPosts` only; Tried and Inspo currently show the full sample for demonstration).
- Each tile has a heart toggle in the top-right corner that fills pink when saved. Tapping it un-saves the post, which removes it from the view on next render.
- The `"+ new collection"` link is a placeholder for creating user-named collections.

---

### 4.5 Reviews

The Reviews screen showcases the review system for a single salon (Luxe Nails Studio in the sample).

**Components, top to bottom:**

1. **Salon header card** — a glass card with a gradient tile + `💅`, the salon name `"Luxe Nails Studio"`, a 5-star row in amber, the rating value `4.9`, and the count `· 312 reviews`.
2. **Section header** — `"reviews"` in serif italic.
3. **Review list** — a vertical stack of glass cards, one per review.
4. **Floating "Write a Review" FAB** — a pink gradient pill button anchored at `bottom-24` (above the bottom nav).

**Sample reviews:**

| User | Rating | Review text | Likes | Replies |
|---|---|---|---|---|
| `@sophie.glow` | ⭐⭐⭐⭐⭐ | "obsessed!! bella did my chrome and they look mirror perfect ✨ already booked my next appt 🎀" | 142 | 8 |
| `@taylor.nails` | ⭐⭐⭐⭐⭐ | "softest french tip ive ever had. she really took her time and the shape is immaculate 🤍" | 89 | 3 |
| `@emma.aesthetic` | ⭐⭐⭐⭐ | "cute vibes & clean salon. only took off a star bc i waited 15 min past my time but worth it tbh" | 56 | 2 |
| `@ivybloom` | ⭐⭐⭐⭐⭐ | "mia is literally an artist. the bow detail?? cant stop staring at my hands 🩷✨" | 203 | 12 |

**Each review card carries:**

- A gradient circle avatar (no actual photo)
- Username at the top
- A `MoreHorizontal` menu button on the right
- A 5-star row (filled stars amber-400, empty stars gray-200)
- The review text in relaxed line-height for legibility
- Two attached "photos" rendered as small gradient tiles with `💅` emojis
- A row of three actions at the bottom: `ThumbsUp` + like count, `Reply` + reply count

**Interactions:**

- Tapping the FAB opens the Write-a-Review modal (covered in §5).
- Tapping `like` or `reply` (planned) triggers the corresponding action; currently both transition to a hover state.

---

### 4.6 Profile

The Profile screen presents the user `@khamzat` as a creator/customer.

**Components, top to bottom:**

1. **Banner card** — a short pastel gradient block with a `✨` and `🎀` floating in the corners.
2. **Avatar** — a white-padded circle containing a pink-to-purple gradient + `💅`, overlapping the banner from below.
3. **Username + bio line + edit button** — `@khamzat` in serif italic, the short bio `"nail art enthusiast 🩷 sf based"`, and a glass `"edit profile"` button on the right.
4. **Longer bio** — `"collecting cute nail looks since 2022 ✨ dm for collabs"`.
5. **Stats row** — three glass cards in a 3-column grid.
6. **Quick links grid** — six glass cards in a 2-column grid.
7. **"My Looks" section** — a 3-column grid of the user's six most recent posts.

**Stats:**

| Stat | Value |
|---|---|
| Posts | 127 |
| Followers | 12.4k |
| Following | 842 |

**Quick links:**

| Link | Icon | Wired to |
|---|---|---|
| My Shopping | `ShoppingBag` | (placeholder) |
| My Profile | `User` | `profile` tab |
| Messages | `MessageCircle` | (placeholder) |
| Reviews | `Star` | `reviews` screen |
| Settings | `Settings` | (placeholder) |
| Community | `Users` | (placeholder) |

**Interactions:**

- Tapping the `Reviews` quick link routes to the reviews screen (a non-bottom-nav screen).
- Each post in the "My Looks" grid scales to 104% on hover.
- The `"edit profile"` button is a glass card with subtle hover state, ready to be wired to an edit flow.

---

## 5. Cross-cutting features

These six UI primitives live outside per-screen renderers and are accessible from anywhere in the app.

### 5.1 Side drawer

The drawer slides in from the left with a `translate-x-full → translate-x-0` transition over 500ms with `ease-out` curve. When open:

- A dark backdrop (`bg-gray-900/30 backdrop-blur-sm`) sits behind it; tapping it closes the drawer.
- The drawer carries a profile mini-card at the top, six navigation items, and a "go premium" gradient card at the bottom.
- An `X` close button sits in the top-right corner.

Tapping any wired item (Profile, Reviews) both navigates and closes the drawer via the `navigate()` helper, so the user never has to dismiss it manually.

### 5.2 Splash overlay

The splash mounts on first load and fades out over the first 2.2 seconds via a two-state pattern:

- `splashVisible` is true → renders at full opacity.
- At 1.6s, `splashVisible` flips false → opacity transitions to 0 over 700ms.
- At 2.2s, `splashHidden` flips true → splash unmounts entirely.

This two-state approach is what lets the splash fade smoothly and then leave the DOM without intercepting clicks. The splash itself contains:

- A full-frame pastel gradient with two large blurred ambient circles
- A bouncing `💅` emoji
- The wordmark "Nail Palette" in `text-5xl` gradient serif italic
- The tagline `"your nail era ✨"` in uppercase tracked text
- A row of three pulsing dots staggered by 200ms each

### 5.3 Write-a-review modal

A bottom-sheet modal that slides up via an inline `@keyframes slideUp` animation. The modal contains:

- A drag handle (decorative)
- The title `"write a review"` in serif italic
- A close `X` button
- The prompt line `"how was your experience at Luxe Nails? ✨"`
- A 5-star selector — each star scales to 110% on hover, fills amber-400 when selected
- A textarea with placeholder `"tell us about your nails…"`
- A `"+ photo"` tile with a Camera icon and dashed pink border
- A submit button that is disabled and gray until at least one star is selected; becomes pink gradient when active

**Submit behavior:**

- Closes the modal
- Resets `reviewRating` and `reviewText` to defaults
- Surfaces the review toast for 2.4s

### 5.4 Booking confirmation toast

When `handleBook()` fires, a glass toast slides down from `top-20` with the translate-and-fade pattern. It contains:

- A green-check tile (pink gradient circle with a white `Check` icon)
- The line `"booked! ✨"` in bold
- The summary `"{artist} · May {date} at {time}"` — e.g. `"Bella Rose · May 15 at 2:30 PM"`

The toast auto-dismisses after 2.6 seconds.

### 5.5 Notification bell

The bell sits in the top-right of the app header as a glass pill button with:

- A `Bell` icon in gray
- A pulsing pink dot in the top-right corner indicating unread notifications
- A hover state that scales the button to 105%

The bell is currently a visual cue; a notifications drawer is a future build.

### 5.6 Search bar

The search bar lives on the Home screen as a pill input with:

- A `Search` icon on the left in pink-400
- The placeholder `"search nail looks…"` in pink-300
- A circular gradient `Sparkles` button on the right
- A controlled `searchQuery` state with `focus:ring-2 focus:ring-pink-200`

The search captures input but doesn't currently filter the feed — wiring it through is a near-term enhancement.

---

## 6. Social media features

Nail Palette's social layer is built around four interaction loops that should feel familiar to anyone who's used Instagram or Pinterest.

### 6.1 The feed loop

The Home masonry feed is the primary content surface. Each post carries the creator's username (with avatar dot), a caption, a like count, and the actual nail look. The feed is Pinterest-style (staggered, scannable) rather than Instagram-style (uniform, paced) — which is the right pattern for a discovery-led product where users want to scan many looks fast and tap the ones that catch their eye.

### 6.2 Likes

The like system uses a `likedPosts` Set tracked in state. Tapping the heart icon on any post:

- Adds the post id to the Set
- Renders the heart in pink with a 110% scale
- Fires a one-shot `heartBurst` ping animation: a large pink heart appears over the post and `animate-ping`s for 600ms

Tapping again removes the like, no burst. The sample state starts with posts 1 and 3 already liked.

### 6.3 Saves

Saves are tracked separately from likes via a `savedPosts` Set. The save toggle is a bookmark icon in the top-right corner of every post tile:

- When unsaved: glass-pill background, gray icon
- When saved: pink-400 background, white filled icon, 110% scale

Saved posts surface on the Favorites tab. The sample state starts with posts 2, 4, and 5 saved.

### 6.4 Comments / replies

Comments per se aren't surfaced on the feed view, but the reply count is treated as the proxy in the Reviews screen — each review carries a `"{n} replies"` button with a `Reply` icon. This pattern can be extended to feed posts in a future build by adding a comment-count metric and a tap-to-open comments sheet.

### 6.5 Hashtags

The Discover screen surfaces six trending hashtags in a horizontally scrollable row, each with a post count. Tapping a hashtag (planned) would open a filtered feed view scoped to that tag. The hashtags themselves — `#chromenails`, `#frenchtip`, `#y2knails`, `#cleangirl`, `#bowsonbows`, `#milkynails` — are written in the same lowercase Gen Z register as the captions.

### 6.6 Follower / following counts

The Profile screen shows three social stats: posts (127), followers (12.4k), and following (842). These are tuned to feel realistic for a mid-tier creator account — large enough to read as "active and respected" but not so large as to read as "celebrity." A real implementation would link each card to the corresponding list view.

### 6.7 Artist directory

The Discover screen's "Artists for you" carousel is the social discovery surface for nail artists specifically. Each artist card carries a gradient header, avatar, name, salon, and rating — the same three artists who appear in the Book flow, but presented as people to follow rather than people to book. This dual presentation (creator + service provider) is a key product insight: in this space, those two roles are the same person.

---

## 7. Booking flow features

The booking flow is the conversion engine of the app and is built to be completable in under a minute.

### 7.1 Calendar

The calendar is rendered as a 7-column grid for May 2026 (chosen because May 1 2026 falls on a Friday, matching the "today is May 15, a Friday" sample state).

- Header row: `S M T W T F S` in small pink labels
- 5 leading empty cells (the offset to reach Friday May 1)
- 31 day cells, May 1 through 31
- Today (15) is highlighted with a thin pink ring
- The selected day renders as a pink-to-rose gradient pill with shadow and 105% scale
- Past days (1–14) are dimmed to gray and disabled — `selectedDate` cannot be set to a past date
- Future days respond to tap with `hover:bg-pink-50`

Month navigation arrows are present but decorative — only May 2026 renders. Wiring up multi-month navigation is on the future-work list.

### 7.2 Time slots

Six time slots are rendered in a 3-column grid:

`10:00 AM` · `11:30 AM` · `1:00 PM` · `2:30 PM` · `4:00 PM` · `5:30 PM`

Each slot is a pill chip. The selected slot uses the same brand gradient + shadow + scale pattern as the selected date. The default selection is `2:30 PM`.

### 7.3 Services

Five services in a horizontally scrollable row of pills:

`Manicure` · `Gel` · `Acrylic` · `Pedicure` · `Nail Art`

The default selection is `Gel` — picked because it's the most-booked service in the target demographic.

### 7.4 Artist cards

Three artist cards stacked vertically, each carrying:

- A gradient avatar tile with `💅`
- The artist's name (e.g. `Bella Rose`)
- The salon name with a `MapPin` icon (e.g. `Luxe Nails`)
- A 4.5–5.0 star rating in amber-400
- A review count in gray
- A right-aligned price in bold pink (`$45` / `$55` / `$60`)

The selected card gets a pink-tinted gradient background, 2px pink border, and shadow. The other cards sit in glass.

### 7.5 Sticky CTA

The Book Now bar floats at `bottom-20` in absolute positioning, just above the bottom nav. It's a glass pill carrying:

- A live summary line: `"{service} · May {date} · {time}"`
- The current price from the selected artist
- A gradient action button: `"Book Now ✨"` with a Sparkles icon

Tapping the button fires `handleBook()`, which surfaces the booking confirmation toast (§5.4). The summary updates live as the user changes any selection, so the price and details are always current.

---

## 8. Review & rating system

### 8.1 5-star ratings

Star ratings are rendered as five `Star` icons in a horizontal row. Filled stars use `amber-400` with `fill="currentColor"`; empty stars use `gray-200`. The system appears in three places:

- Salon header (display)
- Individual review cards (display)
- Write-a-review modal (interactive selector)

The interactive selector in the modal has each star scale to 110% on hover, with the filled state applying on tap.

### 8.2 Reviews list

Reviews are rendered as glass cards with:

- A gradient circle avatar (no photo)
- Username, star row, review text
- Two attached gradient "photo" tiles
- A `MoreHorizontal` menu button
- Action row: `ThumbsUp` + likes, `Reply` + replies

Sample reviews are written in the same lowercase Gen Z register as the captions, with realistic imperfections — `@emma.aesthetic` docks a star for a 15-minute wait but still recommends; `@taylor.nails` highlights specific craftsmanship details. The voice is the most important detail here: real reviews don't sound corporate.

### 8.3 Photo attachments

Each review carries two small gradient tiles standing in for attached photos. In a real implementation these would be user-uploaded images of their nail work. The Camera icon + dashed border tile in the Write-a-Review modal is the upload entry point.

### 8.4 Like & reply on reviews

Each review carries two engagement actions in the bottom row: a thumbs-up like (with count) and a reply button (with count). Both transition to pink on hover. The sample like counts range from 56 to 203, weighted toward the most enthusiastic reviews — a realistic distribution.

### 8.5 Write-a-review modal

The submission flow is gated and controlled:

- The modal opens on tap of the floating FAB at the bottom of the reviews screen
- A 5-star selector captures `reviewRating` (0 through 5)
- A textarea captures `reviewText`
- The submit button is disabled and gray until `reviewRating > 0`
- Submission closes the modal, resets state, and fires the review toast for 2.4s

The disabled-until-rated pattern is intentional: rating is the most important review field, and forcing it ensures every submitted review has a star value.

---

## 9. Gen Z polish details

These are the small touches that take the app from "well-designed" to "actually feels native to its audience."

### 9.1 Emoji usage

Emojis are used **liberally but tastefully** — one per moment, never confetti. Recurring uses:

- `💅` as the centered render in every nail tile (the "subject" of every post)
- `✨` as the sparkle accent on calls-to-action, splash, hero cards
- `🎀` as the bow accent on cute moments
- `🩷` `💜` `🤍` `💖` as color-coded heart accents in captions
- `🍒` `🍑` `🦋` `💫` `🍩` as flavor accents matching the look being shown

Emojis appear in captions, button labels, drawer subtitles, and as floating decorative elements in cards. They're never used as bullet point replacements or as "fun" filler in informational text — they always have a semantic role.

### 9.2 Gradient text

The wordmark "Nail Palette" uses `bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent` in two places: the app header (`text-2xl`) and the splash (`text-5xl`). This single typographic move does most of the brand-character work.

### 9.3 Cursive wordmark

The wordmark uses Tailwind's `font-serif italic` with `font-bold` and `tracking-tight`. This produces a refined, almost-Didone display feel against the otherwise neutral Inter UI text. The same treatment is used at smaller scales for section headers (`text-xl`, `text-lg`) — `"this week's vibe"`, `"trending styles"`, `"my looks"` — which ties the editorial moments to the brand voice.

### 9.4 Sparkle accents

Sparkle treatments appear in five places, each subtle:

1. The search bar's right-side `Sparkles` button
2. The Book Now action button
3. The hero card's pulsing `✨` emoji
4. The review submission toast
5. The splash tagline `"your nail era ✨"`

The Sparkles icon (from lucide-react) and the `✨` emoji are used interchangeably — icon when it needs to sit in a button or precise layout, emoji when it can float decoratively.

### 9.5 Cute usernames

The eight feed creators were named to feel like real Gen Z handles — some are stylized references (`@jennieblackwing`, `@nickiminos`, `@y2kbarbie`), some are pure aesthetic moods (`@lunavibes`, `@cherrybloom`, `@sugarpeach`), some are pure character (`@obamyslayy26`). The review users (`@sophie.glow`, `@taylor.nails`, `@emma.aesthetic`, `@ivybloom`) lean more into the "clean girl" register typical of beauty review accounts.

This isn't decoration — the usernames are part of the immersive setup. Generic names like `@user1234` would shatter the illusion that this is a real product with a real community.

### 9.6 Glossier / Y2K vibe

The visual language pulls from two specific reference points:

- **Glossier:** soft pastel palette, generous radii, glass surfaces, refined serif italic display type, minimal copy, no shouty CTAs.
- **Y2K:** sparkle accents, gradient text, gradient backgrounds, the literal `#y2knails` hashtag, the `@y2kbarbie` creator, captions like `"y2k aura nails 💜"`.

The two references are usually in tension — Glossier is restrained, Y2K is maximalist. The app threads the needle by keeping the structure restrained (one emoji per moment, glass cards) and letting the content be maximalist (sparkles, gradients, hot pink CTAs).

---

## 10. Tech stack notes

### 10.1 Single-file React artifact

The entire app is **one default-exported React component** in one file. No build step, no router, no state library, no asset bundle. The file imports React hooks and Lucide icons and exports a component. That's it.

This constraint shapes the architecture: screens are render functions inside the closure rather than separate components, all state lives in the top of the component, and all sample data is defined as module-level constants above the component.

### 10.2 Styling — Tailwind CSS

All styling is Tailwind utility classes. No CSS modules, no styled-components, no inline styles except for the root font-family declaration and one inline `<style>` block for the `@keyframes slideUp` animation.

The Tailwind classes lean heavily on:

- Arbitrary values for fine-tuning (`text-[10.5px]`, `rounded-[1.75rem]`, `pb-28`)
- Opacity modifiers for glass (`bg-white/70`, `border-white/80`)
- Gradient utilities (`bg-gradient-to-br`, `from-pink-300`, `via-rose-200`, `to-purple-300`)
- Backdrop filters (`backdrop-blur-xl`, `backdrop-blur-2xl`)
- Transition utilities (`transition-all duration-300`)

### 10.3 Iconography — lucide-react

All icons come from `lucide-react`. The library was chosen for three reasons: comprehensive coverage of the social/booking/profile iconography needed, a visual style (rounded, modern, friendly) that matches the soft pastel aesthetic, and the fact that it's the de facto standard for React artifacts.

### 10.4 No external dependencies beyond React + Tailwind + lucide-react

There's no Framer Motion, no react-router, no Zustand or Redux, no date-fns, nothing. Every animation is CSS. Every navigation transition is a state flip. The calendar math is computed inline. The full bundle would be just React + Tailwind's output CSS + a tree-shaken slice of lucide.

This restraint isn't just for the artifact constraint — it's the right call for the production version too. None of the features in scope require any of those libraries.

### 10.5 State pattern

Approximately 15 `useState` hooks at the top of the component, organized into five logical groups (navigation, splash, engagement, booking, modal/form). Two `useEffect` hooks handle the splash fade-out timers. Helper functions (`toggleSaved`, `toggleLiked`, `handleBook`, `handleSubmitReview`, `navigate`) wrap state updates that need side effects (timers, multiple state mutations).

Sets are used for `savedPosts` and `likedPosts` because membership lookups are O(1) and toggling is symmetrical. The pattern: `const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n;` — clean and idiomatic.

---

## 11. Suggested next steps

The app is feature-complete on the UI dimension. To make it a real product, here's what comes next, roughly ordered by impact.

### 11.1 Real backend

**Highest impact.** The app currently holds all state in memory and resets on reload. The first production step is wiring it to a backend:

- A creator/post API for the feed
- An auth API for user accounts
- A bookings API for the appointment flow
- A reviews API for the review system
- An asset CDN for actual nail look photos (currently rendered as CSS gradients)

A `useEffect`-based fetch pattern or a thin client library like SWR would be sufficient — no need for GraphQL or heavy state management.

### 11.2 Authentication

The app assumes a logged-in user (`@khamzat`). Real auth would add a sign-in/sign-up flow, OAuth provider integration (Apple, Google, Instagram), and session management. The splash screen is already a natural surface for sign-in handoff — extending it with a sign-in button below the wordmark would be a small change.

### 11.3 Payments

The Book Now action currently fires a toast. Real payment integration (Stripe, Apple Pay, Google Pay) would replace the toast with a payment sheet, capture the card or wallet, charge a deposit, and then surface the confirmation. The sticky CTA's price summary is already structured to extend with a "deposit due" line.

### 11.4 Push notifications

The notification bell with its pulsing dot is currently decorative. Real push notifications would handle:

- Booking confirmations
- Reminder pushes ("your appointment is tomorrow at 2:30 PM ✨")
- Social engagement ("@sophie.glow liked your post 🩷")
- New content from followed creators

Implementing this needs a service worker, push subscription handling, and a backend notifications API. The bell button is the natural entry point for an in-app notifications drawer.

### 11.5 Dark mode

The app is currently light-only with pastel surfaces. A dark mode would invert the canvas to a deep plum or navy, keep the pink/rose action colors at full saturation, and dial down the glass opacity to compensate for the darker backdrop. The design system is already built around CSS variables conceptually — the lift would be defining a dark palette and threading a theme toggle through the root.

### 11.6 Accessibility audit

The current implementation is partially accessible (semantic buttons, focus rings) but has known gaps:

- Icon-only buttons need `aria-label` (drawer trigger, bell, heart, bookmark, more menus)
- Bottom nav tabs need `role="tab"` and `aria-current`
- Modal and drawer need `aria-modal` and focus trap
- All animations need `prefers-reduced-motion` handling
- Color contrast on pastels-against-pastels needs a formal audit
- Color-only signals (saved bookmark fill) need a second cue

A full WCAG 2.1 AA audit and remediation is the right pre-launch checkpoint.

### 11.7 Smaller wins

- Wire the home search bar to actually filter the feed
- Wire the category pills to actually filter the feed
- Implement multi-month calendar navigation
- Implement the "+ new collection" flow on Favorites
- Wire the Tried and Inspo tabs to distinct data sources
- Add a post detail screen with creator profile, related products, and "book this look"
- Extract `NailPostCard`, `SectionHeader`, and a new `PillSelector` to dedicated component files

---

## 12. Project organization

This project is delivered as two files:

1. **`nail-palette.jsx`** — the single-file React component that implements the full app.
2. **`NAIL_PALETTE_DOCS.md`** — this documentation file.

Both files are self-contained and can be lifted out of the project independently. The component requires only `react` and `lucide-react` as runtime dependencies plus a Tailwind-enabled environment. The docs file is plain Markdown and renders correctly in any standard viewer (GitHub, Notion, Obsidian, VS Code preview).

A natural next addition to the project would be a third artifact for the **design tokens** — a small JSON or TypeScript file extracting the color palette, gradient definitions, radius ladder, and typography scale into a reusable token set. This would let future artifacts in the project (a settings screen, an onboarding flow, a notifications drawer) pick up the same brand consistency without re-deriving it.

---

*Built with care for the kind of user who screenshots a nail look at 11pm and books the appointment by 11:05. 💅✨*
