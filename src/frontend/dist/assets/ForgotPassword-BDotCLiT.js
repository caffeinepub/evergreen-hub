import { h as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Link, M as MessageCircle } from "./index-DtQIrmWF.js";
import { m as motion } from "./proxy-CTajl9ht.js";
import { M as Mail } from "./mail-oMZijs0H.js";
import { A as AnimatePresence } from "./index-BuFkMvMk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: `fp${i}`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 3 + Math.floor(Math.random() * 8),
  dur: `${3 + Math.random() * 6}s`,
  delay: `${Math.random() * 4}s`,
  color: i % 2 === 0 ? `rgba(16,185,129,${0.4 + Math.random() * 0.5})` : `rgba(59,130,246,${0.4 + Math.random() * 0.5})`
}));
function ForgotPassword() {
  const [email, setEmail] = reactExports.useState("");
  const [state, setState] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setState("loading");
    setError("");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-28px) scale(1.3); opacity: 1; }
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
        .fp-particle { animation: particle-float var(--pdur, 4s) ease-in-out var(--pdelay, 0s) infinite; }
        .fp-input {
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
        .fp-input::placeholder { color: rgba(255,255,255,0.25); }
        .fp-input:focus {
          border-color: rgba(16,185,129,0.7);
          background: rgba(16,185,129,0.06);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12), 0 0 15px rgba(16,185,129,0.3);
        }
        .fp-input.error { border-color: rgba(239,68,68,0.6); }
        .fp-btn {
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
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          animation: neon-pulse 3s ease-in-out infinite;
        }
        .fp-btn:not(:disabled):hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(16,185,129,0.5), 0 0 20px rgba(59,130,246,0.3) !important;
        }
        .fp-btn:disabled { opacity: 0.7; cursor: not-allowed; }
      ` }),
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
              className: "fp-particle absolute rounded-full pointer-events-none",
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
                maxWidth: 420,
                position: "relative",
                zIndex: 10
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
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
                              width: 80,
                              height: 80,
                              objectFit: "contain",
                              borderRadius: 20,
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
                        fontSize: 25,
                        fontWeight: 800,
                        margin: "12px 0 0",
                        letterSpacing: "-0.5px"
                      },
                      children: "Evergreen Hub"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      background: "rgba(0,0,0,0.65)",
                      backdropFilter: "blur(28px)",
                      WebkitBackdropFilter: "blur(28px)",
                      border: "1.5px solid rgba(16,185,129,0.2)",
                      borderRadius: 28,
                      padding: "38px 32px 34px",
                      boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: state !== "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0, x: -20 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 24 }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  margin: "0 auto 16px",
                                  background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(59,130,246,0.2))",
                                  border: "2px solid rgba(16,185,129,0.4)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center"
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 26, color: "#10b981" })
                              }
                            ),
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
                                  margin: "0 0 8px"
                                },
                                children: "Reset Password"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                style: {
                                  color: "rgba(255,255,255,0.4)",
                                  fontSize: 13,
                                  margin: 0
                                },
                                children: "Enter your email to receive a password reset link"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 18, position: "relative" }, children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  style: {
                                    position: "absolute",
                                    left: 15,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "rgba(16,185,129,0.6)",
                                    pointerEvents: "none"
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "input",
                                {
                                  type: "email",
                                  placeholder: "Your Email Address",
                                  value: email,
                                  onChange: (e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                  },
                                  className: `fp-input${error ? " error" : ""}`,
                                  "data-ocid": "forgot_password.input"
                                }
                              ),
                              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    color: "#f87171",
                                    fontSize: 11,
                                    margin: "4px 0 0 4px"
                                  },
                                  "data-ocid": "forgot_password.error_state",
                                  children: error
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "submit",
                                className: "fp-btn",
                                disabled: state === "loading",
                                style: { marginBottom: 20 },
                                "data-ocid": "forgot_password.submit_button",
                                children: state === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                                  " ",
                                  "Sending..."
                                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Send Reset Link 📧" })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Link,
                            {
                              to: "/login",
                              style: {
                                color: "rgba(255,255,255,0.4)",
                                fontSize: 13,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6
                              },
                              "data-ocid": "forgot_password.link",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                                " Back to Sign In"
                              ]
                            }
                          ) })
                        ]
                      },
                      "form"
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { type: "spring", damping: 20, stiffness: 200 },
                        style: { textAlign: "center" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                width: 72,
                                height: 72,
                                borderRadius: "50%",
                                margin: "0 auto 20px",
                                background: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(59,130,246,0.25))",
                                border: "2px solid rgba(16,185,129,0.5)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 30px rgba(16,185,129,0.3)"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 32 }, children: "✅" })
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
                                fontSize: 22,
                                fontWeight: 700,
                                margin: "0 0 10px"
                              },
                              children: "Reset Link Sent!"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              style: {
                                color: "rgba(255,255,255,0.6)",
                                fontSize: 14,
                                margin: "0 0 16px",
                                lineHeight: 1.6
                              },
                              children: "Reset link sent to your email"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              style: {
                                background: "rgba(16,185,129,0.08)",
                                border: "1px solid rgba(16,185,129,0.2)",
                                borderRadius: 14,
                                padding: "14px 16px",
                                marginBottom: 24
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  style: {
                                    color: "rgba(255,255,255,0.5)",
                                    fontSize: 12,
                                    margin: 0,
                                    lineHeight: 1.6
                                  },
                                  children: "📬 Check your inbox. If you don't receive an email, please contact us via WhatsApp for quick assistance."
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: "https://wa.me/919263989760?text=Hello%2C%20I%20need%20help%20with%20password%20reset%20on%20Evergreen%20Hub",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              "data-ocid": "forgot_password.button",
                              style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "linear-gradient(135deg, #25D366, #128C7E)",
                                border: "none",
                                borderRadius: 14,
                                padding: "12px 24px",
                                color: "#fff",
                                fontSize: 14,
                                fontWeight: 600,
                                textDecoration: "none",
                                marginBottom: 20,
                                boxShadow: "0 4px 20px rgba(37,211,102,0.3)"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
                                " Contact via WhatsApp"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/login",
                              style: {
                                color: "#10b981",
                                fontSize: 13,
                                fontWeight: 600,
                                textDecoration: "none"
                              },
                              "data-ocid": "forgot_password.link",
                              children: "← Back to Sign In"
                            }
                          )
                        ]
                      },
                      "success"
                    ) })
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
  ForgotPassword as default
};
