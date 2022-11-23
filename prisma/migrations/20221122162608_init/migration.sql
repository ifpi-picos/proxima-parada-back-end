/*
  Warnings:

  - The `departure_hour` column on the `publication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "publication" DROP COLUMN "departure_hour",
ADD COLUMN     "departure_hour" TIME(4) NOT NULL DEFAULT CURRENT_TIMESTAMP;
