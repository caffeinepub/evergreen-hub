import { a as useAuth, u as useNavigate, Y as useGetLandingPages, $ as useDeleteLandingPage, r as reactExports, j as jsxRuntimeExports, n as Button, C as Card, f as CardHeader, h as CardTitle, i as CardDescription, k as CardContent, a2 as TrendingUp, e as ue } from "./index-SgGMw7jr.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CGOLYGLC.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-udYxbxbV.js";
import { C as Calendar } from "./calendar-MC89Xx42.js";
import { E as Eye } from "./eye-DoyuxFnA.js";
import { S as SquarePen } from "./square-pen-SUOQgN17.js";
function MyLandingPages() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const { data: landingPages, isLoading } = useGetLandingPages(
    (userProfile == null ? void 0 : userProfile.principal.toString()) || ""
  );
  const deleteLandingPage = useDeleteLandingPage();
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [selectedPageId, setSelectedPageId] = reactExports.useState(null);
  const handlePreview = (pageId) => {
    window.open(`/landing/${pageId}`, "_blank");
  };
  const handleEdit = (pageId) => {
    navigate({
      to: "/dashboard/landing-page-builder",
      search: { edit: pageId.toString() }
    });
  };
  const handleDeleteClick = (pageId) => {
    setSelectedPageId(pageId);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (!selectedPageId) return;
    try {
      await deleteLandingPage.mutateAsync(selectedPageId);
      ue.success("Landing page deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedPageId(null);
    } catch (error) {
      console.error("Delete error:", error);
      ue.error(error.message || "Failed to delete landing page");
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) / 1e6);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "My Landing Pages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Loading your landing pages..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "My Landing Pages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "View and manage all your created landing pages" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: () => navigate({ to: "/dashboard/landing-page-builder" }),
          className: "bg-yellow-500 hover:bg-yellow-600 text-black",
          children: "Create New Page"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-yellow-500", children: "Your Landing Pages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
          (landingPages == null ? void 0 : landingPages.length) || 0,
          " landing page",
          (landingPages == null ? void 0 : landingPages.length) !== 1 ? "s" : "",
          " created"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: !landingPages || landingPages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "You haven't created any landing pages yet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => navigate({ to: "/dashboard/landing-page-builder" }),
            className: "bg-green-600 hover:bg-green-700 text-white",
            children: "Create Your First Landing Page"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
            "Created"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
            "Visits"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: landingPages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: page.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", children: page.template }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: formatDate(page.createdAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
            page.visitCount.toString()
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handlePreview(page.id),
                className: "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 mr-1" }),
                  "Preview"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleEdit(page.id),
                className: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4 mr-1" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => handleDeleteClick(page.id),
                className: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, page.id.toString())) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you sure?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your landing page." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteConfirm,
            className: "bg-red-500 hover:bg-red-600",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  MyLandingPages as default
};
