# 12 — Assistant ("Anu") conversation design

Implementation: `src/lib/chatFlow.ts` (the tree), `src/app/api/chat/route.ts`
(one node per request), `src/components/chat/ChatWidget.tsx` (the UI).

## Why a scripted tree, not an LLM

Three reasons, and they are not about cost:

1. **Subsidy and lending answers cannot be hallucinated.** "You are eligible for
   PMFME" from a chatbot is a claim a promoter may act on. Every sentence in the
   flow is written and approved by the practice that owns it.
2. **Every path is testable.** 28 nodes, all reachable, all reviewable. An LLM's
   output on question 4 of a funding conversation is not.
3. **It costs nothing to run** and works with JavaScript on a slow connection.

An optional LLM fallback for off-script questions is specified below but disabled
by default, and would always be framed as "general guidance, a consultant will
confirm".

## Structure

28 nodes across six intents. Root asks intent; each branch narrows in one or two
questions, then terminates with a specific, useful answer plus page
recommendations and a CTA.

```
start
├── funding ──┬── funding-small      (PMFME / Mudra route, ₹45–90k fixed fee)
│             ├── funding-core ──┬── funding-ready  (4–5 wks, 84% sanction rate)
│             │                  └── funding-site   (site first; freight/effluent)
│             └── funding-large       (consortium; partner call)
├── factory ──┬── factory-dairy       (19 plants; 3 decisions that drive payback)
│             ├── factory-food        (yield/tonne + real line utilisation)
│             └── factory-other       (selective; straight yes or no in a day)
├── growth ───┬── growth-demand       (positioning vs channel)
│             ├── growth-capacity     (55–68% OEE: capacity already paid for)
│             ├── growth-margin       (mix / freight / yield / discount leakage)
│             └── growth-concentration(second channel; valuation argument)
├── compliance┬── compliance-subsidy  (sequence beats eligibility)
│             ├── compliance-fssai    (licence vs audit-ready system)
│             ├── compliance-approvals(CtE, factory, fire, boiler in parallel)
│             └── compliance-ip       (file before printing packaging)
├── brand ────┬── brand-launch        (₹4.5–12L over 10 weeks)
│             ├── brand-rebrand       (audit trade recall first)
│             └── brand-demand        (channel + demand engine)
└── other                             (practice head replies personally)
```

Depth is capped at three questions. A visitor who has answered three questions
and not received something useful will leave.

## Copy rules

Every terminal node must do three things:

1. **Give a real answer**, not a promise of one. "Most plants we audit run
   55–68% true OEE, so a third of the capacity you need is already paid for" is
   an answer. "Our experts can help you optimise capacity" is not.
2. **Name a number** — a fee range, a timeline, a sanction rate, a count of
   plants commissioned.
3. **Recommend at most three pages**, at least one of which is free content.

Tone matches the site: direct, specific, willing to say no. `factory-other`
openly says we take that work selectively.

## Where it earns its place

The assistant is for the **problem-aware, solution-unaware** visitor (flow B in
doc 03). Its best node is `growth-capacity`, which reframes a capex question as a
measurement question — a genuinely different conversation that a static page
struggles to start.

It deliberately does **not** appear on `/contact`, where a visitor is already
converting and a chat nudge is pure interference.

## Nudge behaviour

* Fires once, after 22 seconds, per browser session (`sessionStorage`, wrapped in
  try/catch for private mode).
* Never on `/contact`.
* Dismissible without opening.
* The launcher has a pulsing ring only while closed.
* Escape closes the panel.

## Server design

`POST /api/chat` takes `{ node, choice? }` and returns the node. The tree lives
server-side so copy changes ship without a client bundle rebuild and so the full
script is not handed to scrapers in one request.

Rate limited to 60 turns per IP per 10 minutes. Every turn writes to
`chat_events` (`session_id`, `node`, `choice`), indexed by node — so drop-off per
question is one `group by`.

Session id is a client-generated UUID sent in `x-as-chat-session`. No cookie, no
identity, nothing personal until the visitor chooses to use a CTA.

## Analytics to watch

| Question | Query |
| --- | --- |
| Which intent do visitors pick? | `select choice, count(*) from chat_events where node = 'start' group by 1` |
| Where do they abandon? | Nodes with entries but no subsequent turn in the session |
| Does it convert? | Sessions with a `chat_events` row that also produced a lead |
| Which terminal nodes work? | Terminal node reach, joined to CTA clicks |

If a branch shows high entry and no onward conversion after a quarter, the answer
at that node is not good enough — rewrite it rather than adding another question.

## Optional LLM fallback (not enabled)

If enabled with `ANTHROPIC_API_KEY`:

* Only reachable from the `other` node, never inside funding or compliance
  branches.
* System prompt restricted to the published content on this site, with explicit
  instruction to refuse eligibility, sanction-probability and fee questions and
  hand them to a consultant.
* Every response prefixed "General guidance — a consultant will confirm this for
  your project."
* Full transcript stored for review; any refusal or hedge reviewed weekly.
* Hard token and turn caps per session.

The bar for enabling it: it must measurably beat "leave your details and a
practice head will reply". It currently does not, which is why it is off.
