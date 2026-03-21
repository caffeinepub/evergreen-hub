import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiDiscord, SiGithub, SiGoogle } from "react-icons/si";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { useActor } from "../hooks/useActor";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { actor } = useActor();
  const [signupState, setSignupState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shake, setShake] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email format";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8)
      e.password = "At least 8 characters required";
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setSignupState("loading");
    try {
      await login();
      await new Promise((r) => setTimeout(r, 800));
      if (actor) {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get("ref");
        let referrerPrincipal: import("@dfinity/principal").Principal | null =
          null;
        if (refParam) {
          try {
            const { Principal } = await import("@dfinity/principal");
            referrerPrincipal = Principal.fromText(refParam);
          } catch {
            /* ignore */
          }
        }
        await actor.registerUser(
          formData.name,
          formData.email,
          "",
          referrerPrincipal,
        );
      }
      setSignupState("success");
      toast.success("Account created! Welcome to Evergreen Hub 🌿");
      setTimeout(() => navigate({ to: "/dashboard" }), 800);
    } catch (err: any) {
      setSignupState("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setSignupState("idle"), 1500);
      if (err?.message?.includes("already registered")) {
        toast.error("Account already exists. Try signing in.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSocial = async (_provider: string) => {
    setSignupState("loading");
    try {
      await login();
      if (actor) {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get("ref");
        let referrerPrincipal: import("@dfinity/principal").Principal | null =
          null;
        if (refParam) {
          try {
            const { Principal } = await import("@dfinity/principal");
            referrerPrincipal = Principal.fromText(refParam);
          } catch {
            /* ignore */
          }
        }
        try {
          await actor.registerUser("User", "", "", referrerPrincipal);
        } catch {
          /* already registered */
        }
      }
      setSignupState("success");
      toast.success("Welcome to Evergreen Hub 🌿");
      setTimeout(() => navigate({ to: "/dashboard" }), 800);
    } catch {
      setSignupState("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setSignupState("idle"), 1500);
      toast.error("Sign up failed. Please try again.");
    }
  };

  const btnBg =
    signupState === "success"
      ? "linear-gradient(135deg, #10b981, #059669)"
      : signupState === "error"
        ? "linear-gradient(135deg, #ef4444, #dc2626)"
        : "linear-gradient(135deg, #059669 0%, #0d9488 100%)";

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
        @keyframes successPulse {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        @keyframes leaf-drift {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(20px,-30px) rotate(8deg); }
          66% { transform: translate(-15px,-15px) rotate(-5deg); }
        }
        .eg-card-shake { animation: shakeFx 0.6s ease; }
        .eg-input {
          width: 100%;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 13px 16px 13px 44px;
          color: #1a3a2a;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
        }
        .eg-input::placeholder { color: rgba(30,80,50,0.45); }
        .eg-input:focus {
          border-color: rgba(16,185,129,0.7);
          background: rgba(255,255,255,0.22);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.18);
        }
        .eg-input.error { border-color: rgba(239,68,68,0.7); }
        .eg-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          color: white;
          font-family: Poppins, sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 20px rgba(5,150,105,0.35);
        }
        .eg-btn:not(:disabled):hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(5,150,105,0.55);
        }
        .eg-btn.success-state { animation: successPulse 0.8s ease; }
        .eg-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 8px;
          background: rgba(255,255,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          font-family: Poppins, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a4a30;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(5,150,105,0.2);
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(145deg, #d1fae5 0%, #a7f3d0 20%, #6ee7b7 45%, #5eead4 70%, #99f6e4 90%, #d1fae5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Floating orbs */}
        {[
          {
            id: "orb1",
            s: 360,
            bg: "rgba(5,150,105,0.18)",
            t: "-80px",
            l: "-80px",
            dur: "10s",
            delay: 0,
          },
          {
            id: "orb2",
            s: 280,
            bg: "rgba(13,148,136,0.15)",
            b: "-60px",
            r: "-60px",
            dur: "13s",
            delay: 1.5,
          },
          {
            id: "orb3",
            s: 200,
            bg: "rgba(52,211,153,0.2)",
            t: "40%",
            r: "8%",
            dur: "8s",
            delay: 3,
          },
          {
            id: "orb4",
            s: 150,
            bg: "rgba(16,185,129,0.12)",
            b: "25%",
            l: "4%",
            dur: "11s",
            delay: 4.5,
          },
        ].map((o) => (
          <div
            key={o.id}
            style={{
              position: "absolute",
              width: o.s,
              height: o.s,
              borderRadius: "50%",
              background: o.bg,
              filter: "blur(60px)",
              pointerEvents: "none",
              top: (o as any).t,
              left: (o as any).l,
              bottom: (o as any).b,
              right: (o as any).r,
              animation: `leaf-drift ${o.dur} ease-in-out ${o.delay}s infinite`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", maxWidth: 460 }}
        >
          {/* Logo + branding */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <motion.img
              src="/logo.png"
              alt="Evergreen Hub"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/CC_20260226_043346-1.png";
              }}
              style={{
                width: 90,
                height: 90,
                objectFit: "contain",
                borderRadius: 20,
                marginBottom: 12,
                filter: "drop-shadow(0 4px 16px rgba(5,150,105,0.35))",
              }}
            />
            <h1
              style={{
                color: "#064e3b",
                fontSize: 26,
                fontWeight: 800,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Evergreen Hub
            </h1>
            <p
              style={{
                color: "#065f46",
                fontSize: 13,
                marginTop: 6,
                marginBottom: 0,
                fontWeight: 500,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                opacity: 0.75,
              }}
            >
              Grow, Create, Connect
            </p>
          </div>

          {/* Card */}
          <div
            className={shake ? "eg-card-shake" : ""}
            style={{
              background: "rgba(255,255,255,0.52)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid rgba(255,255,255,0.65)",
              borderRadius: 28,
              padding: "36px 32px 32px",
              boxShadow:
                "0 20px 60px rgba(5,150,105,0.18), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <h2
              style={{
                color: "#064e3b",
                fontSize: 20,
                fontWeight: 700,
                margin: "0 0 6px",
                textAlign: "center",
              }}
            >
              Create your account ✨
            </h2>
            <p
              style={{
                color: "#065f46",
                opacity: 0.65,
                fontSize: 13,
                textAlign: "center",
                margin: "0 0 24px",
              }}
            >
              Join thousands growing online with Evergreen Hub
            </p>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: 14, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(5,150,105,0.7)",
                    pointerEvents: "none",
                    display: "flex",
                  }}
                >
                  <User size={16} />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`eg-input${errors.name ? " error" : ""}`}
                  data-ocid="signup.input"
                />
                {errors.name && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: 11,
                      margin: "4px 0 0 4px",
                    }}
                    data-ocid="signup.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: 14, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: errors.email ? 15 : "50%",
                    transform: errors.email ? "none" : "translateY(-50%)",
                    color: "rgba(5,150,105,0.7)",
                    pointerEvents: "none",
                    display: "flex",
                  }}
                >
                  <Mail size={16} />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`eg-input${errors.email ? " error" : ""}`}
                  data-ocid="signup.input"
                />
                {errors.email && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: 11,
                      margin: "4px 0 0 4px",
                    }}
                    data-ocid="signup.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div style={{ marginBottom: 14, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: errors.password ? 15 : "50%",
                    transform: errors.password ? "none" : "translateY(-50%)",
                    color: "rgba(5,150,105,0.7)",
                    pointerEvents: "none",
                    display: "flex",
                  }}
                >
                  <Lock size={16} />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`eg-input${errors.password ? " error" : ""}`}
                  style={{ paddingRight: 44 }}
                  data-ocid="signup.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: errors.password ? 15 : "50%",
                    transform: errors.password ? "none" : "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(5,150,105,0.6)",
                    display: "flex",
                    padding: 0,
                  }}
                  data-ocid="signup.toggle"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.password && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: 11,
                      margin: "4px 0 0 4px",
                    }}
                    data-ocid="signup.error_state"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: 22, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    top: errors.confirmPassword ? 15 : "50%",
                    transform: errors.confirmPassword
                      ? "none"
                      : "translateY(-50%)",
                    color: "rgba(5,150,105,0.7)",
                    pointerEvents: "none",
                    display: "flex",
                  }}
                >
                  <Lock size={16} />
                </div>
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`eg-input${errors.confirmPassword ? " error" : ""}`}
                  style={{ paddingRight: 44 }}
                  data-ocid="signup.input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: errors.confirmPassword ? 15 : "50%",
                    transform: errors.confirmPassword
                      ? "none"
                      : "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(5,150,105,0.6)",
                    display: "flex",
                    padding: 0,
                  }}
                  data-ocid="signup.toggle"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.confirmPassword && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: 11,
                      margin: "4px 0 0 4px",
                    }}
                    data-ocid="signup.error_state"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`eg-btn${signupState === "success" ? " success-state" : ""}`}
                disabled={
                  signupState === "loading" || signupState === "success"
                }
                style={{ background: btnBg, marginBottom: 20 }}
                data-ocid="signup.submit_button"
              >
                {signupState === "loading" && (
                  <span
                    style={{
                      width: 17,
                      height: 17,
                      border: "2px solid rgba(255,255,255,0.35)",
                      borderTopColor: "white",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }}
                  />
                )}
                {signupState === "loading" && "Creating Account..."}
                {signupState === "success" && "✓ Account Created!"}
                {signupState === "error" && "✗ Try Again"}
                {signupState === "idle" && "Create Account 🌿"}
              </button>
            </form>

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
                  background: "rgba(5,150,105,0.2)",
                }}
              />
              <span
                style={{
                  color: "rgba(6,78,59,0.5)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                or sign up with
              </span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(5,150,105,0.2)",
                }}
              />
            </div>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 22 }}>
              <button
                type="button"
                className="social-btn"
                onClick={() => handleSocial("Google")}
                data-ocid="signup.button"
              >
                <SiGoogle size={16} color="#EA4335" /> Google
              </button>
              <button
                type="button"
                className="social-btn"
                onClick={() => handleSocial("Discord")}
                data-ocid="signup.button"
              >
                <SiDiscord size={16} color="#5865F2" /> Discord
              </button>
              <button
                type="button"
                className="social-btn"
                onClick={() => handleSocial("GitHub")}
                data-ocid="signup.button"
              >
                <SiGithub size={16} color="#24292e" /> GitHub
              </button>
            </div>

            <p
              style={{
                textAlign: "center",
                color: "rgba(6,78,59,0.65)",
                fontSize: 13,
                margin: 0,
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#059669",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
                data-ocid="signup.link"
              >
                Sign In
              </Link>
            </p>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "rgba(6,78,59,0.45)",
              fontSize: 12,
              marginTop: 20,
            }}
          >
            © {new Date().getFullYear()} Built by Rudra in Bihar with ❤️
          </p>
        </motion.div>
      </div>
    </>
  );
}
