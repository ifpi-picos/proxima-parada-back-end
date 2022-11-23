/*
  Warnings:

  - You are about to drop the column `departure_hour` on the `publication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "publication" DROP COLUMN "departure_hour",
ALTER COLUMN "departure_date" SET DATA TYPE TIMESTAMP(3);
