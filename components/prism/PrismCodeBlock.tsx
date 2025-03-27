import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  language: string;
  code: string;
  className?: string;
};

const CodeBlock = ({ language, code, className }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={xonokai}
      className={className}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
