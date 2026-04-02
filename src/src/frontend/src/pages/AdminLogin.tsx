import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Shield, User } from "lucide-react";
import { useState } from "react";

const PARTICLES = [
  {
    id: "p1",
    top: "10%",
    left: "8%",
    size: 8,
    dur: "5s",
    delay: "0s",
    color: "rgba(99,102,241,0.6)",
  },
  {
    id: "p2",
    top: "20%",
    left: "85%",
    size: 12,
    dur: "7s",
    delay: "1s",
    color: "rgba(139,92,246,0.5)",
  },
  {
    id: "p3",
    top: "60%",
    left: "5%",
    size: 6,
    dur: "4s",
    delay: "0.5s",
    color: "rgba(16,185,129,0.5)",
  },
  {
    id: "p4",
    top: "75%",
    left: "90%",
    size: 10,
    dur: "6s",
    delay: "2s",
    color: "rgba(99,102,241,0.4)",
  },
  {
    id: "p5",
    top: "45%",
    left: "92%",
    size: 5,
    dur: "3.5s",
    delay: "0.8s",
    color: "rgba(139,92,246,0.6)",
  },
  {
    id: "p6",
    top: "85%",
    left: "15%",
    size: 9,
    dur: "5.5s",
    delay: "1.5s",
    color: "rgba(16,185,129,0.4)",
  },
  {
    id: "p7",
    top: "30%",
    left: "3%",
    size: 7,
    dur: "4.5s",
    delay: "0.3s",
    color: "rgba(99,102,241,0.5)",
  },
  {
    id: "p8",
    top: "90%",
    left: "70%",
    size: 11,
    dur: "6.5s",
    delay: "2.5s",
    color: "rgba(139,92,246,0.4)",
  },
];

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 600));

    if (username === "Evergreenhub" && password === "Anurudra@12") {
      localStorage.setItem("evergreen_admin_auth", "true");
      navigate({ to: "/admin/stats" });
    } else {
      setError("Invalid credentials ❌");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
        @keyframes shake-card {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          30% { transform: translateX(10px); }
          45% { transform: translateX(-8px); }
          60% { transform: translateX(8px); }
          75% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3); }
          50% { box-shadow: 0 0 40px rgba(99,102,241,0.6), 0 0 60px rgba(139,92,246,0.3); }
        }
        .admin-particle { animation: float-particle var(--dur, 4s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .admin-login-card { animation: slide-up 0.5s ease-out forwards; }
        .admin-shake { animation: shake-card 0.5s ease-in-out; }
        .admin-glow-card { animation: pulse-glow 3s ease-in-out infinite; }
        .admin-input-wrap:focus-within {
          border-color: rgba(99,102,241,0.7) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .admin-input { background: transparent; outline: none; color: #fff; font-size: 0.875rem; width: 100%; }
        .admin-input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #24243e 60%, #0f0c29 100%)",
        }}
      >
        {/* Animated particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="admin-particle absolute rounded-full"
            style={
              {
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.color,
                "--dur": p.dur,
                "--delay": p.delay,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Gradient orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Card */}
        <div
          className={`admin-login-card admin-glow-card relative w-full max-w-md mx-4 rounded-2xl p-8 ${
            shake ? "admin-shake" : ""
          }`}
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {/* Branding */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 30px rgba(99,102,241,0.5)",
              }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: "#fff", letterSpacing: "-0.02em" }}
            >
              🛡️ Admin Panel
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Evergreen Hub — Secure Access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="admin-username"
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Username
              </label>
              <div
                className="admin-input-wrap flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <User
                  className="w-4 h-4 shrink-0"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  data-ocid="admin.input"
                  className="admin-input"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Password
              </label>
              <div
                className="admin-input-wrap flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <Lock
                  className="w-4 h-4 shrink-0"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  data-ocid="admin.input"
                  className="admin-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="shrink-0 transition-opacity hover:opacity-70"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm"
                style={{
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                }}
                data-ocid="admin.error_state"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              data-ocid="admin.submit_button"
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-all duration-200 mt-2"
              style={{
                background: loading
                  ? "rgba(99,102,241,0.5)"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.4)",
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.02em",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Login to Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs transition-opacity hover:opacity-80"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
