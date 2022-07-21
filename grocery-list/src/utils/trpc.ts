import type { ServerRouter } from "@/server/router";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<ServerRouter>();

// tRPC hook, to which we add the data type of our router as generic
// on the createreactqueryhooks() function so we can make API calls