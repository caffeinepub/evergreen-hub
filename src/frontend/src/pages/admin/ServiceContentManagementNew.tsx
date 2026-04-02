import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Image, Layers, Megaphone, Save, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PlanContent {
  planId: string;
  planName: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string;
  imageUrl: string;
  videoUrl: string;
  active: boolean;
}

interface ServiceContent {
  serviceId: string;
  sectionTitle: string;
  plans: PlanContent[];
}

const DEFAULT_SERVICES: ServiceContent[] = [
  {
    serviceId: "web-design",
    sectionTitle: "Professional Web Design Services",
    plans: [
      {
        planId: "basic",
        planName: "Basic Package",
        price: 2999,
        originalPrice: 5998,
        description:
          "Perfect for beginners and small businesses starting online",
        features:
          "1 Simple Landing Page\n1-2 Page Website\nMobile-Friendly\nContact Form\nWhatsApp/Call Button\nGoogle Map Pin\n2-3 Days Delivery\n15 Days Support",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
      {
        planId: "gold",
        planName: "Gold Package",
        price: 2999,
        originalPrice: 5998,
        description: "Complete website for growing businesses",
        features:
          "5-7 Page Professional Website\nResponsive Design\nSEO Optimized\nContact Form\nWhatsApp Integration\n7-10 Days Delivery\n30 Days Support",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
    ],
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
        features:
          "Up to 60 seconds\nColor Grading\nText Overlays\nBackground Music\nFast Delivery 24hr",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
      {
        planId: "youtube-pro",
        planName: "YouTube Pro (up to 10 min)",
        price: 3999,
        originalPrice: 7999,
        description: "Professional YouTube videos up to 10 minutes",
        features:
          "Up to 10 minutes\nAdvanced Color Grading\nMotion Graphics\nThumbnail Included\nSound Effects\n3-5 Days Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
    ],
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
        features:
          "Color Correction\nBrightness & Contrast\nBasic Retouch\n12-24 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
      {
        planId: "advanced-photo",
        planName: "Advanced Photo Editing",
        price: 299,
        originalPrice: 599,
        description: "Professional editing for high-quality results",
        features:
          "Skin Retouching\nBackground Removal\nColor Grading\nHigh-End Finish\n24-48 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
    ],
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
        features:
          "Custom Design\nClick-Worthy Layout\nText Overlay\nBasic Color Grading\n12-24 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
      {
        planId: "thumb-advanced",
        planName: "Advanced Thumbnail Design",
        price: 499,
        originalPrice: 999,
        description: "Premium thumbnails for maximum CTR",
        features:
          "Premium Design\nBrand-Consistent Style\nCustom Illustrations\nMultiple Revisions\nHigh-Res Export\n24-48 Hours Delivery",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
    ],
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
        features:
          "Google Ads Setup\nFacebook/Instagram Ads\nCampaign Targeting\n3-Day Reporting\nAd Copy Design\n3-5 Days Setup",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
      {
        planId: "ads-advanced",
        planName: "Advanced Ads Campaign",
        price: 2999,
        originalPrice: 5999,
        description: "Full-scale ad management for maximum ROI",
        features:
          "Google + Meta Ads\nPixel Setup & Tracking\nRetargeting Campaigns\nFull Analytics Report\nA/B Testing\nLead Generation Funnel\n5-7 Days Setup",
        imageUrl: "",
        videoUrl: "",
        active: true,
      },
    ],
  },
];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "web-design": <Globe className="h-4 w-4" />,
  "video-editing": <Video className="h-4 w-4" />,
  "photo-editing": <Image className="h-4 w-4" />,
  "thumbnail-design": <Layers className="h-4 w-4" />,
  "ads-campaign": <Megaphone className="h-4 w-4" />,
};

const SERVICE_LABELS: Record<string, string> = {
  "web-design": "Web Design",
  "video-editing": "Video Editing",
  "photo-editing": "Photo Editing",
  "thumbnail-design": "Thumbnails",
  "ads-campaign": "Ads Campaign",
};

const CONTENT_KEY = "evergreen_service_content";

