---
id: "rewrite-faq-section-2026-05-20"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-05-20T21:54:02.000Z"
modified: "2026-05-20T22:02:51.000Z"
completedAt: "2026-05-20T22:02:51.000Z"
labels: ["content", "faq"]
order: "a3"
---

# Rewrite FAQ section (consistency + flow)

Restructure the FAQ accordion into two clearly-labeled subsections with refreshed copy. Update the Virtual/In-Person Q&A to reflect the new limited-in-person availability.

## New structure

### 1. Getting Started & What to Expect

**What happens during the first appointment?**
The first visit is a comprehensive evaluation focused on understanding you (or your child) as a whole person — not just symptoms. I take time to learn about current concerns, psychiatric history, and life context. This includes a thorough psychiatric interview and, when helpful, input from family or other sources. Together, we review diagnostic impressions and create a thoughtful, individualized treatment plan.

**What is included in a child or adolescent evaluation?**
A child or adolescent evaluation is a comprehensive, two-session process (approximately 120 minutes total). It includes interviews with the child and caregivers, a detailed developmental and psychiatric history, and a careful diagnostic assessment. When helpful, input from schools or other providers may also be incorporated to support accurate treatment planning.

**Do you provide both therapy and medication management?**
Yes. Treatment is individualized and may include medication management, psychotherapy, or a combination of both. When appropriate, I also incorporate family sessions to support care in a more holistic way.

**Do you work with families or schools?**
Yes. With consent and when clinically appropriate, I collaborate with families, schools, and other providers to support continuity of care and a more complete understanding of each patient's needs.

### 2. Treatment, Structure & Fees

**What do follow-up visits look like?**
Follow-up visits focus on supporting ongoing progress and adjusting care over time. These sessions may include medication management, psychotherapy, and discussion of goals, coping strategies, and day-to-day functioning.

**Do you accept insurance?**
No. This is a private-pay practice. Superbills may be provided for patients seeking out-of-network reimbursement.

**How much do appointments cost?**
Fees vary based on appointment type and duration. A detailed fee schedule is available on the Fees page.

**What is your cancellation policy?**
I understand that unexpected situations can arise. I kindly ask for at least 48 hours' notice if you need to cancel or reschedule an appointment. Late cancellations or missed appointments may be subject to a fee. Each situation is reviewed individually, and I appreciate your understanding in helping maintain access for all patients.

### Virtual / In-Person Q&A (updated wording)

**Do you offer virtual or in-person appointments?**
Yes. I offer virtual appointments for patients throughout California through a secure telehealth platform. I also offer limited in-person appointments one day per week for those who prefer face-to-face care.

## Acceptance

- [ ] FAQ.tsx data array updated with new questions/answers
- [ ] Subsection headers ("Getting Started & What to Expect", "Treatment, Structure & Fees") visually grouped (could be h3s between accordion items or styled dividers)
- [ ] Old fee table inside FAQ is removed — replaced by link to new Fees page (see `add-fees-page-2026-05-20`)
- [ ] Old questions that aren't in the new list get removed (e.g. "What ages do you treat?", "What is your approach to treatment?", "How often will I have appointments?", "What do sessions look like?") — confirm with client if any should be kept
- [ ] Cancellation policy stays at 48 hours (already updated previously)
