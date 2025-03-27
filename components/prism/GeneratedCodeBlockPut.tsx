import React, { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/prism/PrismCodeBlock";

export type GeneratedCodeBlockPutProps = {
  selectedLanguage: string;
  bearerToken: string;
  formValues: Record<string, any>;
};

const generatePutCodeByLanguage = (
  language: string,
  bearerToken: string,
  formValues: Record<string, any>
) => {
  const url = `https://api.yourdomain.com/products`;
  const authHeader = bearerToken ? `Authorization: Bearer ${bearerToken}` : "";
  const jsonData = JSON.stringify(formValues, null, 2); // JSON formatında formValues

  switch (language) {
    case "javascript":
      return `"JavaScript":
fetch('${url}', {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ${authHeader ? `"Authorization": "${authHeader}",` : ""}
  },
  body: ${jsonData}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

    case "typescript":
      return `"TypeScript":
fetch("${url}", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ${authHeader ? `"Authorization": "${authHeader}",` : ""}
  },
  body: ${jsonData}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

    case "python":
      return `"Python":
import requests

url = "${url}"
headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  ${authHeader ? `"Authorization": "Bearer ${bearerToken}",` : ""}
}
data = ${jsonData}

response = requests.put(url, headers=headers, json=data)

print(response.text)`;

    case "http":
      return ` "HTTP":
PUT /products/ HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json
Accept: application/json
${authHeader}

${jsonData}`;

    case "php":
      return `"PHP":
<?php
$client = new \\GuzzleHttp\\Client();

$response = $client->request('PUT', '${url}', [
  'headers' => [
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    ${authHeader ? "'Authorization': 'Bearer $bearerToken'," : ""}
  ],
  'body' => json_encode(${jsonData})
]);

echo $response->getBody();
?>`;

    case "shell":
      return `curl --request PUT \\
     --url '${url}' \\
     --header 'Content-Type: application/json' \\
     --header 'Accept: application/json' \\
     ${authHeader ? "--header 'Authorization: Bearer $bearerToken'" : ""} \\
     --data '${jsonData}'`;

    case "go":
      return `Go:
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	url := "${url}"
	formData := ${jsonData}
	jsonData, err := json.Marshal(formData)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	req, err := http.NewRequest("PUT", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	${authHeader ? `req.Header.Set("Authorization", "Bearer ${bearerToken}")` : ""}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()
}`;

    case "node":
      return `const axios = require('axios');
axios.put('${url}', ${jsonData}, {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ${authHeader ? `'Authorization': '${authHeader}',` : ""}
  }
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Error:', error);
});`;

    default:
      return "// ⚠️ Invalid language is chosen. Please select a valid language.";
  }
};

export const GeneratedCodeBlockPut = ({
  selectedLanguage,
  bearerToken,
  formValues,
}: GeneratedCodeBlockPutProps) => {
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!bearerToken) {
      setIsTokenValid(null);
      return;
    }
    // 🟢 Token'ın geçerli olup olmadığını test et
    const validateToken = async () => {
      try {
        const response = await fetch("https://dummyjson.com/test", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          setIsTokenValid(response.ok);
        }
      } catch (error) {
        setIsTokenValid(false);
      }
    };

    validateToken();
  }, [bearerToken]);

  const generatedCode = useMemo(() => {
    return generatePutCodeByLanguage(
      selectedLanguage,
      bearerToken,

      formValues
    );
  }, [selectedLanguage, bearerToken, formValues]);

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-md my-2">
      <h3 className="text-white text-sm font-semibold mb-4 uppercase">
        Generated Code:
      </h3>
      {isTokenValid === false && (
        <p className="text-red-500 my-4">
          ❌ Token is invalid! Please enter a valid Bearer Token..
        </p>
      )}
      <CodeBlock
        className="code-container"
        language={selectedLanguage}
        code={generatedCode}
      />
    </div>
  );
};
