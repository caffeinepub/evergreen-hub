import { h as createLucideIcon, J as useActor, _ as useQueryClient, r as reactExports, $ as useQuery, a0 as useMutation, j as jsxRuntimeExports, B as Button, aw as X, e as ue, D as Badge } from "./index-Bxztzs8-.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-AjzlJkoI.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-C2MYJlmH.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C6XxI9ew.js";
import { C as Check } from "./check-Dt5Sy2uK.js";
import "./index-D76CqAZr.js";
import "./chevron-up-D1wPhAmL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode);
function WithdrawalManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["allWithdrawalRequests"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllWithdrawalRequests();
    },
    enabled: !!actor
  });
  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllUsers();
    },
    enabled: !!actor
  });
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      requestId,
      status
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateRequestStatus(requestId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allWithdrawalRequests"] });
      ue.success("Withdrawal request status updated successfully!");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to update status");
    }
  });
  const getUserName = (userId) => {
    const user = users.find((u) => u.principal.toString() === userId);
    return (user == null ? void 0 : user.name) || "Unknown User";
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500", children: "Approved" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "border-yellow-500 text-yellow-600",
            children: "Pending"
          }
        );
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Rejected" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: status });
    }
  };
  const handleApprove = (requestId) => {
    updateStatusMutation.mutate({
      requestId,
      status: "approved"
    });
  };
  const handleReject = (requestId) => {
    updateStatusMutation.mutate({
      requestId,
      status: "rejected"
    });
  };
  const filteredRequests = requests.filter((request) => {
    if (statusFilter === "all") return true;
    return request.status === statusFilter;
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading withdrawal requests..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Withdrawal Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage user withdrawal requests" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5 text-emerald-500" }),
            "Withdrawal Requests"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Review and process user withdrawal requests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "approved", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "rejected", children: "Rejected" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: filteredRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No withdrawal requests found" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredRequests.map((request) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: getUserName(request.userId.toString()) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-semibold text-emerald-500", children: [
            "₹",
            Number(request.amount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate", title: request.message, children: request.message }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(request.status) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(
            Number(request.createdAt) / 1e6
          ).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: request.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-green-600 border-green-600 hover:bg-green-600 hover:text-white",
                onClick: () => handleApprove(request.id),
                disabled: updateStatusMutation.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 mr-1" }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-red-600 border-red-600 hover:bg-red-600 hover:text-white",
                onClick: () => handleReject(request.id),
                disabled: updateStatusMutation.isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-1" }),
                  "Reject"
                ]
              }
            )
          ] }) })
        ] }, request.id.toString())) })
      ] }) }) })
    ] })
  ] });
}
export {
  WithdrawalManagement as default
};
