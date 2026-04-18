import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const ElementLoginEmptyState = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[375px] min-h-[812px] relative flex flex-col">
      {/* Status Bar */}
      <div className="flex w-full h-11 items-center justify-between px-6 py-3">
        <span className="font-regular-none-medium font-[number:var(--regular-none-medium-font-weight)] text-greyscale-900 text-[length:var(--regular-none-medium-font-size)] tracking-[var(--regular-none-medium-letter-spacing)] leading-[var(--regular-none-medium-line-height)] whitespace-nowrap [font-style:var(--regular-none-medium-font-style)]">
          9:41
        </span>
        <img
          className="w-[70.98px] h-[13px]"
          alt="Group"
          src="/figmaAssets/group.png"
        />
      </div>
      {/* Main Content */}
      <div className="flex flex-col flex-1 px-6 pt-4 pb-8">
        {/* Header Section */}
        <div className="flex flex-col items-start gap-2 mb-8 w-full">
          <h1 className="font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-[#0d0d12] text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] [font-style:var(--heading-h4-font-style)]">
            Welcome Back! 👋
          </h1>
          <p className="font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-greyscale-400 text-[length:var(--body-small-regular-font-size)] tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] [font-style:var(--body-small-regular-font-style)]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        {/* Form Section */}
        <div className="flex flex-col items-end gap-4 w-full mb-12">
          {/* Email Field */}
          <div className="flex flex-col items-start gap-1.5 w-full">
            <Label
              htmlFor="email"
              className="font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-[#0d0d12] text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] [font-style:var(--body-small-medium-font-style)]"
            >
              Email
            </Label>
            <div className="flex h-12 items-center gap-2 px-3 py-2 w-full bg-greyscale-0 rounded-[10px] border border-solid border-[#dfe1e7]">
              <span className="flex-1 font-body-medium-regular font-[number:var(--body-medium-regular-font-weight)] text-greyscale-400 text-[length:var(--body-medium-regular-font-size)] tracking-[var(--body-medium-regular-letter-spacing)] leading-[var(--body-medium-regular-line-height)] [font-style:var(--body-medium-regular-font-style)]">
                Enter your email
              </span>
            </div>
          </div>
          {/* Password Field */}
          <div className="flex flex-col items-start gap-1.5 w-full">
            <Label
              htmlFor="password"
              className="font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-[#0d0d12] text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] [font-style:var(--body-small-medium-font-style)]"
            >
              Password
            </Label>
            <div className="flex h-12 items-center gap-2 px-3 py-2 w-full bg-greyscale-0 rounded-[10px] border border-solid border-[#dfe1e7]">
              <span className="flex-1 font-body-medium-regular font-[number:var(--body-medium-regular-font-weight)] text-greyscale-400 text-[length:var(--body-medium-regular-font-size)] tracking-[var(--body-medium-regular-letter-spacing)] leading-[var(--body-medium-regular-line-height)] [font-style:var(--body-medium-regular-font-style)]">
                Enter your password
              </span>
              <img className="w-6 h-6" alt="Eye" src="/figmaAssets/eye.svg" />
            </div>
          </div>
          {/* Forgot Password */}
          <button className="font-body-small-semibold font-[number:var(--body-small-semibold-font-weight)] text-primary-500 text-[length:var(--body-small-semibold-font-size)] tracking-[var(--body-small-semibold-letter-spacing)] leading-[var(--body-small-semibold-line-height)] whitespace-nowrap [font-style:var(--body-small-semibold-font-style)] bg-transparent border-none cursor-pointer p-0">
            Forgot Password?
          </button>
        </div>
        {/* Actions Section */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Sign In Button */}
          <Button className="h-[52px] w-full bg-greyscale-100 rounded-[100px] overflow-hidden border-none font-body-medium-semibold font-[number:var(--body-medium-semibold-font-weight)] text-white-900 text-[length:var(--body-medium-semibold-font-size)] text-center tracking-[var(--body-medium-semibold-letter-spacing)] leading-[var(--body-medium-semibold-line-height)] whitespace-nowrap [font-style:var(--body-medium-semibold-font-style)] hover:bg-greyscale-100">
            Sign In
          </Button>
          {/* Divider */}
          <div className="flex items-center gap-2 w-full">
            <img
              className="flex-1 grow h-px"
              alt="Line"
              src="/figmaAssets/line.svg"
            />
            <span className="font-body-xsmall-regular font-[number:var(--body-xsmall-regular-font-weight)] text-greyscale-400 text-[length:var(--body-xsmall-regular-font-size)] tracking-[var(--body-xsmall-regular-letter-spacing)] leading-[var(--body-xsmall-regular-line-height)] whitespace-nowrap [font-style:var(--body-xsmall-regular-font-style)]">
              Or continue with
            </span>
            <img
              className="flex-1 grow h-px"
              alt="Line"
              src="/figmaAssets/line.svg"
            />
          </div>
          {/* Google Sign In */}
          <Button
            variant="outline"
            className="h-12 w-full bg-greyscale-0 rounded-[100px] overflow-hidden border border-solid border-[#dfe1e7] flex items-center justify-center gap-3 px-4 py-3 hover:bg-greyscale-0"
          >
            <img
              className="w-6 h-6"
              alt="Platform google"
              src="/figmaAssets/platform-google--color-brand--state-default.svg"
            />
            <span className="font-body-medium-semibold font-[number:var(--body-medium-semibold-font-weight)] text-[#0d0d12] text-[length:var(--body-medium-semibold-font-size)] tracking-[var(--body-medium-semibold-letter-spacing)] leading-[var(--body-medium-semibold-line-height)] whitespace-nowrap [font-style:var(--body-medium-semibold-font-style)]">
              Sign in with Google
            </span>
          </Button>
          {/* Apple Sign In */}
          <Button
            variant="outline"
            className="h-12 w-full bg-greyscale-0 rounded-[100px] overflow-hidden border border-solid border-[#dfe1e7] flex items-center justify-center gap-3 px-4 py-3 hover:bg-greyscale-0"
          >
            <img
              className="w-6 h-6"
              alt="Platform apple color"
              src="/figmaAssets/platform-apple--color-brand--state-default.svg"
            />
            <span className="font-body-medium-semibold font-[number:var(--body-medium-semibold-font-weight)] text-[#0d0d12] text-[length:var(--body-medium-semibold-font-size)] tracking-[var(--body-medium-semibold-letter-spacing)] leading-[var(--body-medium-semibold-line-height)] whitespace-nowrap [font-style:var(--body-medium-semibold-font-style)]">
              Sign in with Apple
            </span>
          </Button>
        </div>
        {/* Sign Up Link */}
        <div className="flex items-center justify-center gap-1 mt-auto pt-8">
          <span className="font-body-small-regular font-[number:var(--body-small-regular-font-weight)] text-greyscale-400 text-[length:var(--body-small-regular-font-size)] text-center tracking-[var(--body-small-regular-letter-spacing)] leading-[var(--body-small-regular-line-height)] whitespace-nowrap [font-style:var(--body-small-regular-font-style)]">
            Don&apos;t have an account?
          </span>
          <button className="font-body-small-semibold font-[number:var(--body-small-semibold-font-weight)] text-primary-500 text-[length:var(--body-small-semibold-font-size)] text-center tracking-[var(--body-small-semibold-letter-spacing)] leading-[var(--body-small-semibold-line-height)] whitespace-nowrap [font-style:var(--body-small-semibold-font-style)] bg-transparent border-none cursor-pointer p-0">
            Sign Up
          </button>
        </div>
      </div>
      {/* Home Indicator */}
      <div className="w-full h-[34px] flex items-end justify-center pb-2">
        <img
          className="w-[148px] h-[5px] ml-px"
          alt="Vector"
          src="/figmaAssets/vector.svg"
        />
      </div>
    </div>
  );
};
