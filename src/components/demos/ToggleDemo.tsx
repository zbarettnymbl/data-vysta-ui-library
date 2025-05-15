
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CodeBlock } from "@/components/CodeBlock";

const ToggleDemo = () => {
  const codeExample = `import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Basic toggle
<Toggle>Toggle</Toggle>

// Toggle with icon
<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>

// Toggle group
<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`;

  return (
    <div className="space-y-8">
      <div className="rounded-md border p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-4">
            <Toggle>Toggle</Toggle>
            <Toggle pressed>Pressed</Toggle>
            <Toggle disabled>Disabled</Toggle>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Toggle aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </Toggle>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <ToggleGroup type="multiple">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <CodeBlock code={codeExample} language="tsx" />
    </div>
  );
};

export default ToggleDemo;
