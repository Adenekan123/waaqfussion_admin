import { ReactNode } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { apiErrorHandler } from "../api/error.handler";

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: apiErrorHandler
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
