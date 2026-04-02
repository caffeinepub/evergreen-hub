import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../../hooks/useActor";

export default function UserManagement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteUserId, setDeleteUserId] = useState<Principal | null>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllUsers();
    },
    enabled: !!actor,
  });

  const toggleBlockMutation = useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor) throw new Error("Actor not available");
      return actor.toggleUserBlock(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("User status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update user status");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: Principal) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("User dismissed successfully");
      setDeleteUserId(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to dismiss user");
    },
  });

  // Filter by name OR phone number
  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      user.name.toLowerCase().includes(q) ||
      user.phone.toLowerCase().includes(q)
    );
  });

  const blockedCount = users.filter((u) => u.blocked).length;

  return (
    <div
      className="space-y-6 p-4 sm:p-6"
      style={{ minHeight: "100vh", background: "#f9fafb" }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="p-2.5 rounded-xl shrink-0"
          style={{ background: "linear-gradient(135deg, #16a34a, #eab308)" }}
        >
          <Users className="h-5 w-5 text-black" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all registered users
          </p>
        </div>
      </div>

      {/* Count Badges */}
      <div className="flex flex-wrap gap-3">
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm"
          style={{
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            border: "1px solid #bbf7d0",
            color: "#15803d",
          }}
          data-ocid="users.panel"
        >
          <span className="text-lg font-extrabold">{users.length}</span>
          Total Users
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm"
          style={{
            background: "linear-gradient(135deg, #fef2f2, #fee2e2)",
            border: "1px solid #fecaca",
            color: "#b91c1c",
          }}
        >
          <span className="text-lg font-extrabold">{blockedCount}</span>
          Blocked
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm"
          style={{
            background: "linear-gradient(135deg, #fefce8, #fef9c3)",
            border: "1px solid #fde68a",
            color: "#a16207",
          }}
        >
          <span className="text-lg font-extrabold">
            {users.length - blockedCount}
          </span>
          Active
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-green-200 focus:border-green-400"
            data-ocid="users.search_input"
          />
        </div>
        {searchQuery && (
          <span className="text-sm text-gray-500">
            {filteredUsers.length} result{filteredUsers.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: "#d1fae5" }}
      >
        <div
          className="px-4 py-3"
          style={{ background: "linear-gradient(90deg, #0a0a0a, #064e3b)" }}
        >
          <p className="text-sm font-semibold text-white">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}{" "}
            found
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-green-50">
              <TableHead className="font-bold text-xs">Photo</TableHead>
              <TableHead className="font-bold text-xs">Name</TableHead>
              <TableHead className="font-bold text-xs">Phone</TableHead>
              <TableHead className="font-bold text-xs">Email</TableHead>
              <TableHead className="font-bold text-xs">Role</TableHead>
              <TableHead className="font-bold text-xs">Status</TableHead>
              <TableHead className="font-bold text-xs">Joined</TableHead>
              <TableHead className="font-bold text-xs text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }, (_, i) => i).map((i) => (
                <TableRow key={`skel-row-${i}`}>
                  {Array.from({ length: 8 }, (_, j) => j).map((j) => (
                    <TableCell key={`skel-cell-${j}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-12 text-gray-400"
                  data-ocid="users.empty_state"
                >
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>
                    {searchQuery
                      ? "No users match your search"
                      : "No users found"}
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user, idx) => (
                <TableRow
                  key={user.principal.toString()}
                  data-ocid={`users.row.${idx + 1}`}
                  className={`transition-colors ${
                    user.blocked
                      ? "opacity-60 bg-red-50/40"
                      : "hover:bg-green-50/40"
                  }`}
                >
                  {/* Photo */}
                  <TableCell>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #16a34a, #eab308)",
                      }}
                    >
                      {(user as any).profilePhotoUrl ? (
                        <img
                          src={(user as any).profilePhotoUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {user.name}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-600">
                    {user.phone || "—"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.blocked ? (
                      <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs">
                        Blocked
                      </Badge>
                    ) : (
                      <Badge
                        className="text-xs"
                        style={{
                          background: "#dcfce7",
                          color: "#15803d",
                          border: "1px solid #bbf7d0",
                        }}
                      >
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">
                    {new Date(
                      Number(user.createdAt) / 1_000_000,
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Block/Unblock Button */}
                      <Button
                        onClick={() =>
                          toggleBlockMutation.mutate(user.principal)
                        }
                        disabled={toggleBlockMutation.isPending}
                        className="h-8 text-xs font-bold px-3 rounded-lg transition-all"
                        style={{
                          background: user.blocked
                            ? "linear-gradient(135deg, #16a34a, #15803d)"
                            : "linear-gradient(135deg, #ef4444, #dc2626)",
                          color: "white",
                          border: "none",
                          minWidth: 72,
                        }}
                        data-ocid={`users.toggle.${idx + 1}`}
                      >
                        {user.blocked ? "Unblock" : "Block"}
                      </Button>
                      {/* Dismiss Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteUserId(user.principal)}
                        disabled={deleteUserMutation.isPending}
                        className="h-8 w-8"
                        style={{
                          background: "#fef2f2",
                          color: "#dc2626",
                          border: "1px solid #fecaca",
                        }}
                        title="Dismiss user"
                        data-ocid={`users.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!deleteUserId}
        onOpenChange={() => setDeleteUserId(null)}
      >
        <AlertDialogContent data-ocid="users.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Dismiss User?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and all associated data including payment history and
              referrals.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="users.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteUserId && deleteUserMutation.mutate(deleteUserId)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteUserMutation.isPending}
              data-ocid="users.confirm_button"
            >
              {deleteUserMutation.isPending ? "Dismissing..." : "Dismiss User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
