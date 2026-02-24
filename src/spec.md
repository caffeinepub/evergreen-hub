# Specification

## Summary
**Goal:** Update UI backgrounds to solid black, reposition chatbot, mask phone number, and add earnings dashboard with withdrawal request functionality.

**Planned changes:**
- Change PaymentModal, EvergreenAIChatbot, and FloatingWhatsAppButton backgrounds to solid black (#000000)
- Move EvergreenAIChatbot floating button from right side to left side of viewport
- Mask phone number 9263989760 to display as '********60' while keeping it clickable across all components
- Redirect authenticated users to /dashboard after successful login instead of homepage
- Create Earnings Dashboard section showing Today's, Weekly, Monthly, and Lifetime earnings in INR with emerald green accents
- Add backend support for earnings tracking and calculation based on approved payment proofs
- Implement Withdrawal Request feature allowing users to submit withdrawal requests with amount and message
- Add backend data structures and functions for withdrawal request management (create, list, update status)
- Create admin Withdrawal Management page with approve/reject functionality and status filtering
- Add Landing Page Builder option in user dashboard for creating and customizing landing pages
- Implement backend support for storing and managing user-created landing pages

**User-visible outcome:** Users will see a cleaner black-themed interface with repositioned chatbot, masked but clickable phone number, direct access to their earnings dashboard after login showing four earning metrics, ability to submit withdrawal requests and view their status, and access to a landing page builder tool. Admins can manage withdrawal requests through a dedicated management page.
