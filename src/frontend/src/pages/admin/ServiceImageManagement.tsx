import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, type ServiceImage } from "../../backend";
import { useActor } from "../../hooks/useActor";

const SERVICE_CATEGORIES = [
  { value: "web-design", label: "Web Design", emoji: "🌐" },
  { value: "video-editing", label: "Video Editing", emoji: "🎬" },
  { value: "photo-editing", label: "Photo Editing", emoji: "📸" },
  { value: "thumbnail-design", label: "Thumbnail Design", emoji: "🖼️" },
  { value: "ads-campaign", label: "Ads Campaign", emoji: "📢" },
];

export default function ServiceImageManagement() {
  const { actor, isFetching } = useActor();
  const [selectedCategory, setSelectedCategory] = useState("web-design");
  const [images, setImages] = useState<ServiceImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImages = async (category: string) => {
    if (!actor) return;
    setLoading(true);
    try {
      const data = await actor.getServiceImages(category);
      setImages(data);
    } catch {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: fetchImages is stable
  useEffect(() => {
    if (actor && !isFetching) fetchImages(selectedCategory);
  }, [actor, isFetching, selectedCategory]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!actor || !e.target.files?.length) return;
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      await actor.addServiceImage(selectedCategory, blob);
      toast.success("Image uploaded!");
      await fetchImages(selectedCategory);
    } catch (err: any) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (image: ServiceImage) => {
    if (!actor) return;
    if (!confirm("Delete this image?")) return;
    setDeletingId(image.id);
    try {
      await actor.deleteServiceImage(image.id);
      toast.success("Image deleted");
      setImages((prev) => prev.filter((img) => img.id !== image.id));
    } catch {
      toast.error("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };

  const currentCategory = SERVICE_CATEGORIES.find(
    (c) => c.value === selectedCategory,
  );

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
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
          >
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Service Image Management
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Upload and manage images for each service category
            </p>
          </div>
        </div>
      </div>

      {/* Category Selector */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <p
              className="text-sm font-semibold mb-2"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Select Service Category
            </p>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger
                data-ocid="service_images.select"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  color: "#fff",
                  maxWidth: 280,
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(59,130,246,0.2)",
                  color: "#fff",
                }}
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
              id="service-image-upload"
            />
            <Button
              onClick={() => fileRef.current?.click()}
              disabled={uploading || isFetching}
              data-ocid="service_images.upload_button"
              className="text-white"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                border: "none",
              }}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" /> Upload Image
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span style={{ fontSize: 20 }}>{currentCategory?.emoji}</span>
          <h2 className="font-bold text-white">
            {currentCategory?.label} Images
          </h2>
          <span
            style={{
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: 999,
              padding: "2px 10px",
              color: "#60a5fa",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {images.length}
          </span>
        </div>

        {loading ? (
          <div
            className="flex items-center justify-center py-16"
            data-ocid="service_images.loading_state"
          >
            <Loader2
              className="w-6 h-6 animate-spin"
              style={{ color: "#3b82f6" }}
            />
            <span
              className="ml-2 text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Loading images...
            </span>
          </div>
        ) : images.length === 0 ? (
          <button
            type="button"
            className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-2xl cursor-pointer hover:border-blue-500 transition-colors w-full"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
            onClick={() => fileRef.current?.click()}
            data-ocid="service_images.dropzone"
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                marginBottom: 16,
                background: "rgba(59,130,246,0.1)",
                border: "2px solid rgba(59,130,246,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus
                className="w-7 h-7"
                style={{ color: "rgba(59,130,246,0.6)" }}
              />
            </div>
            <p
              className="font-semibold"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              No images for {currentCategory?.label}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Click to upload the first image
            </p>
          </button>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, idx) => (
              <div
                key={image.id.toString()}
                data-ocid={`service_images.item.${idx + 1}`}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  aspectRatio: "1",
                }}
              >
                <img
                  src={image.imageBlob.getDirectURL()}
                  alt={`Service ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23111'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23555' font-size='12'%3EImage%3C/text%3E%3C/svg%3E";
                  }}
                />
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.6)" }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(image)}
                    disabled={deletingId === image.id}
                    data-ocid={`service_images.delete_button.${idx + 1}`}
                    style={{
                      color: "#ef4444",
                      background: "rgba(239,68,68,0.1)",
                    }}
                    className="hover:bg-red-500/20"
                  >
                    {deletingId === image.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {/* Index badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: 6,
                    padding: "2px 7px",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  #{idx + 1}
                </div>
              </div>
            ))}

            {/* Upload more tile */}
            <button
              type="button"
              className="flex flex-col items-center justify-center rounded-2xl cursor-pointer hover:border-blue-500 transition-colors"
              style={{
                background: "rgba(59,130,246,0.05)",
                border: "2px dashed rgba(59,130,246,0.2)",
                aspectRatio: "1",
              }}
              onClick={() => fileRef.current?.click()}
              data-ocid="service_images.dropzone"
            >
              <Plus
                className="w-8 h-8 mb-2"
                style={{ color: "rgba(59,130,246,0.5)" }}
              />
              <p
                className="text-xs text-center"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Add More
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
