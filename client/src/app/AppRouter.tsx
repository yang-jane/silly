import { QueryClient, useQueryClient } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useMemo } from "react";
import {
  LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

export const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        return { Component: HomePage };
      },
    },
    {
      path: "*",
      lazy: async () => {
        return { Component: NotFoundPage };
      },
    },
  ]);
};

export default function AppRouter(): React.ReactNode {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
}
