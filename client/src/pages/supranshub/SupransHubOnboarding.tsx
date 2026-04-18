import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import SupransHubMobileShell from "./SupransHubMobileShell";
import { SUPRANSHUB_AUTH_KEY } from "./constants";

const SLIDES = [
  {
    gradient: "from-[#1A1612] to-[#4A443E]",
    accent: "#C8A25A",
    title: "One Suprans account. Every Suprans product.",
    description:
      "Your unified home for Legal Nations, USDrop AI, China Imports, and the entire Suprans ecosystem.",
  },
  {
    gradient: "from-[#C8A25A] to-[#8C6A2C]",
    accent: "#FAF7F2",
    title: "From US company formation to China sourcing — all your growth tools in one place.",
    description:
      "Discover services, track active subscriptions, and find upcoming events without switching apps.",
  },
  {
    gradient: "from-[#F03B3B] to-[#B8290F]",
    accent: "#FAF7F2",
    title: "Sign in once. Manage everything.",
    description:
      "Unified billing, one support inbox, one calendar — across every Suprans business.",
  },
];

export default function SupransHubOnboarding() {
  const [step, setStep] = useState<"onboarding" | "signin" | "otp">("onboarding");
  const [slide, setSlide] = useState(0);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [, navigate] = useLocation();
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== "onboarding") return;
    autoRef.current = setTimeout(() => {
      if (slide < SLIDES.length - 1) setSlide((s) => s + 1);
    }, 3500);
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [slide, step]);

  useEffect(() => {
    if (step !== "otp") return;
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/, "").slice(-1);
    const next = [...otp];
    next[index] = cleaned;
    setOtp(next);
    if (cleaned && index < 5) otpRefs.current[index + 1]?.focus();
    if (!cleaned && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SupransHubMobileShell>
      {step === "onboarding" && (
        <OnboardingSlides
          slide={slide}
          setSlide={setSlide}
          onContinue={() => {
            if (slide < SLIDES.length - 1) setSlide(slide + 1);
            else setStep("signin");
          }}
          onSkip={() => setStep("signin")}
        />
      )}
      {step === "signin" && (
        <SignInScreen
          phone={phone}
          setPhone={setPhone}
          onSend={() => {
            if (phone.length >= 10) setStep("otp");
          }}
        />
      )}
      {step === "otp" && (
        <OTPScreen
          phone={phone}
          otp={otp}
          timer={timer}
          otpRefs={otpRefs}
          onChange={handleOtpChange}
          onKeyDown={handleOtpKeyDown}
          onVerify={() => {
            localStorage.setItem(SUPRANSHUB_AUTH_KEY, "true");
            navigate("/supranshub/home");
          }}
          onResend={() => setTimer(30)}
        />
      )}
    </SupransHubMobileShell>
  );
}

