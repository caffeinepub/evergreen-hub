# Specification

## Summary
**Goal:** Hide the WhatsApp phone number from the floating button UI and integrate the UPI ID `7970705775@ybl` into all payment components without displaying it to users.

**Planned changes:**
- In `FloatingWhatsAppButton`, remove/hide the phone number text from the button UI while keeping the `wa.me` link functional with the hardcoded number internally
- Integrate UPI ID `7970705775@ybl` into all payment-related components (`PaymentGateway`, `PaymentModal`, `PricingSection`, `VideoEditingSection`, `WebDesignPaymentModal`, `WebDesignServicesPromo`, and any other UPI/PhonePe payment component)
- Ensure the UPI ID is never rendered as visible text in any public-facing UI — only used internally in UPI deep links (`upi://pay?pa=7970705775@ybl`) or QR code generation

**User-visible outcome:** Users see the WhatsApp button without any phone number displayed, and can complete payments via UPI deep link or QR code without the raw UPI ID string being shown anywhere on the page.
