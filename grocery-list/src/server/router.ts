import * as trpc from "@trpc/server";

// zod: first schema declaration and validation library with static type inference
import { z } from "zod";

import { Context } from "./context";

export const serverRouter = trpc
    .router<Context>()
    // find all
    .query("findAll", {
        // ctx = context
        resolve: async ({ ctx }) => {
            return await ctx.prisma.groceryList.findMany();
        },
    })
    // insert one
    .mutation("insertOne", {
        input: z.object({
            title: z.string(),
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.groceryList.create({
                data: { title: input.title },
            });
        },
    })
    // update one
    .mutation("updateOne", {
        input: z.object({
            id: z.number(),
            title: z.string(),
            checked: z.boolean(),
        }),
        resolve: async ({ input, ctx}) => {
            const { id, ...rest } = input;

            return await ctx.prisma.groceryList.update({
                where: { id },
                data: { ...rest },
            });
        },
    })
    // delete all
    .mutation("deleteAll", {
        input: z.object({
            ids: z.number().array(),
        }),
        resolve: async ({ input, ctx })  => {
            const { ids } = input;

            return await ctx.prisma.groceryList.deleteMany({
                where: {
                    id: { in: ids},
                },
            });
        },
    });

export type ServerRouter = typeof serverRouter;

// with our router configured it is now time to create the API route