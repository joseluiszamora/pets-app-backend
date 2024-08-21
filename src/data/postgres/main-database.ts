import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Options {
  dbUrl: string;
  dbName: string;
}

export class MainDatabase {
  static async connect() {
    try {
      prisma.$connect();
      console.log("Connectd DB");
    } catch (error) {
      throw error;
    }
  }
}
