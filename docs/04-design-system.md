# 04 — Design system

Tokens live in `src/app/globals.css` inside Tailwind v4 `@theme`. That file is
the single source of truth; Figma variables mirror these names exactly, so a
token renamed in one place is renamed in both or neither.

## 1. Colour

### Ink — surfaces and primary type

| Token | Hex | Use |
| --- | --- | --- |
| `ink-950` | `#04101c` | Dark band background, footer |
| `ink-900` | `#071b2e` | Headings on light, logo mark, theme-color |
| `ink-800` | `#0c2a44` | Body text on light where emphasis is needed |
| `ink-700` | `#143a5b` | Chart series, dark-band borders |
| `ink-600` | `#1d4d73` | — |
| `ink-500` | `#2f6690` | — |

### Brand — teal, the action colour

`brand-50 #eef7f7` · `100 #d3ebeb` · `200 #a5d6d7` · `300 #6dbabc` ·
`400 #3d9b9e` · `500 #1f7f83` · **`600 #12666b`** · `700 #0d5155` ·
`800 #0a4144` · `900 #073033`

`brand-600` is the primary button and link colour. It carries 5.9:1 against
white, so it is legal for body-size text as well as for large text.

### Accent — saffron, for data highlight and dark-band CTAs

`accent-50 #fdf6ec` · `100 #fae7cb` · `200 #f4cd96` · **`300 #ecad5c`** ·
`400 #e0912f` · `500 #c9781b` · `600 #a65f14` · `700 #824a13`

`accent-300` is used only on ink backgrounds (11.2:1 there). On white it is
decorative or large-text only — `accent-600`/`700` are the text-safe steps.

### Neutrals

`paper #ffffff` · `mist-50 #f8fafb` · `100 #f1f5f8` · `200 #e4eaf0` ·
`300 #d0d9e2` · `400 #a8b6c4` · `500 #7d8d9d` · `600 #5b6b7b` · `700 #41505e`

`mist-200` is the universal border. `mist-600` is secondary text on light,
`mist-400`/`500` on dark.

### Data visualisation series

Ordered for categorical use; the first two carry the brand.

`viz-1 #12666b` · `viz-2 #e0912f` · `viz-3 #2f5fb3` · `viz-4 #8a4f8f` ·
`viz-5 #2f8f5f` · `viz-6 #b3455f`

Adjacent pairs are separable in both deuteranopia and protanopia simulation
because hue rotation is paired with a luminance step of at least 12 L*.

### Semantic

`positive #2f8f5f` · `caution #c9781b` · `critical #b3455f`

Always paired with text, never colour alone (`StatusBadge` enforces this).

### Band tones

Four page tones, set via `<Section tone>`: `paper`, `mist`, `ink`, `brand`.
Long pages alternate paper/mist with ink for emphasis bands. Never two ink bands
in a row.

## 2. Typography

| Role | Family | Loaded as | Weights |
| --- | --- | --- | --- |
| Display / headings | **Source Serif 4** | `next/font`, `--font-source-serif` | 400, 600 |
| UI / body | **Inter** | `next/font`, `--font-inter` | variable |
| Data / labels | **JetBrains Mono** | `next/font`, `--font-mono-code` | 400, 500 |

A serif display face is the single strongest signal of editorial authority, and
it is what separates a consulting site from a SaaS site. Body copy stays in a
neutral sans because it is read at length on screen. Mono is reserved for
figures, eyebrows and metadata, which makes numbers scannable.

### Scale

| Token | Size | Line height | Tracking | Use |
| --- | --- | --- | --- | --- |
| `text-display-xl` | 4.5 rem | 1.02 | −0.03 em | Homepage H1, ≥ 1024 only |
| `text-display-lg` | 3.5 rem | 1.06 | −0.025 em | Page H1 |
| `text-display-md` | 2.75 rem | 1.10 | −0.02 em | Section H2 |
| `text-display-sm` | 2 rem | 1.16 | −0.015 em | Mobile H1, small H2 |
| `text-eyebrow` | 0.75 rem | 1 rem | 0.14 em | Uppercase labels |

Body copy is `text-lg` (1.125 rem) for ledes and `text-base`/`0.95rem` for
running text, with `leading-relaxed`. Long-form article copy uses the
`prose-editorial` utility: 1.75 line height, `mist-700`, 1.1 em paragraph
spacing.

