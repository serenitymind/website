---
id: "rewrite-conditions-list-2026-05-20"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-05-20T21:54:02.000Z"
modified: "2026-05-20T22:00:31.000Z"
completedAt: "2026-05-20T22:00:31.000Z"
labels: ["content", "expertise"]
order: "a8"
---

# Rewrite Conditions list (Expertise section)

Replace all 8 condition cards in `serenity-mind/src/components/Conditions.tsx` with the new titles + descriptions. Services list (Psychiatric Evaluation / Medication Management / Individual Therapy / Telepsychiatry) is unchanged.

## New conditions data

1. **Anxiety Disorders** — Generalized anxiety, social anxiety, panic disorder, phobias, and school-related anxiety.
2. **Mood Disorders** — Depression, bipolar disorder, irritability, and mood dysregulation.
3. **Attention & Executive Functioning** — ADHD, attention difficulties, executive functioning challenges, and emotional regulation concerns.
4. **Trauma & Stress-Related Disorders** — PTSD, acute stress, adjustment difficulties, and trauma-related symptoms.
5. **Child & Adolescent Behavioral Challenges** — Irritability, aggression, oppositional behaviors, school difficulties, and emotional dysregulation.
6. **Developmental & Neurodiverse Conditions** — Autism spectrum disorder, learning differences, and social communication challenges.
7. **Family Therapy & Parent Guidance** — Parent support, family dynamics, behavioral strategies, and caregiver guidance.
8. **Maternal & Infant Mental Health** — Perinatal depression and anxiety, postpartum adjustment, bonding challenges, and early parenthood support.

## Acceptance

- [ ] `conditions` array in Conditions.tsx updated with all 8 entries
- [ ] Section heading "CONDITIONS WE TREAT" + the giant "Expertise" h1 stay unchanged
- [ ] Mobile responsiveness preserved (1-col on mobile, 2-col md, 4-col lg)
- [ ] Some titles are longer than before (e.g. "Child & Adolescent Behavioral Challenges") — check that they don't overflow card width on lg breakpoint
