"use client";

import { useState } from "react";
import { ClipboardCopy } from "lucide-react";

interface CredentialsProps {
  onTokenChange: (token: string) => void;
}

const Credentials = ({ onTokenChange }: CredentialsProps) => {
  const [token, setToken] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    alert("taken is copied!");
  };

  return (
    <div className="bg-sidebar-accent p-4 rounded-lg my-4">
      <h3 className="text-gray-500 text-sm font-semibold mb-2">CREDENTIALS</h3>
      <div className="flex items-center space-y-2 space-x-2 md:space-y-0">
        <span className="bg-sidebar-border text-gray-500 p-2 rounded text-sm">
          Bearer
        </span>
        <input
          type="text"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            onTokenChange(e.target.value);
          }}
          placeholder="Token"
          className="w-full md:flex-1 p-2 text-sidebar-text text-s bg-white border-sidebar-border rounded focus:outline-double focus:outline-sidebar-ring"
        />
        <button
          onClick={handleCopy}
          className=" text-sidebar-text hover:text-white"
        >
          <ClipboardCopy size={18} />
        </button>
      </div>
    </div>
  );
};

export default Credentials;
