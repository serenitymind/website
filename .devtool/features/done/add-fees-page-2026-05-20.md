---
id: "add-fees-page-2026-05-20"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-05-20T21:54:02.000Z"
modified: "2026-05-20T22:19:53.000Z"
completedAt: "2026-05-20T22:19:53.000Z"
labels: ["feature", "content"]
order: "a5"
---

# Add Fees section (between Process and FAQ)

Originally scoped as a separate `/fees` route, but client requested it become an **inline section on the home page** positioned right before the FAQ. Implemented as `serenity-mind/src/components/Fees.tsx` with `id="fees"` anchor.

## Fee schedule

| Service | Duration | Fee |
|---|---|---|
| Initial Psychiatric Evaluation (Adult) | 60–90 min | $650–850 |
| Child & Adolescent Comprehensive Evaluation | 120 min (over 2 sessions) | $1,300 |
| Follow-Up Med Management | 30 min | $300 |
| Follow-Up Med Management | 45 min | $425 |
| Extended Follow-Up — Psychotherapy + Med Management | 60 min | $550 |
| Family Therapy / Parent Guidance (complex cases) | 60 min | $550 |

## What shipped

- New `Fees.tsx` component, row-based list (service+duration on left, fee on right)
- Reuses centered "tag + h2 + subtitle" pattern from Process for theme consistency
- Subtitle line covers the private-pay/superbills disclaimer
- `bg-white` so it contrasts against FAQ's `bg-bg-secondary`
- `id="fees"` + `scroll-mt-[88px]` on mobile so it anchors cleanly below the fixed header
- FAQ "How much do appointments cost?" answer now links to `#fees` (was `/fees`)
- Page section order updated in `page.tsx` (Process → Fees → FAQ → Contact)

## Not done (optional follow-ups)

- Header nav still doesn't include a "Fees" link — punt unless the client asks for it
