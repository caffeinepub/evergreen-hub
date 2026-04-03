import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Loader2, Plus, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type CouponCode, CouponDiscountType } from "../../backend";
import { useActor } from "../../hooks/useActor";

interface CouponFormData {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: string;
}

const defaultForm: CouponFormData = {
  code: "",
  discountType: "percent",
  discountValue: "",
};

export default function CouponManagement() {
  const { actor, isFetching } = useActor();
  const [coupons, setCoupons] = useState<CouponCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponCode | null>(null);
  const [form, setForm] = useState<CouponFormData>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [togglingId, setTogglingId] = useState<bigint | null>(null);

  const fetchCoupons = async () => {
    if (!actor) return;
    try {
      setLoading(true);
      const data = await actor.getAllCoupons();
      setCoupons(data);
    } catch (_err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchCoupons is stable
  useEffect(() => {
    if (actor && !isFetching) fetchCoupons();
  }, [actor, isFetching]);

  const openCreate = () => {
    setEditingCoupon(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (coupon: CouponCode) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      discountType:
        coupon.discountType === CouponDiscountType.percent
          ? "percent"
          : "fixed",
      discountValue: coupon.discountValue.toString(),
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!actor) return;
    if (!form.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }
    const val = Number(form.discountValue);
    if (Number.isNaN(val) || val <= 0) {
      toast.error("Invalid discount value");
      return;
    }
    if (form.discountType === "percent" && val > 100) {
      toast.error("Percent discount cannot exceed 100");
      return;
    }

    setSaving(true);
    try {
      const discountType =
        form.discountType === "percent"
          ? CouponDiscountType.percent
          : CouponDiscountType.fixed;
      const discountValue = BigInt(Math.round(val));
      if (editingCoupon) {
        await actor.updateCoupon(
          editingCoupon.id,
          form.code.toUpperCase().trim(),
          discountType,
          discountValue,
        );
        toast.success("Coupon updated!");
      } else {
        await actor.createCoupon(
          form.code.toUpperCase().trim(),
          discountType,
          discountValue,
        );
        toast.success("Coupon created!");
      }
      setModalOpen(false);
      await fetchCoupons();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save coupon");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (coupon: CouponCode) => {
    if (!actor) return;
    if (!confirm(`Delete coupon "${coupon.code}"?`)) return;
    setDeletingId(coupon.id);
    try {
      await actor.deleteCoupon(coupon.id);
      toast.success("Coupon deleted");
      await fetchCoupons();
    } catch {
      toast.error("Failed to delete coupon");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (coupon: CouponCode) => {
    if (!actor) return;
    setTogglingId(coupon.id);
    try {
      await actor.toggleCouponActive(coupon.id);
      toast.success(coupon.active ? "Coupon deactivated" : "Coupon activated");
      await fetchCoupons();
    } catch {
      toast.error("Failed to toggle coupon");
    } finally {
      setTogglingId(null);
    }
  };

  const formatDate = (ts: bigint) =>
    new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(135deg, #0a0a0a, #0d1b0a, #0a0a0a)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)" }}
          >
            <Tag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Coupon Management</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Create and manage discount coupons
            </p>
          </div>
        </div>
        <Button
          onClick={openCreate}
          data-ocid="coupons.open_modal_button"
          className="text-white font-semibold"
          style={{
            background: "linear-gradient(135deg, #10b981, #3b82f6)",
            border: "none",
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> New Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Coupons", value: coupons.length, color: "#10b981" },
          {
            label: "Active",
            value: coupons.filter((c) => c.active).length,
            color: "#22c55e",
          },
          {
            label: "Inactive",
            value: coupons.filter((c) => !c.active).length,
            color: "#f59e0b",
          },
          {
            label: "% Discounts",
            value: coupons.filter(
              (c) => c.discountType === CouponDiscountType.percent,
            ).length,
            color: "#3b82f6",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "16px 20px",
            }}
          >
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {stat.label}
            </p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        {loading || isFetching ? (
          <div
            className="flex items-center justify-center py-20"
            data-ocid="coupons.loading_state"
          >
            <Loader2
              className="w-6 h-6 animate-spin"
              style={{ color: "#10b981" }}
            />
            <span
              className="ml-2 text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Loading coupons...
            </span>
          </div>
        ) : coupons.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20"
            data-ocid="coupons.empty_state"
          >
            <Tag
              className="w-12 h-12 mb-3"
              style={{ color: "rgba(16,185,129,0.3)" }}
            />
            <p className="text-white font-semibold">No coupons yet</p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Create your first discount coupon
            </p>
            <Button
              onClick={openCreate}
              className="mt-4"
              style={{
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                border: "none",
                color: "#fff",
              }}
            >
              <Plus className="w-4 h-4 mr-1" /> Create Coupon
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {["Code", "Type", "Value", "Status", "Created", "Actions"].map(
                  (h) => (
                    <TableHead
                      key={h}
                      style={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {h}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon, idx) => (
                <TableRow
                  key={coupon.id.toString()}
                  data-ocid={`coupons.row.${idx + 1}`}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <TableCell>
                    <span
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        borderRadius: 8,
                        padding: "3px 10px",
                        color: "#10b981",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {coupon.code}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        background:
                          coupon.discountType === CouponDiscountType.percent
                            ? "rgba(59,130,246,0.2)"
                            : "rgba(16,185,129,0.2)",
                        color:
                          coupon.discountType === CouponDiscountType.percent
                            ? "#60a5fa"
                            : "#34d399",
                        border: "none",
                      }}
                    >
                      {coupon.discountType === CouponDiscountType.percent
                        ? "Percent %"
                        : "Fixed ₹"}
                    </Badge>
                  </TableCell>
                  <TableCell
                    style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}
                  >
                    {coupon.discountType === CouponDiscountType.percent
                      ? `${coupon.discountValue}%`
                      : `₹${coupon.discountValue}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={coupon.active}
                        onCheckedChange={() => handleToggle(coupon)}
                        disabled={togglingId === coupon.id}
                        data-ocid={`coupons.switch.${idx + 1}`}
                      />
                      <span
                        style={{
                          color: coupon.active
                            ? "#22c55e"
                            : "rgba(255,255,255,0.35)",
                          fontSize: 12,
                        }}
                      >
                        {togglingId === coupon.id
                          ? "..."
                          : coupon.active
                            ? "Active"
                            : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}
                  >
                    {formatDate(coupon.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEdit(coupon)}
                        data-ocid={`coupons.edit_button.${idx + 1}`}
                        style={{ color: "#3b82f6" }}
                        className="hover:bg-blue-500/10"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(coupon)}
                        disabled={deletingId === coupon.id}
                        data-ocid={`coupons.delete_button.${idx + 1}`}
                        style={{ color: "#ef4444" }}
                        className="hover:bg-red-500/10"
                      >
                        {deletingId === coupon.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          data-ocid="coupons.dialog"
          style={{
            background: "linear-gradient(135deg, #0a0a0a, #0d1b0a)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: 24,
            color: "#fff",
          }}
        >
          <DialogHeader>
            <DialogTitle
              style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}
            >
              {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Coupon Code
              </Label>
              <Input
                value={form.code}
                onChange={(e) =>
                  setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))
                }
                placeholder="e.g. SAVE20"
                data-ocid="coupons.input"
                className="mt-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#fff",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              />
            </div>

            <div>
              <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Discount Type
              </Label>
              <Select
                value={form.discountType}
                onValueChange={(v: "percent" | "fixed") =>
                  setForm((p) => ({ ...p, discountType: v }))
                }
              >
                <SelectTrigger
                  data-ocid="coupons.select"
                  className="mt-1"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    color: "#fff",
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(16,185,129,0.2)",
                    color: "#fff",
                  }}
                >
                  <SelectItem value="percent">Percentage (%) Off</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (₹) Off</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                Discount Value {form.discountType === "percent" ? "(%)" : "(₹)"}
              </Label>
              <Input
                type="number"
                min="1"
                max={form.discountType === "percent" ? 100 : undefined}
                value={form.discountValue}
                onChange={(e) =>
                  setForm((p) => ({ ...p, discountValue: e.target.value }))
                }
                placeholder={
                  form.discountType === "percent" ? "e.g. 20" : "e.g. 100"
                }
                data-ocid="coupons.input"
                className="mt-1"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#fff",
                }}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setModalOpen(false)}
                data-ocid="coupons.cancel_button"
                className="flex-1"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                data-ocid="coupons.save_button"
                className="flex-1 text-white"
                style={{
                  background: "linear-gradient(135deg, #10b981, #3b82f6)",
                  border: "none",
                }}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : editingCoupon ? (
                  "Update Coupon"
                ) : (
                  "Create Coupon"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
