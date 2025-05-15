
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Component, Layout } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Component className="h-6 w-6" />
            <span className="text-lg font-semibold">UI Library</span>
          </div>
          <nav className="ml-auto flex items-center gap-4">
            <Link to="/" className="text-sm font-medium">
              Home
            </Link>
            <Link to="/components" className="text-sm font-medium">
              Components
            </Link>
            <a href="https://github.com/datavysta/vysta-react" target="_blank" rel="noopener noreferrer" className="text-sm font-medium">
              GitHub
            </a>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-24 lg:py-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Beautiful UI Components
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A collection of beautifully designed, accessible and customizable UI components built with Tailwind CSS and React.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/components">
                  View Components
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/datavysta/vysta-react" target="_blank" rel="noopener noreferrer">
                  <Code className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
          <div className="rounded-xl border bg-gradient-to-b from-muted/50 to-muted p-8">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="h-2 w-12 rounded bg-primary/10"></div>
                <div className="h-4 w-40 rounded bg-primary/20"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-12 rounded bg-primary/10"></div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-primary/20"></div>
                <div className="h-20 rounded bg-primary/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Layout className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Styled Components</CardTitle>
              <CardDescription>
                Beautifully designed components that can be easily customized.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/components">
                  <span>Explore Components</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Component className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Accessible</CardTitle>
              <CardDescription>
                Components are built with accessibility in mind, following WAI-ARIA guidelines.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link to="/components">
                  <span>Explore Components</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Code className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Developer Friendly</CardTitle>
              <CardDescription>
                Easy to use components with comprehensive documentation and TypeScript support.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <a href="https://github.com/datavysta/vysta-react" target="_blank" rel="noopener noreferrer">
                  <span>View Documentation</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
