import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

type CodeBlockProps = {
  language: string;
  code: string;
};

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // 🟢 Bu, bileşenin yalnızca istemcide çalışmasını sağlar
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, [code]);

  // 🛑 Eğer SSR sırasında render ediliyorsa, kod bloğunu göstermiyoruz.
  if (!hydrated) return null;

  return (
    <pre className={`rounded-lg p-3 bg-gray-900 language-${language}`}>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;

/* <pre className="language-js">
                <code className="language-js">console.log("hello world")</code>
              </pre>
              <pre className="language-ts">
                <code className="language-ts">console.log("hello world")</code>
              </pre>
              <PrismLoader /> */
