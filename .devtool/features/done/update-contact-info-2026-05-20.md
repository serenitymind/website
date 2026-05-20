---
id: "update-contact-info-2026-05-20"
status: "done"
priority: "medium"
assignee: null
dueDate: null
created: "2026-05-20T21:54:02.000Z"
modified: "2026-05-20T22:00:31.000Z"
completedAt: "2026-05-20T22:00:31.000Z"
labels: ["content", "contact"]
order: "a6"
---

# Update contact info (phone, address, hours)

Replace placeholder phone + address with real ones, and replace the rigid Mon–Fri hours line with a softer availability statement.

## Changes in `serenity-mind/src/components/Contact.tsx`

**Phone:**
- Old: `(424) 555-0192`
- New: `(424) 226-2323`

**Address:**
- Old: `9461 Charleville Blvd, Beverly Hills, CA 90212`
- New: `11340 W Olympic Blvd # 203, Los Angeles, CA 90064`

**Hours line:**
- Old: `Mon–Fri 8:00 AM – 5:30 PM` (with Clock icon)
- New: `I offer structured weekday availability, including select evening appointments.`
- Decision: keep the Clock icon or drop it since the new line is sentence-style? Probably keep icon for visual consistency.

## Acceptance

- [ ] `contactInfo` array in Contact.tsx updated
- [ ] Phone number is also tappable (`tel:` link) on mobile
- [ ] Address could optionally link to Google Maps (`https://maps.google.com/?q=...`)
- [ ] Hours line wraps gracefully on mobile (it's longer than the old short hours)
- [ ] Verify the new phone format `(424) 226-2323` matches the existing styling
