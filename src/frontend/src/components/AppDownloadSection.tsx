import { Button } from "@/components/ui/button";
import { Chrome, Download, Plus, Share2, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function AppDownloadSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [_isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // Listen for install prompt (Android/Chrome)
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <section
      id="download-app"
      className="py-16 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white"
      data-ocid="app_download.section"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-4">
              <Smartphone className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            📱 Evergreen Hub App Download Karein
          </h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            Website ka poora experience ab aapke phone me! Sabhi features ek
            click par.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Android Install Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 rounded-full p-2">
                <Chrome className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Android / Chrome</h3>
            </div>
            {deferredPrompt ? (
              <>
                <p className="text-green-100 text-sm mb-4">
                  1 click me app install karein apne Android phone par!
                </p>
                <Button
                  onClick={handleInstall}
                  className="w-full bg-white text-green-700 hover:bg-green-50 font-bold text-base py-3 rounded-xl shadow-lg"
                  data-ocid="app_download.primary_button"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Install App Now
                </Button>
              </>
            ) : (
              <ol className="space-y-3 text-sm text-green-100">
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  Chrome browser me website kholein
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  Upar 3 dots (⋮) pe click karein
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    <strong>"Add to Home Screen"</strong> select karein
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <strong>"Add"</strong> button dabayein — Done! 🎉
                </li>
              </ol>
            )}
          </div>

          {/* iOS Install Card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 rounded-full p-2">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">iPhone / Safari</h3>
            </div>
            <ol className="space-y-3 text-sm text-green-100">
              <li className="flex items-start gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </span>
                Safari browser me website kholein
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Niche Share icon <strong>(□↑)</strong> dabayein
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>"Add to Home Screen"</strong>{" "}
                  <Plus className="inline h-3 w-3" /> select karein
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </span>
                <strong>"Add"</strong> button dabayein — Done! 🎉
              </li>
            </ol>
          </div>
        </div>

        {/* Features reminder */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[
            { icon: "📚", text: "Saare Courses" },
            { icon: "💰", text: "Earnings Dashboard" },
            { icon: "🔗", text: "Referral Links" },
            { icon: "📄", text: "Landing Pages" },
          ].map((item) => (
            <div key={item.text} className="bg-white/10 rounded-xl py-3 px-2">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-medium text-green-100">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
