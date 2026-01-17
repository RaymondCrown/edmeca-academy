import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  BarChart,
  Lightbulb,
  FileText,
  TrendingUp,
  GitBranch,
} from "lucide-react";

export const metadata = {
  title: "Frameworks & Tools - EDMECA",
  description:
    "MBA-level business frameworks powered by AI: Business Model Canvas, SWOT, PESTLE, Value Proposition, and Pitch Builder",
};

export default function FrameworksPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Frameworks & AI-Enabled Tools
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            MBA-level methodologies meet practical execution through AI-powered
            tooling
          </p>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Framework Approach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We integrate proven business frameworks with Design Thinking
              principles, making them accessible through guided workflows and AI
              assistance
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Design Thinking Foundation</h3>
              <p className="text-muted-foreground">
                Every framework is delivered through a Design Thinking lens:
                Empathize, Define, Ideate, Prototype, Test. This ensures
                user-centered, iterative development.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded bg-primary/10 p-2">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">User-Centered</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on customer needs and pain points
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded bg-primary/10 p-2">
                      <GitBranch className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Iterative Process</h4>
                    <p className="text-sm text-muted-foreground">
                      Build, test, refine, repeat
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded bg-primary/10 p-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Evidence-Based</h4>
                    <p className="text-sm text-muted-foreground">
                      Validate assumptions with real data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Integrated Strategic Analysis</h3>
              <p className="text-muted-foreground">
                Our frameworks work together to provide comprehensive business
                clarity—from market analysis to business model to pitch
                narrative.
              </p>
              <div className="rounded-lg border bg-card p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">
                      SWOT + PESTLE → Market Understanding
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">
                      Value Proposition → Customer Clarity
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">
                      BMC → Business Model
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">
                      Pitch Builder → Investor Narrative
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span className="text-sm font-medium">
                      Progress Tracker → Evidence & Outcomes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Available Tools
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each tool includes AI assistance, guided workflows, and export
              capabilities
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-8">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">
                Business Model Canvas
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Interactive 9-block canvas for designing and iterating your
                business model. AI suggests content for each component based on
                your context.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Customer Segments
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Value Propositions
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Revenue Streams & Cost Structure
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Version control & PDF export
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">
                SWOT + PESTLE Analysis
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Comprehensive strategic analysis combining internal strengths/weaknesses
                with external political, economic, social, and technological
                factors.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  AI-generated insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Prioritization matrix
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Risk/opportunity identification
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Structured report export
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">
                Value Proposition Builder
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Define your customer personas, articulate their problems, and
                craft compelling value propositions with assumptions testing.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Customer persona builder
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Problem statement generator
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Assumptions log
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Test plan creation
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Pitch Builder</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Craft investor-ready pitch narratives with AI-assisted messaging
                refinement. Covers all essential slides from problem to ask.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Narrative structure wizard
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Problem, Solution, Market, Model
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Team, Traction, Ask
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Deck outline export
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Progress Tracker</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Document your entrepreneurial journey from baseline to outcome
                with milestone tracking and evidence capture.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Baseline capture
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Milestone checklist
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Evidence upload (files, notes)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Timeline visualization
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <div className="rounded-lg bg-primary/10 p-3 w-fit">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-bold">Cohort Management</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                For programme managers: track participant progress, manage
                cohorts, and generate M&E reports automatically.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Multi-tenant architecture
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Participant dashboards
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  Completion analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  M&E pack export
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How AI Assistance Works
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Our AI-powered tools follow a simple pattern: you provide context,
            AI suggests content, you accept, edit, or reject. You're always in
            control.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-3 text-left">
            <div className="rounded-lg border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold">Provide Context</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill in basic information about your business, market, or
                customers
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold">Get AI Suggestion</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Claude analyzes your context and suggests structured content
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold">Review & Refine</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Accept, edit, or reject the suggestion—all content is
                user-owned
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-primary-foreground sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start Building Today
          </h2>
          <p className="mt-6 text-lg">
            Access all tools with a free account. No credit card required.
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
          </div>
        </div>
      </section>
    </>
  );
}
