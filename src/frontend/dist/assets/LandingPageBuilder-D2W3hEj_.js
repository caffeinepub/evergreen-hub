import { a as useAuth, r as reactExports, Y as useGetLandingPages, Z as useCreateLandingPage, _ as useUpdateLandingPage, $ as useDeleteLandingPage, j as jsxRuntimeExports, n as Button, C as Card, f as CardHeader, h as CardTitle, a0 as FileText, i as CardDescription, k as CardContent, R as Label, V as Input, a1 as Textarea, e as ue } from "./index-SgGMw7jr.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CGOLYGLC.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-ChQiUba8.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-udYxbxbV.js";
import { P as Plus } from "./plus-mTg49GkK.js";
import { E as Eye } from "./eye-DoyuxFnA.js";
import { S as SquarePen } from "./square-pen-SUOQgN17.js";
import "./index-V5vRnwU8.js";
import "./check-DENotwVp.js";
function LandingPageBuilder() {
  const { userProfile } = useAuth();
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const [editingPage, setEditingPage] = reactExports.useState(null);
  const [deletePageId, setDeletePageId] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [template, setTemplate] = reactExports.useState("basic");
  const { data: pages = [], isLoading } = useGetLandingPages(
    (userProfile == null ? void 0 : userProfile.principal.toString()) || ""
  );
  const createPageMutation = useCreateLandingPage();
  const updatePageMutation = useUpdateLandingPage();
  const deletePageMutation = useDeleteLandingPage();
  const resetForm = () => {
    setTitle("");
    setContent("");
    setTemplate("basic");
    setIsCreating(false);
    setEditingPage(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      ue.error("Please fill in all fields");
      return;
    }
    if (editingPage) {
      updatePageMutation.mutate(
        {
          pageId: editingPage.id,
          title: title.trim(),
          content: content.trim()
        },
        {
          onSuccess: () => {
            ue.success("Landing page updated successfully!");
            resetForm();
          },
          onError: (error) => {
            ue.error(error.message || "Failed to update landing page");
          }
        }
      );
    } else {
      createPageMutation.mutate(
        { title: title.trim(), content: content.trim(), template },
        {
          onSuccess: () => {
            ue.success("Landing page created successfully!");
            resetForm();
          },
          onError: (error) => {
            ue.error(error.message || "Failed to create landing page");
          }
        }
      );
    }
  };
  const handleEdit = (page) => {
    setEditingPage(page);
    setTitle(page.title);
    setContent(page.content);
    setTemplate(page.template);
    setIsCreating(true);
  };
  const handleDelete = (pageId) => {
    setDeletePageId(pageId);
  };
  const confirmDelete = () => {
    if (deletePageId) {
      deletePageMutation.mutate(deletePageId, {
        onSuccess: () => {
          ue.success("Landing page deleted successfully!");
          setDeletePageId(null);
        },
        onError: (error) => {
          ue.error(error.message || "Failed to delete landing page");
        }
      });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading landing pages..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Landing Page Builder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Create and manage your custom landing pages" })
      ] }),
      !isCreating && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsCreating(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        "New Page"
      ] })
    ] }),
    isCreating && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5 text-emerald-500" }),
          editingPage ? "Edit Landing Page" : "Create New Landing Page"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: editingPage ? "Update your landing page details" : "Design a custom landing page for your campaigns" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Page Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "title",
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Enter page title",
              required: true,
              disabled: createPageMutation.isPending || updatePageMutation.isPending
            }
          )
        ] }),
        !editingPage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "template", children: "Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: template,
              onValueChange: setTemplate,
              disabled: createPageMutation.isPending,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "template", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a template" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "basic", children: "Basic" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "modern", children: "Modern" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "minimal", children: "Minimal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "professional", children: "Professional" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "content", children: "Page Content *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "content",
              value: content,
              onChange: (e) => setContent(e.target.value),
              placeholder: "Enter your page content here...",
              rows: 8,
              required: true,
              disabled: createPageMutation.isPending || updatePageMutation.isPending
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: createPageMutation.isPending || updatePageMutation.isPending,
              className: "bg-emerald-500 hover:bg-emerald-600",
              children: createPageMutation.isPending || updatePageMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" }),
                editingPage ? "Updating..." : "Creating..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingPage ? "Update Page" : "Create Page" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: resetForm,
              disabled: createPageMutation.isPending || updatePageMutation.isPending,
              children: "Cancel"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your Landing Pages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Manage all your created landing pages" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: pages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "No landing pages created yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setIsCreating(true), variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Create Your First Page"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Total Visits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: pages.map((page) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: page.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", children: page.template }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4 text-emerald-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-emerald-600 dark:text-emerald-400", children: Number(page.visitCount).toLocaleString() })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: new Date(
            Number(page.createdAt) / 1e6
          ).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: new Date(
            Number(page.updatedAt) / 1e6
          ).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleEdit(page),
                disabled: createPageMutation.isPending || updatePageMutation.isPending || deletePageMutation.isPending,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => handleDelete(page.id),
                disabled: createPageMutation.isPending || updatePageMutation.isPending || deletePageMutation.isPending,
                className: "text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }) })
        ] }, page.id.toString())) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deletePageId !== null,
        onOpenChange: () => setDeletePageId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you sure?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete your landing page." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deletePageMutation.isPending, children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: confirmDelete,
                disabled: deletePageMutation.isPending,
                className: "bg-red-600 hover:bg-red-700",
                children: deletePageMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" }),
                  "Deleting..."
                ] }) : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  LandingPageBuilder as default
};
