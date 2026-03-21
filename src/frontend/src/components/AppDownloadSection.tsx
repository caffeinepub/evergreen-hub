import { CheckCircle, Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type InstallState = "idle" | "downloading" | "installing" | "done" | "guide";

export default function AppDownloadSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installState, setInstallState] = useState<InstallState>("idle");
  const [progress, setProgress] = useState(0);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already running as installed PWA
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true
    ) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstallState("done");
      // After showing success, hide section after 3 seconds
      setTimeout(() => setIsInstalled(true), 3000);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const simulateProgress = (onComplete: () => void) => {
    setProgress(0);
    setInstallState("downloading");
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 8;
      if (p >= 70) {
        clearInterval(interval);
        setProgress(70);
        setInstallState("installing");
        // Simulate installing phase
        let p2 = 70;
        const interval2 = setInterval(() => {
          p2 += Math.random() * 10 + 5;
          if (p2 >= 100) {
            clearInterval(interval2);
            setProgress(100);
            onComplete();
          } else {
            setProgress(Math.round(p2));
          }
        }, 200);
      } else {
        setProgress(Math.round(p));
      }
    }, 150);
  };

  const handleAndroidInstall = async () => {
    if (installState !== "idle") return;

    if (deferredPrompt) {
      simulateProgress(async () => {
        try {
          await deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === "accepted") {
            setInstallState("done");
            setTimeout(() => setIsInstalled(true), 2500);
          } else {
            setInstallState("idle");
            setProgress(0);
          }
          setDeferredPrompt(null);
        } catch {
          setInstallState("idle");
          setProgress(0);
        }
      });
    } else {
      // No native prompt: show guide
      setInstallState("guide");
    }
  };

  const handleIOSInstall = () => {
    setShowIOSGuide(true);
  };

  // Don't render if installed and done animating
  if (isInstalled && installState !== "done") return null;

  // Full-screen success overlay after install
  if (installState === "done") {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700 text-white animate-fade-in">
        <div className="flex flex-col items-center gap-6 px-8 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center animate-bounce-slow">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/10 animate-ping" />
          </div>
          <h2 className="text-3xl font-bold">App Install Ho Gayi! 🎉</h2>
          <p className="text-green-100 text-lg max-w-xs">
            Evergreen Hub ab aapke Home Screen par available hai. Open karein!
          </p>
          <div className="flex gap-3 mt-2">
            <div className="bg-white/20 rounded-xl px-4 py-2 text-sm">
              📚 Courses
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-sm">
              💰 Earnings
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 text-sm">
              🔗 Referral
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsInstalled(true)}
            className="mt-4 bg-white text-green-700 font-bold py-3 px-8 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            Continue to Website →
          </button>
        </div>
      </div>
    );
  }

  // Android manual guide overlay
  if (installState === "guide") {
    return (
      <section
        id="download-app"
        className="py-16 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white"
      >
        <div className="container mx-auto max-w-lg">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-2">Android Install Guide</h3>
            <p className="text-green-100 mb-6">
              3 simple steps mein app install karein:
            </p>
            <div className="space-y-4 text-left">
              {[
                { step: "1", text: "Chrome browser mein ye website kholein" },
                {
                  step: "2",
                  text: "Top-right corner mein 3 dots (⋮) par tap karein",
                },
                {
                  step: "3",
                  text: '"Add to Home Screen" select karein — Done! 🎉',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-4 bg-white/10 rounded-xl p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-green-700 font-bold flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <p className="text-sm text-green-50">{s.text}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setInstallState("idle")}
              className="mt-6 w-full bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-green-50 transition"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* iOS Step-by-step modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🍎</div>
              <h3 className="text-xl font-bold text-gray-800">
                iPhone / iPad Install
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Safari se 3 steps mein install karein
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  icon: "🌐",
                  text: "Safari browser mein ye website kholein (Chrome nahi)",
                },
                {
                  step: "2",
                  icon: "📤",
                  text: "Bottom mein Share button (□↑) tap karein",
                },
                {
                  step: "3",
                  icon: "➕",
                  text: '"Add to Home Screen" dhundh ke tap karein — Done! 🎉',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex items-start gap-3 bg-green-50 rounded-xl p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {s.step}
                  </div>
                  <div>
                    <span className="text-lg">{s.icon}</span>
                    <p className="text-sm text-gray-700 mt-0.5">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
              onClick={() => setShowIOSGuide(false)}
            >
              <Download className="w-4 h-4" />
              Open in Safari
            </a>
          </div>
        </div>
      )}

      <section
        id="download-app"
        className="py-16 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white"
        data-ocid="app_download.section"
      >
        <div className="container mx-auto max-w-5xl">
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
              Website ka poora experience ab aapke phone/tablet mein! Sabhi
              features ek tap par.
            </p>
          </div>

          {/* Progress bar (shown during download/install) */}
          {(installState === "downloading" ||
            installState === "installing") && (
            <div className="mb-8 bg-white/10 rounded-2xl p-6 text-center">
              <p className="text-lg font-semibold mb-3">
                {installState === "downloading"
                  ? "⬇️ Downloading..."
                  : "⚙️ Installing..."}
              </p>
              <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 bg-white rounded-full transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-green-100 text-sm mt-2">{progress}%</p>
            </div>
          )}

          {/* Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Android */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="text-5xl mb-3">🤖</div>
              <h3 className="text-xl font-bold mb-1">Android</h3>
              <p className="text-green-100 text-sm mb-5">
                Chrome browser se seedha install karein — ek click mein!
              </p>
              <button
                type="button"
                onClick={handleAndroidInstall}
                disabled={
                  installState === "downloading" ||
                  installState === "installing"
                }
                className="w-full flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                data-ocid="app_download.android_button"
              >
                {installState === "downloading" ||
                installState === "installing" ? (
                  <span className="inline-block w-5 h-5 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="h-5 w-5" />
                )}
                {installState === "downloading"
                  ? "Downloading..."
                  : installState === "installing"
                    ? "Installing..."
                    : "Install for Android"}
              </button>
              <p className="text-green-200 text-xs mt-3">
                Chrome &gt; 3 dots menu &gt; "Add to Home Screen"
              </p>
            </div>

            {/* iPhone / iOS */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="text-5xl mb-3">🍎</div>
              <h3 className="text-xl font-bold mb-1">iPhone / iOS</h3>
              <p className="text-green-100 text-sm mb-5">
                Safari se 3 simple steps mein install karein.
              </p>
              <button
                type="button"
                onClick={handleIOSInstall}
                className="w-full flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
                data-ocid="app_download.ios_button"
              >
                <Download className="h-5 w-5" />
                Install for iPhone
              </button>
              <p className="text-green-200 text-xs mt-3">
                Safari &gt; Share (□↑) &gt; "Add to Home Screen"
              </p>
            </div>

            {/* Tablet */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="text-5xl mb-3">💻</div>
              <h3 className="text-xl font-bold mb-1">Tablet / iPad</h3>
              <p className="text-green-100 text-sm mb-5">
                Android tablet ya iPad — dono pe easily install hoga.
              </p>
              <button
                type="button"
                onClick={handleAndroidInstall}
                disabled={
                  installState === "downloading" ||
                  installState === "installing"
                }
                className="w-full flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-4 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                data-ocid="app_download.tablet_button"
              >
                {installState === "downloading" ||
                installState === "installing" ? (
                  <span className="inline-block w-5 h-5 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="h-5 w-5" />
                )}
                Install for Tablet
              </button>
              <p className="text-green-200 text-xs mt-3">
                Android: Chrome menu &gt; Add to Home Screen
              </p>
            </div>
          </div>

          {/* Features reminder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
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
    </>
  );
}
