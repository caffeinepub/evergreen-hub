import { w as useActor, Z as useQueryClient, r as reactExports, x as useQuery, _ as useMutation, j as jsxRuntimeExports, $ as Users, a0 as Search, K as Input, a1 as Skeleton, B as Button, e as ue } from "./index-CTmzmyZG.js";
import { T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-f0ncv2qQ.js";
import { B as Badge } from "./badge-BEREiQZv.js";
import { S as Switch } from "./switch-GtJ3SsVn.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Cd9XGO2f.js";
import "./index-8EC1X83a.js";
function UserManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [deleteUserId, setDeleteUserId] = reactExports.useState(null);
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllUsers();
    },
    enabled: !!actor
  });
  const toggleBlockMutation = useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.toggleUserBlock(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      ue.success("User status updated successfully");
    },
    onError: (error) => {
      ue.error(error.message || "Failed to update user status");
    }
  });
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      ue.success("User deleted successfully");
      setDeleteUserId(null);
    },
    onError: (error) => {
      ue.error(error.message || "Failed to delete user");
    }
  });
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return user.name.toLowerCase().includes(q) || user.phone.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "User Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
          "Manage all registered users — ",
          users.length,
          " total"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name or phone...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
        filteredUsers.length,
        " result",
        filteredUsers.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Registered" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 5 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: Array.from({ length: 7 }, (_, j) => j).map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, `skel-cell-${j}`)) }, `skel-row-${i}`)) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableCell,
        {
          colSpan: 7,
          className: "text-center py-12 text-muted-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: searchQuery ? "No users match your search" : "No users found" })
          ]
        }
      ) }) : filteredUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          className: user.blocked ? "opacity-60 bg-muted/30" : "",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: user.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm", children: user.phone || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: user.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: user.role === "admin" ? "default" : "secondary",
                children: user.role
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: user.blocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Blocked" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500 hover:bg-emerald-600 text-white", children: "Active" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-muted-foreground", children: new Date(
              Number(user.createdAt) / 1e6
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: !user.blocked,
                  onCheckedChange: () => toggleBlockMutation.mutate(user.principal),
                  disabled: toggleBlockMutation.isPending,
                  title: user.blocked ? "Unblock user" : "Block user"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: () => setDeleteUserId(user.principal),
                  disabled: deleteUserMutation.isPending,
                  className: "h-8 w-8 hover:bg-red-50 dark:hover:bg-red-950/30",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" })
                }
              )
            ] }) })
          ]
        },
        user.principal.toString()
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteUserId,
        onOpenChange: () => setDeleteUserId(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete User?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete the user account and all associated data including payment history and referrals." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: () => deleteUserId && deleteUserMutation.mutate(deleteUserId),
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                disabled: deleteUserMutation.isPending,
                children: deleteUserMutation.isPending ? "Deleting..." : "Delete User"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  UserManagement as default
};
