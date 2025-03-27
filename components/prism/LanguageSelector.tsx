"use client";

import { useAsideContext } from "@/app/provider";
import { CustomFormSelect } from "@/components/forms/FormComponents";
import { useState, useEffect } from "react";

export const supportedLanguages = [
  { label: "JavaScript (Fetch API)", value: "javascript" },
  { label: "TypeScript (Fetch API)", value: "typescript" },
  { label: "Python (requests)", value: "python" },
  { label: "Node", value: "node" },
  { label: "PHP (file_get_contents)", value: "php" },
  { label: "Shell (cURL)", value: "shell" },
  { label: "Go (net/http)", value: "go" },
  { label: "C# (HttpClient)", value: "csharp" },
  { label: "Ruby (Net::HTTP)", value: "ruby" },
  { label: "Swift (URLSession)", value: "swift" },
  { label: "Java (OkHttp)", value: "java" },
  { label: "Kotlin (OkHttp)", value: "kotlin" },
  { label: "Rust (reqwest)", value: "rust" },
  { label: "R (httr package)", value: "r" },
  { label: "Lua (http.request)", value: "lua" },
  { label: "HTTP", value: "http" },
  { label: "C++ (cURL)", value: "cpp" },
  { label: "Clojure (clj-http)", value: "clojure" },
  { label: "Objective-C (NSURLSession)", value: "objective-c" },
  { label: "Powershell", value: "powershell" },
];

const LanguageSelector = () => {
  const asideContext = useAsideContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!asideContext) {
    return (
      <p className="text-red-500">Error: Language context is not available.</p>
    );
  }

  const { selectedLanguage, setSelectedLanguage } = asideContext;

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mb-4 lg:hidden">
      <h3 className="text-sm font-semibold text-gray-500 uppercase">
        Choose Language:
      </h3>
      <CustomFormSelect
        name="language"
        items={supportedLanguages}
        onChange={(value) => {
          console.log("Selected Language:", value);
          setSelectedLanguage(value);
        }}
        value={selectedLanguage}
      />
    </div>
  );
};

export default LanguageSelector;
