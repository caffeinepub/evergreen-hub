import { a as useAuth, w as useActor, D as useUploadProfilePhoto, r as reactExports, E as ExternalBlob, j as jsxRuntimeExports, C as Card, f as CardHeader, h as CardTitle, i as CardDescription, k as CardContent, U as User, G as Label, J as Upload, K as Input, B as Button, e as ue } from "./index-CTmzmyZG.js";
function ProfileSettings() {
  const { userProfile, refreshProfile } = useAuth();
  const { actor } = useActor();
  const uploadProfilePhoto = useUploadProfilePhoto();
  const [loading, setLoading] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    phone: ""
  });
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [uploadingPhoto, setUploadingPhoto] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name,
        phone: userProfile.phone
      });
    }
  }, [userProfile]);
  const handleFileSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        ue.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        ue.error("Image size should be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handlePhotoUpload = async () => {
    if (!selectedFile) {
      ue.error("Please select an image first");
      return;
    }
    setUploadingPhoto(true);
    try {
      await uploadProfilePhoto.mutateAsync(selectedFile);
      await refreshProfile();
      ue.success("Profile photo updated successfully!");
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Upload error:", error);
      ue.error(error.message || "Failed to upload profile photo");
    } finally {
      setUploadingPhoto(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      ue.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      if (!actor) throw new Error("Actor not available");
      await actor.updateProfile(formData.name, formData.phone);
      await refreshProfile();
      ue.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      ue.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  const currentPhotoUrl = (userProfile == null ? void 0 : userProfile.profilePhotoUrl) ? ExternalBlob.fromURL(userProfile.profilePhotoUrl).getDirectURL() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Profile Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Update your personal information" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-yellow-500", children: "Profile Photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Upload or change your profile picture" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-yellow-500", children: currentPhotoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentPhotoUrl,
            alt: "Profile",
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-16 h-16 text-gray-400" }) }),
        previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-4 border-green-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: previewUrl,
            alt: "Preview",
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "photo-upload", className: "cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-yellow-500 rounded-lg hover:bg-yellow-500/10 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-yellow-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-yellow-500", children: selectedFile ? selectedFile.name : "Choose Image" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "photo-upload",
              type: "file",
              accept: "image/*",
              onChange: handleFileSelect,
              className: "hidden"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 text-center", children: "Max size: 5MB. Supported formats: JPG, PNG, GIF" })
        ] }),
        selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handlePhotoUpload,
            disabled: uploadingPhoto,
            className: "bg-green-600 hover:bg-green-700 text-white",
            children: uploadingPhoto ? "Uploading..." : "Upload Photo"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-yellow-500", children: "Personal Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Update your name and phone number" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: (userProfile == null ? void 0 : userProfile.email) || "",
              disabled: true,
              className: "bg-muted"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email cannot be changed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              type: "text",
              value: formData.name,
              onChange: (e) => setFormData({ ...formData, name: e.target.value }),
              placeholder: "John Doe"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "phone",
              type: "tel",
              value: formData.phone,
              onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
              placeholder: "9876543210"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: loading,
            className: "bg-yellow-500 hover:bg-yellow-600 text-black",
            children: loading ? "Updating..." : "Update Profile"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  ProfileSettings as default
};
