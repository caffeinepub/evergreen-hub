import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  Search,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Order {
  id: string;
  serviceName: string;
  planName: string;
  price: number;
  userName: string;
  userEmail: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
}

const STORAGE_KEY = "evergreen_orders";

const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-001",
    serviceName: "Web Design",
    planName: "Gold Package",
    price: 2999,
    userName: "Rahul Kumar",
    userEmail: "rahul@example.com",
    status: "In Progress",
    createdAt: "2026-04-01",
  },
  {
    id: "ORD-002",
    serviceName: "Video Editing",
    planName: "YouTube Pro",
    price: 3999,
    userName: "Priya Singh",
    userEmail: "priya@example.com",
    status: "Completed",
    createdAt: "2026-03-28",
  },
  {
    id: "ORD-003",
    serviceName: "Photo Editing",
    planName: "Advanced",
    price: 299,
    userName: "Amit Sharma",
    userEmail: "amit@example.com",
    status: "Pending",
    createdAt: "2026-04-02",
  },
  {
    id: "ORD-004",
    serviceName: "Thumbnail Design",
    planName: "Advanced Thumbnail",
    price: 499,
    userName: "Sneha Patel",
    userEmail: "sneha@example.com",
    status: "Completed",
    createdAt: "2026-03-25",
  },
  {
    id: "ORD-005",
    serviceName: "Ads Campaign",
    planName: "Advanced Ads Campaign",
    price: 2999,
    userName: "Vikash Yadav",
    userEmail: "vikash@example.com",
    status: "In Progress",
    createdAt: "2026-04-01",
  },
];

const STATUS_CONFIG: Record<Order["status"], { label: string; color: string }> =
  {
    Pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    "In Progress": {
      label: "In Progress",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    Completed: {
      label: "Completed",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    Cancelled: {
      label: "Cancelled",
      color: "bg-red-100 text-red-800 border-red-200",
    },
  };

function loadOrders(): Order[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Order[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore */
  }
  return SAMPLE_ORDERS;
}

function saveOrders(orders: Order[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    /* ignore */
  }
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState("all");

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      !searchQuery ||
      o.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.planName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchService =
      filterService === "all" ||
      o.serviceName.toLowerCase() === filterService.toLowerCase();
    return matchSearch && matchService;
  });

  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.price, 0);
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  const updateStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status } : o,
    );
    setOrders(updated);
    saveOrders(updated);
    toast.success(`Order ${orderId} marked as ${status}`);
  };

  const serviceOptions = [
    "all",
    ...Array.from(new Set(orders.map((o) => o.serviceName))),
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #16a34a, #eab308)" }}
        >
          <ShoppingBag className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Order Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View and manage all service orders
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          className="border-0 shadow-sm"
          style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-extrabold text-green-800">
                  {totalOrders}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-sm"
          style={{ background: "linear-gradient(135deg, #fefce8, #fef9c3)" }}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">
                  Total Revenue
                </p>
                <p className="text-3xl font-extrabold text-yellow-800">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-yellow-200 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-yellow-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-sm"
          style={{ background: "linear-gradient(135deg, #fff7ed, #ffedd5)" }}
        >
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 font-medium">
                  Pending Orders
                </p>
                <p className="text-3xl font-extrabold text-orange-800">
                  {pendingCount}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            data-ocid="orders.search_input"
            placeholder="Search by name, email, plan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-green-200 focus:border-green-400"
          />
        </div>
        <Select value={filterService} onValueChange={setFilterService}>
          <SelectTrigger
            className="w-full sm:w-48 border-green-200"
            data-ocid="orders.select"
          >
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s === "all" ? "All Services" : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border border-gray-200 dark:border-gray-700 overflow-hidden">
        <CardHeader
          className="py-3 px-4"
          style={{ background: "linear-gradient(90deg, #0a0a0a, #064e3b)" }}
        >
          <CardTitle className="text-white text-sm font-semibold">
            {filteredOrders.length} order
            {filteredOrders.length !== 1 ? "s" : ""} found
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                <TableHead className="font-bold text-xs">Order ID</TableHead>
                <TableHead className="font-bold text-xs">User</TableHead>
                <TableHead className="font-bold text-xs">Service</TableHead>
                <TableHead className="font-bold text-xs">Plan</TableHead>
                <TableHead className="font-bold text-xs">Price</TableHead>
                <TableHead className="font-bold text-xs">Status</TableHead>
                <TableHead className="font-bold text-xs">Date</TableHead>
                <TableHead className="font-bold text-xs text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-gray-400"
                    data-ocid="orders.empty_state"
                  >
                    <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    <p>No orders found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order, idx) => (
                  <TableRow
                    key={order.id}
                    data-ocid={`orders.row.${idx + 1}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  >
                    <TableCell className="font-mono text-xs font-bold text-green-700">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-white">
                          {order.userName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.userEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {order.serviceName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        {order.planName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-green-700 text-sm">
                        ₹{order.price.toLocaleString("en-IN")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs border ${STATUS_CONFIG[order.status].color}`}
                      >
                        {order.status === "Completed" && (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        )}
                        {order.status === "Cancelled" && (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {order.status === "Pending" && (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {order.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        value={order.status}
                        onValueChange={(val) =>
                          updateStatus(order.id, val as Order["status"])
                        }
                      >
                        <SelectTrigger
                          className="h-7 text-xs w-32 border-green-200"
                          data-ocid={`orders.status.select.${idx + 1}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
