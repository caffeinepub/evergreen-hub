import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Landing page components
import HeroSection from './components/HeroSection';
import PricingSection from './components/PricingSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import YouTubeSection from './components/YouTubeSection';
import InstagramSection from './components/InstagramSection';
import VideoEditingSection from './components/VideoEditingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import Header from './components/Header';

// Auth pages
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';

// Other pages
import Contact from './pages/Contact';

// User dashboard
import UserDashboardLayout from './layouts/UserDashboardLayout';
import DashboardOverview from './pages/user/DashboardOverview';
import MyPackages from './pages/user/MyPackages';
import ProfileSettings from './pages/user/ProfileSettings';
import ChangePassword from './pages/user/ChangePassword';

// Admin dashboard
import AdminDashboardLayout from './layouts/AdminDashboardLayout';
import AdminStats from './pages/admin/AdminStats';
import UserManagement from './pages/admin/UserManagement';
import PackageManagement from './pages/admin/PackageManagement';
import PaymentManagement from './pages/admin/PaymentManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PricingSection />
      <WhyChooseUsSection />
      <YouTubeSection />
      <InstagramSection />
      <VideoEditingSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
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

const routeTree = rootRoute.addChildren([
  indexRoute,
  contactRoute,
  registerRoute,
  loginRoute,
  adminLoginRoute,
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    dashboardPackagesRoute,
    dashboardProfileRoute,
    dashboardPasswordRoute,
  ]),
  adminDashboardRoute.addChildren([
    adminDashboardIndexRoute,
    adminUsersRoute,
    adminPackagesRoute,
    adminPaymentsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
