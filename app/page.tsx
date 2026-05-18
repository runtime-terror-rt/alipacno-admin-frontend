"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  Check, 
  ArrowRight, 
  ChevronLeft,
  Key, 
  Eye, 
  EyeOff,
  ShieldCheck,
  Store,
  Sliders
} from "lucide-react";

type AuthState = "login" | "forgot_password" | "verify_otp" | "reset_password";

export default function AuthPage() {
  const [authState, setAuthState] = useState<AuthState>("login");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Simulated handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In demo, we will automatically navigate to branch dashboard
    window.location.href = "/branch-admin";
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthState("verify_otp");
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthState("reset_password");
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password updated successfully! Redirecting to login...");
    setAuthState("login");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#09090b] grid-lines p-4 sm:p-6 md:p-8">
      {/* Decorative terracotta background glows matching #CCA693 */}
      <div className="mesh-glow absolute top-10 left-10 opacity-20"></div>
      <div className="mesh-glow absolute bottom-10 right-10 opacity-15"></div>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl bg-[#121214] border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] z-10 animate-fadeIn">
        
        {/* LEFT COLUMN: Brand Banner with terracotta glows (#CCA693) */}
        <div className="md:col-span-6 relative bg-gradient-to-br from-[#121214] via-[#0d0d0e] to-black flex flex-col justify-center items-center p-8 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-800/50">
          
          {/* Terracotta bottom-left radial gradient (Vector 63 replica) */}
          <div className="absolute inset-0 bg-radial-gradient(circle at 15% 85%, rgba(204, 166, 147, 0.35) 0%, rgba(204, 166, 147, 0.15) 45%, transparent 75%) pointer-events-none" />
          
          {/* Subtle line mesh details */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay grid-lines pointer-events-none" />

          {/* Logo container with terracotta glowing backing */}
          <div className="relative group flex flex-col items-center">
            <div className="absolute inset-0 bg-[#CCA693]/15 rounded-full blur-3xl group-hover:bg-[#CCA693]/25 transition-all duration-700 w-64 h-64 -translate-y-8" />
            
            {/* Banner/Logo display */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 transition-transform duration-500 hover:scale-105">
              <Image 
                src="/banner.png" 
                alt="Pacino's Banner" 
                fill 
                className="object-contain drop-shadow-[0_15px_35px_rgba(204,166,147,0.22)]"
                priority
              />
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                The Finest Pizza & Burger
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Content */}
        <div className="md:col-span-6 flex flex-col justify-between p-8 sm:p-12 bg-[#161619]/90 backdrop-blur-md">
          
          {/* State transitions container */}
          <div className="my-auto">
            {/* 1. LOGIN STATE */}
            {authState === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    Login to Account
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    Enter your credentials to access the management panels.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your email"
                        className="w-full bg-zinc-900/60 border border-zinc-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="enter password"
                        className="w-full bg-zinc-900/60 border border-zinc-700/80 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remember & Forgot options */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2.5 cursor-pointer text-zinc-300 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="sr-only"
                    />
                    <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                      rememberMe 
                        ? "bg-orange-500 border-orange-600 shadow-md shadow-orange-500/20" 
                        : "border-zinc-700 bg-zinc-800"
                    }`}>
                      {rememberMe && <Check className="h-3.5 w-3.5 text-white stroke-[3px]" />}
                    </div>
                    <span className="text-zinc-350 hover:text-white transition-colors">Remember Password</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setAuthState("forgot_password")}
                    className="text-orange-500 hover:text-orange-400 font-semibold transition-colors hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center space-x-2 transition-all hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>

                <div className="text-center text-xs text-zinc-500 font-semibold">
                  Already have an account?{" "}
                  <a href="#" className="text-orange-500 font-bold hover:text-orange-400 transition-colors">
                    Sign Up Here
                  </a>
                </div>
              </form>
            )}

            {/* 2. FORGOT PASSWORD STATE */}
            {authState === "forgot_password" && (
              <form onSubmit={handleForgotSubmit} className="space-y-6 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => setAuthState("login")}
                  className="inline-flex items-center text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </button>

                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Forget Password?
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    Please enter your email to get verification code
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                      <input
                        type="email"
                        required
                        placeholder="apramit_schin1@gmail.com"
                        className="w-full bg-zinc-900/60 border border-zinc-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center space-x-2 transition-all hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </form>
            )}

            {/* 3. VERIFY OTP STATE */}
            {authState === "verify_otp" && (
              <form onSubmit={handleVerifySubmit} className="space-y-6 animate-fadeIn">
                <button
                  type="button"
                  onClick={() => setAuthState("forgot_password")}
                  className="inline-flex items-center text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </button>

                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Verify OTP
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We sent a code to your email address <span className="text-zinc-200">ap******@gmail.com</span>. Please check your email for the 5 digit code.
                  </p>
                </div>

                {/* 5-digit inputs */}
                <div className="flex justify-between items-center gap-2.5 py-4">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      ref={(el) => { otpRefs.current[idx] = el; }}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-zinc-900 border border-zinc-700/80 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all shadow-inner"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center space-x-2 transition-all hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
                >
                  <span>Verify</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>

                <div className="text-center text-sm text-zinc-500 font-semibold">
                  Didn&apos;t receive the code?{" "}
                  <button type="button" className="text-orange-500 font-bold hover:text-orange-400 transition-colors cursor-pointer">
                    Resend Code
                  </button>
                </div>
              </form>
            )}

            {/* 4. RESET PASSWORD STATE */}
            {authState === "reset_password" && (
              <form onSubmit={handleResetSubmit} className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Set new password!
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    Create a strong, secure password you don&apos;t use elsewhere.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                      <input
                        type="password"
                        required
                        placeholder="Enter new password"
                        className="w-full bg-zinc-900/60 border border-zinc-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Confirm password
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                      <input
                        type="password"
                        required
                        placeholder="Confirm password"
                        className="w-full bg-zinc-900/60 border border-zinc-700/80 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-550 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center space-x-2 transition-all hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
                >
                  <span>Update password</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </form>
            )}
          </div>

          {/* QUICK TESTING ACCESS FOOTER */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-3">
            <span className="block text-[11px] font-bold text-orange-500 uppercase tracking-widest text-center">
              🔑 Quick Navigation Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/branch-admin" 
                className="flex items-center justify-center space-x-2 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-orange-500/40 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-md group"
              >
                <Store className="h-3.5 w-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span>Branch Admin</span>
              </Link>
              <Link 
                href="/admin" 
                className="flex items-center justify-center space-x-2 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-orange-500/40 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white transition-all shadow-md group"
              >
                <Sliders className="h-3.5 w-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span>Super Admin</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
