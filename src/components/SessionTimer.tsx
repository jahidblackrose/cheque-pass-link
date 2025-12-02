import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionTimerProps {
  durationMinutes?: number;
  onExpire?: () => void;
}

export const SessionTimer = ({ durationMinutes = 30, onExpire }: SessionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft <= 300; // Last 5 minutes
  const isCritical = timeLeft <= 60; // Last 1 minute

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all",
        isCritical && "bg-destructive/10 text-destructive animate-pulse",
        isWarning && !isCritical && "bg-orange-500/10 text-orange-600",
        !isWarning && "bg-accent/10 text-accent"
      )}
    >
      {isCritical ? (
        <AlertTriangle className="h-4 w-4 animate-bounce" />
      ) : (
        <Clock className="h-4 w-4" />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="text-xs sm:text-sm font-medium whitespace-nowrap text-destructive">
          {isCritical ? "Expires in:" : "Time remaining:"}
        </span>
        <span className="text-lg sm:text-xl font-bold tabular-nums">{formattedTime}</span>
      </div>
    </div>
  );
};
