
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/CodeBlock";

const InputDemo = () => {
  const codeExample = `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Basic input
<Input type="text" placeholder="Enter your name" />

// Input with label
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>

// Disabled input
<Input disabled type="text" placeholder="Disabled" />`;

  return (
    <div className="space-y-8">
      <div className="rounded-md border p-6 space-y-6">
        <div className="max-w-sm">
          <Input type="text" placeholder="Enter your name" />
        </div>
        
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        
        <div className="max-w-sm">
          <Input disabled type="text" placeholder="Disabled" />
        </div>
      </div>
      
      <CodeBlock code={codeExample} language="tsx" />
    </div>
  );
};

export default InputDemo;
