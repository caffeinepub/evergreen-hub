# Specification

## Summary
**Goal:** Replace the Facebook section on the landing page with an attractive "Our Founder" section featuring Rudra Pratap Singh's photo, name, and bio, and also add the same founder section to the Web Design Services page.

**Planned changes:**
- Remove the FacebookSection component from the landing page entirely
- Create a new `FounderSection.tsx` component displaying:
  - Founder photo in a circular/rounded frame with glowing/gradient border
  - Bold "Our Founder" heading below the photo
  - "Rudra Pratap Singh" name in accent color (green or gold gradient) below the heading
  - Full About Me bio text below the name
  - Scroll-triggered fade-in animation and decorative gradient elements
- Add the `FounderSection` component to the landing page where the Facebook section was
- Reuse the `FounderSection` component inside the Web Design Services page (after the intro/hero, before pricing cards)
- Use the uploaded founder photo (cropped square) as the profile image served from `frontend/public/assets/generated/`

**User-visible outcome:** Visitors see an attractive founder profile section on both the landing page and the Web Design Services page, with Rudra Pratap Singh's photo, name, and full bio replacing the old Facebook section.
