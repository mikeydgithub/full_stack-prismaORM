// context page used to pass contextual data to all router resolvers.
// And in our context we will pass our prism client instance

// import server
import * as trpc from "@trpc/server";

// import server adapters
import * as trpcNext from "@trpc/server/adapters/next";

// import PrismaClient
import { PrismaClient } from "@prisma/client";

// inferred context from createcontext we can move on to defining our router
// before that it is important to keep in mind that
// : an endpoint is called a procedure;
// a procedure can have two types of operations(query and mutation);
// queries are responsible for fetching data, while mutations are responsible for making changes to the data (server-side)
export async function createContext(opts?: trpcNext.CreateNextContextOptions){
    const prisma = new PrismaClient();

    return { prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;