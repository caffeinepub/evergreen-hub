import { c as createLucideIcon, u as useNavigate, a as useAuth, r as reactExports, j as jsxRuntimeExports, L as Lock, b as Link, d as ue } from "./index-DLWhZ6P8.js";
import { M as Mail } from "./mail-rOXcX5sN.js";
import { E as Eye } from "./eye-C8zwLIoC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
const STARS = [
  "s0",
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
  "s11",
  "s12",
  "s13",
  "s14",
  "s15",
  "s16",
  "s17"
];
function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitializing } = useAuth();
  const [loginState, setLoginState] = reactExports.useState("idle");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [shake, setShake] = reactExports.useState(false);
  const [emailFocus, setEmailFocus] = reactExports.useState(false);
  const [passwordFocus, setPasswordFocus] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  const handleLogin = async () => {
    setLoginState("loading");
    try {
      await login();
      setLoginState("success");
      ue.success("Login successful!");
      setTimeout(() => navigate({ to: "/dashboard" }), 800);
    } catch (error) {
      console.error("Login error:", error);
      setLoginState("error");
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setLoginState("idle"), 1500);
      ue.error("Login failed. Please try again.");
    } finally {
    }
  };
  const handleForgotPassword = () => {
    ue.info(
      "Password reset is managed through Internet Identity. Please use the Internet Identity recovery options."
    );
  };
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #4f46e5 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                width: 40,
                height: 40,
                border: "3px solid rgba(255,255,255,0.3)",
                borderTopColor: "white",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              style: {
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Poppins, sans-serif"
              },
              children: "Loading..."
            }
          )
        ] })
      }
    );
  }
  const btnBg = loginState === "success" ? "linear-gradient(135deg, #10b981, #059669)" : loginState === "error" ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #6366f1, #7c3aed, #4f46e5)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-10px) rotate(2deg); }
          66%       { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes floatBody {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes visorShimmer {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50%       { opacity: 0.7; transform: translateX(3px); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-20px, 30px) scale(0.9); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(15px, -25px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15%       { transform: translateX(-10px); }
          30%       { transform: translateX(10px); }
          45%       { transform: translateX(-8px); }
          60%       { transform: translateX(8px); }
          75%       { transform: translateX(-4px); }
          90%       { transform: translateX(4px); }
        }
        @keyframes successPulse {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); }
          70%  { box-shadow: 0 0 0 14px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 1; transform: scale(1.3); }
        }

        .login-card {
          animation: fadeInUp 0.6s ease forwards;
        }
        .login-card.shake {
          animation: shake 0.6s ease;
        }

        .styled-input {
          width: 100%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 12px;
          padding: 14px 16px 14px 44px;
          color: white;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .styled-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
        .styled-input:focus {
          border-color: rgba(255,255,255,0.8);
          box-shadow: 0 0 20px rgba(139,92,246,0.45);
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          color: white;
          font-family: Poppins, sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.3px;
        }
        .login-btn:not(:disabled):hover {
          transform: scale(1.04);
          box-shadow: 0 8px 30px rgba(99,102,241,0.5);
        }
        .login-btn:not(:disabled):active {
          transform: scale(0.97);
        }
        .login-btn.success-state {
          animation: successPulse 0.8s ease;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }

        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
        }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #3730a3 60%, #1e3a8a 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "orb",
              style: {
                width: 400,
                height: 400,
                background: "rgba(99,102,241,0.25)",
                top: "-100px",
                left: "-100px",
                animation: "orbFloat1 8s ease-in-out infinite"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "orb",
              style: {
                width: 350,
                height: 350,
                background: "rgba(139,92,246,0.2)",
                bottom: "-80px",
                right: "-80px",
                animation: "orbFloat2 10s ease-in-out infinite"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "orb",
              style: {
                width: 250,
                height: 250,
                background: "rgba(79,70,229,0.3)",
                top: "40%",
                right: "10%",
                animation: "orbFloat3 7s ease-in-out infinite"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "orb",
              style: {
                width: 200,
                height: 200,
                background: "rgba(167,139,250,0.15)",
                bottom: "20%",
                left: "5%",
                animation: "orbFloat1 12s ease-in-out infinite reverse"
              }
            }
          ),
          STARS.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "star",
              style: {
                top: `${Math.sin(i * 2.3) * 40 + 50}%`,
                left: `${i * 5.7 % 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + i % 3}s`,
                animation: `starTwinkle ${2 + i % 3}s ease-in-out ${i * 0.4}s infinite`,
                opacity: 0.3
              }
            },
            id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", maxWidth: 420 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 24,
                  animation: "float 4s ease-in-out infinite"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative", width: 80, height: 100 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,255,255,0.5)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              top: 10,
                              left: 8,
                              width: 36,
                              height: 24,
                              borderRadius: 12,
                              background: "linear-gradient(135deg, #60a5fa, #818cf8, #a78bfa)",
                              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.3)"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  position: "absolute",
                                  top: 4,
                                  left: 6,
                                  width: 10,
                                  height: 6,
                                  borderRadius: 4,
                                  background: "rgba(255,255,255,0.7)",
                                  animation: "visorShimmer 3s ease-in-out infinite"
                                }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              top: -12,
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: 3,
                              height: 12,
                              background: "#94a3b8"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  width: 7,
                                  height: 7,
                                  borderRadius: "50%",
                                  background: "#f59e0b",
                                  position: "absolute",
                                  top: -4,
                                  left: -2
                                }
                              }
                            )
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 48,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 44,
                        height: 38,
                        borderRadius: "16px 16px 12px 12px",
                        background: "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                        animation: "floatBody 4s ease-in-out infinite"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: 8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: 4
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  width: 6,
                                  height: 6,
                                  borderRadius: 2,
                                  background: "#f59e0b"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  width: 6,
                                  height: 6,
                                  borderRadius: 2,
                                  background: "#10b981"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                style: {
                                  width: 6,
                                  height: 6,
                                  borderRadius: 2,
                                  background: "#ef4444"
                                }
                              }
                            )
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 52,
                        left: 0,
                        width: 12,
                        height: 28,
                        borderRadius: "8px 4px 8px 8px",
                        background: "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
                        transform: "rotate(-15deg)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: 52,
                        right: 0,
                        width: 12,
                        height: 28,
                        borderRadius: "4px 8px 8px 8px",
                        background: "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
                        transform: "rotate(15deg)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        bottom: 0,
                        left: 14,
                        width: 12,
                        height: 16,
                        borderRadius: "4px 4px 8px 8px",
                        background: "linear-gradient(180deg, #94a3b8, #64748b)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        bottom: 0,
                        right: 14,
                        width: 12,
                        height: 16,
                        borderRadius: "4px 4px 8px 8px",
                        background: "linear-gradient(180deg, #94a3b8, #64748b)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)"
                      }
                    }
                  )
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `login-card${shake ? " shake" : ""}`,
                style: {
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 28,
                  padding: "40px 36px",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 32 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        style: {
                          color: "white",
                          fontSize: 26,
                          fontWeight: 700,
                          margin: 0,
                          letterSpacing: "-0.3px"
                        },
                        children: "Welcome Back 👋"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: {
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 14,
                          marginTop: 8,
                          marginBottom: 0
                        },
                        children: "Sign in to your Evergreen Hub account"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 16, position: "relative" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: emailFocus ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.5)",
                          transition: "color 0.3s",
                          pointerEvents: "none",
                          display: "flex"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "email",
                        placeholder: "Email or Username",
                        className: "styled-input",
                        onFocus: () => setEmailFocus(true),
                        onBlur: () => setEmailFocus(false),
                        "data-ocid": "login.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 12, position: "relative" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: passwordFocus ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.5)",
                          transition: "color 0.3s",
                          pointerEvents: "none",
                          display: "flex"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 16 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: showPassword ? "text" : "password",
                        placeholder: "Password",
                        className: "styled-input",
                        style: { paddingRight: 44 },
                        onFocus: () => setPasswordFocus(true),
                        onBlur: () => setPasswordFocus(false),
                        "data-ocid": "login.input"
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
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "rgba(255,255,255,0.5)",
                          display: "flex",
                          padding: 0
                        },
                        "data-ocid": "login.toggle",
                        children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 16 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "right", marginBottom: 28 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleForgotPassword,
                      style: {
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(167,139,250,0.9)",
                        fontSize: 13,
                        fontFamily: "Poppins, sans-serif",
                        padding: 0
                      },
                      children: "Forgot Password?"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `login-btn${loginState === "success" ? " success-state" : ""}`,
                      onClick: handleLogin,
                      disabled: loginState === "loading" || loginState === "success",
                      style: {
                        background: btnBg,
                        marginBottom: 20,
                        opacity: loginState === "loading" ? 0.9 : 1
                      },
                      "data-ocid": "login.submit_button",
                      children: [
                        loginState === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              width: 18,
                              height: 18,
                              border: "2px solid rgba(255,255,255,0.4)",
                              borderTopColor: "white",
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite"
                            }
                          }
                        ),
                        loginState === "loading" && "Signing In...",
                        loginState === "success" && "✓ Logged In!",
                        loginState === "error" && "✗ Try Again",
                        loginState === "idle" && "Sign In with Internet Identity"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 20
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              flex: 1,
                              height: 1,
                              background: "rgba(255,255,255,0.15)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            style: {
                              color: "rgba(255,255,255,0.4)",
                              fontSize: 12,
                              fontFamily: "Poppins, sans-serif"
                            },
                            children: "or"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            style: {
                              flex: 1,
                              height: 1,
                              background: "rgba(255,255,255,0.15)"
                            }
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
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 14,
                        margin: 0
                      },
                      children: [
                        "Don't have an account?",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/register",
                            style: {
                              color: "rgba(167,139,250,1)",
                              fontWeight: 600,
                              textDecoration: "none"
                            },
                            "data-ocid": "login.link",
                            children: "Sign Up"
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
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 12,
                  marginTop: 24
                },
                children: [
                  "© ",
                  (/* @__PURE__ */ new Date()).getFullYear(),
                  " Built by Rudra in Bihar with ❤️"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
export {
  Login as default
};
