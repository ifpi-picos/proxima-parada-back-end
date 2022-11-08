-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "origin_address" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "statusPublication" BOOLEAN NOT NULL DEFAULT true,
    "regular" BOOLEAN NOT NULL,
    "vacancies" TEXT NOT NULL,
    "modality" TEXT NOT NULL,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_id_key" ON "address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "publication_id_key" ON "publication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "publication_id_user_key" ON "publication"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "publication_origin_address_key" ON "publication"("origin_address");

-- CreateIndex
CREATE UNIQUE INDEX "publication_destination_address_key" ON "publication"("destination_address");

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_origin_address_fkey" FOREIGN KEY ("origin_address") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_destination_address_fkey" FOREIGN KEY ("destination_address") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
