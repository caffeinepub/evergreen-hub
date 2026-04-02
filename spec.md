# Evergreen Hub – Major Feature Update

## Current State

Evergreen Hub is a full-stack React + Motoko app with:
- Web Design, Video Editing, Photo Editing, Thumbnail Design service sections
- Existing admin panel at /admin with: UserManagement, PackageManagement, PaymentManagement, SiteContentManagement, ContactInquiries, AdminStats
- Cart system, coupon codes, service detail pages, live reviews
- Login/Signup pages (glassmorphism, green/teal theme)
- PWA/APK download section
- AI Chatbot (fixed position)
- WhatsApp float button, UPI/PayPal payment modals

## Requested Changes (Diff)

### Add
1. **Ads Campaign Service Section** – New service section (after Thumbnail Design, before Why Choose Us) for Digital Ads/Marketing services:
   - Two plans: Basic Ads Campaign (₹1,499) and Advanced Ads Campaign (₹2,999)
   - Features: Google Ads, Facebook/Instagram Ads, campaign setup, targeting, reporting
   - Same card style as other service sections (55% OFF badge, Add to Cart, Order Now, View Details)
   - 6 uploaded user images displayed in a gallery/showcase inside this section

2. **Enhanced Admin Panel** – New/upgraded admin sections:
   - **Service Content Management**: Admin can edit ALL service details (name, price, description, features, images, videos) for Web Design, Video Editing, Photo Editing, Thumbnail Design, Ads Campaign
   - **Order Management**: See all orders/purchases with user info (who bought what), ability to block or dismiss/delete users
   - **User Management** (upgrade): Show profile photo, join date, block/unblock toggle, dismiss (delete) button

3. **Login/Signup System** (green + yellow + black theme):
   - Signup: Name, Email, Phone, Password fields; validation; store in backend; redirect to dashboard
   - Login: Email + password; error messages; session persistence; redirect to dashboard
   - Dashboard: Show user details (name, email, phone), allow profile photo upload stored in blob-storage
   - Green + yellow + black color scheme (glassmorphism cards)

4. **Ads Campaign images gallery** – 6 user-uploaded images shown in the new Ads Campaign section

### Modify
- Admin panel sidebar: add "Service Content" and "Orders" nav items
- Admin panel: User management page to show block/dismiss buttons prominently (green/yellow/black theme accents)
- Login/Signup pages: change color to green + yellow + black (currently green/teal)
- Backend: add service content CRUD, order tracking (who bought what), user block/dismiss

### Remove
- Nothing removed

## Implementation Plan

1. Backend (Motoko): Add types and functions for:
   - ServiceContent (editable per-service: title, description, price, features, imageUrl, videoUrl)
   - Order records (userId, serviceName, planName, price, status, createdAt)
   - saveOrder, getAllOrders, getOrdersByUser functions
   - blockUser/unblockUser, deleteUser already exist – ensure exposed
   - setServiceContent, getServiceContent, getAllServiceContent

2. Frontend:
   - New AdsCapmaignSection component with 6 image gallery
   - New admin/ServiceContentManagement page (edit all services)
   - New admin/OrderManagement page (see all orders, who bought what)
   - Update UserManagement to add prominent Block/Dismiss UI with green+yellow+black accents
   - Update Login/Signup pages to green+yellow+black glassmorphism
   - Update App.tsx routes for new admin pages
   - Update AdminDashboardLayout sidebar with new nav items
