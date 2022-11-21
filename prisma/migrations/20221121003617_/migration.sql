-- AlterTable
ALTER TABLE "publication" ADD COLUMN     "departure_hour" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "departure_date" SET DATA TYPE DATE;
