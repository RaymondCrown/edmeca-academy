import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Engagement Options - EDMECA",
  description:
    "Flexible engagement models from focused sessions to full-journey partnerships",
};

export default function EngagementPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Engagement Options
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Flexible models to meet you where you are—from single interventions
            to comprehensive journeys
          </p>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Focused Session */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Focused Session</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Single intervention
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="ml-2 text-muted-foreground">pricing</span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Single framework delivery (BMC, SWOT, Design Sprint)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Half-day or full-day workshop</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Pitch preparation or investor readiness session
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Facilitated by EDMECA team
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Participants receive artifacts
                  </span>
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline" asChild>
                <Link href="/contact">
                  Request Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Mid-Tier */}
            <div className="relative rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                  Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">Targeted Programme</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  4-5 interventions over 8-12 weeks
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="ml-2 text-muted-foreground">pricing</span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    4-5 framework sessions (BMC, SWOT, Value Prop, Pitch)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Portal access for all participants
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    AI-assisted tool access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Progress tracking & artifact creation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Basic M&E reporting
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Cohort management for programmes
                  </span>
                </li>
              </ul>
              <Button className="mt-8 w-full" asChild>
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Full Journey */}
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Full Journey</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  12-month partnership
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="ml-2 text-muted-foreground">pricing</span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Comprehensive framework delivery
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    All AI-enabled tools & features
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Baseline-to-outcome tracking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Dedicated programme manager
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Comprehensive M&E pack
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Quarterly impact reviews
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Custom framework customization
                  </span>
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline" asChild>
                <Link href="/contact">
                  Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Self-Service Portal Access
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              For individual entrepreneurs and small teams
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-2xl font-bold">Free Tier</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="ml-2 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Access to all tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">
                    Limited AI suggestions (10/month)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Basic export (PDF)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Progress tracking</span>
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
            </div>

            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-2xl font-bold">Pro Tier</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="ml-2 text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Unlimited AI suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">PDF + DOCX export</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Version control & history</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button className="mt-8 w-full" asChild>
                <Link href="/register">Start Pro Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure which option is right?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Book a consultation call and we'll help you choose the engagement
            model that fits your goals and budget.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/contact">
                Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
