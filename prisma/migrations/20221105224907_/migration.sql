/*
  Warnings:

  - A unique constraint covering the columns `[avatar]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "avatar" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_avatar_key" ON "vehicles"("avatar");
