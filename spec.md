# Evergreen Hub – Full Authentication & Admin Enhancement

## Current State

The app is a full-featured service platform (Web Design, Video Editing, Photo Editing, Thumbnail Design, Ads Campaign) with:
- Login/Signup pages using Internet Identity (ICP) authentication
- Admin panel at `/admin-login` (user: Evergreenhub, pass: Anurudra@12) with stats, users, packages, payments sections
- Backend actor with full user management: registerUser, getAllUsers, toggleUserBlock, deleteUser, uploadProfilePhoto
- Cart system, coupon codes, payment gateway (UPI/PayPal/Bank)
- Service detail pages, live reviews, chatbot

## Requested Changes (Diff)

### Add
- **Enhanced Login Page**: Green + Blue + Black dark premium theme; Evergreen Hub logo centered at top; animated gradient / glowing particles behind logo; glassmorphism card; neon glow on inputs/buttons; hover & focus animations; loading spinner on login; show/hide password toggle; error messages for invalid credentials
- **Enhanced Signup Page**: Same premium dark theme; Fields: Name, Email, Password, Confirm Password; 'Create Account' button; success popup 'Welcome to Evergreen Hub 🚀' after signup; store user data via backend (name, email, uid, createdAt); loading spinner
- **Forgot Password Page** at `/forgot-password`: Email input; 'Send Reset Email' button; success message 'Reset link sent to your email'; Note: email is disabled so show friendly message explaining
- **Admin: Coupon Management page** at `/admin/coupons`: Table of all coupons with code, discount type (percent/fixed), discount value, active/inactive toggle; Create new coupon button (code, type, value fields); Edit and delete coupons; Coupons persist via backend or localStorage (since no Firebase, use backend storage)
- **Admin: Service Image Management**: In service management section, admin can add/upload images for each service and delete them; images stored via blob-storage backend
- **Persistent User Data in Admin**: Users registered via signup persist in backend (already works via actor.registerUser). Admin panel shows all users with Name, Email, Signup Date, blocked status
- **Animations**: Subtle page-entry animations on Login, Signup, and Forgot Password pages

### Modify
- **Login Page**: Redesign to dark premium Green+Blue+Black glassmorphism theme with glowing particles animation behind logo; keep existing Internet Identity login logic; add loading states and error feedback
- **Signup Page**: Redesign to match login page theme; keep existing backend registration logic; add success popup after successful signup
- **AdminLogin Page**: Keep existing credentials (Evergreenhub / Anurudra@12); enhance visual design to match the premium dark theme
- **Admin Panel**: Add new 'Coupon Management' sidebar link and page; add 'Service Images' management in existing service sections
- **Coupon codes stored**: Move from hardcoded frontend to backend-managed (admin can create/edit/delete); frontend reads active coupons from backend

### Remove
- Nothing to remove — existing features must be preserved

## Implementation Plan

1. **Backend**: Add coupon management to backend (CouponCode type with id, code, discountType percent/fixed, discountValue, active); CRUD endpoints: createCoupon, getCoupons, updateCoupon, deleteCoupon, toggleCouponActive, getActiveCoupons
2. **Login page redesign**: Dark Green+Blue+Black glassmorphism; animated particles/gradient; neon glow inputs; keep II auth logic
3. **Signup page redesign**: Match login theme; success popup on account creation
4. **ForgotPassword page**: New page at /forgot-password; email input; friendly message since email is disabled
5. **Admin Coupon Management page**: Full CRUD UI for coupon codes using backend actor
6. **Admin Service Image Management**: Allow upload/delete images per service using blob-storage
7. **Frontend coupon system update**: Read coupons from backend instead of hardcoded; apply discounts dynamically
