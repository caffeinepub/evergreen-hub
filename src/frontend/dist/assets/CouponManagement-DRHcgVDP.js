import { h as createLucideIcon, J as useActor, r as reactExports, j as jsxRuntimeExports, az as Tag, B as Button, ae as Plus, aA as CouponDiscountType, g as LoaderCircle, D as Badge, a2 as Trash2, au as Dialog, av as DialogContent, aw as DialogHeader, ax as DialogTitle, O as Label, R as Input, e as ue } from "./index-DtQIrmWF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DPHURWWx.js";
import { S as Switch } from "./switch-DVF0Zowa.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CBweH5kp.js";
import "./index-BadNxkev.js";
import "./check-D2G346SR.js";
import "./chevron-up-C0m3PyNj.js";
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
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
const defaultForm = {
  code: "",
  discountType: "percent",
  discountValue: ""
};
function CouponManagement() {
  const { actor, isFetching } = useActor();
  const [coupons, setCoupons] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editingCoupon, setEditingCoupon] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(defaultForm);
  const [saving, setSaving] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [togglingId, setTogglingId] = reactExports.useState(null);
  const fetchCoupons = async () => {
    if (!actor) return;
    try {
      setLoading(true);
      const data = await actor.getAllCoupons();
      setCoupons(data);
    } catch (_err) {
      ue.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (actor && !isFetching) fetchCoupons();
  }, [actor, isFetching]);
  const openCreate = () => {
    setEditingCoupon(null);
    setForm(defaultForm);
    setModalOpen(true);
  };
  const openEdit = (coupon) => {
    setEditingCoupon(coupon);
    setForm({
      code: coupon.code,
      discountType: coupon.discountType === CouponDiscountType.percent ? "percent" : "fixed",
      discountValue: coupon.discountValue.toString()
    });
    setModalOpen(true);
  };
  const handleSave = async () => {
    if (!actor) return;
    if (!form.code.trim()) {
      ue.error("Coupon code is required");
      return;
    }
    const val = Number(form.discountValue);
    if (Number.isNaN(val) || val <= 0) {
      ue.error("Invalid discount value");
      return;
    }
    if (form.discountType === "percent" && val > 100) {
      ue.error("Percent discount cannot exceed 100");
      return;
    }
    setSaving(true);
    try {
      const discountType = form.discountType === "percent" ? CouponDiscountType.percent : CouponDiscountType.fixed;
      const discountValue = BigInt(Math.round(val));
      if (editingCoupon) {
        await actor.updateCoupon(
          editingCoupon.id,
          form.code.toUpperCase().trim(),
          discountType,
          discountValue
        );
        ue.success("Coupon updated!");
      } else {
        await actor.createCoupon(
          form.code.toUpperCase().trim(),
          discountType,
          discountValue
        );
        ue.success("Coupon created!");
      }
      setModalOpen(false);
      await fetchCoupons();
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to save coupon");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (coupon) => {
    if (!actor) return;
    if (!confirm(`Delete coupon "${coupon.code}"?`)) return;
    setDeletingId(coupon.id);
    try {
      await actor.deleteCoupon(coupon.id);
      ue.success("Coupon deleted");
      await fetchCoupons();
    } catch {
      ue.error("Failed to delete coupon");
    } finally {
      setDeletingId(null);
    }
  };
  const handleToggle = async (coupon) => {
    if (!actor) return;
    setTogglingId(coupon.id);
    try {
      await actor.toggleCouponActive(coupon.id);
      ue.success(coupon.active ? "Coupon deactivated" : "Coupon activated");
      await fetchCoupons();
    } catch {
      ue.error("Failed to toggle coupon");
    } finally {
      setTogglingId(null);
    }
  };
  const formatDate = (ts) => new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen p-6",
      style: {
        background: "linear-gradient(135deg, #0a0a0a, #0d1b0a, #0a0a0a)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl flex items-center justify-center",
                style: { background: "linear-gradient(135deg, #10b981, #3b82f6)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-5 h-5 text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Coupon Management" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.4)" }, children: "Create and manage discount coupons" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: openCreate,
              "data-ocid": "coupons.open_modal_button",
              className: "text-white font-semibold",
              style: {
                background: "linear-gradient(135deg, #10b981, #3b82f6)",
                border: "none"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                " New Coupon"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [
          { label: "Total Coupons", value: coupons.length, color: "#10b981" },
          {
            label: "Active",
            value: coupons.filter((c) => c.active).length,
            color: "#22c55e"
          },
          {
            label: "Inactive",
            value: coupons.filter((c) => !c.active).length,
            color: "#f59e0b"
          },
          {
            label: "% Discounts",
            value: coupons.filter(
              (c) => c.discountType === CouponDiscountType.percent
            ).length,
            color: "#3b82f6"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "16px 20px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.45)" }, children: stat.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", style: { color: stat.color }, children: stat.value })
            ]
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              overflow: "hidden"
            },
            children: loading || isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-center py-20",
                "data-ocid": "coupons.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    LoaderCircle,
                    {
                      className: "w-6 h-6 animate-spin",
                      style: { color: "#10b981" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "ml-2 text-sm",
                      style: { color: "rgba(255,255,255,0.4)" },
                      children: "Loading coupons..."
                    }
                  )
                ]
              }
            ) : coupons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center justify-center py-20",
                "data-ocid": "coupons.empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Tag,
                    {
                      className: "w-12 h-12 mb-3",
                      style: { color: "rgba(16,185,129,0.3)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: "No coupons yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mt-1",
                      style: { color: "rgba(255,255,255,0.35)" },
                      children: "Create your first discount coupon"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: openCreate,
                      className: "mt-4",
                      style: {
                        background: "linear-gradient(135deg, #10b981, #3b82f6)",
                        border: "none",
                        color: "#fff"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                        " Create Coupon"
                      ]
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TableRow,
                {
                  style: { borderBottom: "1px solid rgba(255,255,255,0.06)" },
                  children: ["Code", "Type", "Value", "Status", "Created", "Actions"].map(
                    (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TableHead,
                      {
                        style: {
                          color: "rgba(255,255,255,0.45)",
                          fontSize: 12,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        },
                        children: h
                      },
                      h
                    )
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: coupons.map((coupon, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TableRow,
                {
                  "data-ocid": `coupons.row.${idx + 1}`,
                  style: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          background: "rgba(16,185,129,0.12)",
                          border: "1px solid rgba(16,185,129,0.25)",
                          borderRadius: 8,
                          padding: "3px 10px",
                          color: "#10b981",
                          fontWeight: 700,
                          fontSize: 13,
                          letterSpacing: "0.05em"
                        },
                        children: coupon.code
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        style: {
                          background: coupon.discountType === CouponDiscountType.percent ? "rgba(59,130,246,0.2)" : "rgba(16,185,129,0.2)",
                          color: coupon.discountType === CouponDiscountType.percent ? "#60a5fa" : "#34d399",
                          border: "none"
                        },
                        children: coupon.discountType === CouponDiscountType.percent ? "Percent %" : "Fixed ₹"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TableCell,
                      {
                        style: { color: "#fff", fontWeight: 700, fontSize: 15 },
                        children: coupon.discountType === CouponDiscountType.percent ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Switch,
                        {
                          checked: coupon.active,
                          onCheckedChange: () => handleToggle(coupon),
                          disabled: togglingId === coupon.id,
                          "data-ocid": `coupons.switch.${idx + 1}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          style: {
                            color: coupon.active ? "#22c55e" : "rgba(255,255,255,0.35)",
                            fontSize: 12
                          },
                          children: togglingId === coupon.id ? "..." : coupon.active ? "Active" : "Inactive"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TableCell,
                      {
                        style: { color: "rgba(255,255,255,0.45)", fontSize: 13 },
                        children: formatDate(coupon.createdAt)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          onClick: () => openEdit(coupon),
                          "data-ocid": `coupons.edit_button.${idx + 1}`,
                          style: { color: "#3b82f6" },
                          className: "hover:bg-blue-500/10",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          onClick: () => handleDelete(coupon),
                          disabled: deletingId === coupon.id,
                          "data-ocid": `coupons.delete_button.${idx + 1}`,
                          style: { color: "#ef4444" },
                          className: "hover:bg-red-500/10",
                          children: deletingId === coupon.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ] }) })
                  ]
                },
                coupon.id.toString()
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: modalOpen, onOpenChange: setModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            "data-ocid": "coupons.dialog",
            style: {
              background: "linear-gradient(135deg, #0a0a0a, #0d1b0a)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: 24,
              color: "#fff"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                DialogTitle,
                {
                  style: { color: "#fff", fontSize: 18, fontWeight: 700 },
                  children: editingCoupon ? "Edit Coupon" : "Create New Coupon"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { style: { color: "rgba(255,255,255,0.6)", fontSize: 13 }, children: "Coupon Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: form.code,
                      onChange: (e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() })),
                      placeholder: "e.g. SAVE20",
                      "data-ocid": "coupons.input",
                      className: "mt-1",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        color: "#fff",
                        letterSpacing: "0.1em",
                        fontWeight: 700
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { style: { color: "rgba(255,255,255,0.6)", fontSize: 13 }, children: "Discount Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.discountType,
                      onValueChange: (v) => setForm((p) => ({ ...p, discountType: v })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            "data-ocid": "coupons.select",
                            className: "mt-1",
                            style: {
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(16,185,129,0.3)",
                              color: "#fff"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          SelectContent,
                          {
                            style: {
                              background: "#0a0a0a",
                              border: "1px solid rgba(16,185,129,0.2)",
                              color: "#fff"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "percent", children: "Percentage (%) Off" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fixed", children: "Fixed Amount (₹) Off" })
                            ]
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { style: { color: "rgba(255,255,255,0.6)", fontSize: 13 }, children: [
                    "Discount Value ",
                    form.discountType === "percent" ? "(%)" : "(₹)"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "number",
                      min: "1",
                      max: form.discountType === "percent" ? 100 : void 0,
                      value: form.discountValue,
                      onChange: (e) => setForm((p) => ({ ...p, discountValue: e.target.value })),
                      placeholder: form.discountType === "percent" ? "e.g. 20" : "e.g. 100",
                      "data-ocid": "coupons.input",
                      className: "mt-1",
                      style: {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        color: "#fff"
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      onClick: () => setModalOpen(false),
                      "data-ocid": "coupons.cancel_button",
                      className: "flex-1",
                      style: {
                        borderColor: "rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.6)"
                      },
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      onClick: handleSave,
                      disabled: saving,
                      "data-ocid": "coupons.save_button",
                      className: "flex-1 text-white",
                      style: {
                        background: "linear-gradient(135deg, #10b981, #3b82f6)",
                        border: "none"
                      },
                      children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                        " Saving..."
                      ] }) : editingCoupon ? "Update Coupon" : "Create Coupon"
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  CouponManagement as default
};
