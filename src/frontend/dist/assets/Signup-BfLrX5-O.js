import { u as useNavigate, a as useAuth, G as useActor, r as reactExports, j as jsxRuntimeExports, U as User, L as Lock, S as SiGoogle, b as SiDiscord, c as SiGithub, d as Link, bb as __vitePreload, e as ue, bc as getCrc32, bd as base32Encode, be as base32Decode, bf as JSON_KEY_PRINCIPAL, aA as Principal } from "./index-DHWa7f2a.js";
import { m as motion, E as EyeOff } from "./proxy-DekdxjyF.js";
import { M as Mail } from "./mail-iQLhNMLR.js";
import { E as Eye } from "./eye-64kBEmM1.js";
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  JSON_KEY_PRINCIPAL,
  Principal,
  base32Decode,
  base32Encode,
  getCrc32
}, Symbol.toStringTag, { value: "Module" }));
function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { actor } = useActor();
  const [loading, setLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
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
    if (!validate()) return;
    setLoading(true);
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
      ue.success("Account created! Welcome to Evergreen Hub 🌿");
      navigate({ to: "/dashboard" });
    } catch (err) {
      if ((_a = err == null ? void 0 : err.message) == null ? void 0 : _a.includes("already registered")) {
        ue.error("Account already exists. Try signing in.");
      } else {
        ue.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };
  const handleSocial = (provider) => {
    ue.info(
      `Sign up with Internet Identity for secure access — ${provider} social login coming soon!`
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .eg-input {
          width: 100%;
          background: rgba(255,255,255,0.12);
          border: 1.5px solid rgba(255,255,255,0.25);
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
          background: linear-gradient(135deg, #059669 0%, #0d9488 100%);
          color: white;
          font-family: Poppins, sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 20px rgba(5,150,105,0.4);
        }
        .eg-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(5,150,105,0.55);
        }
        .eg-btn:active:not(:disabled) { transform: scale(0.97); }
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
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes leaf-drift {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33% { transform: translate(20px,-30px) rotate(8deg); }
          66% { transform: translate(-15px,-15px) rotate(-5deg); }
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: "linear-gradient(145deg, #d1fae5 0%, #a7f3d0 20%, #6ee7b7 45%, #5eead4 70%, #99f6e4 90%, #d1fae5 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif"
        },
        children: [
          [
            {
              id: "orb1",
              s: 360,
              bg: "rgba(5,150,105,0.18)",
              t: "-80px",
              l: "-80px",
              dur: "10s",
              delay: 0
            },
            {
              id: "orb2",
              s: 280,
              bg: "rgba(13,148,136,0.15)",
              b: "-60px",
              r: "-60px",
              dur: "13s",
              delay: 1.5
            },
            {
              id: "orb3",
              s: 200,
              bg: "rgba(52,211,153,0.2)",
              t: "40%",
              r: "8%",
              dur: "8s",
              delay: 3
            },
            {
              id: "orb4",
              s: 150,
              bg: "rgba(16,185,129,0.12)",
              b: "25%",
              l: "4%",
              dur: "11s",
              delay: 4.5
            }
          ].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                position: "absolute",
                width: o.s,
                height: o.s,
                borderRadius: "50%",
                background: o.bg,
                filter: "blur(60px)",
                pointerEvents: "none",
                top: o.t,
                left: o.l,
                bottom: o.b,
                right: o.r,
                animation: `leaf-drift ${o.dur} ease-in-out ${o.delay}s infinite`
              }
            },
            o.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              style: { width: "100%", maxWidth: 460 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.img,
                    {
                      src: "/logo.png",
                      alt: "Evergreen Hub",
                      initial: { scale: 0.8, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      transition: { duration: 0.5, delay: 0.1 },
                      style: {
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        borderRadius: 20,
                        marginBottom: 12,
                        filter: "drop-shadow(0 4px 16px rgba(5,150,105,0.35))"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h1",
                    {
                      style: {
                        color: "#064e3b",
                        fontSize: 26,
                        fontWeight: 800,
                        margin: 0,
                        letterSpacing: "-0.5px"
                      },
                      children: "Evergreen Hub"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      style: {
                        color: "#065f46",
                        fontSize: 13,
                        marginTop: 6,
                        marginBottom: 0,
                        fontWeight: 500,
                        letterSpacing: "0.8px",
                        textTransform: "uppercase",
                        opacity: 0.75
                      },
                      children: "Grow, Create, Connect"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    style: {
                      background: "rgba(255,255,255,0.52)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1.5px solid rgba(255,255,255,0.65)",
                      borderRadius: 28,
                      padding: "36px 32px 32px",
                      boxShadow: "0 20px 60px rgba(5,150,105,0.18), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          style: {
                            color: "#064e3b",
                            fontSize: 20,
                            fontWeight: 700,
                            margin: "0 0 6px",
                            textAlign: "center"
                          },
                          children: "Create your account"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: {
                            color: "#065f46",
                            opacity: 0.65,
                            fontSize: 13,
                            textAlign: "center",
                            margin: "0 0 24px"
                          },
                          children: "Join thousands growing online with Evergreen Hub"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14, position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: 14,
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "rgba(5,150,105,0.7)",
                                pointerEvents: "none",
                                display: "flex"
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
                              className: `eg-input${errors.name ? " error" : ""}`,
                              "data-ocid": "signup.input"
                            }
                          ),
                          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#dc2626",
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
                                left: 14,
                                top: errors.email ? 15 : "50%",
                                transform: errors.email ? "none" : "translateY(-50%)",
                                color: "rgba(5,150,105,0.7)",
                                pointerEvents: "none",
                                display: "flex"
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
                              className: `eg-input${errors.email ? " error" : ""}`,
                              "data-ocid": "signup.input"
                            }
                          ),
                          errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "#dc2626",
                                fontSize: 11,
                                margin: "4px 0 0 4px"
                              },
                              "data-ocid": "signup.error_state",
                              children: errors.email
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14, position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: 14,
                                top: errors.password ? 15 : "50%",
                                transform: errors.password ? "none" : "translateY(-50%)",
                                color: "rgba(5,150,105,0.7)",
                                pointerEvents: "none",
                                display: "flex"
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
                              className: `eg-input${errors.password ? " error" : ""}`,
                              style: { paddingRight: 44 },
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
                                color: "rgba(5,150,105,0.6)",
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
                                color: "#dc2626",
                                fontSize: 11,
                                margin: "4px 0 0 4px"
                              },
                              "data-ocid": "signup.error_state",
                              children: errors.password
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22, position: "relative" }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                position: "absolute",
                                left: 14,
                                top: errors.confirmPassword ? 15 : "50%",
                                transform: errors.confirmPassword ? "none" : "translateY(-50%)",
                                color: "rgba(5,150,105,0.7)",
                                pointerEvents: "none",
                                display: "flex"
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
                              className: `eg-input${errors.confirmPassword ? " error" : ""}`,
                              style: { paddingRight: 44 },
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
                                color: "rgba(5,150,105,0.6)",
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
                                color: "#dc2626",
                                fontSize: 11,
                                margin: "4px 0 0 4px"
                              },
                              "data-ocid": "signup.error_state",
                              children: errors.confirmPassword
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "submit",
                            className: "eg-btn",
                            disabled: loading,
                            "data-ocid": "signup.submit_button",
                            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                style: {
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: 8
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      style: {
                                        width: 16,
                                        height: 16,
                                        border: "2px solid rgba(255,255,255,0.35)",
                                        borderTopColor: "white",
                                        borderRadius: "50%",
                                        animation: "spin 0.7s linear infinite",
                                        display: "inline-block"
                                      }
                                    }
                                  ),
                                  "Creating account..."
                                ]
                              }
                            ) : "Create Account 🌿"
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
                            margin: "20px 0"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  flex: 1,
                                  height: 1,
                                  background: "rgba(5,150,105,0.2)"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                style: {
                                  color: "rgba(6,78,59,0.5)",
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
                                  background: "rgba(5,150,105,0.2)"
                                }
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 22 }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "social-btn",
                            onClick: () => handleSocial("Google"),
                            "data-ocid": "signup.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SiGoogle, { size: 16, color: "#EA4335" }),
                              "Google"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "social-btn",
                            onClick: () => handleSocial("Discord"),
                            "data-ocid": "signup.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SiDiscord, { size: 16, color: "#5865F2" }),
                              "Discord"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "social-btn",
                            onClick: () => handleSocial("GitHub"),
                            "data-ocid": "signup.button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(SiGithub, { size: 16, color: "#24292e" }),
                              "GitHub"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          style: {
                            textAlign: "center",
                            color: "rgba(6,78,59,0.65)",
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
                                  color: "#059669",
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
                      color: "rgba(6,78,59,0.45)",
                      fontSize: 12,
                      marginTop: 20
                    },
                    children: [
                      "© ",
                      (/* @__PURE__ */ new Date()).getFullYear(),
                      " Built by Rudra in Bihar with ❤️"
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
