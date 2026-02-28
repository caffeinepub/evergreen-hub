import React, { Suspense, lazy } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as CustomThemeProvider } from './contexts/ThemeContext';

// Layouts
import UserDashboardLayout from './layouts/UserDashboardLayout';
import AdminDashboardLayout from './layouts/AdminDashboardLayout';

// Landing page components (inlined — no separate LandingPage file)
import HeroSection from './components/HeroSection';
import PricingSection from './components/PricingSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import YouTubeSection from './components/YouTubeSection';
import InstagramSection from './components/InstagramSection';
import FounderSection from './components/FounderSection';
import VideoEditingSection from './components/VideoEditingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import Header from './components/Header';
import GradientBlobs from './components/GradientBlobs';
import TrustBadgesSection from './components/TrustBadgesSection';
import BottomCTASection from './components/BottomCTASection';
import ContactFormSection from './components/ContactFormSection';
import WebDesignServicesPromo from './components/WebDesignServicesPromo';
import WelcomeSplashScreen from './components/WelcomeSplashScreen';

// Public Pages (lazy)
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const LandingPagePreview = lazy(() => import('./pages/LandingPagePreview'));
const WebDesignServices = lazy(() => import('./pages/WebDesignServices'));

// User Dashboard Pages (lazy)
const DashboardOverview = lazy(() => import('./pages/user/DashboardOverview'));
const MyPackages = lazy(() => import('./pages/user/MyPackages'));
const ProfileSettings = lazy(() => import('./pages/user/ProfileSettings'));
const ChangePassword = lazy(() => import('./pages/user/ChangePassword'));
const WithdrawalRequests = lazy(() => import('./pages/user/WithdrawalRequests'));
const LandingPageBuilder = lazy(() => import('./pages/user/LandingPageBuilder'));
const MyLandingPages = lazy(() => import('./pages/user/MyLandingPages'));

// Admin Pages (lazy)
const AdminStats = lazy(() => import('./pages/admin/AdminStats'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const PackageManagement = lazy(() => import('./pages/admin/PackageManagement'));
const PaymentManagement = lazy(() => import('./pages/admin/PaymentManagement'));
const WithdrawalManagement = lazy(() => import('./pages/admin/WithdrawalManagement'));
const ContactInquiries = lazy(() => import('./pages/admin/ContactInquiries'));
const SiteContentManagement = lazy(() => import('./pages/admin/SiteContentManagement'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
  </div>
);

function LandingPage() {
  return (
    <>
      <GradientBlobs />
      <Header />
      <HeroSection />
      <TrustBadgesSection />
      <WebDesignServicesPromo />
      <PricingSection />
      <WhyChooseUsSection />
      <YouTubeSection />
      <InstagramSection />
      <FounderSection />
      <VideoEditingSection />
      <TestimonialsSection />
      <ContactFormSection />
      <FAQSection />
      <BottomCTASection />
      <Footer />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />
    </>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <>
      <WelcomeSplashScreen />
      <Outlet />
    </>
  ),
});

// ─── Public Routes ────────────────────────────────────────────────────────────

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Login />
    </Suspense>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Register />
    </Suspense>
  ),
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-login',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLogin />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutUs />
    </Suspense>
  ),
});

// Keep /about-us as alias for backward compat
const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about-us',
  beforeLoad: () => {
    throw redirect({ to: '/about' });
  },
  component: () => null,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Contact />
    </Suspense>
  ),
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PrivacyPolicy />
    </Suspense>
  ),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TermsOfService />
    </Suspense>
  ),
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RefundPolicy />
    </Suspense>
  ),
});

const landingPagePreviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/landing/$pageId',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPagePreview />
    </Suspense>
  ),
});

const webDesignRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/web-design-services',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WebDesignServices />
    </Suspense>
  ),
});

// ─── User Dashboard Routes (nested under UserDashboardLayout) ─────────────────

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: UserDashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardOverview />
    </Suspense>
  ),
});

const dashboardPackagesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/packages',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MyPackages />
    </Suspense>
  ),
});

const dashboardProfileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfileSettings />
    </Suspense>
  ),
});

const dashboardPasswordRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/change-password',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChangePassword />
    </Suspense>
  ),
});

const dashboardWithdrawalRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/withdrawal-requests',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WithdrawalRequests />
    </Suspense>
  ),
});

const dashboardLandingPageRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/landing-page-builder',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPageBuilder />
    </Suspense>
  ),
});

const dashboardMyLandingPagesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/my-landing-pages',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MyLandingPages />
    </Suspense>
  ),
});

// ─── Admin Routes (nested under AdminDashboardLayout) ─────────────────────────

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-dashboard',
  beforeLoad: () => {
    throw redirect({ to: '/admin/stats' });
  },
  component: () => null,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardLayout,
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/admin/stats' });
  },
  component: () => null,
});

const adminStatsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/stats',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminStats />
    </Suspense>
  ),
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/users',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <UserManagement />
    </Suspense>
  ),
});

const adminPackagesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/packages',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PackageManagement />
    </Suspense>
  ),
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/payments',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaymentManagement />
    </Suspense>
  ),
});

const adminWithdrawalsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/withdrawals',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WithdrawalManagement />
    </Suspense>
  ),
});

const adminInquiriesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/inquiries',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactInquiries />
    </Suspense>
  ),
});

const adminSiteContentRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: '/site-content',
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SiteContentManagement />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  adminLoginRoute,
  aboutRoute,
  aboutUsRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  refundRoute,
  landingPagePreviewRoute,
  webDesignRoute,
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    dashboardPackagesRoute,
    dashboardProfileRoute,
    dashboardPasswordRoute,
    dashboardWithdrawalRoute,
    dashboardLandingPageRoute,
    dashboardMyLandingPagesRoute,
  ]),
  adminDashboardRoute,
  adminRoute.addChildren([
    adminIndexRoute,
    adminStatsRoute,
    adminUsersRoute,
    adminPackagesRoute,
    adminPaymentsRoute,
    adminWithdrawalsRoute,
    adminInquiriesRoute,
    adminSiteContentRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <CustomThemeProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </CustomThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
