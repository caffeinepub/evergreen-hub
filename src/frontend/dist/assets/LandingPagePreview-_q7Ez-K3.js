import { n as useParams, o as useGetLandingPageById, p as useIncrementLandingPageVisit, r as reactExports, j as jsxRuntimeExports, q as LoaderCircle } from "./index-Chbee7kD.js";
function LandingPagePreview() {
  const { pageId } = useParams({ strict: false });
  const pageIdBigInt = pageId ? BigInt(pageId) : null;
  const {
    data: landingPage,
    isLoading,
    error
  } = useGetLandingPageById(pageIdBigInt);
  const incrementVisit = useIncrementLandingPageVisit();
  reactExports.useEffect(() => {
    if (landingPage && pageIdBigInt) {
      incrementVisit.mutate(pageIdBigInt);
    }
  }, [landingPage == null ? void 0 : landingPage.id]);
  reactExports.useEffect(() => {
    if (landingPage) {
      document.title = landingPage.title || "Landing Page";
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          landingPage.content.substring(0, 160)
        );
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = landingPage.content.substring(0, 160);
        document.head.appendChild(meta);
      }
    }
  }, [landingPage]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-12 w-12 animate-spin text-primary mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading landing page..." })
    ] }) });
  }
  if (error || !landingPage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-red-500 mb-4", children: "404" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold mb-2", children: "Landing Page Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "The landing page you're looking for doesn't exist or has been removed." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 md:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-foreground", children: landingPage.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-medium", children: landingPage.template }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          landingPage.visitCount.toString(),
          " views"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "prose prose-lg dark:prose-invert max-w-none",
        dangerouslySetInnerHTML: { __html: landingPage.content }
      }
    )
  ] }) }) });
}
export {
  LandingPagePreview as default
};
