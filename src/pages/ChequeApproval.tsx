import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OTPInput } from "@/components/OTPInput";
import { ImageModal } from "@/components/ImageModal";
import { SessionTimer } from "@/components/SessionTimer";
import { CheckCircle2, XCircle, Shield, Eye, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import bankLogo from "@/assets/mtb-logo.png";
import chequeFront from "@/assets/cheque-front.png";
import chequeBack from "@/assets/cheque-back.png";

// Mock cheque data - in production this would come from URL params/API
const chequeData = {
  chequeNumber: "CH2024001234",
  accountHolderName: "Rajesh Kumar Sharma",
  mobileNumber: "+8801913XXXX53",
  amount: "৳50,000.00",
  amountInWords: "Fifty Thousand Taka Only",
  issueDate: "November 28, 2024",
  chequeFrontImage: chequeFront,
  chequeBackImage: chequeBack,
};

type ViewState = "initial" | "rejected" | "otp" | "success" | "expired";

const ChequeApproval = () => {
  const [viewState, setViewState] = useState<ViewState>("initial");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const handleSessionExpire = () => {
    setViewState("expired");
    toast.error("Session expired. Please request a new approval link.");
  };

  const handleReject = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this cheque? This action cannot be undone."
    );
    
    if (confirmed) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setViewState("rejected");
        toast.error("Cheque rejected successfully");
      }, 1000);
    }
  };

  const handleApprove = () => {
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setViewState("otp");
      setResendTimer(30);
      toast.success(`OTP sent to ${chequeData.mobileNumber}`);
      
      // Start countdown
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(30);
      toast.success("OTP resent successfully");
      
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handleOTPComplete = (otp: string) => {
    setIsLoading(true);
    setOtpError("");
    
    // Simulate OTP verification
    setTimeout(() => {
      // For demo, accept "123456" as valid OTP
      if (otp === "123456") {
        setIsLoading(false);
        setViewState("success");
        toast.success("Cheque approved successfully!");
      } else {
        setIsLoading(false);
        setOtpError("Invalid OTP. Please try again.");
        toast.error("Invalid OTP");
      }
    }, 1500);
  };

  const openImageModal = (url: string, title: string) => {
    setSelectedImage({ url, title });
  };

  if (viewState === "expired") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-destructive/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-lg">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <Clock className="h-16 w-16 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Session Expired</h1>
            <p className="text-muted-foreground">
              Your approval session has expired for security reasons.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Please request a new approval link via SMS or contact MTB customer service.
            </p>
            <Button variant="default" onClick={() => window.location.reload()}>
              Request New Link
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (viewState === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-success/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-lg">
          <div className="flex justify-center">
            <div className="rounded-full bg-success/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Approval Successful!</h1>
            <p className="text-muted-foreground">
              Cheque number <span className="font-semibold text-foreground">{chequeData.chequeNumber}</span> for amount{" "}
              <span className="font-semibold text-foreground">{chequeData.amount}</span> has been approved and is now active.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation SMS shortly. No further action is required.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (viewState === "rejected") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-destructive/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-lg">
          <div className="flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Cheque Rejected</h1>
            <p className="text-muted-foreground">
              Cheque number <span className="font-semibold text-foreground">{chequeData.chequeNumber}</span> has been rejected successfully.
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              This action cannot be undone. No further action is required.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        {/* Header with Timer */}
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <div className="bg-white dark:bg-card rounded-2xl p-4 shadow-lg">
            <img src={bankLogo} alt="MTB Logo" className="h-14 sm:h-20 w-auto object-contain" />
          </div>
          {(viewState === "initial" || viewState === "otp") && (
            <SessionTimer durationMinutes={30} onExpire={handleSessionExpire} />
          )}
        </div>
        
        <Card className="p-6 sm:p-8 shadow-2xl border-2 border-primary/10 bg-white/80 dark:bg-card/80 backdrop-blur-sm">
          <div className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b-2 border-primary/10 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              MTB Online Cheque <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Approval System</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground font-medium">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span>Secure & Verified</span>
            </div>
          </div>

          {viewState === "initial" && (
            <div className="space-y-5 sm:space-y-7">
              {/* Cheque Details */}
              <div className="space-y-4 sm:space-y-5">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 sm:p-5 border-2 border-primary/20 shadow-md">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">Cheque Leaf Number</div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{chequeData.chequeNumber}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">Account Holder</div>
                    <div className="text-base sm:text-lg font-semibold text-foreground">{chequeData.accountHolderName}</div>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">Registered Mobile</div>
                    <div className="text-base sm:text-lg font-semibold text-foreground font-mono">{chequeData.mobileNumber}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-xl p-5 sm:p-6 border-2 border-success/30 shadow-md">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">Cheque Amount</div>
                  <div className="text-3xl sm:text-4xl font-bold text-success mb-2">{chequeData.amount}</div>
                  <div className="text-sm sm:text-base text-foreground/70 italic font-medium">({chequeData.amountInWords})</div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">Issue Date</div>
                  <div className="text-base sm:text-lg font-semibold text-foreground">{chequeData.issueDate}</div>
                </div>
              </div>

              {/* Cheque Images */}
              <div className="space-y-4 sm:space-y-5 pt-5 sm:pt-6 border-t-2 border-primary/10">
                <h3 className="font-bold text-base sm:text-lg text-foreground uppercase tracking-wide">Cheque Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">Front Side</div>
                    <div
                      className="relative rounded-xl overflow-hidden border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => openImageModal(chequeData.chequeFrontImage, "Cheque Front Side")}
                    >
                      <img
                        src={chequeData.chequeFrontImage}
                        alt="Cheque Front"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="h-10 w-10 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">Back Side</div>
                    <div
                      className="relative rounded-xl overflow-hidden border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer group"
                      onClick={() => openImageModal(chequeData.chequeBackImage, "Cheque Back Side")}
                    >
                      <img
                        src={chequeData.chequeBackImage}
                        alt="Cheque Back"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="h-10 w-10 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-6 sm:pt-8">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleApprove}
                  disabled={isLoading}
                  className="w-full font-bold text-base sm:text-lg py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-6 w-6" />
                      Approve Cheque
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleReject}
                  disabled={isLoading}
                  className="w-full font-bold text-base sm:text-lg py-6 sm:py-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-6 w-6" />
                      Reject
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {viewState === "otp" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="rounded-full bg-accent/10 p-2 sm:p-3">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Verify OTP</h2>
                <p className="text-xs sm:text-sm text-muted-foreground px-2">
                  For security, an OTP has been sent to your registered mobile ending with{" "}
                  <span className="font-semibold text-foreground">
                    {chequeData.mobileNumber.slice(-4)}
                  </span>
                  . Please enter it below to approve.
                </p>
              </div>

              <div className="space-y-4">
                <div className="scale-90 sm:scale-100">
                  <OTPInput onComplete={handleOTPComplete} disabled={isLoading} />
                </div>
                
                {otpError && (
                  <div className="text-center text-sm text-destructive font-medium">
                    {otpError}
                  </div>
                )}

                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend OTP in <span className="font-semibold">{resendTimer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOTP}
                      disabled={isLoading}
                      className="text-sm text-accent hover:text-accent/80 font-medium underline-offset-4 hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying OTP...
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">
                  OTP is valid for 5 minutes. For demo, use <span className="font-mono font-semibold">123456</span>
                </p>
              </div>
            </div>
          )}
        </Card>

      {/* Security Notice */}
      <div className="text-center text-sm text-muted-foreground px-4 space-y-2">
        <p className="flex items-center justify-center gap-2 font-medium">
          <Shield className="h-4 w-4 text-primary" />
          Mutual Trust Bank PLC secure portal. All transactions are encrypted.
        </p>
        <p className="text-foreground/60 font-semibold italic">You can bank on us</p>
      </div>
      </div>

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
        />
      )}
    </div>
  );
};

export default ChequeApproval;
