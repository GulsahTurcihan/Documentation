import { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/prism/PrismCodeBlock";

export type GeneratedCodeBlockGetProps = {
  selectedLanguage: string;
  formValues: Record<string, any>;
  bearerToken: string;
};

const generateCodeByLanguage = (
  language: string,
  params: string,
  bearerToken: string
) => {
  const queryParams = params.replace(/\n/g, "&"); // 🟢 Query string formatına çevir

  const authHeader = bearerToken ? `Authorization: Bearer ${bearerToken}` : "";

  switch (language) {
    case "javascript":
      return `// JavaScript fetch example
fetch('https://dummyjson.com/test?${queryParams}', {
  method: "GET",
  headers: {
    "${authHeader}",
    "Accept": "application/json"
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

    case "typescript":
      return `fetch("https://dummyjson.com/test?${queryParams}", { method: "GET" })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

    case "python":
      return `python -m pip install requests

import requests

url = "https://dummyjson.com/test?${queryParams}"

headers = {
  "accept": "application/json",
  "${authHeader}"
}

response = requests.get(url, headers=headers)

print(response.text)`;

    case "http":
      return `GET /test?${queryParams} HTTP/1.1
Host: dummyjson.com
Accept: application/json
${authHeader}`;

    case "php":
      return `composer require guzzlehttp/guzzle

<?php
require_once('vendor/autoload.php');

$client = new \\GuzzleHttp\\Client();

$response = $client->request('GET', 'https://dummyjson.com/test?${queryParams}', [
  'headers' => [
    'accept' => 'application/json',
    '${authHeader}'
  ],
]);

echo $response->getBody();
?>`;

    case "shell":
      return `curl --request GET \\
     --url 'https://dummyjson.com/test?${queryParams}' \\
     --header 'accept: application/json' \\
     --header '${authHeader}'`;

    case "go":
      return `package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {
  url := "https://dummyjson.com/test?${queryParams}"
  client := &http.Client{}
  req, _ := http.NewRequest("GET", url, nil)
  req.Header.Add("accept", "application/json")
  req.Header.Add("${authHeader}")
  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`;

    case "csharp":
      return `dotnet add package RestSharp

using RestSharp;

var options = new RestClientOptions("https://dummyjson.com/test?${queryParams}");
var client = new RestClient(options);
var request = new RestRequest("");
request.AddHeader("accept", "application/json");
request.AddHeader("${authHeader}");
var response = await client.GetAsync(request);

Console.WriteLine("{0}", response.Content);`;

    case "ruby":
      return `require 'uri'
require 'net/http'

url = URI("https://dummyjson.com/test?${queryParams}")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["accept"] = 'application/json'
request["${authHeader}"]

response = http.request(request)
puts response.read_body`;

    case "swift":
      return `import Foundation

let url = URL(string: "https://dummyjson.com/test")!
var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!
let queryItems: [URLQueryItem] = [
  URLQueryItem(name: "limit", value: "10"),
  URLQueryItem(name: "page", value: "1"),
  URLQueryItem(name: "sort", value: "dateDesc"),
]
components.queryItems = components.queryItems.map { $0 + queryItems } ?? queryItems

var request = URLRequest(url: components.url!)
request.httpMethod = "GET"
request.timeoutInterval = 10
request.allHTTPHeaderFields = [
  "accept": "application/json",
  "${authHeader}"
]

let (data, _) = try await URLSession.shared.data(for: request)

print(String(decoding: data, as: UTF8.self))`;

    case "java":
      return `OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://dummyjson.com/test?${queryParams}")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("${authHeader}")
  .build();

Response response = client.newCall(request).execute();`;

    case "kotlin":
      return `val client = OkHttpClient()

val request = Request.Builder()
  .url("https://dummyjson.com/test?${queryParams}")
  .get()
  .addHeader("accept", "application/json")
  .addHeader("${authHeader}")
  .build()

val response = client.newCall(request).execute()`;

    case "rust":
      return `use reqwest;

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
  let client = reqwest::Client::new();
  let response = client.get("https://dummyjson.com/test?${queryParams}")
    .header("accept", "application/json")
    .header("${authHeader}")
    .send()
    .await?
    .text()
    .await?;
  println!("{}", response);
  Ok(())
}`;

    case "dart":
      return `import 'package:http/http.dart' as http;

void main() async {
  final response = await http.get(
    Uri.parse("https://dummyjson.com/test?${queryParams}"),
    headers: {
      "accept": "application/json",
      "${authHeader}"
    },
  );
  print(response.body);
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
      return `use LWP::UserAgent;

my $ua = LWP::UserAgent->new;
my $url = "https://dummyjson.com/test?${queryParams}";
my $req = HTTP::Request->new(GET => $url);
$req->header('accept' => 'application/json');
$req->header('${authHeader}');
my $response = $ua->request($req);
print $response->decoded_content;`;

    case "lua":
      return `local http = require("socket.http")
local url = "https://dummyjson.com/test?${queryParams}"
local headers = {
  ["accept"] = "application/json",
  ["${authHeader}"] = ""
}
local response, status = http.request{
  url = url,
  headers = headers
}
print(response)`;

    case "cpp":
      return `CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "GET");
curl_easy_setopt(hnd, CURLOPT_WRITEDATA, stdout);
curl_easy_setopt(hnd, CURLOPT_URL, "https://dummyjson.com/test?${queryParams}");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "accept: application/json");
headers = curl_slist_append(headers, "${authHeader}");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

CURLcode ret = curl_easy_perform(hnd);`;

    case "clojure":
      return `(require '[clj-http.client :as client])

(client/get "https://dummyjson.com/test" {:query-params {:limit "10"
                                                                  :page "1"
                                                                  :sort "dateDesc"}
                                                   :headers {"accept" "application/json"
                                                             "${authHeader}"}})`;

    case "objective-c":
      return `#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"accept": @"application/json", @"${authHeader}" };

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://dummyjson.com/test?${queryParams}"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"GET"];
[request setAllHTTPHeaderFields:headers];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];`;

    case "powershell":
      return `$headers=@{}
$headers.Add("accept", "application/json")
$headers.Add("${authHeader}")
$response = Invoke-WebRequest -Uri 'https://dummyjson.com/test?${queryParams}' -Method GET -Headers $headers`;

    case "node":
      return `npx api install"

const axios = require('axios');

axios.get('https://dummyjson.com/test', {
  headers: {
    'Authorization': 'Bearer {Your_bearer_token\}',
    'Accept': 'application/json'
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});`;

    default:
      return "// ⚠️ Invalid language is chosen. Please select a valid language.";
  }
};

export const GeneratedCodeBlockGet = ({
  selectedLanguage,
  formValues,
  bearerToken,
}: GeneratedCodeBlockGetProps) => {
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

  const formattedParams = useMemo(() => {
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
  }, [formValues]);

  const generatedCode = useMemo(() => {
    return generateCodeByLanguage(
      selectedLanguage,
      formattedParams,
      bearerToken
    );
  }, [selectedLanguage, formattedParams, bearerToken]);

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
