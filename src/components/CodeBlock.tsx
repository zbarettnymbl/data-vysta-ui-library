import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css"; // Using a dark theme that works well in both light/dark mode
import { useEffect } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div className="rounded-md bg-muted overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