function OnboardingSlides({
  slide,
  setSlide,
  onContinue,
  onSkip,
}: {
  slide: number;
  setSlide: (n: number) => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div className="relative w-full h-full bg-supranshub-canvas flex flex-col">
      <div
        className={`relative bg-gradient-to-br ${s.gradient} flex-1 overflow-hidden flex items-center justify-center`}
        style={{ minHeight: 0 }}
      >
        <div
          className="rounded-full"
          style={{
            width: 220,
            height: 220,
            background: `radial-gradient(circle at 30% 30%, ${s.accent}55, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-white/95 text-[64px] font-black tracking-tight">
            S
          </div>
        </div>
        <div className="absolute top-6 right-6">
          <button
            data-testid="btn-supranshub-skip"
            onClick={onSkip}
            className="text-white/80 text-sm font-medium px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm"
          >
            Skip
          </button>
        </div>
        <div className="absolute top-6 left-6">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)", color: "white" }}
          >
            Suprans Hub
          </span>
        </div>
      </div>

      <div className="bg-supranshub-canvas px-8 pt-8 pb-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-[24px] font-bold leading-tight text-supranshub-ink">
            {s.title}
          </h2>
          <p className="text-[14px] leading-[1.6] text-supranshub-ink-secondary">
            {s.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              data-testid={`dot-supranshub-slide-${i}`}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-6 h-2.5 bg-supranshub-red"
                  : "w-2.5 h-2.5 bg-supranshub-border"
              }`}
            />
          ))}
        </div>

        <button
          data-testid="btn-supranshub-continue"
          onClick={onContinue}
          className="w-full h-[52px] rounded-2xl bg-supranshub-red text-white font-semibold text-[16px] flex items-center justify-center gap-2 active:opacity-90"
        >
          {isLast ? "Get Started" : "Continue"}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function SignInScreen({
  phone,
  setPhone,
  onSend,
}: {
  phone: string;
  setPhone: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="w-full h-full bg-supranshub-canvas flex flex-col">
      <div className="bg-gradient-to-br from-[#1A1612] to-[#4A443E] h-[220px] flex items-end px-8 pb-8 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #C8A25A 0%, transparent 70%)" }}
        />
        <div className="flex flex-col gap-1 relative">
          <div className="text-[32px] font-black text-white tracking-tight leading-tight">
            Suprans Hub
          </div>
          <div className="text-white/70 text-[14px] font-medium">
            One account · Every product
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 pt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold text-supranshub-ink leading-tight">
            Sign in to continue
          </h2>
          <p className="text-[14px] text-supranshub-ink-secondary">
            Enter your registered mobile number
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[12px] font-semibold text-supranshub-ink-secondary uppercase tracking-wider">
            Mobile Number
          </label>
          <div className="flex items-center gap-0 border border-supranshub-border rounded-2xl overflow-hidden bg-white focus-within:border-supranshub-red transition-colors">
            <div className="h-[52px] px-4 flex items-center gap-2 border-r border-supranshub-border bg-supranshub-canvas shrink-0">
              <span className="text-[15px] font-semibold text-supranshub-ink">+91</span>
            </div>
            <input
              data-testid="input-supranshub-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter 10-digit number"
              className="flex-1 h-[52px] px-4 text-[15px] text-supranshub-ink placeholder:text-supranshub-ink-tertiary bg-transparent outline-none"
            />
          </div>
        </div>

        <button
          data-testid="btn-supranshub-send-otp"
          onClick={onSend}
          disabled={phone.length < 10}
          className="w-full h-[52px] rounded-2xl bg-supranshub-red text-white font-semibold text-[16px] flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          Send OTP
        </button>

        <p className="text-center text-[12px] text-supranshub-ink-tertiary leading-relaxed">
          By continuing, you agree to Suprans'{" "}
          <span className="text-supranshub-red font-medium">Terms of Service</span> and{" "}
          <span className="text-supranshub-red font-medium">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

function OTPScreen({
  phone,
  otp,
  timer,
  otpRefs,
  onChange,
  onKeyDown,
  onVerify,
  onResend,
}: {
  phone: string;
  otp: string[];
  timer: number;
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onVerify: () => void;
  onResend: () => void;
}) {
  const isFilled = otp.every((d) => d !== "");

  return (
    <div className="w-full h-full bg-supranshub-canvas flex flex-col">
      <div className="bg-gradient-to-br from-[#1A1612] to-[#4A443E] h-[180px] flex items-end px-8 pb-8">
        <div className="text-[32px] font-black text-white tracking-tight">
          Suprans Hub
        </div>
      </div>

      <div className="flex-1 px-8 pt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold text-supranshub-ink leading-tight">
            Verify your number
          </h2>
          <p className="text-[14px] text-supranshub-ink-secondary">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-supranshub-ink">+91 {phone}</span>
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                otpRefs.current[i] = el;
              }}
              data-testid={`input-supranshub-otp-${i}`}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className={`w-[46px] h-[56px] text-center text-[22px] font-bold rounded-2xl border-2 bg-white outline-none transition-colors ${
                digit
                  ? "border-supranshub-red text-supranshub-ink"
                  : "border-supranshub-border text-supranshub-ink"
              } focus:border-supranshub-red`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 text-[14px]">
          {timer > 0 ? (
            <span className="text-supranshub-ink-tertiary">
              Resend code in{" "}
              <span className="font-semibold text-supranshub-red">
                0:{timer.toString().padStart(2, "0")}
              </span>
            </span>
          ) : (
            <button
              data-testid="btn-supranshub-resend"
              onClick={onResend}
              className="text-supranshub-red font-semibold"
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          data-testid="btn-supranshub-verify"
          onClick={onVerify}
          disabled={!isFilled}
          className="w-full h-[52px] rounded-2xl bg-supranshub-red text-white font-semibold text-[16px] flex items-center justify-center disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
