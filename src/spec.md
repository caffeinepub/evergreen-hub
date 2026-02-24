# Specification

## Summary
**Goal:** Add profile photo upload functionality, assign Platinum package to a specific user, and create a landing page preview system with a dedicated management section.

**Planned changes:**
- Add profile photo upload and change functionality to Profile Settings page with image preview and upload button
- Extend backend UserProfile to store profilePhotoUrl and implement uploadProfilePhoto function with blob storage
- Display profile photos in MobileSidebar and UserDashboardLayout sidebar (circular, with default avatar fallback)
- Create admin function to assign Platinum package (₹9999, 24 courses + all lower tiers) to user rudrapratapsingh789.063@gmail.com without payment
- Add "My Landing Pages" navigation tab showing all user-created landing pages in table/card layout with title, date, visit count, and actions
- Implement landing page preview functionality opening pages in new tab or modal
- Create public getLandingPageById backend function for retrieving landing pages without authentication
- Add publicly accessible /landing/:pageId route for shareable landing pages with SEO meta tags

**User-visible outcome:** Users can upload and change their profile photo visible in the dashboard sidebar. The user with email rudrapratapsingh789.063@gmail.com will have access to the Platinum package. Users can view all their created landing pages in a dedicated section, preview them in full-page view, and share them via public URLs.
