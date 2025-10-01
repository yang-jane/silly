import { useQueryClient } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PhotoBooth from "./pages/PhotoBooth";
import Temp from "./pages/Temp";

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: "/silly",
      lazy: async () => {
        return { Component: HomePage };
      },
    },
    {
      path: "/silly/photobooth",
      lazy: async () => {
        return { Component: PhotoBooth };
      },
    },
    {
      path: "/silly/webcam",
      lazy: async () => {
        return { Component: Temp };
      },
    },
  ]);
};

export default function AppRouter(): React.ReactNode {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
}
