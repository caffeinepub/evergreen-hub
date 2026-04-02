import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

// Bubble configuration
const BUBBLES = [
  {
    size: 12,
    left: "8%",
    delay: "0s",
    duration: "12s",
    color: "rgba(37, 99, 235, 0.25)",
  },
  {
    size: 20,
    left: "18%",
    delay: "1.5s",
    duration: "15s",
    color: "rgba(245, 158, 11, 0.3)",
  },
  {
    size: 8,
    left: "28%",
    delay: "3s",
    duration: "11s",
    color: "rgba(37, 99, 235, 0.2)",
  },
  {
    size: 24,
    left: "38%",
    delay: "0.5s",
    duration: "14s",
    color: "rgba(124, 58, 237, 0.2)",
  },
  {
    size: 16,
    left: "50%",
    delay: "2s",
    duration: "13s",
    color: "rgba(245, 158, 11, 0.25)",
  },
  {
    size: 10,
    left: "60%",
    delay: "4s",
    duration: "10s",
    color: "rgba(37, 99, 235, 0.3)",
  },
  {
    size: 18,
    left: "70%",
    delay: "1s",
    duration: "16s",
    color: "rgba(124, 58, 237, 0.25)",
  },
  {
    size: 14,
    left: "80%",
    delay: "2.5s",
    duration: "12s",
    color: "rgba(245, 158, 11, 0.2)",
  },
  {
    size: 22,
    left: "88%",
    delay: "3.5s",
    duration: "14s",
    color: "rgba(37, 99, 235, 0.2)",
  },
  {
    size: 9,
    left: "94%",
    delay: "0.8s",
    duration: "11s",
    color: "rgba(124, 58, 237, 0.3)",
  },
];

function RisingBubbles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {BUBBLES.map((bubble) => (
        <div
          key={`bubble-${bubble.left}-${bubble.size}`}
          style={{
            position: "absolute",
            bottom: "-30px",
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: "50%",
            backgroundColor: bubble.color,
            border: `1px solid ${bubble.color.replace(/[\d.]+\)$/, "0.5)")}`,
            animationName: "riseBubble",
            animationDuration: bubble.duration,
            animationDelay: bubble.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            willChange: "transform, opacity",
          }}
        />
      ))}
      <style>{`
        @keyframes riseBubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  Delivered:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Progress":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Image Received":
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Editing in Progress":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Web Design":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Video Editing":
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Photo Editing":
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    service: "Basic Web Design Package",
    category: "Web Design",
    price: 2999,
    status: "In Progress",
    date: "2026-03-20",
  },
  {
    id: "ORD-002",
    service: "YouTube Pro Video Editing",
    category: "Video Editing",
    price: 3999,
    status: "Delivered",
    date: "2026-03-18",
  },
  {
    id: "ORD-003",
    service: "Advanced Photo Editing",
    category: "Photo Editing",
    price: 299,
    status: "Image Received",
    date: "2026-03-22",
  },
];

export default function DashboardOverview() {
  const { userProfile } = useAuth();

  const orders = (() => {
    try {
      const stored = localStorage.getItem("evergreenhub_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* empty */
    }
    return SAMPLE_ORDERS;
  })();

  return (
    <div className="relative min-h-screen p-6 space-y-6 overflow-hidden">
      <RisingBubbles />

      <div className="relative z-10 space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {userProfile?.name || "User"}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile and account settings
          </p>
        </div>

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Account Summary
            </CardTitle>
            <CardDescription>Your profile and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">
                    {userProfile?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">
                    {userProfile?.email || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium">
                    {userProfile?.phone || "N/A"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Member Since
                  </span>
                  <span className="text-sm font-medium">
                    {userProfile?.createdAt
                      ? new Date(
                          Number(userProfile.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-IN")
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Account Status
                  </span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge variant="outline" className="capitalize">
                    {userProfile?.role || "user"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              My Orders
            </CardTitle>
            <CardDescription>Your recent service orders</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div
                data-ocid="orders.empty_state"
                className="text-center py-8 text-muted-foreground"
              >
                <ShoppingBag className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>No orders yet. Browse our services to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order, idx) => (
                  <div
                    key={order.id}
                    data-ocid={`orders.item.${idx + 1}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card/50 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm text-foreground">
                          {order.service}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${CATEGORY_COLORS[order.category] || ""}`}
                        >
                          {order.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Order #{order.id} · {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold text-primary text-sm">
                        ₹{order.price.toLocaleString("en-IN")}
                      </span>
                      <Badge
                        className={`text-xs ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
