---
id: "add-fees-page-2026-05-20"
status: "todo"
priority: "medium"
assignee: null
dueDate: null
created: "2026-05-20T21:54:02.000Z"
modified: "2026-05-20T21:54:02.000Z"
completedAt: null
labels: ["feature", "content", "routing"]
order: "a5"
---

# Add dedicated Fees page

Move the fee schedule out of the FAQ accordion and onto its own route at `/fees` (or similar). New fee structure (different prices + new categories than current FAQ table).

## Fee schedule

| Service | Duration | Fee |
|---|---|---|
| Initial Psychiatric Evaluation (Adult) | 60–90 min | $650–850 |
| Child & Adolescent Comprehensive Evaluation | 120 min (over 2 sessions) | $1,300 |
| Follow-Up Med Management | 30 min | $300 |
| Follow-Up Med Management | 45 min | $425 |
| Follow-Up Med Management / Psychotherapy + Meds (extended) | 60 min | $550 |
| Family / Parent Guidance (complex cases) | 60 min | $550 |

## Implementation notes

- Create new App Router page at `serenity-mind/src/app/fees/page.tsx`
- Reuse styling from other sections (max-w-[1440px], px-5 md:px-16, etc.)
- Include the cancellation policy note + "private-pay practice, superbills available" disclaimer
- Header nav: decide whether to add "Fees" link (current nav: Home / Meet the Doctor / Expertise / How It Works / FAQ)
- FAQ Q&A "How much do appointments cost?" should link to this page
- Contact section could also reference the page

## Acceptance

- [ ] New page at `/fees` renders with the fee table
- [ ] Mobile responsive (table should stack or scroll horizontally on small screens)
- [ ] Internal link from FAQ cost question → /fees works
- [ ] Old fee table inside FAQ removed (coordinate with `rewrite-faq-section-2026-05-20`)
- [ ] Decide on header nav link inclusion
