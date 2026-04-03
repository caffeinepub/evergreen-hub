import { j as jsxRuntimeExports, au as Dialog, av as DialogContent, aw as DialogHeader, ax as DialogTitle, J as useActor, _ as useQueryClient, r as reactExports, $ as useQuery, a0 as useMutation, a8 as CreditCard, B as Button, Z as Skeleton, ay as X, e as ue, D as Badge } from "./index-DtQIrmWF.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CBweH5kp.js";
import { E as Eye } from "./eye-BBn5m7g5.js";
import { C as Check } from "./check-D2G346SR.js";
function ImageModal({ imageUrl, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!imageUrl, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-gray-900 dark:text-gray-100", children: "Payment Screenshot" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center bg-gray-50 dark:bg-slate-800 p-4 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: imageUrl,
        alt: "Payment screenshot",
        className: "max-w-full max-h-[70vh] object-contain rounded-lg"
      }
    ) })
  ] }) });
}
const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
];
function PaymentManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [selectedImage, setSelectedImage] = reactExports.useState(null);
  const { data: allPaymentProofs = [], isLoading } = useQuery({
    queryKey: ["allPaymentProofs"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllPaymentProofs();
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
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllPackages();
    },
    enabled: !!actor
  });
  const approveMutation = useMutation({
    mutationFn: async (proofId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.approvePaymentProof(proofId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPaymentProofs"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      ue.success("Payment proof approved successfully");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to approve payment proof");
    }
  });
  const rejectMutation = useMutation({
    mutationFn: async (proofId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.rejectPaymentProof(proofId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allPaymentProofs"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      ue.success("Payment proof rejected");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to reject payment proof");
    }
  });
  const getUserName = (userId) => {
    const user = users.find((u) => u.principal.toString() === userId);
    return (user == null ? void 0 : user.name) || "Unknown User";
  };
  const getUserPhone = (userId) => {
    const user = users.find((u) => u.principal.toString() === userId);
    return (user == null ? void 0 : user.phone) || "";
  };
  const getPackageName = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId);
    return (pkg == null ? void 0 : pkg.name) || "Unknown Package";
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500 hover:bg-emerald-600 text-white", children: "Approved" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "border-yellow-500 text-yellow-600 dark:text-yellow-400",
            children: "Pending"
          }
        );
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Rejected" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: status });
    }
  };
  const handleViewScreenshot = (proof) => {
    try {
      const imageUrl = proof.screenshotBlob.getDirectURL();
      setSelectedImage(imageUrl);
    } catch {
      ue.error("Failed to load screenshot");
    }
  };
  const filteredProofs = statusFilter === "all" ? allPaymentProofs : allPaymentProofs.filter((p) => p.status === statusFilter);
  const counts = {
    all: allPaymentProofs.length,
    pending: allPaymentProofs.filter((p) => p.status === "pending").length,
    approved: allPaymentProofs.filter((p) => p.status === "approved").length,
    rejected: allPaymentProofs.filter((p) => p.status === "rejected").length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Payment Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "Review and manage payment proof submissions" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: FILTER_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: statusFilter === option.value ? "default" : "outline",
        size: "sm",
        onClick: () => setStatusFilter(option.value),
        className: "gap-2",
        children: [
          option.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center justify-center rounded-full text-xs font-medium min-w-[1.25rem] h-5 px-1 ${statusFilter === option.value ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`,
              children: counts[option.value]
            }
          )
        ]
      },
      option.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Package" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Transaction ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Screenshot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 4 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: Array.from({ length: 7 }, (_, j) => j).map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, `skel-cell-${j}`)) }, `skel-row-${i}`)) : filteredProofs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableCell,
        {
          colSpan: 7,
          className: "text-center py-12 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "No ",
              statusFilter !== "all" ? statusFilter : "",
              " payment proofs found"
            ] })
          ]
        }
      ) }) : filteredProofs.map((proof) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: getUserName(proof.userId.toString()) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: getUserPhone(proof.userId.toString()) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm", children: getPackageName(proof.packageId) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            className: "font-mono text-xs max-w-[120px] truncate",
            title: proof.transactionId,
            children: proof.transactionId
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => handleViewScreenshot(proof),
            className: "gap-1.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
              "View"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: getStatusBadge(proof.status) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(
          Number(proof.createdAt) / 1e6
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: proof.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => approveMutation.mutate(proof.id),
              disabled: approveMutation.isPending || rejectMutation.isPending,
              title: "Approve",
              className: "h-8 w-8 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-emerald-600" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => rejectMutation.mutate(proof.id),
              disabled: approveMutation.isPending || rejectMutation.isPending,
              title: "Reject",
              className: "h-8 w-8 hover:bg-red-50 dark:hover:bg-red-950/30",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-red-500" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "Processed" }) })
      ] }, proof.id.toString())) })
    ] }) }),
    selectedImage && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImageModal,
      {
        imageUrl: selectedImage,
        onClose: () => setSelectedImage(null)
      }
    )
  ] });
}
export {
  PaymentManagement as default
};
