import { useEffect, useState } from "react";
import { debounce } from "@/utils/localStorageUtils";
import CodeBlock from "@/components/prism/PrismLoader";

type GeneratedCodeBlockProps = {
  selectedLanguage: string;
  formValues: any;
};

const generateCodeByLanguage = (language: string, params: string) => {
  switch (language) {
    case "python":
      return `import requests\n\nparams = {\n${params}\n}\nresponse = requests.get("https://api.shopier.com/v1/products", params=params)\nprint(response.json())`;

    case "php":
      return `<?php\n$url = "https://api.shopier.com/v1/products?" . http_build_query([\n${params}\n]);\n$response = file_get_contents($url);\necho $response;\n?>`;

    default:
      return `getProducts({\n${params}\n})\n  .then(({ data }) => console.log(data))\n  .catch(err => console.error(err));`;
  }
};

const GeneratedCodeBlock = ({
  selectedLanguage,
  formValues,
}: GeneratedCodeBlockProps) => {
  const [generatedCode, setGeneratedCode] = useState("");

  useEffect(() => {
    const updateCode = debounce(() => {
      const formattedParams = Object.entries(formValues)
        .filter(([_, value]) => value !== "" && value !== undefined)
        .map(
          ([key, value]) =>
            `  '${key}': '${encodeURIComponent(String(value))}',`
        )
        .join("\n");

      setGeneratedCode(
        generateCodeByLanguage(selectedLanguage, formattedParams)
      );
    }, 300);

    updateCode();
  }, [formValues, selectedLanguage]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Generated Code:</h3>
      <CodeBlock language={selectedLanguage} code={generatedCode} />
    </div>
  );
};

export default GeneratedCodeBlock;
