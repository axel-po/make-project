import { db } from "@/server/db";
import { type Prisma } from "@prisma/client";

export const getTechnologies = () => db.technology.findMany();

export type TechnologiesType = Prisma.PromiseReturnType<typeof getTechnologies>;
