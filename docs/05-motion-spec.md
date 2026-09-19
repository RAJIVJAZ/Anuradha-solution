# 05 — Motion & data visualisation specification

Motion on this site has one job: make data legible in the order it should be
read. There is no decorative animation, no parallax, and no scroll-jacking.

## 1. Motion tokens

Defined in `@theme` (`globals.css`):

| Token | Value | Use |
| --- | --- | --- |
| `--ease-entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements arriving |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes, fades |
| `--animate-duration-fast` | 160 ms | Hover, button press |
| `--animate-duration-base` | 320 ms | Panel open, bar growth |
| `--animate-duration-slow` | 640 ms | Section entrance |
| `--animate-duration-data` | 1200 ms | Chart line draw |

Keyframes: `as-rise`, `as-fade`, `as-draw`, `as-grow-y`, `as-sweep`,
`as-pulse-ring`, `as-marquee`, `as-drift`.

## 2. The declarative contract

The whole system is two data attributes and one client component.

```html
<div data-reveal style="--reveal-delay: 160ms">…</div>
<figure data-chart>…<path data-draw style="--draw-length: 1400" />…</figure>
```

`ScrollReveal` (mounted once in the root layout) runs a single
`IntersectionObserver` over `[data-reveal],[data-chart]` and sets
`data-shown="true"` when an element reaches 12% visibility with a −12% bottom
root margin. CSS in `globals.css` does the rest.

Why this design:

* **Server components can animate.** No `"use client"` needed on any page or
  chart, so the marketing site ships almost no component JS.
* **One observer, not hundreds.** A `MutationObserver` picks up anything
  rendered later (route change, chat panel), so late content still animates.
* **Reduced motion is honoured at the source.** If the user prefers reduced
  motion, `ScrollReveal` marks everything shown immediately and never observes.

### Stagger convention

| Content | Delay per item |
| --- | --- |
| Card grids | 70 ms |
| Numbered lists, process steps | 80–90 ms |
| Stat blocks | 80 ms |
| Chart marks | 130–170 ms |

Cap total stagger at ~600 ms. Beyond that the last item reads as broken rather
than choreographed.

## 3. Chart inventory

All charts are hand-authored SVG with a `viewBox` and no fixed dimensions.
No charting library — a consulting site publishes eight specific charts, not
arbitrary user data, and a library would cost 40–120 KB for that.

| Component | What it shows | Motion |
| --- | --- | --- |
| `GrowthCurve` | Median client revenue path vs do-nothing baseline, 5 years | Line draws over 1200 ms; baseline fades at 260 ms; dots pop 130 ms apart; end labels at 1250 ms |
| `RevenueBars` | Before/after pairs across four metrics | Bars scale from the baseline, before then after, 140 ms per pair |
| `FactoryFlow` | 5-stage plant process with QC gates | Track draws, stages fade in sequence, then a looping `animateMotion` dot |
| `FundingWaterfall` | Means of finance for a ₹14.2 Cr project | Segments fade left to right, 170 ms apart; total revealed last |
| `CapacityGauge` | OEE against target on a 240° arc | Arc draws 1200 ms; target tick and figure fade after |
| `AutomationRadar` | Digital maturity, 6 axes, now vs 12-month target | Target polygon fades at 260 ms, current at 520 ms |
| `BrandSystem` | Master brand → 3 sub-brands → 6 touchpoints | Top-down cascade, 70–130 ms steps |
| `ComplianceGrid` | 8 statutory approvals as a 26-week Gantt | Rows fade top to bottom, 90 ms apart |

`Visual` (`viz/Visual.tsx`) maps a content entry's `visual` field to a
component, so content authors choose a chart by name and never import one.

`Counter` is the only chart-adjacent client component: it parses the numeric part
out of strings like `₹640 Cr` or `3.1x`, preserving prefix and suffix, and eases
to the value with an ease-out cubic over 1400 ms on first intersection. The
server-rendered HTML contains the real figure, so it is correct without JS and
correct for crawlers.

## 4. Chart design rules

1. **Direct labels beat legends.** Where there is room, the value sits at the end
   of the mark. Legends only appear where two series genuinely overlap.
2. **A 240° arc, not a donut.** Visible scale ends let the eye judge the gap to
   target; a closed ring does not.
3. **Baselines are always shown.** A "3x improvement" chart without its starting
   point is a marketing claim.
4. **Gridlines at 12% opacity, axis at 18%.** Data marks carry full saturation;
   nothing else does.
5. **Mono for all numeric labels.** Tabular figures align across rows.
6. **Every chart states its figures in `aria-label`.** A screen reader gets the
   data, not the word "chart".
7. **No 3D, no perspective, no gradient fills on categorical marks.** The one
   gradient in the system is the area fill under `GrowthCurve`, where it encodes
   nothing and only softens the baseline.

## 5. Interface motion

| Element | Behaviour |
| --- | --- |
| Mega-panel | `as-fade` 160 ms on open; closes on mouse-leave, route change or Escape |
| `LinkCard` hover | `translateY(-4px)` + `shadow-lift`, 220 ms entrance ease |
| Button hover | Background shift 160 ms; `active:translate-y-px` for press feedback |
| `ArrowRight` | Slides 2px on parent `group` hover |
| Logo marquee | 42 s linear loop, `animation-play-state: paused` on hover |
| Assistant launcher | `as-pulse-ring` 2.8 s infinite, only while closed |
| Assistant typing | Three dots on `as-drift`, 140 ms apart |
| Assistant panel | `as-rise` 320 ms |
| Progress bars | Width transition 700 ms ease-out |

## 6. Reduced motion

`@media (prefers-reduced-motion: reduce)` globally clamps all animation and
transition durations to 1 ms, disables smooth scrolling, reveals all
`[data-reveal]` content, sets `stroke-dashoffset: 0` on drawn paths, removes bar
scaling and shows all faded marks. `Counter` skips its animation and renders the
final value. `ScrollReveal` short-circuits before creating any observer.

The result is a fully static, fully legible site — not a degraded one.

## 7. Performance rules

* Animate only `transform`, `opacity` and `stroke-dashoffset`. Never `width`,
  `height`, `top` or `left` on anything above the fold.
* One looping animation per viewport maximum (the flow dot or the marquee, never
  both in view).
* No animation on the LCP element. The hero H1 is static; only the chart beside
  it animates.
* `animateMotion` is used exactly once, in `FactoryFlow`, and that chart never
  appears above the fold.
