# Evergreen Hub

## Current State
Website with CartDrawer (no quantity control), legal pages (ToS, Privacy, Refund), and DashboardOverview with order history.

## Requested Changes (Diff)

### Add
- Quantity +/- controls per cart item
- Orders tab inside CartDrawer with live order tracking (Pending/In Progress/Completed)
- Progress bar animation for each order status
- `addOrder` and `orders` to CartContext (persisted in localStorage)
- Gradient cart UI with green/purple/blue color scheme
- Glow checkout button

### Modify
- CartContext: add quantity field, updateQuantity(), addOrder(), orders state
- CartDrawer: full redesign — gradient header, tabs (Cart/Orders), quantity controls, colored category cards, animated checkout button
- TermsOfService: replace with exact user-provided 6-section content
- PrivacyPolicy: replace with exact user-provided 5-section content
- RefundPolicy: replace with exact user-provided full/partial/no refund + special condition

### Remove
- N/A

## Implementation Plan
1. Update CartContext with quantity + orders
2. Redesign CartDrawer with tabs, quantity controls, order tracking
3. Rewrite all 3 legal pages with exact user content
