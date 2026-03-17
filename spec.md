# Evergreen Hub - Animated Login Page

## Current State
The Login page at `/login` uses a basic card with Internet Identity authentication. It has minimal styling with no animations, no 3D character, and no visual flair.

## Requested Changes (Diff)

### Add
- Full screen gradient background (blue to purple)
- Glassmorphism login card (backdrop blur, transparency, rounded corners, soft shadow)
- 3D animated CSS character (idle/walking animation) above the form
- Entrance animation: fade + slide up for card
- Input fields with focus glow/border animation
- Login button with hover scale + color transition
- Loading spinner animation on login click
- Success/failure visual feedback
- Floating background particles/orbs for depth
- Poppins/Inter font usage
- Show/hide password toggle (visual, since auth is Internet Identity)
- Signup link below

### Modify
- Redesign Login.tsx completely with the new animated glassmorphism UI
- Keep Internet Identity auth logic intact

### Remove
- Plain white card design
- No-animation layout

## Implementation Plan
1. Redesign Login.tsx with full-screen gradient background
2. Add glassmorphism card with CSS backdrop-filter
3. Create CSS 3D character animation (stick figure or astronaut using CSS shapes)
4. Add entrance, focus, hover, loading, and success/failure animations
5. Style inputs with animated focus borders
6. Keep all existing auth logic
