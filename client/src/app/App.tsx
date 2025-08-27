import AppProvider from "./AppProvider";
import AppRouter from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App(): React.ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </QueryClientProvider>
  );
}
