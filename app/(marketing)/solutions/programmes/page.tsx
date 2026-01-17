import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  BarChart,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Solutions for Programmes & Accelerators - EDMECA",
  description:
    "Measurable participant progression, streamlined M&E reporting, and scalable interventions for enterprise development programmes",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Solutions for Programmes & Accelerators
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Deliver measurable impact, streamline M&E reporting, and scale your
            entrepreneurship programmes with evidence-based tools
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/contact">
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/engagement">View Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The Challenge
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Enterprise development programmes face pressure to demonstrate
              impact, but tracking participant progression and producing M&E
              reports is time-consuming and inconsistent
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto w-fit rounded-lg bg-destructive/10 p-3">
                <FileText className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="mt-4 font-semibold">Manual Reporting</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Hours spent compiling participant data into donor reports
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-fit rounded-lg bg-destructive/10 p-3">
                <BarChart className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="mt-4 font-semibold">Inconsistent Tracking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Difficult to measure baseline-to-outcome progression
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto w-fit rounded-lg bg-destructive/10 p-3">
                <Users className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="mt-4 font-semibold">Scaling Challenges</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Quality of delivery varies across cohorts and facilitators
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The EDMECA Solution
            </h2>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8">
              <Users className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">
                Multi-Tenant Cohort Management
              </h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Create and manage multiple cohorts across programmes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Invite participants with unique cohort codes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Track individual and cohort-level progress
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Role-based access for programme managers
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-8">
              <BarChart className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">
                Automated M&E Reporting
              </h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Baseline-to-outcome progression automatically captured
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Evidence upload: documents, photos, links
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Export comprehensive M&E pack in PDF format
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Completion rates and milestone analytics
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-8">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">
                Standardized Framework Delivery
              </h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Consistent quality across all cohorts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    AI-assisted tools ensure guided workflows
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Participants produce tangible artifacts
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Scalable without compromising on depth
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-8">
              <FileText className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">
                Participant Progression Tracking
              </h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Initial baseline assessment for each participant
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Milestone completion with timestamps
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Artifact creation tracked: BMC, SWOT, Pitch, etc.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Dashboard view of all participant progress
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Typical Engagement Flow
            </h2>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-4">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold">Onboarding</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We set up your organization, cohorts, and customize the platform
                to your needs
              </p>
            </div>

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold">Baseline Capture</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Participants complete initial assessments, establishing starting
                point
              </p>
            </div>

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold">Programme Delivery</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Participants work through frameworks with AI-assisted tools and
                facilitator support
              </p>
            </div>

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                4
              </div>
              <h3 className="mt-4 font-semibold">Impact Reporting</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Export comprehensive M&E reports demonstrating measurable
                outcomes
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-primary-foreground sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Streamline Your Programme?
          </h2>
          <p className="mt-6 text-lg">
            Let's discuss how EDMECA can help you deliver measurable impact at
            scale
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link href="/contact">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
