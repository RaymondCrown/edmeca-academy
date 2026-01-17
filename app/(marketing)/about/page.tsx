import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Target, Users, TrendingUp, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About EDMECA - MBA Frameworks for Entrepreneurs",
  description:
    "Learn about EDMECA's approach to making business frameworks accessible through hands-on delivery and AI-enabled tools",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About EDMECA
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            We bridge the gap between business education and entrepreneurial
            execution.
          </p>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  EDMECA was born from a simple observation: the business
                  frameworks taught in MBA programs are powerful, but often
                  remain theoretical and inaccessible to the entrepreneurs who
                  need them most.
                </p>
                <p>
                  We saw entrepreneurs struggling to structure their ideas,
                  development programmes unable to measure impact effectively,
                  and valuable frameworks gathering dust in textbooks instead of
                  driving real business outcomes.
                </p>
                <p>
                  By combining hands-on facilitation with AI-enabled tooling, we
                  make MBA-level frameworks practical, accessible, and
                  actionable—turning frameworks into execution and execution
                  into evidence.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Our Approach
              </h2>
              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Framework First</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We start with proven business frameworks—Design Thinking,
                      BMC, SWOT, PESTLE—and make them accessible through
                      structured facilitation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Execution Focused</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      AI-enabled tools transform theoretical knowledge into
                      practical artifacts—business models, strategies, pitches,
                      and prototypes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Evidence Driven</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Comprehensive tracking captures progression from baseline
                      to outcome, providing measurable evidence of growth and
                      impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Values
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold">Accessibility</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  MBA-level quality without the MBA price tag or time
                  commitment
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Practicality</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every framework translates into actionable steps and tangible
                  outcomes
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Measurability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Progress tracked, evidence captured, impact demonstrated
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-primary-foreground sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Work Together?
          </h2>
          <p className="mt-6 text-lg">
            Whether you're an entrepreneur or run a development programme, we'd
            love to help you turn frameworks into results.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
