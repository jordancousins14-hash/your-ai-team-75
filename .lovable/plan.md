

## Plan: Fix Mobile Overflow + Add Settings, Subscription, and Projects & Strategy Room

### Problem: Content Cut Off on Mobile

The main content area uses `flex-1` without `min-w-0` or `overflow-x-hidden`, causing content to overflow the viewport on narrow screens. The forums page uses `h-[calc(100vh)]` without accounting for the mobile top bar.

### Changes

**1. Fix mobile overflow in app layout (`src/routes/app.tsx`)**
- Add `min-w-0` and `overflow-x-hidden` to the `<main>` element so content never exceeds viewport width.
- Add `overflow-hidden` to the root flex container.

**2. Fix forums height (`src/routes/app.forums.tsx`)**
- Replace `h-[calc(100vh)]` with `h-full` and ensure the parent flex chain supports it, or use `h-[calc(100dvh-3rem)]` on mobile to account for the sticky header.

**3. Add Settings page (`src/routes/app.settings.tsx`)**
- Appearance section: theme toggle (dark default), font size slider (small/medium/large), optional compact mode toggle.
- Notification preferences placeholder.
- Account section: display name, email (read-only placeholder).
- Add Settings icon (Cog) to sidebar nav in `app.tsx`.

**4. Add Subscription page (`src/routes/app.subscription.tsx`)**
- Three tier cards (Starter, Pro, Enterprise) showing included personas, feature limits, and pricing placeholders.
- Current plan indicator with upgrade CTA on locked tiers.
- Locked personas preview — list of personas unlocked per tier, greyed out on lower tiers.
- Billing section: invoice history table (mock data), payment method placeholder.
- Add CreditCard icon to sidebar nav in `app.tsx`.

**5. Add Projects & Strategy Room (`src/routes/app.strategy.tsx`)**
- This is the Chief of Staff's domain — a combined projects + strategy workspace.
- **Project list view**: cards showing project name, status, visibility (Private/Public badge), linked strategy, and last activity.
- **Visibility toggle**: Each project/strategy has a Private or Public status.
  - **Private**: Only the owner and CoS can see it. Other personas act unaware.
  - **Public**: All personas are informed and can align their KPIs/work to it.
- **Strategy briefs**: Each strategy has goals, KPIs, and linked projects. The CoS summarizes trade-offs and recommendations.
- **Detail view**: Clicking a project opens a detail pane with description, CoS notes, linked KPIs, visibility toggle, and a timeline of updates.
- Add Briefcase icon to sidebar nav in `app.tsx`, positioned after Dashboard.

**6. Update sidebar nav (`src/routes/app.tsx`)**
- Add three new nav items: Strategy Room (after Dashboard), Subscription (before Settings), Settings (bottom).
- Total nav: Dashboard, Strategy, HR Room, Forums, Tools, Knowledge, Subscription, Settings.

### Technical Details

- All new routes follow the existing pattern: `createFileRoute`, static mock data, responsive grid layouts with `p-4 sm:p-6` padding.
- Private/Public toggle uses a simple badge + button; no backend yet.
- Font size setting stored in React state (localStorage persistence can come later).
- No new dependencies required — using existing lucide-react icons and Tailwind classes.
- All content containers will use `min-w-0` and word-break utilities to prevent overflow.

