import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
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
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function DashboardOverview() {
  const { userProfile } = useAuth();

  return (
    <div className="relative min-h-screen p-6 space-y-6 overflow-hidden">
      {/* Rising bubbles background animation */}
      <RisingBubbles />

      {/* All content above bubbles */}
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
      </div>
    </div>
  );
}
