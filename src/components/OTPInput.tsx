import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
}

export const OTPInput = ({ length = 6, onComplete, disabled = false }: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;
    
    const newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length).replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    
    pastedData.split("").forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });
    
    setOtp(newOtp);
    
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
    
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-12 h-14 text-center text-2xl font-semibold rounded-lg",
            "border-2 border-input bg-background text-foreground",
            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            digit && "border-primary"
          )}
        />
      ))}
    </div>
  );
};
