# ATP Rivalry 🎾

A premium ATP-inspired tennis tour management platform built for a private two-player rivalry season system.
**ATP Rivalry** tracks tournaments, rankings, match history, head-to-head records, player statistics, titles, historical champions, and multi-season performance — all inside a modern sports analytics dashboard experience.

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
* **Recharts** *(or chart layer used in the project)* — analytics visualization
* **Mock Data Layer** — structured for future backend integration
* **Convex-ready architecture** — frontend designed to connect to live data later

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

## Data Modeling

The app is structured to support future **Convex** integration, with clear TypeScript models for tennis domain entities.

### Main interfaces

* `Player`
* `Tournament`
* `Match`
* `Set`
* `Ranking`
* `Season`
* `Statistic`

### Example domain coverage

The data model is designed to support:

* player profiles
* ranking history
* tournament metadata
* match results
* set-by-set scoring
* seasonal performance summaries
* historical champion records
* surface-based analytics
* head-to-head comparisons

---

## Mock Data Strategy

This project currently uses **realistic mock data** instead of backend logic.

The goal of the mock layer is to:

* simulate a real ATP-style tennis season
* make every page fully navigable and visually complete
* preserve a backend-ready shape for later integration
* allow rapid UI iteration before introducing live persistence

The data layer is structured so it can later be replaced by:

* Convex queries
* Convex mutations
* server-side data fetching
* live season updates and statistics recalculation

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

> Adjust this section if your actual structure differs, but this is the intended architecture for a scalable ATP Rivalry setup.

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

## Future Convex Integration

The current project intentionally avoids implementing backend logic, but the architecture is prepared for a future **Convex** layer.

Planned Convex integration areas:

### Queries

* fetch seasons
* fetch tournaments by season
* fetch rankings by season
* fetch player statistics
* fetch match history
* fetch tournament detail data
* fetch head-to-head aggregates

### Mutations

* add tournament result
* record match result
* update rankings
* update player statistics
* create new season
* set year-end champion

### Benefits of Convex integration

* persistent season history
* live rankings updates
* editable tournament results
* dynamic statistics recalculation
* scalable multi-season management

---

## Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/your-username/atp-rivalry.git
cd atp-rivalry
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

## Screenshots / Demo

You can add this section once you upload visuals.

```md
## Screenshots

### Dashboard
![Dashboard Screenshot](./public/screenshots/dashboard.png)

### Rankings
![Rankings Screenshot](./public/screenshots/rankings.png)

### Tournament Details
![Tournament Screenshot](./public/screenshots/tournament-details.png)
```

If you deploy the project, add:

```md
## Live Demo

[View ATP Rivalry Live](https://your-demo-link.com)
```

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

## Roadmap

Potential future improvements:

* Convex backend integration
* authentication and player accounts
* editable tournament brackets
* live rankings calculation
* player profile pages
* injury / availability tracking
* richer advanced stats
* match filters by season / surface / tournament
* exportable rivalry reports
* admin mode for result entry
* animated tournament timeline
* season simulation mode

---

## Author

Built by **Amr Ashraf**
If you’d like, add your GitHub / portfolio / LinkedIn here.

```md
## Author

**Amr Ashraf**
- GitHub: [your-github-link]
- LinkedIn: [your-linkedin-link]
- Portfolio: [your-portfolio-link]
```

---

## License

Choose the license that fits your project.

Example:

```md
MIT License
```

or create a full `LICENSE` file and reference it here.

---

# Final Notes

ATP Rivalry was designed to feel like a **professional ATP Tour management platform**, not a simple tennis tracker.

The emphasis of the project is on:

* polished UI
* clear information hierarchy
* reusable architecture
* realistic tennis data modeling
* premium sports-product presentation

If you’re viewing this repository as a recruiter, developer, or designer, the intention is to showcase both **frontend engineering quality** and **product-level interface thinking** through a unique sports analytics experience.



