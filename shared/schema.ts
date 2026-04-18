import { sql } from "drizzle-orm";
import { jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const conciergeSubmissions = pgTable("concierge_submissions", {
  id: varchar("id").primaryKey(),
  kind: text("kind").notNull(),
  contactName: text("contact_name"),
  contactInfo: text("contact_info"),
  payload: jsonb("payload").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const advisorPayloadSchema = z.object({
  slot: z.object({
    day: z.string(),
    time: z.string(),
  }),
  productContext: z.string().optional(),
});

export const quotePayloadSchema = z.object({
  productIds: z.array(z.string()).min(1),
  brief: z.string().min(5),
});

export const aiPayloadSchema = z.object({
  prompt: z.string().min(5),
});

export const referPayloadSchema = z.object({
  name: z.string().min(2),
  contact: z.string().min(5),
  note: z.string().optional(),
});

export const insertConciergeSubmissionSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("advisor"),
    contactName: z.string().min(1),
    contactInfo: z.string().min(5),
    payload: advisorPayloadSchema,
  }),
  z.object({
    kind: z.literal("quote"),
    contactName: z.string().min(1),
    contactInfo: z.string().min(5),
    payload: quotePayloadSchema,
  }),
  z.object({
    kind: z.literal("ai"),
    contactName: z.string().min(1).optional(),
    contactInfo: z.string().min(5).optional(),
    payload: aiPayloadSchema,
  }),
  z.object({
    kind: z.literal("refer"),
    contactName: z.string().min(1).optional(),
    contactInfo: z.string().min(5).optional(),
    payload: referPayloadSchema,
  }),
]);

export type InsertConciergeSubmission = z.infer<
  typeof insertConciergeSubmissionSchema
>;
export type ConciergeSubmission = typeof conciergeSubmissions.$inferSelect;
