# ATP Rivalry 🎾

A premium ATP-inspired tennis tour management platform built for a private two-player rivalry season system.
**ATP Rivalry** tracks tournaments, rankings, match history, head-to-head records, player statistics, titles, historical champions, and multi-season performance — all inside a modern sports analytics dashboard experience.

---
## Live Demo

The application is deployed and fully operational:

🔗 **Production:** https://atp-sol.vercel.app/

Experience ATP Rivalry in its full premium tennis analytics interface.


---

## Overview

**ATP Rivalry** is a production-style tennis management web application designed for **two players who organize and play their own tennis tour throughout the year**.

Instead of being a simple hobby tracker, the project is designed to feel like a **professional ATP Tour / Tennis TV-style platform**, with a premium dark UI, rich analytics, tournament storytelling, rivalry insights, and season-based history.

The app simulates a real tennis ecosystem with:

* ATP-style rankings
* Grand Slam and Masters 1000 tournaments
* Match records and detailed score breakdowns
* Rivalry / head-to-head analytics
* Historical champions and year-end records
* Season progression across multiple years
* A scalable frontend architecture ready for **Convex integration**

---

## Aesthetic Direction

### 1) What problem does this interface solve, and for whom?

This application solves the problem of **managing a self-organized competitive tennis season** for **two recurring players** who want more than a spreadsheet or casual score tracker.

It is built for players who want to:

* track a structured annual tennis season
* manage tournaments and results like a real tour
* compare performance across surfaces and seasons
* visualize rankings, momentum, titles, and rivalry trends
* maintain a long-term tennis history archive

### 2) Tone

**Luxury sports analytics**

The interface commits to a **premium ATP-inspired luxury aesthetic**:

* dark immersive background
* tennis green accent system
* elegant typography
* layered gradients and soft glow
* modern cards with dashboard clarity
* refined, high-end sports broadcast energy

### 3) What users should remember most

The most memorable aspect of the design is the feeling that this is **not a hobby tracker**, but a **mini ATP Tour operating system** for a private rivalry.

---

## Core Features

## Dashboard

A premium overview of the current season including:

* Current **World No. 1** player spotlight
* Current **rankings table**
* Latest match result
* Upcoming tournament
* Season statistics summary
* Recent champions
* Win/loss records
* Ranking points chart
* Head-to-head summary

## Rankings

ATP-style rankings page with:

* Current rank
* Player name
* Ranking points
* Titles
* Win percentage
* Rank movement indicators
* Previous ranking position
* Ranking history visuals

## Tournaments

Season tournament listing with ATP-inspired categories:

### Grand Slams

* Australian Open
* Roland Garros
* Wimbledon
* US Open

### Masters 1000

* Indian Wells
* Miami
* Monte Carlo
* Madrid
* Rome
* Canada
* Cincinnati
* Shanghai
* Paris

Each tournament includes:

* tournament name
* category
* surface
* date
* champion
* final score
* tournament status

## Tournament Details

Each tournament detail page contains:

* hero/banner section
* tournament metadata
* champion & runner-up
* tournament draw / bracket
* match history
* statistics section
* trophy presentation area

## Matches

Complete match listing across seasons with:

* tournament
* date
* players
* winner
* match duration
* match score
* number of sets

## Match Details

Detailed match analytics including:

* final score
* set-by-set breakdown
* aces
* double faults
* first serve percentage
* break points won
* match duration

## Head-to-Head

Dedicated rivalry analytics page featuring:

* total meetings
* wins per player
* win percentages
* surface-by-surface breakdown
* trend chart
* recent meetings timeline
* biggest victories
* longest match

## Statistics

Advanced analytics dashboard including:

* total matches played
* total titles
* Grand Slams won
* Masters won
* win percentage
* longest winning streak
* best surface
* average sets per match

With charts for:

* ranking progression
* points progression
* win rate by surface
* titles by season

## History

Historical records and legacy view including:

* Grand Slam champions
* Masters champions
* year-end No.1
* most titles
* best seasons
* all-time results archive

## Multi-Season Support

The app is designed to support multiple seasons such as:

* 2026
* 2027
* 2028

with a **season selector** in the application header.

---

## Tech Stack

* **Next.js 16** — App Router architecture
* **TypeScript** — strict typing and scalable models
* **Tailwind CSS** — utility-first styling
* **shadcn/ui** — composable UI primitives
* **Lucide React** — icon system
* **Convex** — backend, database, queries, and mutations
* **Recharts** *(or the charting library used in the project)* — analytics visualization
* **Modern component architecture** — reusable UI and domain-driven page sections

---

## Design Principles

This project follows a premium sports analytics design philosophy:

* **Dark mode by default**
* **Tennis green accent palette**
* **Clean SaaS dashboard hierarchy**
* **ATP Tour inspired visual language**
* **Modern card-based layouts**
* **Smooth motion and transitions**
* **Responsive design for desktop, tablet, and mobile**
* **Reusable components with scalable folder structure**
* **Data-first UI built for future backend integration**

---
## Convex Data Architecture

