import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OTPInput } from "@/components/OTPInput";
import { ImageModal } from "@/components/ImageModal";
import { CheckCircle2, XCircle, Shield, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import bankLogo from "@/assets/bank-logo.png";
import chequeFront from "@/assets/cheque-front.png";
import chequeBack from "@/assets/cheque-back.png";

// Mock cheque data - in production this would come from URL params/API
const chequeData = {
  chequeNumber: "CH2024001234",
  accountHolderName: "Rajesh Kumar Sharma",
  mobileNumber: "+91 XXXXXX7890",
  amount: "₹50,000.00",
  issueDate: "November 28, 2024",
  chequeFrontImage: chequeFront,
  chequeBackImage: chequeBack,
};

type ViewState = "initial" | "rejected" | "otp" | "success";

const ChequeApproval = () => {
  const [viewState, setViewState] = useState<ViewState>("initial");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 pb-4">
          <img src={bankLogo} alt="Bank Logo" className="h-12 w-auto object-contain" />
        </div>
        
        <Card className="p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Secure Cheque Approval</h1>
          </div>

          {viewState === "initial" && (
            <div className="space-y-6">
              {/* Cheque Details */}
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                  <div className="text-sm text-muted-foreground mb-1">Cheque Leaf Number</div>
                  <div className="text-2xl font-bold text-primary">{chequeData.chequeNumber}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Account Holder</div>
                    <div className="text-lg font-semibold text-foreground">{chequeData.accountHolderName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Registered Mobile</div>
                    <div className="text-lg font-semibold text-foreground">{chequeData.mobileNumber}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Cheque Amount</div>
                    <div className="text-xl font-bold text-success">{chequeData.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Issue Date</div>
                    <div className="text-lg font-semibold text-foreground">{chequeData.issueDate}</div>
                  </div>
                </div>
              </div>

              {/* Cheque Images */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground">Cheque Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Front Side</div>
                    <div
                      className="relative rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors cursor-pointer group"
                      onClick={() => openImageModal(chequeData.chequeFrontImage, "Cheque Front Side")}
                    >
                      <img
                        src={chequeData.chequeFrontImage}
                        alt="Cheque Front"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Back Side</div>
                    <div
                      className="relative rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors cursor-pointer group"
                      onClick={() => openImageModal(chequeData.chequeBackImage, "Cheque Back Side")}
                    >
                      <img
                        src={chequeData.chequeBackImage}
                        alt="Cheque Back"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleApprove}
                  disabled={isLoading}
                  className="w-full font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Approve Cheque
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={handleReject}
                  disabled={isLoading}
                  className="w-full font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-5 w-5" />
                      Reject
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {viewState === "otp" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="rounded-full bg-accent/10 p-3">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-foreground">Verify OTP</h2>
                <p className="text-sm text-muted-foreground">
                  For security, an OTP has been sent to your registered mobile ending with{" "}
                  <span className="font-semibold text-foreground">
                    {chequeData.mobileNumber.slice(-4)}
                  </span>
                  . Please enter it below to approve.
                </p>
              </div>

              <div className="space-y-4">
                <OTPInput onComplete={handleOTPComplete} disabled={isLoading} />
                
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
        <div className="text-center text-xs text-muted-foreground">
          <p>🔒 This is a secure banking portal. All transactions are encrypted.</p>
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
