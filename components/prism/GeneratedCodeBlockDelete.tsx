import React, { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/prism/PrismCodeBlock";

export type GeneratedCodeBlockDeleteProps = {
  selectedLanguage: string;
  bearerToken: string;
  productId: string;
};

const generateDeleteCodeByLanguage = (
  language: string,
  bearerToken: string,
  productId: string
) => {
  const url = `https://api.yourdomain.com/products/${productId}`;
  const authHeader = bearerToken ? `Authorization: Bearer ${bearerToken}` : "";

  switch (language) {
    case "javascript":
      return `"JavaScript": fetch('${url}', {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    ${authHeader ? `"Authorization": "${authHeader}",` : ""}
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

    case "typescript":
      return `"TypeScript": fetch("${url}", {
  method: "DELETE",
  headers: {
    "Accept": "application/json",
    ${authHeader ? `"Authorization": "${authHeader}",` : ""}
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));`;

    case "python":
      return `"Python": import requests

url = "${url}"
headers = {
  "Accept": "application/json",
  ${authHeader ? `"Authorization": "Bearer ${bearerToken}",` : ""}
}

response = requests.delete(url, headers=headers)

print(response.text)`;

    case "http":
      return ` "HTTP": DELETE /products/${productId} HTTP/1.1
Host: api.yourdomain.com
Accept: application/json
${authHeader}`;

    case "php":
      return `"PHP": <?php
$client = new \\GuzzleHttp\\Client();

$response = $client->request('DELETE', '${url}', [
  'headers' => [
    'Accept' => 'application/json',
    ${authHeader ? "'Authorization': 'Bearer $bearerToken'," : ""}
  ]
]);

echo $response->getBody();
?>`;

    case "shell":
      return `curl --request DELETE \\ 
     --url '${url}' \\ 
     --header 'Accept: application/json' \\ 
     ${authHeader ? "--header 'Authorization: Bearer $bearerToken'" : ""}`;

    case "go":
      return `Go: package main

import (
	"fmt"
	"net/http"
)

func main() {
	url := "${url}"
	client := &http.Client{}
	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Set("Accept", "application/json")
	${authHeader ? `req.Header.Set("Authorization", "Bearer ${bearerToken}")` : ""}

	resp, _ := client.Do(req)
	fmt.Println("Response Status:", resp.Status)
}`;

    case "csharp":
      return `CSharp: using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
client.DefaultRequestHeaders.Add("Accept", "application/json");
${
  authHeader
    ? `client.DefaultRequestHeaders.Add("Authorization", "${authHeader}");`
    : ""
}
var response = await client.DeleteAsync("${url}");
string result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`;

    case "ruby":
      return `Ruby: require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("${url}")
header = {
  "Accept": "application/json",
  ${authHeader ? `"Authorization" => "${authHeader}",` : ""}
}
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
request = Net::HTTP::Delete.new(uri.request_uri, header)
response = http.request(request)
puts response.body`;

    case "java":
      return `Java: HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("${url}"))
    .header("Accept", "application/json")
    ${authHeader ? `.header("Authorization", "${authHeader}")` : ""}
    .DELETE()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`;

    case "node":
      return `const axios = require('axios');
axios.delete('${url}', {
  headers: {
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

export const GeneratedCodeBlockDelete = ({
  selectedLanguage,
  bearerToken,
  productId,
}: GeneratedCodeBlockDeleteProps) => {
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
          method: "GET",
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
    return generateDeleteCodeByLanguage(
      selectedLanguage,
      bearerToken,
      productId
    );
  }, [selectedLanguage, bearerToken, productId]);

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
        className="rounded-lg code-container"
        language={selectedLanguage}
        code={generatedCode}
      />
    </div>
  );
};
