import React, { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/prism/PrismCodeBlock";

export type GeneratedCodeBlockPostProps = {
  selectedLanguage: string;
  formValues: Record<string, any>;
  bearerToken: string;
  mediaValues: {
    id: string;
    url: string;
    placement: number;
    mediaType: "image";
  }[];
};

const generateCodeByLanguage = (
  language: string,
  params: string,
  bearerToken: string,
  formValues: Record<string, any>
) => {
  const queryParams = params.replace(/\n/g, "&"); // 🟢 Query string formatına çevir
  const jsonData = JSON.stringify(formValues);
  const authHeader = bearerToken ? `Authorization: Bearer ${bearerToken}` : "";

  switch (language) {
    case "javascript":
      return `"JavaScript": fetch('https://api.yourdomain.com/products', {
  method: "POST",
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
      return `"TypeScript": fetch("https://api.yourdomain.com/products", {
  method: "POST",
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
      return `"Python": import requests

url = "https://api.yourdomain.com/products"

headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  ${authHeader ? `"Authorization": "Bearer ${bearerToken}",` : ""}
}

response = requests.post(url, headers=headers, json=${jsonData})

print(response.text)`;

    case "http":
      return ` "HTTP": POST /products HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json
Accept: application/json
${authHeader}
${jsonData}`;

    case "php":
      return `"PHP": <?php
$client = new \\GuzzleHttp\\Client();

$response = $client->request('POST', 'https://api.yourdomain.com/products', [
  'headers' => [
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
    ${authHeader ? "'Authorization': 'Bearer $bearerToken'," : ""}
  ],
  'body' => json_encode(${formValues})
]);

echo $response->getBody();
?>`;

    case "shell":
      return `curl --request POST \\
     --url 'https://api.yourdomain.com/products' \\
     --header 'Content-Type: application/json' \\
     --header 'Accept: application/json' \\
     ${authHeader ? "--header 'Authorization: Bearer $bearerToken' \\" : ""}
     --data '${jsonData}`;

    case "go":
      return `Go: package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	formData := ${jsonData}
	jsonData, err := json.Marshal(formData)
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
		return
	}

	url := "https://api.yourdomain.com/products"
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
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

	// Reading and printing the response body
	responseBody := new(bytes.Buffer)
	responseBody.ReadFrom(resp.Body)
	fmt.Println("Response Status:", resp.Status)
	fmt.Println("Response Body:", responseBody.String())
}`;

    case "csharp":
      return `CSharp: using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

var client = new HttpClient();
var content = new StringContent(${jsonData}, Encoding.UTF8, "application/json");
${authHeader ? `content.Headers.Add("Authorization", "${authHeader}");` : ""}
var response = await client.PostAsync("https://api.yourdomain.com/products", content);
string result = await response.Content.ReadAsStringAsync();
Console.WriteLine(result);`;

    case "ruby":
      return `Ruby: require 'net/http'
require 'uri'
require 'json'

uri = URI.parse("https://api.yourdomain.com/products")
header = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  ${authHeader ? `"Authorization" => "${authHeader}",` : ""}
}
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
request = Net::HTTP::Post.new(uri.request_uri, header)
request.body = ${jsonData}
response = http.request(request)
puts response.body`;

    case "swift":
      return `Swift: import Foundation

let url = URL(string: "https://api.yourdomain.com/products")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.addValue("application/json", forHTTPHeaderField: "Accept")
${
  authHeader
    ? `request.addValue("${authHeader}", forHTTPHeaderField: "Authorization")`
    : ""
}
let jsonData = ${jsonData}
request.httpBody = jsonData.data(using: .utf8)
let task = URLSession.shared.dataTask(with: request) { data, response, error in
    guard let data = data, error == nil else {
        print(error?.localizedDescription ?? "No data")
        return
    }
    let responseJSON = try? JSONSerialization.jsonObject(with: data, options: [])
    if let responseJSON = responseJSON as? [String: Any] {
        print(responseJSON)
    }
}
task.resume()`;

    case "java":
      return `Java: HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.yourdomain.com/products"))
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    ${authHeader ? `.header("Authorization", "${authHeader}")` : ""}
    .POST(HttpRequest.BodyPublishers.ofString(${jsonData}))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());`;

    case "kotlin":
      return `Kotlin: val client = HttpClient()
val content = json.encodeToString(formValues)
val request = HttpRequest.newBuilder()
    .uri(URI("https://api.yourdomain.com/products"))
    .header("Content-Type", "application/json")
    .header("Accept", "application/json")
    ${authHeader ? `.header("Authorization", "$authHeader")` : ""}
    .POST(HttpRequest.BodyPublishers.ofString(content))
    .build()
val response = client.send(request, HttpResponse.BodyHandlers.ofString())
println(response.body())`;

    case "rust":
      return `Rust: use reqwest;
use std::collections::HashMap;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("Content-Type", "application/json".parse().unwrap());
    headers.insert("Accept", "application/json".parse().unwrap());
    ${
      authHeader
        ? `headers.insert("Authorization", "${authHeader}".parse().unwrap());`
        : ""
    }
    let res = client.post("https://api.yourdomain.com/products")
        .headers(headers)
        .body(${jsonData})
        .send()
        .await?;
    println!("Status: {}", res.status());
    println!("Headers: \\n{:#?}", res.headers());
    let body = res.text().await?;
    println!("Body: \\n{}", body);
    Ok(())
}`;

    case "dart":
      return `import 'dart:convert';
import 'package:http/http.dart' as http;

void main() async {
    var url = Uri.parse('https://api.yourdomain.com/products');
    var response = await http.post(url,
        headers: <String, String>{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ${authHeader ? "'Authorization': '${authHeader}'," : ""}
        },
        body: ${jsonData});
    
}`;

    case "r":
      return `library(httr)

url <- "https://dummyjson.com/test?${queryParams}"
response <- GET(url, add_headers(
  "accept" = "application/json",
  "${authHeader}"
))
content(response, "text")`;

    case "perl":
      return `Perl: use LWP::UserAgent;
use HTTP::Request;

my $ua = LWP::UserAgent->new;
my $req = HTTP::Request->new(POST => 'https://api.yourdomain.com/products');
$req->header('Content-Type' => 'application/json');
$req->header('Accept' => 'application/json');
${authHeader ? "$req->header('Authorization' => '${authHeader}');" : ""}
$req->content(${jsonData});
my $resp = $ua->request($req);
print "Response: " . $resp->decoded_content;`;

    case "lua":
      return `local http = require("socket.http")
local ltn12 = require("ltn12")
local json = require("json")

local body = ${jsonData}
local response_body = {}

local res, code, response_headers = http.request{
    url = "https://api.yourdomain.com/products",
    method = "POST",
    headers = {
        ["Content-Type"] = "application/json",
        ["Accept"] = "application/json",
        ${authHeader ? '["Authorization"] = "' + authHeader + '",' : ""}
    },
    source = ltn12.source.string(body),
    sink = ltn12.sink.table(response_body)
}
if code == 200 then
    print(table.concat(response_body))
else
    print("Error: " .. code)
end`;

    case "cpp":
      return `#include <iostream>
#include <cpr/cpr.h>

int main() {
    cpr::Response r = cpr::Post(cpr::Url{"https://api.yourdomain.com/products"},
                                cpr::Header{{"Content-Type", "application/json"}, {"Accept", "application/json"},
                                            ${
                                              authHeader
                                                ? '{"Authorization", "' +
                                                  authHeader +
                                                  '"},'
                                                : ""
                                            }},
                                cpr::Body{${jsonData}});
    std::cout << "Status code: " << r.status_code << std::endl;
    std::cout << "Response: " << r.text << std::endl;
}`;

    case "clojure":
      return `(require '[clj-http.client :as client])

(let [response (client/post "https://api.yourdomain.com/products"
                            {:headers {"Content-Type" "application/json"
                                       "Accept" "application/json"
                                       ${
                                         authHeader
                                           ? '"Authorization" "' +
                                             authHeader +
                                             '"'
                                           : ""
                                       }}
                             :body ${jsonData}
                             :content-type :json})]
  (println "Status:" (:status response))
  (println "Body:" (:body response)))`;

    case "objective-c":
      return `#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSURL *url = [NSURL URLWithString:@"https://api.yourdomain.com/products"];
        NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
        [request setHTTPMethod:@"POST"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
        [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
        ${
          authHeader
            ? '[request setValue:"' +
              authHeader +
              '" forHTTPHeaderField:"Authorization"];'
            : ""
        }
        NSData *jsonData = [@"${jsonData}" dataUsingEncoding:NSUTF8StringEncoding];
        [request setHTTPBody:jsonData];

        NSURLSession *session = [NSURLSession sharedSession];
        NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                                completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                    if (error) {
                                                        NSLog(@"%@", error);
                                                    } else {
                                                        NSString *result = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                                                        NSLog(@"%@", result);
                                                    }
                                                }];
        [task resume];
        CFRunLoopRun(); // Keep the application running until the async request completes
    }
    return 0;
}`;

    case "powershell":
      return `Invoke-RestMethod -Uri 'https://api.yourdomain.com/products' -Method Post -ContentType 'application/json' -Headers @{'Accept' = 'application/json'; ${
        authHeader ? "'Authorization' = '" + authHeader + "';" : ""
      }} -Body ${jsonData}`;

    case "node":
      return `const axios = require('axios');
axios.post('https://api.yourdomain.com/products', ${jsonData}, {
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

export const GeneratedCodeBlockPost = ({
  selectedLanguage,
  formValues,
  bearerToken,
  mediaValues,
}: GeneratedCodeBlockPostProps) => {
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
          method: "POST",
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

  /*const formattedParams = useMemo(() => {
    return Object.entries(formValues)
      .filter(([_, value]) => value !== "" && value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value
            .map((v) => `  '${key}': '${encodeURIComponent(String(v))}',`)
            .join("\n");
        }
        return `  '${key}': '${encodeURIComponent(String(value))}',`;
      })
      .join("\n");
  }, [formValues, mediaValues]);*/

  const generatedCode = useMemo(() => {
    // mediaValues'ı da kullanarak istekleri oluşturacak şekilde güncelle
    const fullData = { ...formValues, media: mediaValues };
    return generateCodeByLanguage(
      selectedLanguage,
      JSON.stringify(fullData),
      bearerToken,
      formValues
    );
  }, [selectedLanguage, formValues, mediaValues, bearerToken]);

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
