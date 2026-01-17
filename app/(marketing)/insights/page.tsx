import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export const metadata = {
  title: "Insights & Resources - EDMECA",
  description:
    "Business frameworks, entrepreneurship insights, and practical guides",
};

export default function InsightsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Insights & Resources
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Practical guides, framework deep-dives, and entrepreneurship
            insights
          </p>
        </div>
      </section>

      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Coming Soon
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're curating valuable content to help you on your
              entrepreneurial journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Getting Started with Business Model Canvas",
                category: "Framework Guide",
                description:
                  "A step-by-step walkthrough of building your first BMC",
              },
              {
                title: "From SWOT to Strategy: Making Analysis Actionable",
                category: "Strategy",
                description:
                  "Turn strategic analysis into concrete next steps",
              },
              {
                title: "Pitch Deck Essentials: What Investors Want to See",
                category: "Fundraising",
                description:
                  "Key elements of an investor-ready pitch presentation",
              },
              {
                title: "Customer Discovery: Testing Your Assumptions",
                category: "Validation",
                description:
                  "Practical approaches to validating your value proposition",
              },
              {
                title: "M&E Best Practices for Development Programmes",
                category: "Impact",
                description:
                  "How to capture and communicate programme outcomes",
              },
              {
                title: "Design Thinking for Business Model Innovation",
                category: "Framework Guide",
                description: "Applying Design Thinking to business strategy",
              },
            ].map((article, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                      {article.category}
                    </p>
                    <h3 className="mt-2 font-semibold group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Want to be notified when we publish new content?
            </p>
            <Button className="mt-6" asChild>
              <Link href="/contact">
                Subscribe for Updates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
