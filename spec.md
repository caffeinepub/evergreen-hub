# Evergreen Hub

## Current State
- PhotoEditingSection.tsx exists with Basic (₹149) and Advanced (₹299) cards
- Layout uses unicode escape sequences for ₹ symbols (\u20b9) in some places
- Card design is functional but needs visual polish
- WebDesignServices.tsx has packages but no website-type selection section

## Requested Changes (Diff)

### Add
- Website type selection section in WebDesignServices.tsx: show 4 options (Affiliate Marketing Website, Coaching Centre Website, Local Business Website, Blogger/Portfolio Website) as clickable cards that visually highlight when selected, helping user understand what kind of website they want
- Each website type card should show a brief description and icon

### Modify
- PhotoEditingSection.tsx: full redesign with:
  - Fix all \u20b9 to actual ₹ symbol
  - Proper psychological pricing: show original price struck through, bold discounted price, '50% OFF' badge
  - Basic: ₹299 → ₹149, Advanced: ₹599 → ₹299
  - Card hierarchy: Title → Description → Price (struck original + final + badge) → Features with checkmark icons → CTA
  - Advanced card has gradient border or prominent 'Most Popular' banner at top
  - Blue/purple gradient theme, light card backgrounds, subtle shadows, rounded corners
  - Mobile responsive, minimal premium look
  - CTA button: 'Order Now'
  - After order modal: ask user to upload images or share Drive link
  - WhatsApp message template in modal
  - Order status: Image Received → Editing in Progress → Delivered
  - Coupon codes still work (WELCOME50, EVERGREEN, HUB150, EVERGREEN10, HUB25)

### Remove
- Nothing removed, only improvements

## Implementation Plan
1. Rewrite PhotoEditingSection.tsx with redesigned cards and proper ₹ symbols
2. Add WebsiteTypeSelector section in WebDesignServices.tsx near the top/intro area
