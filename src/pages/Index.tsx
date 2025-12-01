import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle2, Smartphone, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import bankLogo from "@/assets/mtb-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={bankLogo} alt="MTB Logo" className="h-14 w-auto object-contain" />
          </div>
          <Link to="/approve">
            <Button variant="default" size="sm">
              Demo Approval
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            Bank-Grade Security
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            MTB Online Cheque
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mt-2">Approval System</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Approve or reject cheque leaves issued in your name with a simple SMS link. 
            Fast, secure, and hassle-free banking at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/approve">
              <Button size="lg" className="font-semibold">
                Try Demo Approval
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="font-semibold">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 space-y-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground">Receive SMS</h3>
              <p className="text-muted-foreground">
                Get a secure link via SMS to your registered mobile number when a cheque is issued.
              </p>
            </Card>

            <Card className="p-6 space-y-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground">Review & Decide</h3>
              <p className="text-muted-foreground">
                View cheque details and images. Choose to approve or reject with a single tap.
              </p>
            </Card>

            <Card className="p-6 space-y-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground">OTP Verification</h3>
              <p className="text-muted-foreground">
                Confirm approval with a secure OTP sent to your phone. Complete in seconds.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="bg-primary/5 border-y border-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Shield className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">
              Your Security is Our Priority
            </h3>
            <p className="text-muted-foreground">
              All transactions are encrypted with bank-grade security. Your data is never stored 
              in browser cache, and all approval links expire after use or within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Mutual Trust Bank PLC. All rights reserved.</p>
          <p className="mt-1 text-xs">You can bank on us</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
