import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({
  children,
}: AppProviderProps): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>error fallback</div>}>
        <HelmetProvider>{children}</HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
