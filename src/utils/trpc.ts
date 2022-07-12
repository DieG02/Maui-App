// utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../Maui-Backend/src/trpcRouter";

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
