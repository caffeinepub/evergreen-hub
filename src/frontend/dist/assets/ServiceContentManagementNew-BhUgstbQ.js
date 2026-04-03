import { r as reactExports, aP as useDirection, aB as useControllableState, j as jsxRuntimeExports, aj as createContextScope, aQ as useId, aC as Primitive, aR as createRovingFocusGroupScope, aS as Root, aT as Item, al as composeEventHandlers, aE as Presence, ac as cn, aU as Layers, O as Label, R as Input, D as Badge, aN as Textarea, ad as Image, V as Video, B as Button, e as ue, aV as Megaphone, G as Globe } from "./index-DtQIrmWF.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DVWv_6Rq.js";
import { S as Switch } from "./switch-DVF0Zowa.js";
import { S as Save } from "./save-kdxPJJEs.js";
import "./index-BadNxkev.js";
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const DEFAULT_SERVICES = [
  {
    serviceId: "web-design",
    sectionTitle: "Professional Web Design Services",
    plans: [
      {
        planId: "basic",
        planName: "Basic Package",
        price: 2999,
        originalPrice: 5998,
        description: "Perfect for beginners and small businesses starting online",
        features: "1 Simple Landing Page\n1-2 Page Website\nMobile-Friendly\nContact Form\nWhatsApp/Call Button\nGoogle Map Pin\n2-3 Days Delivery\n15 Days Support",
        imageUrl: "",
        videoUrl: "",
        active: true
      },
      {
        planId: "gold",
        planName: "Gold Package",
        price: 2999,
        originalPrice: 5998,
        description: "Complete website for growing businesses",
        features: "5-7 Page Professional Website\nResponsive Design\nSEO Optimized\nContact Form\nWhatsApp Integration\n7-10 Days Delivery\n30 Days Support",
        imageUrl: "",
        videoUrl: "",
        active: true
      }
    ]
  },
  {
    serviceId: "video-editing",
    sectionTitle: "Professional Video Editing Charges",
    plans: [
      {
        planId: "shorts",
        planName: "Shorts/Reels (up to 60 sec)",
        price: 799,
        originalPrice: 1599,
        description: "Perfect for Instagram Reels and YouTube Shorts",
        features: "Up to 60 seconds\nColor Grading\nText Overlays\nBackground Music\nFast Delivery 24hr",
        imageUrl: "",
        videoUrl: "",
        active: true
      },
      {
        planId: "youtube-pro",
        planName: "YouTube Pro (up to 10 min)",
        price: 3999,
        originalPrice: 7999,
        description: "Professional YouTube videos up to 10 minutes",
        features: "Up to 10 minutes\nAdvanced Color Grading\nMotion Graphics\nThumbnail Included\nSound Effects\n3-5 Days Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true
      }
    ]
  },
  {
    serviceId: "photo-editing",
    sectionTitle: "Professional Photo Editing Services",
    plans: [
      {
        planId: "basic-photo",
        planName: "Basic Photo Editing",
        price: 149,
        originalPrice: 299,
        description: "Perfect for simple and quick edits",
        features: "Color Correction\nBrightness & Contrast\nBasic Retouch\n12-24 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true
      },
      {
        planId: "advanced-photo",
        planName: "Advanced Photo Editing",
        price: 299,
        originalPrice: 599,
        description: "Professional editing for high-quality results",
        features: "Skin Retouching\nBackground Removal\nColor Grading\nHigh-End Finish\n24-48 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true
      }
    ]
  },
  {
    serviceId: "thumbnail-design",
    sectionTitle: "Professional Thumbnail Design Services",
    plans: [
      {
        planId: "thumb-basic",
        planName: "Basic Thumbnail Design",
        price: 199,
        originalPrice: 399,
        description: "Click-worthy thumbnails that drive views",
        features: "Custom Design\nClick-Worthy Layout\nText Overlay\nBasic Color Grading\n12-24 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true
      },
      {
        planId: "thumb-advanced",
        planName: "Advanced Thumbnail Design",
        price: 499,
        originalPrice: 999,
        description: "Premium thumbnails for maximum CTR",
        features: "Premium Design\nBrand-Consistent Style\nCustom Illustrations\nMultiple Revisions\nHigh-Res Export\n24-48 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true
      }
    ]
  },
  {
    serviceId: "ads-campaign",
    sectionTitle: "Digital Ads Campaign Services",
    plans: [
      {
        planId: "ads-basic",
        planName: "Basic Ads Campaign",
        price: 1499,
        originalPrice: 2999,
        description: "Get started with targeted digital advertising",
        features: "Google Ads Setup\nFacebook/Instagram Ads\nCampaign Targeting\n3-Day Reporting\nAd Copy Design\n3-5 Days Setup",
        imageUrl: "",
        videoUrl: "",
        active: true
      },
      {
        planId: "ads-advanced",
        planName: "Advanced Ads Campaign",
        price: 2999,
        originalPrice: 5999,
        description: "Full-scale ad management for maximum ROI",
        features: "Google + Meta Ads\nPixel Setup & Tracking\nRetargeting Campaigns\nFull Analytics Report\nA/B Testing\nLead Generation Funnel\n5-7 Days Setup",
        imageUrl: "",
        videoUrl: "",
        active: true
      }
    ]
  }
];
const SERVICE_ICONS = {
  "web-design": /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4" }),
  "video-editing": /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
  "photo-editing": /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
  "thumbnail-design": /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
  "ads-campaign": /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-4 w-4" })
};
const SERVICE_LABELS = {
  "web-design": "Web Design",
  "video-editing": "Video Editing",
  "photo-editing": "Photo Editing",
  "thumbnail-design": "Thumbnails",
  "ads-campaign": "Ads Campaign"
};
const CONTENT_KEY = "evergreen_service_content";
function loadContent() {
  try {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
  }
  return DEFAULT_SERVICES;
}
function ServiceContentManagementNew() {
  const [services, setServices] = reactExports.useState([]);
  const [saving, setSaving] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setServices(loadContent());
  }, []);
  const updateService = (serviceId, field, value) => {
    setServices(
      (prev) => prev.map(
        (s) => s.serviceId === serviceId ? { ...s, [field]: value } : s
      )
    );
  };
  const updatePlan = (serviceId, planId, field, value) => {
    setServices(
      (prev) => prev.map(
        (s) => s.serviceId === serviceId ? {
          ...s,
          plans: s.plans.map(
            (p) => p.planId === planId ? { ...p, [field]: value } : p
          )
        } : s
      )
    );
  };
  const handleSave = (serviceId) => {
    setSaving(serviceId);
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(services));
      const service = services.find((s) => s.serviceId === serviceId);
      if (service) {
        localStorage.setItem(
          `evergreen_content_${serviceId}`,
          JSON.stringify(service)
        );
      }
      ue.success(`${SERVICE_LABELS[serviceId] || serviceId} content saved!`);
    } catch {
      ue.error("Failed to save content");
    } finally {
      setTimeout(() => setSaving(null), 1e3);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center",
          style: { background: "linear-gradient(135deg, #16a34a, #eab308)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-5 w-5 text-white" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Service Content Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Edit content for all services — prices, features, titles, images & videos" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "web-design", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TabsList,
        {
          className: "flex flex-wrap gap-1 h-auto p-1.5 mb-2",
          style: { background: "linear-gradient(135deg, #0a0a0a, #064e3b)" },
          "data-ocid": "services.tab",
          children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: s.serviceId,
              className: "flex items-center gap-1.5 text-xs text-white/60 data-[state=active]:text-black data-[state=active]:bg-yellow-400 rounded-lg px-3 py-1.5",
              children: [
                SERVICE_ICONS[s.serviceId],
                SERVICE_LABELS[s.serviceId] || s.serviceId
              ]
            },
            s.serviceId
          ))
        }
      ),
      services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: service.serviceId, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-green-100 dark:border-green-900/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CardHeader,
            {
              className: "pb-3",
              style: {
                background: "linear-gradient(90deg, #f0fdf4, #fefce8)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-bold text-green-800 flex items-center gap-2", children: [
                SERVICE_ICONS[service.serviceId],
                "Section Settings"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: `title-${service.serviceId}`,
                className: "text-xs font-semibold mb-1 block",
                children: "Section Title"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: `title-${service.serviceId}`,
                value: service.sectionTitle,
                onChange: (e) => updateService(
                  service.serviceId,
                  "sectionTitle",
                  e.target.value
                ),
                className: "border-green-200 focus:border-green-400",
                "data-ocid": "services.input"
              }
            )
          ] }) })
        ] }),
        service.plans.map((plan, planIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: `border-2 ${plan.active ? "border-green-200 dark:border-green-800" : "border-gray-200 dark:border-gray-700 opacity-60"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-bold flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: "text-xs",
                      style: {
                        background: plan.active ? "linear-gradient(135deg, #16a34a, #eab308)" : "#9ca3af",
                        color: "white"
                      },
                      children: [
                        "Plan ",
                        planIdx + 1
                      ]
                    }
                  ),
                  plan.planName
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: plan.active ? "Active" : "Inactive" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: plan.active,
                      onCheckedChange: (val) => updatePlan(
                        service.serviceId,
                        plan.planId,
                        "active",
                        val
                      ),
                      "data-ocid": "services.switch"
                    }
                  )
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Plan Name" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: plan.planName,
                        onChange: (e) => updatePlan(
                          service.serviceId,
                          plan.planId,
                          "planName",
                          e.target.value
                        ),
                        className: "border-green-200 focus:border-green-400 text-sm",
                        "data-ocid": "services.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Description" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: plan.description,
                        onChange: (e) => updatePlan(
                          service.serviceId,
                          plan.planId,
                          "description",
                          e.target.value
                        ),
                        className: "border-green-200 focus:border-green-400 text-sm",
                        "data-ocid": "services.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Final Price (₹)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        value: plan.price,
                        onChange: (e) => updatePlan(
                          service.serviceId,
                          plan.planId,
                          "price",
                          Number(e.target.value)
                        ),
                        className: "border-green-200 focus:border-green-400 text-sm",
                        "data-ocid": "services.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Original Price (₹)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "number",
                        value: plan.originalPrice,
                        onChange: (e) => updatePlan(
                          service.serviceId,
                          plan.planId,
                          "originalPrice",
                          Number(e.target.value)
                        ),
                        className: "border-green-200 focus:border-green-400 text-sm",
                        "data-ocid": "services.input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold mb-1 block", children: "Features (one per line)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      value: plan.features,
                      onChange: (e) => updatePlan(
                        service.serviceId,
                        plan.planId,
                        "features",
                        e.target.value
                      ),
                      rows: 5,
                      className: "border-green-200 focus:border-green-400 text-sm resize-none",
                      placeholder: "Feature 1\nFeature 2\nFeature 3",
                      "data-ocid": "services.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold mb-1 block flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3" }),
                      " Image URL"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: plan.imageUrl,
                        onChange: (e) => updatePlan(
                          service.serviceId,
                          plan.planId,
                          "imageUrl",
                          e.target.value
                        ),
                        placeholder: "https://... or /assets/...",
                        className: "border-green-200 focus:border-green-400 text-sm",
                        "data-ocid": "services.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs font-semibold mb-1 block flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3" }),
                      " Video URL"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: plan.videoUrl,
                        onChange: (e) => updatePlan(
                          service.serviceId,
                          plan.planId,
                          "videoUrl",
                          e.target.value
                        ),
                        placeholder: "https://youtube.com/...",
                        className: "border-green-200 focus:border-green-400 text-sm",
                        "data-ocid": "services.input"
                      }
                    )
                  ] })
                ] })
              ] })
            ]
          },
          plan.planId
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => handleSave(service.serviceId),
            disabled: saving === service.serviceId,
            className: "font-bold px-6",
            style: {
              background: saving === service.serviceId ? "#9ca3af" : "linear-gradient(135deg, #16a34a, #eab308)",
              color: saving === service.serviceId ? "white" : "black"
            },
            "data-ocid": "services.save_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
              saving === service.serviceId ? "Saving..." : `Save ${SERVICE_LABELS[service.serviceId] || ""} Content`
            ]
          }
        ) })
      ] }) }, service.serviceId))
    ] })
  ] });
}
export {
  ServiceContentManagementNew as default
};
