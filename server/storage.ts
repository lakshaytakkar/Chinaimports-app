import {
  type User,
  type InsertUser,
  type ConciergeSubmission,
  type InsertConciergeSubmission,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createConciergeSubmission(
    submission: InsertConciergeSubmission,
  ): Promise<ConciergeSubmission>;
  getConciergeSubmission(id: string): Promise<ConciergeSubmission | undefined>;
  listConciergeSubmissions(): Promise<ConciergeSubmission[]>;
}

function generateReferenceId(): string {
  return `SH-${Math.floor(100000 + Math.random() * 900000)}`;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private submissions: Map<string, ConciergeSubmission>;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createConciergeSubmission(
    submission: InsertConciergeSubmission,
  ): Promise<ConciergeSubmission> {
    let id = generateReferenceId();
    while (this.submissions.has(id)) {
      id = generateReferenceId();
    }
    const record: ConciergeSubmission = {
      id,
      kind: submission.kind,
      contactName: submission.contactName ?? null,
      contactInfo: submission.contactInfo ?? null,
      payload: submission.payload,
      createdAt: new Date(),
    };
    this.submissions.set(id, record);
    return record;
  }

  async getConciergeSubmission(
    id: string,
  ): Promise<ConciergeSubmission | undefined> {
    return this.submissions.get(id);
  }

  async listConciergeSubmissions(): Promise<ConciergeSubmission[]> {
    return Array.from(this.submissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}

export const storage = new MemStorage();
