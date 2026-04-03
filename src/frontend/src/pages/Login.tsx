import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiDiscord, SiGithub, SiGoogle } from "react-icons/si";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

// 25 glowing particles for neon effect
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: `p${i}`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 3 + Math.floor(Math.random() * 9),
  dur: `${3 + Math.random() * 6}s`,
  delay: `${Math.random() * 4}s`,
  color:
    i % 3 === 0
      ? `rgba(16,185,129,${0.4 + Math.random() * 0.5})`
      : i % 3 === 1
        ? `rgba(59,130,246,${0.4 + Math.random() * 0.5})`
        : `rgba(139,92,246,${0.3 + Math.random() * 0.4})`,
}));

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitializing } = useAuth();
  const [loginState, setLoginState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const handleLogin = async () => {
    setLoginState("loading");
    try {
      await login();
      setLoginState("success");
      toast.success("Welcome back to Evergreen Hub! 🌿");
      setTimeout(() => navigate({ to: "/dashboard" }), 800);
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginState("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setLoginState("idle"), 1500);
      toast.error("Login failed. Please try again.");
    }
  };

  if (isInitializing) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #000000 0%, #0a1628 40%, #001a0a 70%, #000000 100%)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid rgba(16,185,129,0.3)",
            borderTopColor: "#10b981",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  const btnBg =
    loginState === "success"
      ? "linear-gradient(135deg, #059669, #047857)"
      : loginState === "error"
        ? "linear-gradient(135deg, #ef4444, #dc2626)"
        : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shakeFx {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-10px); }
          30% { transform: translateX(10px); }
          45% { transform: translateX(-8px); }
          60% { transform: translateX(8px); }
          75% { transform: translateX(-4px); }
          90% { transform: translateX(4px); }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.3); opacity: 1; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes neon-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.4), 0 0 16px rgba(16,185,129,0.2); }
          50% { box-shadow: 0 0 16px rgba(16,185,129,0.7), 0 0 32px rgba(59,130,246,0.4); }
        }
        .login-shake { animation: shakeFx 0.6s ease; }
        .eg-particle { animation: particle-float var(--pdur, 4s) ease-in-out var(--pdelay, 0s) infinite; }
        .eg-login-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(16,185,129,0.25);
          border-radius: 14px;
          padding: 13px 16px 13px 46px;
          color: #e2fdf4;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
        }
        .eg-login-input::placeholder { color: rgba(255,255,255,0.25); }
        .eg-login-input:focus {
          border-color: rgba(16,185,129,0.7);
          background: rgba(16,185,129,0.06);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12), 0 0 15px rgba(16,185,129,0.3);
        }
        .eg-login-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 14px;
          color: #fff;
          font-family: Poppins, sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.25s, opacity 0.2s;
          animation: neon-pulse 3s ease-in-out infinite;
        }
        .eg-login-btn:not(:disabled):hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(16,185,129,0.5), 0 0 20px rgba(59,130,246,0.3) !important;
        }
        .eg-login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .eg-social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 8px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          font-family: Poppins, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.2s;
        }
        .eg-social-btn:hover {
          background: rgba(16,185,129,0.1);
          border-color: rgba(16,185,129,0.4);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(16,185,129,0.15);
          color: #fff;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(145deg, #000000 0%, #0a1628 30%, #001a0a 60%, #000000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Glowing particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="eg-particle absolute rounded-full pointer-events-none"
            style={
              {
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.color,
                filter: `blur(${p.size > 6 ? 2 : 1}px)`,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                "--pdur": p.dur,
                "--pdelay": p.delay,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Large glow orbs */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            top: "-150px",
            left: "-100px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            bottom: "-100px",
            right: "-80px",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            maxWidth: 430,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "inline-block", position: "relative" }}
            >
              {/* Glow ring behind logo */}
              <div
                style={{
                  position: "absolute",
                  inset: -8,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
                  filter: "blur(12px)",
                  animation: "neon-pulse 3s ease-in-out infinite",
                }}
              />
              <img
                src="/logo.png"
                alt="Evergreen Hub"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                style={{
                  width: 88,
                  height: 88,
                  objectFit: "contain",
                  borderRadius: 22,
                  border: "2px solid rgba(16,185,129,0.4)",
                  position: "relative",
                  display: "block",
                }}
              />
            </motion.div>
            <h1
              style={{
                background:
                  "linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 4s linear infinite",
                fontSize: 27,
                fontWeight: 800,
                margin: "12px 0 0",
                letterSpacing: "-0.5px",
              }}
            >
              Evergreen Hub
            </h1>
            <p
              style={{
                color: "rgba(16,185,129,0.65)",
                fontSize: 11,
                marginTop: 5,
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Grow · Create · Connect
            </p>
          </div>

          {/* Glass card */}
          <div
            className={shake ? "login-shake" : ""}
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1.5px solid rgba(16,185,129,0.2)",
              borderRadius: 28,
              padding: "38px 32px 34px",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <h2
              style={{
                background: "linear-gradient(135deg, #fff 30%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: 21,
                fontWeight: 700,
                margin: "0 0 5px",
                textAlign: "center",
              }}
            >
              Welcome Back 👋
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 13,
                textAlign: "center",
                margin: "0 0 26px",
              }}
            >
              Sign in to your Evergreen Hub account
            </p>

            {/* Email field */}
            <div style={{ marginBottom: 14, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(16,185,129,0.6)",
                  pointerEvents: "none",
                }}
              >
                <Mail size={16} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="eg-login-input"
                data-ocid="login.input"
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: 10, position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(16,185,129,0.6)",
                  pointerEvents: "none",
                }}
              >
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="eg-login-input"
                style={{ paddingRight: 46 }}
                data-ocid="login.input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(16,185,129,0.6)",
                  display: "flex",
                  padding: 0,
                }}
                data-ocid="login.toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginBottom: 22 }}>
              <Link
                to="/forgot-password"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#10b981",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                  padding: 0,
                  textDecoration: "none",
                }}
                data-ocid="login.link"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login button */}
            <button
              type="button"
              className="eg-login-btn"
              onClick={handleLogin}
              disabled={loginState === "loading" || loginState === "success"}
              style={{ background: btnBg, marginBottom: 20 }}
              data-ocid="login.submit_button"
            >
              {loginState === "loading" && (
                <span
                  style={{
                    width: 17,
                    height: 17,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                    display: "inline-block",
                  }}
                />
              )}
              {loginState === "loading" && "Signing In..."}
              {loginState === "success" && "✓ Signed In!"}
              {loginState === "error" && "✗ Try Again"}
              {loginState === "idle" && "Sign In 🌿"}
            </button>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(16,185,129,0.15)",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                or continue with
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(16,185,129,0.15)",
                }}
              />
            </div>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <button
                type="button"
                className="eg-social-btn"
                onClick={handleLogin}
                data-ocid="login.button"
              >
                <SiGoogle size={15} color="#EA4335" /> Google
              </button>
              <button
                type="button"
                className="eg-social-btn"
                onClick={handleLogin}
                data-ocid="login.button"
              >
                <SiDiscord size={15} color="#5865F2" /> Discord
              </button>
              <button
                type="button"
                className="eg-social-btn"
                onClick={handleLogin}
                data-ocid="login.button"
              >
                <SiGithub size={15} color="#fff" /> GitHub
              </button>
            </div>

            <p
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
                margin: 0,
              }}
            >
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#10b981",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
                data-ocid="login.link"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.18)",
              fontSize: 12,
              marginTop: 20,
            }}
          >
            © {new Date().getFullYear()}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.18)",
                textDecoration: "none",
              }}
            >
              Built by Rudra in Bihar with ❤️
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
}
