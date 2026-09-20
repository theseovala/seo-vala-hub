import { createFileRoute } from "@tanstack/react-router";

const REQUIRED_ENV_KEYS = ["SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY"] as const;
const DEFAULT_APP_URL = "http://localhost:8080";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const missingEnv = REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);
        const appUrl = process.env["VITE_APP_URL"] ?? DEFAULT_APP_URL;

        return Response.json({
          ok: true,
          service: "seo-vala-hub",
          status: missingEnv.length === 0 ? "ready" : "configuration_missing",
          environment: process.env.NODE_ENV ?? "development",
          appUrl,
          timestamp: new Date().toISOString(),
          missingEnv: missingEnv.length > 0 ? missingEnv : undefined,
        });
      },
    },
  },
});
