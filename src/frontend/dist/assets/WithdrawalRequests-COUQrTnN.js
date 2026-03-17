import { c as createLucideIcon, m as useActor, a as useAuth, af as useQueryClient, r as reactExports, a5 as useQuery, ag as useGetEarnings, ah as useMutation, j as jsxRuntimeExports, C as Card, n as CardHeader, o as CardTitle, a6 as DollarSign, p as CardDescription, q as CardContent, s as Label, I as Input, ai as Textarea, B as Button, d as ue, v as Badge } from "./index-DLWhZ6P8.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-C-lzWcGG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function WithdrawalRequests() {
  const { actor } = useActor();
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [amount, setAmount] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState("");
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["withdrawalRequests", userProfile == null ? void 0 : userProfile.principal.toString()],
    queryFn: async () => {
      if (!actor || !userProfile)
        throw new Error("Actor or user profile not available");
      return actor.getWithdrawalRequests(userProfile.principal);
    },
    enabled: !!actor && !!userProfile
  });
  const { data: earnings } = useGetEarnings(
    (userProfile == null ? void 0 : userProfile.principal.toString()) || ""
  );
  const createRequestMutation = useMutation({
    mutationFn: async ({
      amount: amount2,
      message: message2
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createWithdrawalRequest(BigInt(amount2), message2);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["withdrawalRequests"] });
      const userName = (userProfile == null ? void 0 : userProfile.name) || "User";
      const lifetimeEarnings = (earnings == null ? void 0 : earnings.lifetime) ? Number(earnings.lifetime) : 0;
      const withdrawalAmount = variables.amount;
      const userMessage = variables.message;
      const whatsappMessage = `Withdrawal Request from ${userName}: Earned ₹${lifetimeEarnings}, Requesting ₹${withdrawalAmount}. Message: ${userMessage}`;
      const whatsappUrl = `https://wa.me/919263989760?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");
      ue.success(
        "Withdrawal request submitted! Admin will be notified via WhatsApp."
      );
      setAmount("");
      setMessage("");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to submit withdrawal request");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = Number.parseFloat(amount);
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      ue.error("Please enter a valid amount");
      return;
    }
    if (!message.trim()) {
      ue.error("Please enter a message");
      return;
    }
    if (!userProfile) {
      ue.error("User profile not loaded. Please try again.");
      return;
    }
    if (!earnings) {
      ue.error("Earnings data not loaded. Please wait and try again.");
      return;
    }
    createRequestMutation.mutate({
      amount: amountNum,
      message: message.trim()
    });
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
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading withdrawal requests..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Withdrawal Requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Request withdrawals and track their status" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5 text-emerald-500" }),
          "New Withdrawal Request"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Submit a request to withdraw your earnings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "amount",
              type: "number",
              min: "1",
              step: "1",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              placeholder: "Enter amount to withdraw",
              required: true,
              disabled: createRequestMutation.isPending
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "message", children: "Message *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "message",
              value: message,
              onChange: (e) => setMessage(e.target.value),
              placeholder: "Enter your payment details or any additional information...",
              rows: 4,
              required: true,
              disabled: createRequestMutation.isPending
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Include your payment method details (UPI ID, bank account, etc.)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: createRequestMutation.isPending || !earnings,
            className: "w-full",
            children: createRequestMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Submitting..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-2 h-4 w-4" }),
              "Submit Request"
            ] })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your Withdrawal Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "View the status of your withdrawal requests" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No withdrawal requests yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: requests.map((request) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium", children: [
            "₹",
            Number(request.amount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate", children: request.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(request.status) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: new Date(
            Number(request.createdAt) / 1e6
          ).toLocaleDateString() })
        ] }, request.id.toString())) })
      ] }) }) })
    ] })
  ] });
}
export {
  WithdrawalRequests as default
};
