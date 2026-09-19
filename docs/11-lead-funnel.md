# 11 — Lead capture funnel

## Conversion surfaces

There are exactly five, and no others. A site with a pop-up, a sticky bar, an
exit-intent modal and a chat nudge converts worse than one with a clear path.

| Surface | Where | Friction | Intent served |
| --- | --- | --- | --- |
| Primary CTA | Header, every page | One click | High |
| `CTASection` | End of every page | One click | Medium-high |
| Lead form | `/contact` and gated resources | 11 fields | High |
| Newsletter | Footer | Email only | Low |
| Assistant | Bottom-right, one nudge per session | Four taps | Low-medium |

Every `CTASection` has contextual copy. A service page ends with "Talk to the
partner who runs project funding"; an article ends with "Want this applied to
your own numbers?". Generic CTAs are the single most common conversion leak on
consulting sites.

## The lead form

Eleven fields, which is more than a marketing textbook allows. The reasoning: a
₹6 lakh engagement is not an impulse purchase, and a form that asks nothing
produces enquiries a partner cannot triage. Three of the fields (revenue,
timeline, interest) are 55 of the 100 available score points and decide routing —
they are the form.

| Field | Required | Why it exists |
| --- | --- | --- |
| Name, company, email, phone, city | Yes | Identity and desk routing |
| Industry | Yes | Sector filter — we decline out-of-sector work |
| What do you need help with | Yes | Practice routing, +12/−6 score |
| Current annual revenue | Yes | 0–32 score points |
| When do you want to start | Yes | 0–25 score points |
| Tell us about the project | No | +6 if substantive; the best predictor of a serious enquiry |
| Consent | Yes | Explicit, links the privacy policy |
| Company website (hidden) | — | Honeypot |

### Friction reducers, in order of measured importance

1. **Published fees on every service page**, so the form is not where price is
   first discussed.
2. **"Median response time last quarter: 5 hours 40 minutes"** directly under the
   submit button — the specific anxiety at that moment is being ignored.
3. **Consent copy that says what we will not do**: "No data is sold or shared
   with lenders without my written consent."
4. **In-place success state** with a quotable reference number, not a redirect to
   a thank-you page.
5. **Inline field errors** with `aria-invalid`, never a summary at the top.

### Anti-spam

Three layers, none of which is a CAPTCHA:

* **Honeypot** — a hidden `companyWebsite` field. The Zod schema accepts any
  value for it on purpose; rejecting it at validation would return an error that
  tells the bot it was caught. The route checks it after a successful parse and
  returns `{ ok: true, reference: "AS-0000" }` while storing nothing. Verified in
  this build: a filled honeypot returns success and writes no row.
* **Rate limit** — 6 submissions per IP per 10 minutes, with `Retry-After`.
  Verified returning 429 with `retry-after: 583`.
* **Server-side validation** — the same Zod schema as the client, so a field can
  never be validated in the browser and silently accepted on the server.

No CAPTCHA, deliberately. It costs conversions from exactly the demographic we
want (a 55-year-old promoter on a mid-range Android phone) and stops
approximately nothing.

## Gated vs ungated resources

Five of nine resources are ungated, including the DPR readiness checklist — the
most valuable one. The rule: **gate a financial model, never a checklist.** A
model where a wrong input produces a confidently wrong answer is worth a
conversation; a checklist is worth more as a link somebody shares.

Gated-resource leads are scored down 4 and routed to nurture, not to a partner.

## Funnel targets

| Stage | Conversion | 90-day actual |
| --- | --- | --- |
| Visitors → engaged (>60s or 2 pages) | — | 27.8% |
| Engaged → resource download | 10% | 12.5% |
| Engaged → enquiry | 2.5% | 2.6% |
| Enquiry → discovery call | 40% | 43.3% |
| Call → proposal | 50% | 53.4% |
| Proposal → won | 50% | 54.8% |

End to end: roughly 1 engagement per 1,080 engaged visitors. At 8,000 organic
sessions a month that is about two engagements a month from organic alone, which
is the number the whole content plan is sized against.

## Response operations

| Score | Owner | SLA | First action |
| --- | --- | --- | --- |
| ≥ 60 | Partner | 4 business hours | Personal email with two calendar slots |
| 35–59 | Engagement manager | 1 business day | Qualifying questions, then a slot |
| < 35 | Marketing | 3 business days | Relevant resource + newsletter |

Slack alerts on a 60+ lead unactioned after 4 business hours. `first_response_at`
is written back from the CRM so `lead_funnel_daily.avg_response_hours` reflects
what happened, not what was intended.

## Declining well

About one enquiry in four is declined. The decline email names the reason and,
where we can, names someone better — usually a district MSME resource centre for
sub-₹40 lakh projects. Two of our current clients were previously declined and
came back eighteen months later at the right size. That is the entire argument
for doing this properly.
