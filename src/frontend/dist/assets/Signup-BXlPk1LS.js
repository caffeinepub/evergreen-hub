import { u as useNavigate, a as useAuth, J as useActor, r as reactExports, j as jsxRuntimeExports, U as User, L as Lock, S as SiGoogle, c as SiDiscord, d as SiGithub, b as Link, ba as __vitePreload, e as ue, bb as getCrc32, bc as base32Encode, bd as base32Decode, be as JSON_KEY_PRINCIPAL, aF as Principal } from "./index-DtQIrmWF.js";
import { A as AnimatePresence } from "./index-BuFkMvMk.js";
import { m as motion } from "./proxy-CTajl9ht.js";
import { M as Mail } from "./mail-oMZijs0H.js";
import { E as EyeOff } from "./eye-off-b1JzHn0y.js";
import { E as Eye } from "./eye-BBn5m7g5.js";
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: `p${i}`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 3 + Math.floor(Math.random() * 9),
  dur: `${3 + Math.random() * 6}s`,
  delay: `${Math.random() * 4}s`,
  color: i % 3 === 0 ? `rgba(16,185,129,${0.4 + Math.random() * 0.5})` : i % 3 === 1 ? `rgba(59,130,246,${0.4 + Math.random() * 0.5})` : `rgba(139,92,246,${0.3 + Math.random() * 0.4})`
}));
function WelcomePopup({ onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
      },
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { scale: 0.6, opacity: 0, y: 40 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.8, opacity: 0 },
          transition: { type: "spring", damping: 18, stiffness: 200 },
          onClick: (e) => e.stopPropagation(),
          style: {
            background: "rgba(0,0,0,0.9)",
            border: "2px solid rgba(16,185,129,0.5)",
            borderRadius: 28,
            padding: "44px 40px",
            textAlign: "center",
            maxWidth: 380,
            width: "100%",
            boxShadow: "0 0 60px rgba(16,185,129,0.3), 0 0 120px rgba(59,130,246,0.15)",
            fontFamily: "Poppins, sans-serif"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: [0, 1.2, 1] },
                transition: { delay: 0.2, duration: 0.5 },
                style: { fontSize: 60, marginBottom: 16 },
                children: "🚀"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                style: {
                  background: "linear-gradient(135deg, #10b981, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: 26,
                  fontWeight: 800,
                  margin: "0 0 10px"
                },
                children: "Welcome to Evergreen Hub!"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: {
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 15,
                  margin: "0 0 24px"
                },
                children: "Your account has been created successfully. Let's grow together! 🌿"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                style: {
                  background: "linear-gradient(135deg, #10b981, #3b82f6)",
                  border: "none",
                  borderRadius: 14,
                  padding: "12px 32px",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: "0 4px 20px rgba(16,185,129,0.4)"
                },
                children: "Let's Get Started →"
              }
            )
          ]
        }
      )
    }
  );
}
function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { actor } = useActor();
  const [signupState, setSignupState] = reactExports.useState("idle");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [shake, setShake] = reactExports.useState(false);
  const [showWelcome, setShowWelcome] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const e = {};
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
  const handleSubmit = async (e) => {
    var _a;
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
        let referrerPrincipal = null;
        if (refParam) {
          try {
            const { Principal: Principal2 } = await __vitePreload(async () => {
              const { Principal: Principal3 } = await Promise.resolve().then(() => index);
              return { Principal: Principal3 };
            }, true ? void 0 : void 0);
            referrerPrincipal = Principal2.fromText(refParam);
          } catch {
          }
        }
        await actor.registerUser(
          formData.name,
          formData.email,
          "",
          referrerPrincipal
        );
      }
      setSignupState("success");
      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
        navigate({ to: "/dashboard" });
      }, 3e3);
    } catch (err) {
      setSignupState("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setSignupState("idle"), 1500);
      if ((_a = err == null ? void 0 : err.message) == null ? void 0 : _a.includes("already registered")) {
        ue.error("Account already exists. Try signing in.");
      } else {
        ue.error("Registration failed. Please try again.");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };
  const handleSocial = async (_provider) => {
    setSignupState("loading");
    try {
      await login();
      if (actor) {
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get("ref");
        let referrerPrincipal = null;
        if (refParam) {
          try {
            const { Principal: Principal2 } = await __vitePreload(async () => {
              const { Principal: Principal3 } = await Promise.resolve().then(() => index);
              return { Principal: Principal3 };
            }, true ? void 0 : void 0);
            referrerPrincipal = Principal2.fromText(refParam);
          } catch {
          }
        }
        try {
          await actor.registerUser("User", "", "", referrerPrincipal);
        } catch {
        }
      }
      setSignupState("success");
      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
        navigate({ to: "/dashboard" });
      }, 3e3);
    } catch {
      setSignupState("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setSignupState("idle"), 1500);
      ue.error("Sign up failed. Please try again.");
    }
  };
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };
  const strength = getStrength(formData.password);
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"];
  const btnBg = signupState === "success" ? "linear-gradient(135deg, #059669, #047857)" : signupState === "error" ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
        .signup-shake { animation: shakeFx 0.6s ease; }
        .eg-particle { animation: particle-float var(--pdur, 4s) ease-in-out var(--pdelay, 0s) infinite; }
        .eg-signup-input {
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
        .eg-signup-input::placeholder { color: rgba(255,255,255,0.25); }
        .eg-signup-input:focus {
          border-color: rgba(16,185,129,0.7);
          background: rgba(16,185,129,0.06);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12), 0 0 15px rgba(16,185,129,0.3);
        }
        .eg-signup-input.error { border-color: rgba(239,68,68,0.6); }
        .eg-signup-btn {
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
        .eg-signup-btn:not(:disabled):hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(16,185,129,0.5), 0 0 20px rgba(59,130,246,0.3) !important;
        }
        .eg-signup-btn:disabled { opacity: 0.7; cursor: not-allowed; }
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
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showWelcome && /* @__PURE__ */ jsxRuntimeExports.jsx(
      WelcomePopup,
      {
        onClose: () => {
          setShowWelcome(false);
          navigate({ to: "/dashboard" });
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: "linear-gradient(145deg, #000000 0%, #0a1628 30%, #001a0a 60%, #000000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif"
        },
        children: [
          PARTICLES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "eg-particle absolute rounded-full pointer-events-none",
              style: {
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.color,
                filter: `blur(${p.size > 6 ? 2 : 1}px)`,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                "--pdur": p.dur,
                "--pdelay": p.delay
              }
            },
            p.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                width: 500,
                height: 500,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
                top: "-150px",
                left: "-100px",
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                width: 400,
                height: 400,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
                filter: "blur(60px)",
                bottom: "-100px",
                right: "-80px",
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 36 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              style: {
                width: "100%",
                maxWidth: 460,
                position: "relative",
                zIndex: 10
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 24 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { scale: 0.7, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      transition: { duration: 0.5, delay: 0.1 },
                      style: { display: "inline-block", position: "relative" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              inset: -8,
                              borderRadius: "50%",
                              background: "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(59,130,246,0.2) 50%, transparent 70%)",
                              filter: "blur(12px)",
                              animation: "neon-pulse 3s ease-in-out infinite"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: "/logo.png",
                            alt: "Evergreen Hub",
                            onError: (e) => {
                              e.target.style.display = "none";
                            },
                            style: {
                              width: 88,
                              height: 88,
                              objectFit: "contain",
                              borderRadius: 22,
                              border: "2px solid rgba(16,185,129,0.4)",
                              position: "relative",
                              display: "block"
                            }
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      style: {
                        background: "linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "gradient-shift 4s linear infinite",
                        fontSize: 27,
                        fontWeight: 800,
                        margin: "12px 0 0",
                        letterSpacing: "-0.5px"
                      },
                      children: "Evergreen Hub"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: "rgba(16,185,129,0.65)",
                        fontSize: 11,
                        marginTop: 5,
                        fontWeight: 500,
                        letterSpacing: "2px",
                        textTransform: "uppercase"
                      },
                      children: "Grow · Create · Connect"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: shake ? "signup-shake" : "",
                    style: {
                      background: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(28px)",
                      WebkitBackdropFilter: "blur(28px)",
                      border: "1.5px solid rgba(16,185,129,0.2)",
                      borderRadius: 28,
                      padding: "34px 32px 30px",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.04)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          style: {
                            background: "linear-gradient(135deg, #fff 30%, #10b981 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            fontSize: 21,
                            fontWeight: 700,
                            margin: "0 0 5px",
                            textAlign: "center"
                          },
                          children: "Create Your Account ✨"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "rgba(255,255,255,0.35)",
                            fontSize: 13,
                            textAlign: "center",
                            margin: "0 0 22px"
                          },
                          children: "Join Evergreen Hub and grow your digital presence"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14, position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: 15,
                                top: errors.name ? 15 : "50%",
                                transform: errors.name ? "none" : "translateY(-50%)",
                                color: "rgba(16,185,129,0.6)",
                                pointerEvents: "none"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16 })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              name: "name",
                              type: "text",
                              placeholder: "Full Name",
                              value: formData.name,
                              onChange: handleChange,
                              className: `eg-signup-input${errors.name ? " error" : ""}`,
                              "data-ocid": "signup.input"
                            }
                          ),
                          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#f87171",
                                fontSize: 11,
                                margin: "4px 0 0 4px"
                              },
                              "data-ocid": "signup.error_state",
                              children: errors.name
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14, position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: 15,
                                top: errors.email ? 15 : "50%",
                                transform: errors.email ? "none" : "translateY(-50%)",
                                color: "rgba(16,185,129,0.6)",
                                pointerEvents: "none"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              name: "email",
                              type: "email",
                              placeholder: "Email Address",
                              value: formData.email,
                              onChange: handleChange,
                              className: `eg-signup-input${errors.email ? " error" : ""}`,
                              "data-ocid": "signup.input"
                            }
                          ),
                          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#f87171",
                                fontSize: 11,
                                margin: "4px 0 0 4px"
                              },
                              "data-ocid": "signup.error_state",
                              children: errors.email
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            style: {
                              marginBottom: formData.password ? 8 : 14,
                              position: "relative"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    position: "absolute",
                                    left: 15,
                                    top: errors.password ? 15 : "50%",
                                    transform: errors.password ? "none" : "translateY(-50%)",
                                    color: "rgba(16,185,129,0.6)",
                                    pointerEvents: "none"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16 })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "input",
                                {
                                  name: "password",
                                  type: showPassword ? "text" : "password",
                                  placeholder: "Password",
                                  value: formData.password,
                                  onChange: handleChange,
                                  className: `eg-signup-input${errors.password ? " error" : ""}`,
                                  style: { paddingRight: 46 },
                                  "data-ocid": "signup.input"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => setShowPassword(!showPassword),
                                  style: {
                                    position: "absolute",
                                    right: 14,
                                    top: errors.password ? 15 : "50%",
                                    transform: errors.password ? "none" : "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "rgba(16,185,129,0.6)",
                                    display: "flex",
                                    padding: 0
                                  },
                                  "data-ocid": "signup.toggle",
                                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                                }
                              ),
                              errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    color: "#f87171",
                                    fontSize: 11,
                                    margin: "4px 0 0 4px"
                                  },
                                  "data-ocid": "signup.error_state",
                                  children: errors.password
                                }
                              )
                            ]
                          }
                        ),
                        formData.password && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 4, marginBottom: 4 }, children: [1, 2, 3, 4].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                flex: 1,
                                height: 3,
                                borderRadius: 4,
                                background: strength >= s ? strengthColors[strength] : "rgba(255,255,255,0.1)",
                                transition: "background 0.3s"
                              }
                            },
                            s
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: strengthColors[strength] || "rgba(255,255,255,0.3)",
                                fontSize: 11
                              },
                              children: strengthLabels[strength] ? `Password strength: ${strengthLabels[strength]}` : ""
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22, position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: 15,
                                top: errors.confirmPassword ? 15 : "50%",
                                transform: errors.confirmPassword ? "none" : "translateY(-50%)",
                                color: "rgba(16,185,129,0.6)",
                                pointerEvents: "none"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16 })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              name: "confirmPassword",
                              type: showConfirm ? "text" : "password",
                              placeholder: "Confirm Password",
                              value: formData.confirmPassword,
                              onChange: handleChange,
                              className: `eg-signup-input${errors.confirmPassword ? " error" : ""}`,
                              style: { paddingRight: 46 },
                              "data-ocid": "signup.input"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => setShowConfirm(!showConfirm),
                              style: {
                                position: "absolute",
                                right: 14,
                                top: errors.confirmPassword ? 15 : "50%",
                                transform: errors.confirmPassword ? "none" : "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "rgba(16,185,129,0.6)",
                                display: "flex",
                                padding: 0
                              },
                              "data-ocid": "signup.toggle",
                              children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                            }
                          ),
                          errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#f87171",
                                fontSize: 11,
                                margin: "4px 0 0 4px"
                              },
                              "data-ocid": "signup.error_state",
                              children: errors.confirmPassword
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "submit",
                            className: "eg-signup-btn",
                            disabled: signupState === "loading" || signupState === "success",
                            style: { background: btnBg, marginBottom: 20 },
                            "data-ocid": "signup.submit_button",
                            children: [
                              signupState === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    width: 17,
                                    height: 17,
                                    border: "2px solid rgba(255,255,255,0.3)",
                                    borderTopColor: "#fff",
                                    borderRadius: "50%",
                                    animation: "spin 0.7s linear infinite",
                                    display: "inline-block"
                                  }
                                }
                              ),
                              signupState === "loading" && "Creating Account...",
                              signupState === "success" && "✓ Account Created!",
                              signupState === "error" && "✗ Try Again",
                              signupState === "idle" && "Create Account 🌿"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 16
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  flex: 1,
                                  height: 1,
                                  background: "rgba(16,185,129,0.15)"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "rgba(255,255,255,0.25)",
                                  fontSize: 12,
                                  fontWeight: 500
                                },
                                children: "or sign up with"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  flex: 1,
                                  height: 1,
                                  background: "rgba(16,185,129,0.15)"
                                }
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 24 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "eg-social-btn",
                            onClick: () => handleSocial(),
                            "data-ocid": "signup.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SiGoogle, { size: 15, color: "#EA4335" }),
                              " Google"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "eg-social-btn",
                            onClick: () => handleSocial(),
                            "data-ocid": "signup.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SiDiscord, { size: 15, color: "#5865F2" }),
                              " Discord"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "eg-social-btn",
                            onClick: () => handleSocial(),
                            "data-ocid": "signup.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SiGithub, { size: 15, color: "#fff" }),
                              " GitHub"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          style: {
                            textAlign: "center",
                            color: "rgba(255,255,255,0.35)",
                            fontSize: 13,
                            margin: 0
                          },
                          children: [
                            "Already have an account?",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Link,
                              {
                                to: "/login",
                                style: {
                                  color: "#10b981",
                                  fontWeight: 700,
                                  textDecoration: "none"
                                },
                                "data-ocid": "signup.link",
                                children: "Sign In"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    style: {
                      textAlign: "center",
                      color: "rgba(255,255,255,0.18)",
                      fontSize: 12,
                      marginTop: 20
                    },
                    children: [
                      "© ",
                      (/* @__PURE__ */ new Date()).getFullYear(),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          style: {
                            color: "rgba(255,255,255,0.18)",
                            textDecoration: "none"
                          },
                          children: "Built by Rudra in Bihar with ❤️"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  Signup as default
};
