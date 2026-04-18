import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConciergeSubmissionSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/concierge/submissions", async (req: Request, res: Response) => {
    const parsed = insertConciergeSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid submission",
        details: parsed.error.flatten(),
      });
    }

    try {
      const record = await storage.createConciergeSubmission(parsed.data);

      // The team inbox: structured server log every operator can grep / pipe
      // to a log drain (Papertrail, Logtail, etc.).
      console.log(
        `[concierge] new ${record.kind} submission ${record.id}`,
        JSON.stringify({
          id: record.id,
          kind: record.kind,
          contactName: record.contactName,
          contactInfo: record.contactInfo,
          payload: record.payload,
          createdAt: record.createdAt,
        }),
      );

      // Optional fan-out to a Slack/webhook URL when configured. Failures
      // here must not break the user-facing submission, so we just log.
      const webhookUrl = process.env.CONCIERGE_WEBHOOK_URL;
      if (webhookUrl) {
        const summary = summariseForWebhook(record);
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: summary, submission: record }),
        }).catch((err) => {
          console.error("[concierge] webhook delivery failed", err);
        });
      }

      return res.status(201).json({
        id: record.id,
        kind: record.kind,
        createdAt: record.createdAt,
      });
    } catch (err) {
      console.error("[concierge] failed to persist submission", err);
      return res
        .status(500)
        .json({ error: "Could not save your request. Please try again." });
    }
  });

  app.get(
    "/api/concierge/submissions/:id",
    async (req: Request, res: Response) => {
      const record = await storage.getConciergeSubmission(String(req.params.id));
      if (!record) return res.status(404).json({ error: "Not found" });
      return res.json(record);
    },
  );

  return httpServer;
}

function summariseForWebhook(record: {
  id: string;
  kind: string;
  contactName: string | null;
  contactInfo: string | null;
  payload: unknown;
}): string {
  const who = [record.contactName, record.contactInfo]
    .filter(Boolean)
    .join(" · ");
  return `Suprans Concierge · ${record.kind.toUpperCase()} · ${record.id}${
    who ? ` · ${who}` : ""
  }`;
}
