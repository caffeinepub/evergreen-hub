import { J as useActor, _ as useQueryClient, r as reactExports, $ as useQuery, a0 as useMutation, j as jsxRuntimeExports, k as Users, a1 as Search, R as Input, Z as Skeleton, D as Badge, B as Button, a2 as Trash2, e as ue } from "./index-DtQIrmWF.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-MJc2Uaqw.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CBweH5kp.js";
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
      ue.success("User dismissed successfully");
      setDeleteUserId(null);
    },
    onError: (error) => {
      ue.error(error.message || "Failed to dismiss user");
    }
  });
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return user.name.toLowerCase().includes(q) || user.phone.toLowerCase().includes(q);
  });
  const blockedCount = users.filter((u) => u.blocked).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-6 p-4 sm:p-6",
      style: { minHeight: "100vh", background: "#f9fafb" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-2.5 rounded-xl shrink-0",
              style: { background: "linear-gradient(135deg, #16a34a, #eab308)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-black" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "User Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Manage all registered users" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm",
              style: {
                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                border: "1px solid #bbf7d0",
                color: "#15803d"
              },
              "data-ocid": "users.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-extrabold", children: users.length }),
                "Total Users"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm",
              style: {
                background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
                border: "1px solid #fecaca",
                color: "#b91c1c"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-extrabold", children: blockedCount }),
                "Blocked"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm",
              style: {
                background: "linear-gradient(135deg, #fefce8, #fef9c3)",
                border: "1px solid #fde68a",
                color: "#a16207"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-extrabold", children: users.length - blockedCount }),
                "Active"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search by name or phone...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-9 border-green-200 focus:border-green-400",
                "data-ocid": "users.search_input"
              }
            )
          ] }),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-500", children: [
            filteredUsers.length,
            " result",
            filteredUsers.length !== 1 ? "s" : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl overflow-hidden border",
            style: { borderColor: "#d1fae5" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-4 py-3",
                  style: { background: "linear-gradient(90deg, #0a0a0a, #064e3b)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-white", children: [
                    filteredUsers.length,
                    " user",
                    filteredUsers.length !== 1 ? "s" : "",
                    " ",
                    "found"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-green-50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Photo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs", children: "Joined" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-bold text-xs text-right", children: "Actions" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 5 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: Array.from({ length: 8 }, (_, j) => j).map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, `skel-cell-${j}`)) }, `skel-row-${i}`)) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TableCell,
                  {
                    colSpan: 8,
                    className: "text-center py-12 text-gray-400",
                    "data-ocid": "users.empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 mx-auto mb-2 opacity-30" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: searchQuery ? "No users match your search" : "No users found" })
                    ]
                  }
                ) }) : filteredUsers.map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TableRow,
                  {
                    "data-ocid": `users.row.${idx + 1}`,
                    className: `transition-colors ${user.blocked ? "opacity-60 bg-red-50/40" : "hover:bg-green-50/40"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0",
                          style: {
                            background: "linear-gradient(135deg, #16a34a, #eab308)"
                          },
                          children: user.profilePhotoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: user.profilePhotoUrl,
                              alt: user.name,
                              className: "w-full h-full object-cover"
                            }
                          ) : user.name.charAt(0).toUpperCase()
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-gray-900", children: user.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-sm text-gray-600", children: user.phone || "—" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-sm text-gray-500", children: user.email }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: user.role === "admin" ? "default" : "secondary",
                          children: user.role
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: user.blocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-700 border border-red-200 text-xs", children: "Blocked" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "text-xs",
                          style: {
                            background: "#dcfce7",
                            color: "#15803d",
                            border: "1px solid #bbf7d0"
                          },
                          children: "Active"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-gray-500", children: new Date(
                        Number(user.createdAt) / 1e6
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            onClick: () => toggleBlockMutation.mutate(user.principal),
                            disabled: toggleBlockMutation.isPending,
                            className: "h-8 text-xs font-bold px-3 rounded-lg transition-all",
                            style: {
                              background: user.blocked ? "linear-gradient(135deg, #16a34a, #15803d)" : "linear-gradient(135deg, #ef4444, #dc2626)",
                              color: "white",
                              border: "none",
                              minWidth: 72
                            },
                            "data-ocid": `users.toggle.${idx + 1}`,
                            children: user.blocked ? "Unblock" : "Block"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            onClick: () => setDeleteUserId(user.principal),
                            disabled: deleteUserMutation.isPending,
                            className: "h-8 w-8",
                            style: {
                              background: "#fef2f2",
                              color: "#dc2626",
                              border: "1px solid #fecaca"
                            },
                            title: "Dismiss user",
                            "data-ocid": `users.delete_button.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                          }
                        )
                      ] }) })
                    ]
                  },
                  user.principal.toString()
                )) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!deleteUserId,
            onOpenChange: () => setDeleteUserId(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "users.dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Dismiss User?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. This will permanently delete the user account and all associated data including payment history and referrals." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "users.cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: () => deleteUserId && deleteUserMutation.mutate(deleteUserId),
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    disabled: deleteUserMutation.isPending,
                    "data-ocid": "users.confirm_button",
                    children: deleteUserMutation.isPending ? "Dismissing..." : "Dismiss User"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  UserManagement as default
};
