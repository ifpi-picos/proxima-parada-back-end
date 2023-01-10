/*
  Warnings:

  - You are about to drop the column `statusDescriptionDenied` on the `status_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "status_request" DROP COLUMN "statusDescriptionDenied";
