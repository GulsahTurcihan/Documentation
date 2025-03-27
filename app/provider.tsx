"use client";

import React, { createContext, useContext, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 * 5,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;

{
  /* ASIDE CONTEXT AND PROVIDER FOR PRISMJS */
}

type AsideContextType = {
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  bearerToken: string;
  setBearerToken: (value: string) => void;
  apiResponse: any;
  setApiResponse: (value: any) => void;
};

const AsideContext = createContext<AsideContextType | null>(null);

export const AsideProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");
  const [bearerToken, setBearerToken] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  return (
    <AsideContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        bearerToken,
        setBearerToken,
        apiResponse,
        setApiResponse,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export const useAsideContext = () => {
  const context = useContext(AsideContext);

  if (!context) {
    throw new Error("useAsideContext must be used within an AsideProvider");
  }

  return context;
};

{
  /* PRICE DATA PROVIDER */
}

/* MEDIA PROVIDER */

type CreateMediaContextType = {
  createMedia: any;
  setCreateMedia: React.Dispatch<React.SetStateAction<any>>;
};

const CreateMediaContext = createContext<CreateMediaContextType | null>(null);

export const useCreateMedia = () => useContext(CreateMediaContext);
export const CreateMediaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [createMedia, setCreateMedia] = useState({});

  return (
    <CreateMediaContext.Provider value={{ createMedia, setCreateMedia }}>
      {children}
    </CreateMediaContext.Provider>
  );
};
