import { a4 as createLucideIcon, G as useActor, a5 as useQueryClient, r as reactExports, a6 as useMutation, j as jsxRuntimeExports, as as Dialog, at as DialogContent, au as DialogHeader, av as DialogTitle, aB as DialogDescription, R as Label, V as Input, a2 as Textarea, aC as DialogFooter, n as Button, e as ue, J as useQuery, K as Package, a0 as Plus, a9 as Skeleton, B as Badge } from "./index-DHWa7f2a.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-BUi_buIZ.js";
import { S as Switch } from "./switch-DFsIU6OR.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BtxQbwqw.js";
import "./index-D6DsnvvA.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function PackageModal({
  open,
  onOpenChange,
  package: pkg
}) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [formData, setFormData] = reactExports.useState({
    name: "",
    price: "",
    courses: ""
  });
  reactExports.useEffect(() => {
    if (pkg) {
      setFormData({
        name: pkg.name,
        price: Number(pkg.price).toString(),
        courses: pkg.courses
      });
    } else {
      setFormData({
        name: "",
        price: "",
        courses: ""
      });
    }
  }, [pkg]);
  const createMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.createPackage(
        formData.name,
        BigInt(formData.price),
        formData.courses
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      ue.success("Package created successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      ue.error(error.message || "Failed to create package");
    }
  });
  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !pkg) throw new Error("Actor or package not available");
      return actor.updatePackage(
        pkg.id,
        formData.name,
        BigInt(formData.price),
        formData.courses
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      ue.success("Package updated successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      ue.error(error.message || "Failed to update package");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.courses.trim()) {
      ue.error("Please fill in all fields");
      return;
    }
    if (pkg) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  };
  const loading = createMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[500px] bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-gray-900 dark:text-gray-100", children: pkg ? "Edit Package" : "Add New Package" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-gray-700 dark:text-gray-300", children: pkg ? "Update package details" : "Create a new course package" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-gray-900 dark:text-gray-100", children: "Package Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "name",
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value }),
            placeholder: "E-LITE Package",
            className: "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-gray-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", className: "text-gray-900 dark:text-gray-100", children: "Price (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "price",
            type: "number",
            value: formData.price,
            onChange: (e) => setFormData({ ...formData, price: e.target.value }),
            placeholder: "699",
            className: "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-gray-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Label,
          {
            htmlFor: "courses",
            className: "text-gray-900 dark:text-gray-100",
            children: "Courses (comma-separated)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "courses",
            value: formData.courses,
            onChange: (e) => setFormData({ ...formData, courses: e.target.value }),
            placeholder: "Course 1, Course 2, Course 3",
            rows: 4,
            className: "bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-gray-100"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            className: "border-gray-300 dark:border-slate-700 text-gray-900 dark:text-gray-100",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: loading,
            className: "bg-primary hover:bg-primary/90 text-white",
            children: loading ? "Saving..." : pkg ? "Update" : "Create"
          }
        )
      ] })
    ] })
  ] }) });
}
function PackageManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingPackage, setEditingPackage] = reactExports.useState(
    null
  );
  const [deletePackageId, setDeletePackageId] = reactExports.useState(null);
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllPackages();
    },
    enabled: !!actor
  });
  const toggleStatusMutation = useMutation({
    mutationFn: async (packageId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.togglePackageStatus(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
      ue.success("Package status updated");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to update package status");
    }
  });
  const deletePackageMutation = useMutation({
    mutationFn: async (packageId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deletePackage(packageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      queryClient.invalidateQueries({ queryKey: ["allPackages"] });
      queryClient.invalidateQueries({ queryKey: ["activePackages"] });
      ue.success("Package deleted successfully");
      setDeletePackageId(null);
    },
    onError: (error) => {
      ue.error(error.message || "Failed to delete package");
    }
  });
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setModalOpen(true);
  };
  const handleAdd = () => {
    setEditingPackage(null);
    setModalOpen(true);
  };
  const activeCount = packages.filter((p) => p.status === "active").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Package Management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
            packages.length,
            " packages — ",
            activeCount,
            " active"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleAdd, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Add Package"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 3 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: Array.from({ length: 5 }, (_, j) => j).map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, `skel-cell-${j}`)) }, `skel-row-${i}`)) : packages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableCell,
        {
          colSpan: 5,
          className: "text-center py-12 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No packages found. Add your first package." })
          ]
        }
      ) }) : packages.map((pkg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: pkg.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium", children: [
          "₹",
          Number(pkg.price).toLocaleString("en-IN")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "truncate text-sm text-muted-foreground",
            title: pkg.courses,
            children: pkg.courses
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: pkg.status === "active" ? "default" : "secondary",
            className: pkg.status === "active" ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "",
            children: pkg.status === "active" ? "Active" : "Inactive"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: pkg.status === "active",
              onCheckedChange: () => toggleStatusMutation.mutate(pkg.id),
              disabled: toggleStatusMutation.isPending,
              title: pkg.status === "active" ? "Deactivate" : "Activate"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleEdit(pkg),
              className: "h-8 w-8",
              title: "Edit package",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setDeletePackageId(pkg.id),
              disabled: deletePackageMutation.isPending,
              className: "h-8 w-8 hover:bg-red-50 dark:hover:bg-red-950/30",
              title: "Delete package",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
            }
          )
        ] }) })
      ] }, pkg.id.toString())) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PackageModal,
      {
        open: modalOpen,
        onOpenChange: setModalOpen,
        package: editingPackage
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deletePackageId,
        onOpenChange: () => setDeletePackageId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Package?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete the package and may affect users who have purchased it." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: () => deletePackageId && deletePackageMutation.mutate(deletePackageId),
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: deletePackageMutation.isPending,
                children: deletePackageMutation.isPending ? "Deleting..." : "Delete Package"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  PackageManagement as default
};
