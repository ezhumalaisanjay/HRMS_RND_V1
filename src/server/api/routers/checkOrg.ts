// ~/server/api/routers/checkOrg.ts
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import {
  createOrganization,
  deleteOrg,
  getOrganization,
  listOrganization,
  updateOrganization,
} from "~/logic/Organization";

export const checkOrg = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        licenseStartsAt: z.string(),
        licenseDuration: z.number(),
        registeredMail: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      // Add logic to handle creation
      const response = await createOrganization(input); // your org creation function
      return response;
    }),
  list: publicProcedure.query(async () => {
    return listOrganization();
  }),
  get: publicProcedure
    .input(
      z.object({
        sk: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return getOrganization(input.sk);
    }),
  delete: publicProcedure
    .input(
      z.object({
        sk: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return deleteOrg(input.sk);
    }),
  update: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        licenseStartsAt: z.string(),
        licenseDuration: z.number(),
        registeredMail: z.string().email(),
        sk: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      // Add logic to handle creation
      const response = await updateOrganization(input, input.sk); // your org creation function
      return response;
    }),
});
