import { $ as useGetAllContactInterests, a0 as useMarkContactResolved, r as reactExports, j as jsxRuntimeExports, B as Badge, X as Search, O as Input, h as Button, Y as Skeleton, a1 as MessageSquare, P as Phone, t as Clock, x as CircleCheckBig } from "./index-Dvuqt7mL.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-Bvjr9E7n.js";
import { M as Mail } from "./mail-ChJ2KpVG.js";
function ContactInquiries() {
  const { data: inquiries = [], isLoading } = useGetAllContactInterests();
  const markResolved = useMarkContactResolved();
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState(
    "all"
  );
  const filtered = inquiries.filter((inq) => {
    const matchesSearch = inq.name.toLowerCase().includes(search.toLowerCase()) || inq.email.toLowerCase().includes(search.toLowerCase()) || inq.phone.includes(search) || inq.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || filter === "resolved" && inq.resolved || filter === "unresolved" && !inq.resolved;
    return matchesSearch && matchesFilter;
  });
  const formatDate = (ts) => {
    return new Date(Number(ts) / 1e6).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const unresolvedCount = inquiries.filter((i) => !i.resolved).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Contact Inquiries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Manage all contact form submissions" })
      ] }),
      unresolvedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-red-500 text-white text-sm px-3 py-1", children: [
        unresolvedCount,
        " Unresolved"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name, email, phone, or message...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["all", "unresolved", "resolved"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: filter === f ? "default" : "outline",
          size: "sm",
          onClick: () => setFilter(f),
          className: "capitalize",
          children: f
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", children: Array.from({ length: 5 }, (_, i) => i).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, `skel-${i}`)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-12 w-12 mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "No inquiries found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Try adjusting your search or filter" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-gray-50 dark:bg-gray-700/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          className: !inq.resolved ? "bg-yellow-50/50 dark:bg-yellow-900/10 font-medium" : "",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              !inq.resolved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-500 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: !inq.resolved ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300",
                  children: inq.name
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: inq.phone })
              ] }),
              inq.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: inq.email })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate",
                title: inq.message,
                children: inq.message
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(inq.createdAt) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: inq.resolved ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-green-600 border-green-300 bg-green-50 dark:bg-green-900/20",
                children: "Resolved"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-red-600 border-red-300 bg-red-50 dark:bg-red-900/20",
                children: "Unresolved"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: !inq.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-green-600 border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20",
                disabled: markResolved.isPending,
                onClick: () => markResolved.mutate(inq.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-1" }),
                  "Mark Resolved"
                ]
              }
            ) })
          ]
        },
        inq.id.toString()
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-400 text-right", children: [
      "Showing ",
      filtered.length,
      " of ",
      inquiries.length,
      " inquiries"
    ] })
  ] });
}
export {
  ContactInquiries as default
};
