import { r as reactExports, j as jsxRuntimeExports, E as ShoppingBag, v as Clock, a1 as Search, R as Input, D as Badge, aa as CircleCheck, ab as CircleX, e as ue } from "./index-DtQIrmWF.js";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-DVWv_6Rq.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DPHURWWx.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CBweH5kp.js";
import { I as IndianRupee } from "./indian-rupee-BH2sKu57.js";
import "./index-BadNxkev.js";
import "./check-D2G346SR.js";
import "./chevron-up-C0m3PyNj.js";
const STORAGE_KEY = "evergreen_orders";
const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    serviceName: "Web Design",
    planName: "Gold Package",
    price: 2999,
    userName: "Rahul Kumar",
    userEmail: "rahul@example.com",
    status: "In Progress",
    createdAt: "2026-04-01"
  },
  {
    id: "ORD-002",
    serviceName: "Video Editing",
    planName: "YouTube Pro",
    price: 3999,
    userName: "Priya Singh",
    userEmail: "priya@example.com",
    status: "Completed",
    createdAt: "2026-03-28"
  },
  {
    id: "ORD-003",
    serviceName: "Photo Editing",
    planName: "Advanced",
    price: 299,
    userName: "Amit Sharma",
    userEmail: "amit@example.com",
    status: "Pending",
    createdAt: "2026-04-02"
  },
  {
    id: "ORD-004",
    serviceName: "Thumbnail Design",
    planName: "Advanced Thumbnail",
    price: 499,
    userName: "Sneha Patel",
    userEmail: "sneha@example.com",
    status: "Completed",
    createdAt: "2026-03-25"
  },
  {
    id: "ORD-005",
    serviceName: "Ads Campaign",
    planName: "Advanced Ads Campaign",
    price: 2999,
    userName: "Vikash Yadav",
    userEmail: "vikash@example.com",
    status: "In Progress",
    createdAt: "2026-04-01"
  }
];
const STATUS_CONFIG = {
  Pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  "In Progress": {
    label: "In Progress",
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  Completed: {
    label: "Completed",
    color: "bg-green-100 text-green-800 border-green-200"
  },
  Cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200"
  }
};
function loadOrders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
  }
  return SAMPLE_ORDERS;
}
function saveOrders(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
  }
}
function OrderManagement() {
  const [orders, setOrders] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [filterService, setFilterService] = reactExports.useState("all");
  reactExports.useEffect(() => {
    setOrders(loadOrders());
  }, []);
  const filteredOrders = orders.filter((o) => {
    const matchSearch = !searchQuery || o.userName.toLowerCase().includes(searchQuery.toLowerCase()) || o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) || o.planName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchService = filterService === "all" || o.serviceName.toLowerCase() === filterService.toLowerCase();
    return matchSearch && matchService;
  });
  const totalRevenue = orders.filter((o) => o.status === "Completed").reduce((sum, o) => sum + o.price, 0);
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const updateStatus = (orderId, status) => {
    const updated = orders.map(
      (o) => o.id === orderId ? { ...o, status } : o
    );
    setOrders(updated);
    saveOrders(updated);
    ue.success(`Order ${orderId} marked as ${status}`);
  };
  const serviceOptions = [
    "all",
    ...Array.from(new Set(orders.map((o) => o.serviceName)))
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center",
          style: { background: "linear-gradient(135deg, #16a34a, #eab308)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Order Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "View and manage all service orders" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-0 shadow-sm",
          style: { background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-700 font-medium", children: "Total Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-extrabold text-green-800", children: totalOrders })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-green-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-green-700" }) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-0 shadow-sm",
          style: { background: "linear-gradient(135deg, #fefce8, #fef9c3)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-700 font-medium", children: "Total Revenue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-extrabold text-yellow-800", children: [
                "₹",
                totalRevenue.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-yellow-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-5 w-5 text-yellow-700" }) })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-0 shadow-sm",
          style: { background: "linear-gradient(135deg, #fff7ed, #ffedd5)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-orange-700 font-medium", children: "Pending Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-extrabold text-orange-800", children: pendingCount })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-orange-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-orange-700" }) })
          ] }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "orders.search_input",
            placeholder: "Search by name, email, plan...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9 border-green-200 focus:border-green-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterService, onValueChange: setFilterService, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectTrigger,
          {
            className: "w-full sm:w-48 border-green-200",
            "data-ocid": "orders.select",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by service" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: serviceOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s === "all" ? "All Services" : s }, s)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-gray-200 dark:border-gray-700 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardHeader,
        {
          className: "py-3 px-4",
          style: { background: "linear-gradient(90deg, #0a0a0a, #064e3b)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white text-sm font-semibold", children: [
            filteredOrders.length,
            " order",
            filteredOrders.length !== 1 ? "s" : "",
            " found"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-gray-50 dark:bg-gray-800/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableCell,
          {
            colSpan: 8,
            className: "text-center py-12 text-gray-400",
            "data-ocid": "orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No orders found" })
            ]
          }
        ) }) : filteredOrders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            "data-ocid": `orders.row.${idx + 1}`,
            className: "hover:bg-gray-50 dark:hover:bg-gray-800/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs font-bold text-green-700", children: order.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-gray-900 dark:text-white", children: order.userName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: order.userEmail })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: order.serviceName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-600 dark:text-gray-300", children: order.planName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-green-700 text-sm", children: [
                "₹",
                order.price.toLocaleString("en-IN")
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: `text-xs border ${STATUS_CONFIG[order.status].color}`,
                  children: [
                    order.status === "Completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                    order.status === "Cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                    order.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
                    order.status
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-gray-500", children: order.createdAt }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: order.status,
                  onValueChange: (val) => updateStatus(order.id, val),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-7 text-xs w-32 border-green-200",
                        "data-ocid": `orders.status.select.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Pending", children: "Pending" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "In Progress", children: "In Progress" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Completed", children: "Completed" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Cancelled", children: "Cancelled" })
                    ] })
                  ]
                }
              ) })
            ]
          },
          order.id
        )) })
      ] }) })
    ] })
  ] });
}
export {
  OrderManagement as default
};