function loadContent(): ServiceContent[] {
  try {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed as ServiceContent[];
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_SERVICES;
}

export default function ServiceContentManagementNew() {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    setServices(loadContent());
  }, []);

  const updateService = (
    serviceId: string,
    field: keyof ServiceContent,
    value: string,
  ) => {
    setServices((prev) =>
      prev.map((s) =>
        s.serviceId === serviceId ? { ...s, [field]: value } : s,
      ),
    );
  };

  const updatePlan = (
    serviceId: string,
    planId: string,
    field: keyof PlanContent,
    value: string | number | boolean,
  ) => {
    setServices((prev) =>
      prev.map((s) =>
        s.serviceId === serviceId
          ? {
              ...s,
              plans: s.plans.map((p) =>
                p.planId === planId ? { ...p, [field]: value } : p,
              ),
            }
          : s,
      ),
    );
  };

  const handleSave = (serviceId: string) => {
    setSaving(serviceId);
    try {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(services));
      // Also update per-service key
      const service = services.find((s) => s.serviceId === serviceId);
      if (service) {
        localStorage.setItem(
          `evergreen_content_${serviceId}`,
          JSON.stringify(service),
        );
      }
      toast.success(`${SERVICE_LABELS[serviceId] || serviceId} content saved!`);
    } catch {
      toast.error("Failed to save content");
    } finally {
      setTimeout(() => setSaving(null), 1000);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #16a34a, #eab308)" }}
        >
          <Layers className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service Content Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Edit content for all services — prices, features, titles, images
            &amp; videos
          </p>
        </div>
      </div>

      <Tabs defaultValue="web-design" className="w-full">
        <TabsList
          className="flex flex-wrap gap-1 h-auto p-1.5 mb-2"
          style={{ background: "linear-gradient(135deg, #0a0a0a, #064e3b)" }}
          data-ocid="services.tab"
        >
          {services.map((s) => (
            <TabsTrigger
              key={s.serviceId}
              value={s.serviceId}
              className="flex items-center gap-1.5 text-xs text-white/60 data-[state=active]:text-black data-[state=active]:bg-yellow-400 rounded-lg px-3 py-1.5"
            >
              {SERVICE_ICONS[s.serviceId]}
              {SERVICE_LABELS[s.serviceId] || s.serviceId}
            </TabsTrigger>
          ))}
        </TabsList>

        {services.map((service) => (
          <TabsContent key={service.serviceId} value={service.serviceId}>
            <div className="space-y-5">
              {/* Section Title */}
              <Card className="border border-green-100 dark:border-green-900/30">
                <CardHeader
                  className="pb-3"
                  style={{
                    background: "linear-gradient(90deg, #f0fdf4, #fefce8)",
                  }}
                >
                  <CardTitle className="text-sm font-bold text-green-800 flex items-center gap-2">
                    {SERVICE_ICONS[service.serviceId]}
                    Section Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div>
                    <Label
                      htmlFor={`title-${service.serviceId}`}
                      className="text-xs font-semibold mb-1 block"
                    >
                      Section Title
                    </Label>
                    <Input
                      id={`title-${service.serviceId}`}
                      value={service.sectionTitle}
                      onChange={(e) =>
                        updateService(
                          service.serviceId,
                          "sectionTitle",
                          e.target.value,
                        )
                      }
                      className="border-green-200 focus:border-green-400"
                      data-ocid="services.input"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Plan Cards */}
              {service.plans.map((plan, planIdx) => (
                <Card
                  key={plan.planId}
                  className={`border-2 ${
                    plan.active
                      ? "border-green-200 dark:border-green-800"
                      : "border-gray-200 dark:border-gray-700 opacity-60"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Badge
                          className="text-xs"
                          style={{
                            background: plan.active
                              ? "linear-gradient(135deg, #16a34a, #eab308)"
                              : "#9ca3af",
                            color: "white",
                          }}
                        >
                          Plan {planIdx + 1}
                        </Badge>
                        {plan.planName}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {plan.active ? "Active" : "Inactive"}
                        </span>
                        <Switch
                          checked={plan.active}
                          onCheckedChange={(val) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "active",
                              val,
                            )
                          }
                          data-ocid="services.switch"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-semibold mb-1 block">
                          Plan Name
                        </Label>
                        <Input
                          value={plan.planName}
                          onChange={(e) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "planName",
                              e.target.value,
                            )
                          }
                          className="border-green-200 focus:border-green-400 text-sm"
                          data-ocid="services.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1 block">
                          Description
                        </Label>
                        <Input
                          value={plan.description}
                          onChange={(e) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "description",
                              e.target.value,
                            )
                          }
                          className="border-green-200 focus:border-green-400 text-sm"
                          data-ocid="services.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1 block">
                          Final Price (₹)
                        </Label>
                        <Input
                          type="number"
                          value={plan.price}
                          onChange={(e) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "price",
                              Number(e.target.value),
                            )
                          }
                          className="border-green-200 focus:border-green-400 text-sm"
                          data-ocid="services.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1 block">
                          Original Price (₹)
                        </Label>
                        <Input
                          type="number"
                          value={plan.originalPrice}
                          onChange={(e) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "originalPrice",
                              Number(e.target.value),
                            )
                          }
                          className="border-green-200 focus:border-green-400 text-sm"
                          data-ocid="services.input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold mb-1 block">
                        Features (one per line)
                      </Label>
                      <Textarea
                        value={plan.features}
                        onChange={(e) =>
                          updatePlan(
                            service.serviceId,
                            plan.planId,
                            "features",
                            e.target.value,
                          )
                        }
                        rows={5}
                        className="border-green-200 focus:border-green-400 text-sm resize-none"
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        data-ocid="services.textarea"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                          <Image className="h-3 w-3" /> Image URL
                        </Label>
                        <Input
                          value={plan.imageUrl}
                          onChange={(e) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "imageUrl",
                              e.target.value,
                            )
                          }
                          placeholder="https://... or /assets/..."
                          className="border-green-200 focus:border-green-400 text-sm"
                          data-ocid="services.input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold mb-1 block flex items-center gap-1">
                          <Video className="h-3 w-3" /> Video URL
                        </Label>
                        <Input
                          value={plan.videoUrl}
                          onChange={(e) =>
                            updatePlan(
                              service.serviceId,
                              plan.planId,
                              "videoUrl",
                              e.target.value,
                            )
                          }
                          placeholder="https://youtube.com/..."
                          className="border-green-200 focus:border-green-400 text-sm"
                          data-ocid="services.input"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave(service.serviceId)}
                  disabled={saving === service.serviceId}
                  className="font-bold px-6"
                  style={{
                    background:
                      saving === service.serviceId
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #16a34a, #eab308)",
                    color: saving === service.serviceId ? "white" : "black",
                  }}
                  data-ocid="services.save_button"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving === service.serviceId
                    ? "Saving..."
                    : `Save ${SERVICE_LABELS[service.serviceId] || ""} Content`}
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
