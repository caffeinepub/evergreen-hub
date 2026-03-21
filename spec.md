# Evergreen Hub - Sign-Up & Login Pages

## Current State
Existing app has a login page at `/login` with glassmorphism design. No dedicated sign-up page exists as a standalone styled page.

## Requested Changes (Diff)

### Add
- Dedicated `/signup` page with green/teal gradient background, card-style form (Full Name, Email, Password, Confirm Password), social sign-up buttons (Google, Discord, GitHub), tagline 'Grow, Create, Connect', fade-in animations, hover effects, fully responsive
- Updated `/login` page matching same green/teal theme, with Email + Password fields, Forgot Password link, Sign In CTA, social login buttons, link to sign-up

### Modify
- Login page visual theme: change from blue/purple gradient to green/teal to match Evergreen Hub branding

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/SignUp.tsx` with full design
2. Update `src/frontend/src/pages/Login.tsx` to match green/teal theme
3. Add route for `/signup` in App.tsx
4. Use Evergreen Hub logo, Poppins font, smooth animations
