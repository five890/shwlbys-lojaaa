import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getUserById, createAddress, getUserAddresses, getUserOrders, getOrderById, getUserWishlists, getProductReviews, getChatMessages } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // User Profile
  user: router({
    profile: protectedProcedure.query(async ({ ctx }) => {
      const user = await getUserById(ctx.user.id);
      return user;
    }),
    
    addresses: protectedProcedure.query(async ({ ctx }) => {
      const addresses = await getUserAddresses(ctx.user.id);
      return addresses;
    }),

    createAddress: protectedProcedure
      .input(z.object({
        fullName: z.string(),
        phone: z.string(),
        whatsapp: z.string().optional(),
        email: z.string().email(),
        street: z.string(),
        number: z.string(),
        complement: z.string().optional(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const result = await createAddress(ctx.user.id, input);
        return result;
      }),

    orders: protectedProcedure.query(async ({ ctx }) => {
      const orders = await getUserOrders(ctx.user.id);
      return orders;
    }),

    order: protectedProcedure
      .input(z.object({
        orderId: z.number(),
      }))
      .query(async ({ ctx, input }) => {
        const order = await getOrderById(input.orderId);
        // Verify that the order belongs to the current user
        if (order && order.userId !== ctx.user.id) {
          throw new Error("Unauthorized");
        }
        return order;
      }),

    wishlists: protectedProcedure.query(async ({ ctx }) => {
      const wishlists = await getUserWishlists(ctx.user.id);
      return wishlists;
    }),

    chatMessages: protectedProcedure.query(async ({ ctx }) => {
      const messages = await getChatMessages(ctx.user.id);
      return messages;
    }),
  }),

  // Products
  products: router({
    list: publicProcedure.query(async () => {
      // TODO: Implement product listing
      return [];
    }),

    byId: publicProcedure
      .input(z.object({
        id: z.number(),
      }))
      .query(async ({ input }) => {
        // TODO: Implement product by ID
        return null;
      }),

    reviews: publicProcedure
      .input(z.object({
        productId: z.number(),
      }))
      .query(async ({ input }) => {
        const reviews = await getProductReviews(input.productId);
        return reviews;
      }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
