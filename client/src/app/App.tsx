import AppProvider from "./AppProvider";
import AppRouter from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DndContext } from "@dnd-kit/core";

const queryClient = new QueryClient();

export default function App(): React.ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <DndContext>
          <AppRouter />
        </DndContext>
      </AppProvider>
    </QueryClientProvider>
  );
}
