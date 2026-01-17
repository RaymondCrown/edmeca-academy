import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Target,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Solutions for Entrepreneurs - EDMECA",
  description:
    "Business clarity, faster MVP development, and pitch-ready confidence through MBA-level frameworks and AI-enabled tools",
};

export default function EntrepreneursPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Solutions for Entrepreneurs
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Turn your business idea into a structured, investor-ready venture
            with MBA-level frameworks and AI-powered tools
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/register">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your Journey with EDMECA
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A structured path from idea to investor-ready pitch
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="relative rounded-2xl border bg-card p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Clarify & Structure</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Use Business Model Canvas, Value Proposition tools, and SWOT
                analysis to structure your business idea clearly
              </p>
            </div>

            <div className="relative rounded-2xl border bg-card p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Build & Test</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Develop your MVP strategy, identify assumptions, and create test
                plans with AI-assisted guidance
              </p>
            </div>

            <div className="relative rounded-2xl border bg-card p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Pitch & Scale</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Build investor-ready pitch decks and track your progress with
                evidence-based documentation
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What You Get
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-8">
              <Target className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                AI-Enabled Business Tools
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Business Model Canvas with AI suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>SWOT + PESTLE strategic analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Value Proposition & customer clarity tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Pitch deck builder with narrative structure</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Structured Progression
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Baseline assessment of your current state</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Milestone tracking with evidence capture</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Version control for all artifacts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Export to PDF/DOCX for all documents</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <FileText className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Professional Frameworks
              </h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>MBA-level methodologies made accessible</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Design Thinking principles integrated</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Strategic analysis templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Best practices from successful ventures</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-8">
              <Users className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Expert Guidance</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Guided workflows for each tool</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>AI-powered content suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>Facilitated workshops (optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>1-on-1 coaching sessions (premium)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Start?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join entrepreneurs who are turning frameworks into action and ideas
            into investor-ready ventures
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/register">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/engagement">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
