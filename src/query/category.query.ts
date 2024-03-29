import { db } from "@/server/db";
import { type Prisma } from "@prisma/client";

export const getCategories = () => db.category.findMany();

export type CategoryType = Prisma.PromiseReturnType<
  typeof getCategories
>[number];
