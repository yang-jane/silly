import { useQueryClient } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "*",
      lazy: async () => {
        return { Component: HomePage };
      },
    },
  ]);
};

export default function AppRouter(): React.ReactNode {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
}
