import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

// Landing page components
import HeroSection from './components/HeroSection';
import PricingSection from './components/PricingSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import YouTubeSection from './components/YouTubeSection';
import InstagramSection from './components/InstagramSection';
import FacebookSection from './components/FacebookSection';
import VideoEditingSection from './components/VideoEditingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import EvergreenAIChatbot from './components/EvergreenAIChatbot';
import ScrollToTopButton from './components/ScrollToTopButton';
import Header from './components/Header';
import GradientBlobs from './components/GradientBlobs';
import TrustBadgesSection from './components/TrustBadgesSection';
import BottomCTASection from './components/BottomCTASection';

// Auth pages
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';

// Other pages
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import LandingPagePreview from './pages/LandingPagePreview';

// User dashboard
import UserDashboardLayout from './layouts/UserDashboardLayout';
import DashboardOverview from './pages/user/DashboardOverview';
import MyPackages from './pages/user/MyPackages';
import ProfileSettings from './pages/user/ProfileSettings';
import ChangePassword from './pages/user/ChangePassword';
import WithdrawalRequests from './pages/user/WithdrawalRequests';
import LandingPageBuilder from './pages/user/LandingPageBuilder';
import MyLandingPages from './pages/user/MyLandingPages';

// Admin dashboard
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import AdminStats from './pages/admin/AdminStats';
import UserManagement from './pages/admin/UserManagement';
import PackageManagement from './pages/admin/PackageManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import WithdrawalManagement from './pages/admin/WithdrawalManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function LandingPage() {
  return (
    <>
      <GradientBlobs />
      <Header />
      <HeroSection />
      <TrustBadgesSection />
      <PricingSection />
      <WhyChooseUsSection />
      <YouTubeSection />
      <InstagramSection />
      <FacebookSection />
      <VideoEditingSection />
      <TestimonialsSection />
      <FAQSection />
      <BottomCTASection />
      <Footer />
      <FloatingWhatsAppButton />
      <EvergreenAIChatbot />
      <ScrollToTopButton />
    </>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-login',
  component: AdminLogin,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about-us',
  component: AboutUs,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicy,
});

const termsOfServiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-service',
  component: TermsOfService,
});

const refundPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/refund-policy',
  component: RefundPolicy,
});

const landingPagePreviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/landing/$pageId',
  component: LandingPagePreview,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: UserDashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: DashboardOverview,
});

const dashboardPackagesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/packages',
  component: MyPackages,
});

const dashboardProfileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile',
  component: ProfileSettings,
});

const dashboardPasswordRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/change-password',
  component: ChangePassword,
});

const dashboardWithdrawalRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/withdrawal-requests',
  component: WithdrawalRequests,
});

const dashboardLandingPageRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/landing-page-builder',
  component: LandingPageBuilder,
});

const dashboardMyLandingPagesRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/my-landing-pages',
  component: MyLandingPages,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-dashboard',
  component: AdminDashboardLayout,
});

const adminDashboardIndexRoute = createRoute({
  getParentRoute: () => adminDashboardRoute,
  path: '/',
  component: AdminStats,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminDashboardRoute,
  path: '/users',
  component: UserManagement,
});

const adminPackagesRoute = createRoute({
  getParentRoute: () => adminDashboardRoute,
  path: '/packages',
  component: PackageManagement,
});

const adminPaymentsRoute = createRoute({
  getParentRoute: () => adminDashboardRoute,
  path: '/payments',
  component: PaymentManagement,
});

const adminWithdrawalsRoute = createRoute({
  getParentRoute: () => adminDashboardRoute,
  path: '/withdrawals',
  component: WithdrawalManagement,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  loginRoute,
  adminLoginRoute,
  contactRoute,
  aboutUsRoute,
  privacyPolicyRoute,
  termsOfServiceRoute,
  refundPolicyRoute,
  landingPagePreviewRoute,
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    dashboardPackagesRoute,
    dashboardProfileRoute,
    dashboardPasswordRoute,
    dashboardWithdrawalRoute,
    dashboardLandingPageRoute,
    dashboardMyLandingPagesRoute,
  ]),
  adminDashboardRoute.addChildren([
    adminDashboardIndexRoute,
    adminUsersRoute,
    adminPackagesRoute,
    adminPaymentsRoute,
    adminWithdrawalsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
