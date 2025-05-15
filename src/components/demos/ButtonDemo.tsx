
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";

const ButtonDemo = () => {
  const codeExample = `import { Button } from "@/components/ui/button"

// Default button
<Button>Default Button</Button>

// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <svg>...</svg>
</Button>`;

  return (
    <div className="space-y-8">
      <div className="rounded-md border p-6">
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="default">Default Size</Button>
          <Button size="sm">Small Size</Button>
          <Button size="lg">Large Size</Button>
          <Button size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Button>
        </div>
      </div>
      
      <CodeBlock code={codeExample} language="tsx" />
    </div>
  );
};

export default ButtonDemo;
