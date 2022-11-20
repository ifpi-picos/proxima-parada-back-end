/*
  Warnings:

  - You are about to drop the column `district` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `road` on the `address` table. All the data in the column will be lost.
  - The `vacancies` column on the `publication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `neighborhood` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_plate` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_color` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_type` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "district",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "road",
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "publication" DROP COLUMN "vacancies",
ADD COLUMN     "vacancies" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "license_plate" TEXT NOT NULL,
ADD COLUMN     "vehicle_color" TEXT NOT NULL,
ADD COLUMN     "vehicle_type" TEXT NOT NULL;
