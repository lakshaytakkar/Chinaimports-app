import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { ChevronRight } from "lucide-react";
import SupransMobileShell from "./SupransMobileShell";

const SLIDES = [
  {
    gradient: "from-[#F03B3B] to-[#FF8C42]",
    icon: "🌏",
    title: "Welcome to Suprans",
    description:
      "Your China sourcing and import partner, all in one app. From factory to your doorstep.",
  },
  {
    gradient: "from-[#2C5F9E] to-[#4A9FD4]",
    icon: "💬",
    title: "Talk to your team, anytime",
    description:
      "Stay connected with your dedicated Suprans team through built-in messaging, documents, and voice notes.",
  },
  {
    gradient: "from-[#2D9D78] to-[#6BCB9F]",
    icon: "📦",
    title: "Sourcing, imports, and more",
    description:
      "Track every order, manage documents, handle payments — everything you need is right here.",
  },
];

export default function SupransOnboarding() {
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
    return () => { if (autoRef.current) clearTimeout(autoRef.current); };
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
    <SupransMobileShell>
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
            onVerify={() => navigate("/suprans/chat")}
            onResend={() => setTimer(30)}
          />
        )}
    </SupransMobileShell>
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
    <div className="relative w-full h-full bg-suprans-canvas flex flex-col">
      <div
        className={`bg-gradient-to-br ${s.gradient} flex-1 flex flex-col items-center justify-center`}
        style={{ minHeight: 0 }}
      >
        <div className="text-[96px] mb-4 drop-shadow-lg" role="img">
          {s.icon}
        </div>
        <div className="absolute top-6 right-6">
          <button
            data-testid="btn-skip"
            onClick={onSkip}
            className="text-white/80 text-sm font-medium px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm"
          >
            Skip
          </button>
        </div>
      </div>

      <div className="bg-suprans-canvas px-8 pt-8 pb-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2
            className="text-[26px] font-bold leading-tight text-suprans-ink"
          >
            {s.title}
          </h2>
          <p className="text-[15px] leading-[1.6] text-suprans-ink-secondary">
            {s.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              data-testid={`dot-slide-${i}`}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-6 h-2.5 bg-suprans-red"
                  : "w-2.5 h-2.5 bg-suprans-border"
              }`}
            />
          ))}
        </div>

        <button
          data-testid="btn-continue"
          onClick={onContinue}
          className="w-full h-[52px] rounded-2xl bg-suprans-red text-white font-semibold text-[16px] flex items-center justify-center gap-2 active:opacity-90"
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
    <div className="w-full h-full bg-suprans-canvas flex flex-col">
      <div className="bg-gradient-to-br from-[#F03B3B] to-[#FF6B6B] h-[220px] flex items-end px-8 pb-8">
        <div className="flex flex-col gap-1">
          <div className="text-[32px] font-black text-white tracking-tight leading-tight">
            Suprans
          </div>
          <div className="text-white/80 text-[14px] font-medium">
            B2B Import Partner
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 pt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold text-suprans-ink leading-tight">
            Sign in to continue
          </h2>
          <p className="text-[14px] text-suprans-ink-secondary">
            Enter your registered mobile number
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[12px] font-semibold text-suprans-ink-secondary uppercase tracking-wider">
            Mobile Number
          </label>
          <div className="flex items-center gap-0 border border-suprans-border rounded-2xl overflow-hidden bg-white focus-within:border-suprans-red transition-colors">
            <div className="h-[52px] px-4 flex items-center gap-2 border-r border-suprans-border bg-suprans-canvas shrink-0">
              <span className="text-[18px]">🇮🇳</span>
              <span className="text-[15px] font-semibold text-suprans-ink">+91</span>
            </div>
            <input
              data-testid="input-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter 10-digit number"
              className="flex-1 h-[52px] px-4 text-[15px] text-suprans-ink placeholder:text-suprans-ink-tertiary bg-transparent outline-none"
            />
          </div>
        </div>

        <button
          data-testid="btn-send-otp"
          onClick={onSend}
          disabled={phone.length < 10}
          className="w-full h-[52px] rounded-2xl bg-suprans-red text-white font-semibold text-[16px] flex items-center justify-center gap-2 disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          Send OTP
        </button>

        <p className="text-center text-[12px] text-suprans-ink-tertiary leading-relaxed">
          By continuing, you agree to Suprans'{" "}
          <span className="text-suprans-red font-medium">Terms of Service</span> and{" "}
          <span className="text-suprans-red font-medium">Privacy Policy</span>
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
    <div className="w-full h-full bg-suprans-canvas flex flex-col">
      <div className="bg-gradient-to-br from-[#F03B3B] to-[#FF6B6B] h-[180px] flex items-end px-8 pb-8">
        <div className="text-[32px] font-black text-white tracking-tight">
          Suprans
        </div>
      </div>

      <div className="flex-1 px-8 pt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[24px] font-bold text-suprans-ink leading-tight">
            Verify your number
          </h2>
          <p className="text-[14px] text-suprans-ink-secondary">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-suprans-ink">+91 {phone}</span>
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { otpRefs.current[i] = el; }}
              data-testid={`input-otp-${i}`}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className={`w-[46px] h-[56px] text-center text-[22px] font-bold rounded-2xl border-2 bg-white outline-none transition-colors ${
                digit
                  ? "border-suprans-red text-suprans-ink"
                  : "border-suprans-border text-suprans-ink"
              } focus:border-suprans-red`}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-1 text-[14px]">
          {timer > 0 ? (
            <span className="text-suprans-ink-tertiary">
              Resend code in{" "}
              <span className="font-semibold text-suprans-red">
                0:{timer.toString().padStart(2, "0")}
              </span>
            </span>
          ) : (
            <button
              data-testid="btn-resend"
              onClick={onResend}
              className="text-suprans-red font-semibold"
            >
              Resend OTP
            </button>
          )}
        </div>

        <button
          data-testid="btn-verify"
          onClick={onVerify}
          disabled={!isFilled}
          className="w-full h-[52px] rounded-2xl bg-suprans-red text-white font-semibold text-[16px] flex items-center justify-center disabled:opacity-40 active:opacity-90 transition-opacity"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
