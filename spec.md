# Evergreen Hub

## Current State
The website has affiliate marketing features including:
- Course packages section (PricingSection) with 6 packages (E-Lite to Ultra Pro)
- FAQ section about affiliate marketing
- User dashboard with earnings overview, commission chart, referral links, withdrawal requests, landing page builder, my packages
- Sidebar navigation includes all packages list and affiliate marketing links
- Hero section badge and text mentions affiliate marketing
- BottomCTASection references courses/earnings journey

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- **App.tsx LandingPage**: Remove `<PricingSection />` and `<FAQSection />` from homepage
- **App.tsx routes**: Remove routes for dashboardPackagesRoute, dashboardWithdrawalRoute, dashboardLandingPageRoute, dashboardMyLandingPagesRoute
- **UserDashboardLayout.tsx**: Remove "My Packages", "Withdrawal Request", "Landing Page Builder", "My Landing Pages" from navigation array
- **DashboardOverview.tsx**: Remove all earnings cards (today/weekly/monthly/lifetime), commission chart, referral link/section, payment history, active packages stats; keep welcome header and account summary only
- **MobileSidebar.tsx**: Remove "All Packages" and individual package list from Our Courses accordion; keep "Video Editing Charge" and "Web Design Services" only; rename accordion to "Our Services"
- **HeroSection.tsx**: Remove affiliate marketing badge text, update subheadline to focus on web design, video/photo editing services only; update Explore Courses button to scroll to web-design section instead
- **BottomCTASection.tsx**: Update text to focus on services (web design, video/photo editing) instead of courses/earnings

### Remove
- `<PricingSection />` from homepage
- `<FAQSection />` from homepage
- Dashboard routes: packages, withdrawal, landing-page-builder, my-landing-pages
- Dashboard nav items: My Packages, Withdrawal Request, Landing Page Builder, My Landing Pages
- Earnings cards and commission chart from DashboardOverview
- Referral link and referrals section from DashboardOverview
- Payment history from DashboardOverview

## Implementation Plan
1. Update App.tsx - remove PricingSection/FAQSection from LandingPage, remove affiliate routes from routeTree
2. Update UserDashboardLayout.tsx - clean navigation array
3. Update DashboardOverview.tsx - simplify to account summary only
4. Update MobileSidebar.tsx - clean Our Courses to just services
5. Update HeroSection.tsx - remove affiliate marketing references
6. Update BottomCTASection.tsx - update messaging
