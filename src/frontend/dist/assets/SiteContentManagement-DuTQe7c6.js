import { a6 as useGetPersistentSiteContent, a7 as useSetPersistentSiteContent, r as reactExports, j as jsxRuntimeExports, Z as Skeleton, P as Phone, O as Label, R as Input, a8 as CreditCard, Q as Upload, a9 as Building2, B as Button, g as LoaderCircle, y as CircleCheckBig, N as ExternalBlob } from "./index-Bxztzs8-.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-AjzlJkoI.js";
import { S as Save } from "./save-CAsOcBR_.js";
function SiteContentManagement() {
  const { data: siteContent, isLoading } = useGetPersistentSiteContent();
  const setSiteContent = useSetPersistentSiteContent();
  const [whatsapp, setWhatsapp] = reactExports.useState("");
  const [upiId, setUpiId] = reactExports.useState("");
  const [phonePeQrFile, setPhonePeQrFile] = reactExports.useState(null);
  const [phonePeQrPreview, setPhonePeQrPreview] = reactExports.useState("");
  const [accountNumber, setAccountNumber] = reactExports.useState("");
  const [accountHolderName, setAccountHolderName] = reactExports.useState("");
  const [ifsc, setIfsc] = reactExports.useState("");
  const [branch, setBranch] = reactExports.useState("");
  const [upiHandle, setUpiHandle] = reactExports.useState("");
  const [bankQrFile, setBankQrFile] = reactExports.useState(null);
  const [bankQrPreview, setBankQrPreview] = reactExports.useState("");
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (siteContent) {
      setWhatsapp(siteContent.whatsappPhoneNumber || "");
      setUpiId(((_a = siteContent.phonePeDetails) == null ? void 0 : _a.upiId) || "");
      setAccountNumber(((_b = siteContent.bankDetails) == null ? void 0 : _b.accountNumber) || "");
      setAccountHolderName(((_c = siteContent.bankDetails) == null ? void 0 : _c.accountHolderName) || "");
      setIfsc(((_d = siteContent.bankDetails) == null ? void 0 : _d.ifsc) || "");
      setBranch(((_e = siteContent.bankDetails) == null ? void 0 : _e.branch) || "");
      setUpiHandle(((_f = siteContent.bankDetails) == null ? void 0 : _f.upiHandle) || "");
      if ((_g = siteContent.phonePeDetails) == null ? void 0 : _g.qrCodeBlob) {
        setPhonePeQrPreview(
          siteContent.phonePeDetails.qrCodeBlob.getDirectURL()
        );
      }
      if ((_h = siteContent.bankDetails) == null ? void 0 : _h.qrCodeBlob) {
        setBankQrPreview(siteContent.bankDetails.qrCodeBlob.getDirectURL());
      }
    }
  }, [siteContent]);
  const handlePhonePeQrChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      setPhonePeQrFile(file);
      setPhonePeQrPreview(URL.createObjectURL(file));
    }
  };
  const handleBankQrChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      setBankQrFile(file);
      setBankQrPreview(URL.createObjectURL(file));
    }
  };
  const handleSave = async () => {
    var _a, _b;
    let phonePeQrBlob;
    let bankQrBlob;
    if (phonePeQrFile) {
      const bytes = new Uint8Array(await phonePeQrFile.arrayBuffer());
      phonePeQrBlob = ExternalBlob.fromBytes(bytes);
    } else if ((_a = siteContent == null ? void 0 : siteContent.phonePeDetails) == null ? void 0 : _a.qrCodeBlob) {
      phonePeQrBlob = siteContent.phonePeDetails.qrCodeBlob;
    } else {
      phonePeQrBlob = ExternalBlob.fromBytes(new Uint8Array(0));
    }
    if (bankQrFile) {
      const bytes = new Uint8Array(await bankQrFile.arrayBuffer());
      bankQrBlob = ExternalBlob.fromBytes(bytes);
    } else if ((_b = siteContent == null ? void 0 : siteContent.bankDetails) == null ? void 0 : _b.qrCodeBlob) {
      bankQrBlob = siteContent.bankDetails.qrCodeBlob;
    } else {
      bankQrBlob = ExternalBlob.fromBytes(new Uint8Array(0));
    }
    const content = {
      whatsappPhoneNumber: whatsapp,
      phonePeDetails: {
        upiId,
        qrCodeBlob: phonePeQrBlob
      },
      bankDetails: {
        accountNumber,
        accountHolderName,
        ifsc,
        branch,
        upiHandle,
        qrCodeBlob: bankQrBlob
      }
    };
    await setSiteContent.mutateAsync(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3e3);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Site Content Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1", children: "Update WhatsApp number, payment details, and bank account info" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-green-500" }),
          "WhatsApp Contact"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Phone number used for WhatsApp button and contact forms" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "whatsapp", children: "WhatsApp Phone Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "whatsapp",
            placeholder: "e.g. 919263989760",
            value: whatsapp,
            onChange: (e) => setWhatsapp(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Include country code without + (e.g. 919263989760 for India)" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-purple-500" }),
          "PhonePe / UPI Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Shown in the payment gateway for UPI transfers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upiId", children: "UPI ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "upiId",
              placeholder: "e.g. yourname@ybl",
              value: upiId,
              onChange: (e) => setUpiId(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "PhonePe QR Code Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            phonePeQrPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: phonePeQrPreview,
                alt: "PhonePe QR",
                className: "w-24 h-24 object-contain border rounded-lg bg-white"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-400 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-gray-400 mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Upload QR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handlePhonePeQrChange
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-blue-500" }),
          "Bank Account Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Shown for manual bank transfer payments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "accountHolderName", children: "Account Holder Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "accountHolderName",
                placeholder: "e.g. Rudra Pratap Singh",
                value: accountHolderName,
                onChange: (e) => setAccountHolderName(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "accountNumber", children: "Account Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "accountNumber",
                placeholder: "e.g. 1234567890",
                value: accountNumber,
                onChange: (e) => setAccountNumber(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ifsc", children: "IFSC Code" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ifsc",
                placeholder: "e.g. IPOS0000001",
                value: ifsc,
                onChange: (e) => setIfsc(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "branch", children: "Branch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "branch",
                placeholder: "e.g. India Post Payment Bank",
                value: branch,
                onChange: (e) => setBranch(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "upiHandle", children: "UPI Handle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "upiHandle",
                placeholder: "e.g. yourname@postpay",
                value: upiHandle,
                onChange: (e) => setUpiHandle(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Bank QR Code Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            bankQrPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: bankQrPreview,
                alt: "Bank QR",
                className: "w-24 h-24 object-contain border rounded-lg bg-white"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-gray-400 mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "Upload QR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleBankQrChange
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: handleSave,
        disabled: setSiteContent.isPending,
        className: "min-w-32",
        children: setSiteContent.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          "Saving..."
        ] }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 mr-2 text-green-400" }),
          "Saved!"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
          "Save Changes"
        ] })
      }
    ) })
  ] });
}
export {
  SiteContentManagement as default
};
