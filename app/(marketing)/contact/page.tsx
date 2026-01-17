import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us - EDMECA",
  description: "Get in touch with the EDMECA team",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/50 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Let's discuss how EDMECA can support your entrepreneurial journey or
            programme
          </p>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Schedule a Call</h2>
              <p className="mt-4 text-muted-foreground">
                Book a consultation to discuss your specific needs
              </p>
              <div className="mt-8 rounded-lg border bg-card p-8">
                <div className="aspect-video rounded bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Calendly embed placeholder
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Send us a Message</h2>
              <p className="mt-4 text-muted-foreground">
                Or drop us an email and we'll get back to you within 24 hours
              </p>
              <form className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium"
                  >
                    I am a/an...
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option>Entrepreneur</option>
                    <option>Programme Manager</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="mt-2 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>

              <div className="mt-8 rounded-lg border bg-muted/50 p-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email us directly</p>
                    <a
                      href="mailto:hello@edmeca.com"
                      className="text-sm text-primary hover:underline"
                    >
                      hello@edmeca.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
