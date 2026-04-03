import { J as useActor, r as reactExports, j as jsxRuntimeExports, ad as Image, B as Button, g as LoaderCircle, Q as Upload, ae as Plus, a2 as Trash2, e as ue, N as ExternalBlob } from "./index-DtQIrmWF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DPHURWWx.js";
import "./index-BadNxkev.js";
import "./check-D2G346SR.js";
import "./chevron-up-C0m3PyNj.js";
const SERVICE_CATEGORIES = [
  { value: "web-design", label: "Web Design", emoji: "🌐" },
  { value: "video-editing", label: "Video Editing", emoji: "🎬" },
  { value: "photo-editing", label: "Photo Editing", emoji: "📸" },
  { value: "thumbnail-design", label: "Thumbnail Design", emoji: "🖼️" },
  { value: "ads-campaign", label: "Ads Campaign", emoji: "📢" }
];
function ServiceImageManagement() {
  const { actor, isFetching } = useActor();
  const [selectedCategory, setSelectedCategory] = reactExports.useState("web-design");
  const [images, setImages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [uploading, setUploading] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const fileRef = reactExports.useRef(null);
  const fetchImages = async (category) => {
    if (!actor) return;
    setLoading(true);
    try {
      const data = await actor.getServiceImages(category);
      setImages(data);
    } catch {
      ue.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (actor && !isFetching) fetchImages(selectedCategory);
  }, [actor, isFetching, selectedCategory]);
  const handleUpload = async (e) => {
    var _a;
    if (!actor || !((_a = e.target.files) == null ? void 0 : _a.length)) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      await actor.addServiceImage(selectedCategory, blob);
      ue.success("Image uploaded!");
      await fetchImages(selectedCategory);
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  const handleDelete = async (image) => {
    if (!actor) return;
    if (!confirm("Delete this image?")) return;
    setDeletingId(image.id);
    try {
      await actor.deleteServiceImage(image.id);
      ue.success("Image deleted");
      setImages((prev) => prev.filter((img) => img.id !== image.id));
    } catch {
      ue.error("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };
  const currentCategory = SERVICE_CATEGORIES.find(
    (c) => c.value === selectedCategory
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen p-6",
      style: {
        background: "linear-gradient(135deg, #0a0a0a, #0d1b0a, #0a0a0a)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center",
              style: { background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: "Service Image Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "rgba(255,255,255,0.4)" }, children: "Upload and manage images for each service category" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: 24,
              marginBottom: 24
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-start sm:items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-semibold mb-2",
                    style: { color: "rgba(255,255,255,0.6)" },
                    children: "Select Service Category"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: selectedCategory,
                    onValueChange: setSelectedCategory,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          "data-ocid": "service_images.select",
                          style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            color: "#fff",
                            maxWidth: 280
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectContent,
                        {
                          style: {
                            background: "#0a0a0a",
                            border: "1px solid rgba(59,130,246,0.2)",
                            color: "#fff"
                          },
                          children: SERVICE_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: cat.value, children: [
                            cat.emoji,
                            " ",
                            cat.label
                          ] }, cat.value))
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: fileRef,
                    type: "file",
                    accept: "image/*",
                    onChange: handleUpload,
                    style: { display: "none" },
                    id: "service-image-upload"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => {
                      var _a;
                      return (_a = fileRef.current) == null ? void 0 : _a.click();
                    },
                    disabled: uploading || isFetching,
                    "data-ocid": "service_images.upload_button",
                    className: "text-white",
                    style: {
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      border: "none"
                    },
                    children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                      " Uploading..."
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                      " Upload Image"
                    ] })
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: 24
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: currentCategory == null ? void 0 : currentCategory.emoji }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-white", children: [
                  currentCategory == null ? void 0 : currentCategory.label,
                  " Images"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "rgba(59,130,246,0.15)",
                      border: "1px solid rgba(59,130,246,0.3)",
                      borderRadius: 999,
                      padding: "2px 10px",
                      color: "#60a5fa",
                      fontSize: 12,
                      fontWeight: 700
                    },
                    children: images.length
                  }
                )
              ] }),
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-center py-16",
                  "data-ocid": "service_images.loading_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LoaderCircle,
                      {
                        className: "w-6 h-6 animate-spin",
                        style: { color: "#3b82f6" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "ml-2 text-sm",
                        style: { color: "rgba(255,255,255,0.4)" },
                        children: "Loading images..."
                      }
                    )
                  ]
                }
              ) : images.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-2xl cursor-pointer hover:border-blue-500 transition-colors w-full",
                  style: { borderColor: "rgba(255,255,255,0.12)" },
                  onClick: () => {
                    var _a;
                    return (_a = fileRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "service_images.dropzone",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          width: 64,
                          height: 64,
                          borderRadius: 16,
                          marginBottom: 16,
                          background: "rgba(59,130,246,0.1)",
                          border: "2px solid rgba(59,130,246,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Plus,
                          {
                            className: "w-7 h-7",
                            style: { color: "rgba(59,130,246,0.6)" }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "font-semibold",
                        style: { color: "rgba(255,255,255,0.5)" },
                        children: [
                          "No images for ",
                          currentCategory == null ? void 0 : currentCategory.label
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm mt-1",
                        style: { color: "rgba(255,255,255,0.3)" },
                        children: "Click to upload the first image"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: [
                images.map((image, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `service_images.item.${idx + 1}`,
                    className: "group relative rounded-2xl overflow-hidden",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      aspectRatio: "1"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: image.imageBlob.getDirectURL(),
                          alt: `Service ${idx + 1}`,
                          className: "w-full h-full object-cover",
                          onError: (e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23111'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23555' font-size='12'%3EImage%3C/text%3E%3C/svg%3E";
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                          style: { background: "rgba(0,0,0,0.6)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Button,
                            {
                              size: "sm",
                              variant: "ghost",
                              onClick: () => handleDelete(image),
                              disabled: deletingId === image.id,
                              "data-ocid": `service_images.delete_button.${idx + 1}`,
                              style: {
                                color: "#ef4444",
                                background: "rgba(239,68,68,0.1)"
                              },
                              className: "hover:bg-red-500/20",
                              children: deletingId === image.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: 8,
                            left: 8,
                            background: "rgba(0,0,0,0.6)",
                            borderRadius: 6,
                            padding: "2px 7px",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 11,
                            fontWeight: 600
                          },
                          children: [
                            "#",
                            idx + 1
                          ]
                        }
                      )
                    ]
                  },
                  image.id.toString()
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex flex-col items-center justify-center rounded-2xl cursor-pointer hover:border-blue-500 transition-colors",
                    style: {
                      background: "rgba(59,130,246,0.05)",
                      border: "2px dashed rgba(59,130,246,0.2)",
                      aspectRatio: "1"
                    },
                    onClick: () => {
                      var _a;
                      return (_a = fileRef.current) == null ? void 0 : _a.click();
                    },
                    "data-ocid": "service_images.dropzone",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Plus,
                        {
                          className: "w-8 h-8 mb-2",
                          style: { color: "rgba(59,130,246,0.5)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-center",
                          style: { color: "rgba(255,255,255,0.3)" },
                          children: "Add More"
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  ServiceImageManagement as default
};
