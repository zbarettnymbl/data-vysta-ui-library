import CodeBlock from "@/components/CodeBlock";
import { Button } from "@mantine/core";
import { Code } from "lucide-react";
import { useState } from "react";

interface CodeToggleProps {
  code: string;
  language: string;
}

const CodeToggle = ({ code, language }: CodeToggleProps) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2"
        >
          <Code className="h-4 w-4" />
          {showCode ? "Hide Code" : "Show Code"}
        </Button>
      </div>

      {showCode && <CodeBlock code={code} language={language} />}
    </div>
  );
};

export default CodeToggle;