`text-wrap: balance` on headings, `pretty` on paragraphs.

## 3. Spacing & layout

* 4px base unit; Tailwind's default scale.
* `shell` utility: `max-width: 82rem`, gutter `1.25rem` mobile / `2.5rem` from
  1024 up. Used on every band.
* Section padding: `tight` 3.5/4 rem · `base` 4/6 rem · `loose` 5/8 rem.
* 12-column grid at `lg`. Editorial content caps at 8 columns; a sidebar takes 4.
* Card grids: 1 / 2 / 3 columns at sm / md / lg. Four-up only for compact tiles.

## 4. Radius & elevation

`radius-card 0.5rem` (buttons, inputs, small cards) ·
`radius-panel 0.875rem` (cards, panels, tables).

`shadow-card` for resting cards, `shadow-lift` on hover and for overlays. Only
two elevations exist; anything needing a third should be a border instead.

## 5. Iconography

One family, drawn on a 24px grid: 1.5px stroke, round caps and joins, no fills,
2px minimum inner radius. All 19 glyphs are in `src/components/ui/Icon.tsx` as
single paths so they inherit `currentColor` and animate with the text.

`IconTile` wraps an icon in a 44px tinted square with a 1px ring — the standard
card affordance, in brand, accent or on-dark variants.

## 6. Components

| Component | File | Notes |
| --- | --- | --- |
| `Button` / `ButtonLink` | `ui/Button.tsx` | 5 variants × 3 sizes; `ButtonLink` auto-detects external/mailto/tel |
| `Container` / `Section` | `ui/Container.tsx` | Band tone and vertical rhythm |
| `Card` / `LinkCard` | `ui/Card.tsx` | `LinkCard` adds the −1px hover lift |
| `Eyebrow`, `SectionHeading`, `Pill`, `StatBlock` | `ui/Text.tsx` | — |
| `Accordion` | `ui/Accordion.tsx` | Single-open, client component |
| `Icon`, `IconTile` | `ui/Icon.tsx` | — |
| `Field`, `TextInput`, `SelectInput`, `TextArea` | `forms/Field.tsx` | Error state drives border + `aria-invalid` |
| `Header`, `Footer`, `Logo`, `PageHero`, `Breadcrumbs`, `CTASection`, `ProcessTimeline`, `LogoMarquee` | `site/` | — |
| `ServiceCard`, `IndustryCard`, `CaseStudyCard`, `ArticleCard`, `QuietLink` | `site/Cards.tsx` | — |
| `ArticleBody`, `ArticleToc` | `site/ArticleBody.tsx` | Fixed block vocabulary |
| `AppShell`, `AppHeader`, `Panel`, `StatusBadge`, `ProgressBar` | `app/Shell.tsx` | Portal + admin chrome |
| 8 chart components + `Visual` dispatcher | `viz/` | See doc 05 |

## 7. Figma-ready specification

Set up the file to mirror the code, so a handoff is a token diff and not a
redraw.

**Variable collections**

1. `color/ink` · `color/brand` · `color/accent` · `color/mist` · `color/viz` ·
   `color/semantic` — numeric steps exactly as above.
2. `type/family` (3), `type/size` (display-xl → eyebrow, plus body steps),
   `type/tracking`, `type/leading`.
3. `space` — 4px multiples to 128.
4. `radius` — card 8, panel 14.
5. `effect` — shadow-card, shadow-lift.

**Text styles:** `Display/XL` … `Display/SM`, `Heading/L` … `Heading/S`,
`Body/Lede`, `Body/Base`, `Body/Small`, `Mono/Eyebrow`, `Mono/Data`.

**Components, all with variants:** Button (variant × size × state),
IconTile (tone), Card (surface × interactive), Pill (tone), Field (state),
StatusBadge (status), Nav item (state), Section wrapper (tone × size).

**Pages:** `01 Foundations` · `02 Components` · `03 Homepage` ·
`04 Service template` · `05 Industry template` · `06 Case study template` ·
`07 Article template` · `08 Resource + forms` · `09 Portal` · `10 Admin` ·
`11 Charts` · `12 Responsive (375 / 768 / 1440)`.

**Frame widths:** 375, 768, 1024, 1440, 1920. Design at 1440; 1920 only checks
that `shell` centring holds.
