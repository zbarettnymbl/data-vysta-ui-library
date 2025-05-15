import { useEffect, useRef } from "react";
import Prism from "prismjs";
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "tsx" }: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code, language]);

  return (
    <div className="relative">
      <pre
        ref={preRef}
        className="p-4 rounded-md bg-muted overflow-x-auto text-sm"
        style={{ maxHeight: "500px" }}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
