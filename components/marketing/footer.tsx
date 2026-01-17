import Link from "next/link";

export function MarketingFooter() {
  const footerNav = {
    solutions: [
      { name: "For Entrepreneurs", href: "/solutions/entrepreneurs" },
      { name: "For Programmes", href: "/solutions/programmes" },
    ],
    resources: [
      { name: "Frameworks", href: "/frameworks" },
      { name: "Insights", href: "/insights" },
      { name: "Engagement Options", href: "/engagement" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold">
              EDMECA
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              From Framework to Execution to Evidence
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              MBA-level business frameworks for entrepreneurs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Solutions</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.solutions.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerNav.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EDMECA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
