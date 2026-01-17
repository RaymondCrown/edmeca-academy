import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  FileText,
  BarChart,
  Rocket,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              From Framework to Execution to Evidence
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              MBA-level business frameworks accessible to entrepreneurs through
              hands-on delivery + AI-enabled tooling—turning frameworks into
              action, prototypes into products, and ideas into investor-ready
              pitches.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Book a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Two Audience Tracks */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Who We Serve
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tailored solutions for entrepreneurs and enterprise programmes
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Entrepreneurs */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">For Entrepreneurs</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Seeking business clarity, faster MVP development, and
                pitch-ready confidence
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Transform business ideas into structured, actionable plans
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    AI-assisted tools for Business Model Canvas, SWOT, and more
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Build investor-ready pitch decks with confidence
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Track progress from idea to market validation</span>
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline" asChild>
                <Link href="/solutions/entrepreneurs">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Programmes */}
            <div className="relative rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">
                  For Programmes & Accelerators
                </h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Seeking measurable participant progression, streamlined M&E
                reporting, scalable interventions
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Multi-tenant cohort management with progress tracking
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Baseline-to-outcome progression with evidence capture
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Automated M&E reports and impact documentation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    Scalable framework delivery with consistent quality
                  </span>
                </li>
              </ul>
              <Button className="mt-8 w-full" variant="outline" asChild>
                <Link href="/solutions/programmes">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="bg-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI-Enabled Tools Inside the Portal
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional frameworks meet practical execution
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Business Model Canvas
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Interactive 9-block canvas with AI-assisted suggestions for
                each component. Version control and PDF export.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                SWOT + PESTLE Analysis
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate structured strategic analysis with prioritization
                matrix and risk/opportunity identification.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Value Proposition Builder
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Customer persona builder, problem statement generator, and
                assumptions testing framework.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Pitch Builder</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Narrative structure wizard for investor pitches. AI-assisted
                messaging refinement and deck outline export.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Progress Tracker</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Baseline capture, milestone tracking, and evidence
                documentation for measurable progression.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                Cohort Management
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                For programme managers: participant tracking, completion rates,
                and automated M&E reporting.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/frameworks">
                Explore All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Entrepreneurs and Programmes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real results from framework to execution to evidence
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-8">
              <p className="text-muted-foreground">
                "EDMECA transformed how we think about our business model. The
                AI-assisted tools made MBA-level frameworks actually accessible
                and actionable."
              </p>
              <div className="mt-6">
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">
                  Founder, TechStart
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <p className="text-muted-foreground">
                "The progress tracking and M&E reporting saved us countless
                hours. We can now demonstrate real impact to our stakeholders
                with evidence."
              </p>
              <div className="mt-6">
                <p className="font-semibold">Michael Osei</p>
                <p className="text-sm text-muted-foreground">
                  Programme Director, Innovation Hub
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <p className="text-muted-foreground">
                "From idea to investor pitch in 8 weeks. The structured approach
                and AI guidance made all the difference in our fundraising
                journey."
              </p>
              <div className="mt-6">
                <p className="font-semibold">Aisha Mohammed</p>
                <p className="text-sm text-muted-foreground">
                  Co-founder, GreenTech Solutions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary px-6 py-24 text-primary-foreground sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Turn Frameworks into Action?
          </h2>
          <p className="mt-6 text-lg">
            Join entrepreneurs and programmes leveraging MBA-level frameworks
            with AI-enabled tools for measurable progression.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link href="/register">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
