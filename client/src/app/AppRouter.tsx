import { useQueryClient } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BoothLanding from "./pages/BoothLanding";
import PhotoBooth from "./pages/PhotoBoothPage";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/silly",
      lazy: async () => {
        return { Component: HomePage };
      },
    },
    {
      path: "/silly/test",
      lazy: async () => {
        return { Component: BoothLanding };
      },
    },
    {
      path: "/silly/photobooth",
      lazy: async () => {
        return { Component: PhotoBooth };
      },
    },
  ]);
};

export default function AppRouter(): React.ReactNode {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
}
