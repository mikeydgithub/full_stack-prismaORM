import * as trpcNext from "@trpc/server/adapters/next";

import { serverRouter } from "../../../server/router";
import { createContext } from "@/server/context";


// api handler for server router.ts and context.ts
export default trpcNext.createNextApiHandler({
    router: serverRouter,
    createContext,
});

// time to configure the _app.tsx