ATP Rivalry is now backed by **Convex** instead of static mock data.

The application uses Convex to manage the core tennis domain, including:

* players
* rankings
* tournaments
* tournament results
* match records
* season history
* head-to-head data
* statistics and performance summaries

This transition turns ATP Rivalry from a UI-driven concept into a **real interactive tennis management platform** with persistent data and scalable state management.

### Convex responsibilities in the project

Convex is used to support:

* **Queries** for reading rankings, tournaments, match history, player stats, and historical records
* **Mutations** for recording match outcomes, updating tournament champions, and maintaining season progression
* **Persistent storage** for seasons, tournaments, matches, and rivalry data
* **Scalable data flow** between the App Router frontend and the application data layer

### Why Convex fits ATP Rivalry

Convex is a strong fit for ATP Rivalry because the app is heavily data-driven and revolves around evolving seasonal records.
It enables the project to move beyond presentation-only mock screens and support a real tennis management workflow with maintainable data structures and future extensibility.


---

## Application Structure

The application is divided into multiple core areas:

* **Dashboard**
* **Rankings**
* **Tournaments**
* **Tournament Details**
* **Matches**
* **Match Details**
* **Head-to-Head**
* **Statistics**
* **History**
* **Settings**

---

## Reusable Components

The project is built around reusable UI and domain-specific components such as:

* `RankingTable`
* `PlayerCard`
* `TournamentCard`
* `MatchCard`
* `StatsCard`
* `SurfaceBadge`
* `SeasonSelector`
* `RankingMovement`
* `HeadToHeadCard`
* `TournamentBracket`
* `PointsChart`
* `WinRateChart`

These components are intentionally designed to make the UI scalable and easy to extend once real backend data is introduced.

---




## Project Goals

The main goal of ATP Rivalry is to create a tennis platform that feels like a **real sports product**, not just a CRUD app.

The project focuses on:

* strong visual identity
* realistic tennis domain modeling
* premium dashboard UX
* scalable frontend architecture
* component reusability
* future backend readiness

---

## Folder Structure


```bash
src/
├─ app/
│  ├─ dashboard/
│  ├─ rankings/
│  ├─ tournaments/
│  │  └─ [slug]/
│  ├─ matches/
│  │  └─ [id]/
│  ├─ head-to-head/
│  ├─ statistics/
│  ├─ history/
│  ├─ settings/
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ components/
│  ├─ layout/
│  ├─ dashboard/
│  ├─ rankings/
│  ├─ tournaments/
│  ├─ matches/
│  ├─ statistics/
│  ├─ charts/
│  └─ ui/
│
├─ data/
│  ├─ players.ts
│  ├─ tournaments.ts
│  ├─ matches.ts
│  ├─ rankings.ts
│  ├─ history.ts
│  └─ seasons.ts
│
├─ lib/
│  ├─ utils.ts
│  ├─ constants.ts
│  └─ formatters.ts
│
├─ types/
│  ├─ player.ts
│  ├─ tournament.ts
│  ├─ match.ts
│  ├─ ranking.ts
│  ├─ season.ts
│  └─ statistic.ts
│
└─ styles/
   └─ globals.css
```

---

## Routing Overview

The application is structured around the Next.js App Router.

### Main routes

* `/` → main dashboard
* `/rankings` → ATP-style rankings page
* `/tournaments` → full season tournaments
* `/tournaments/[slug]` → tournament details
* `/matches` → all matches
* `/matches/[id]` → match details
* `/head-to-head` → rivalry analytics
* `/statistics` → player & season statistics
* `/history` → historical records
* `/settings` → app preferences / future personalization

---

## Responsive Experience

ATP Rivalry is designed to work across:

* **Desktop** → full analytics dashboard experience
* **Tablet** → optimized card stacking and chart layouts
* **Mobile** → simplified navigation, stacked sections, touch-friendly cards

Responsive behavior focuses on:

* preserving hierarchy
* maintaining readability of rankings and stats
* keeping chart layouts clean on smaller screens
* making tournament and match cards easy to scan

---

## Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/your-username/atp-sol.git
cd atp-spl
```

## 2. Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

or

```bash
yarn install
```

## 3. Run the development server

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

---

## Available Scripts

Depending on your package manager setup:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Suggested Environment for Development

* **Node.js** 20+
* **Next.js** 16
* **TypeScript** latest stable
* **pnpm** or **npm**
* modern Chromium-based browser for best local testing

---
## Why This Project Matters

ATP Rivalry is more than a UI exercise.
It is a focused attempt to combine:

* **sports storytelling**
* **competitive data tracking**
* **luxury dashboard design**
* **reusable frontend engineering**
* **future-ready architecture**

into one cohesive tennis product.

It demonstrates how a niche sports management idea can be elevated into something that feels like a real premium platform.

---

## Author

Built by **Amr Ashraf**
If you’d like, add your GitHub / portfolio / LinkedIn here.

```md
## Author

**Amr Ashraf**
- GitHub: [https://github.com/amrashraf15]
- LinkedIn: [https://www.linkedin.com/in/amr-ashraf-7a6b682b7/]
```




