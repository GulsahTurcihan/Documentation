"use client";

import React from "react";
import CodeBlock from "./PrismCodeBlock";

interface ResponseComponentProps {
  responseData: any;
}

const ResponseComponent: React.FC<ResponseComponentProps> = ({
  responseData,
}) => {
  // ✅ If no response, show a default message
  const defaultResponse = {
    message:
      "Enter values in the form and click 'Try It!' to see your input as JSON.",
    example: {
      status: 200,
      requestData: {
        name: "Sample Product",
        price: 19.99,
        stock: 50,
      },
      timestamp: new Date().toISOString(),
    },
  };

  const displayedResponse = responseData || defaultResponse;

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-md my-2">
      <h3 className="text-white text-sm font-semibold mb-4">
        Simulated API Response (JSON):
      </h3>

      <CodeBlock
        language="json"
        code={JSON.stringify(displayedResponse, null, 2)} // ✅ Always display formatted JSON
        className="code-container"
      />
    </div>
  );
};

export default ResponseComponent;
