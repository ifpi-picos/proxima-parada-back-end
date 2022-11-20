-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT,
    "occupation" TEXT NOT NULL,
    "avatar" TEXT,
    "status" BOOLEAN DEFAULT false,
    "level" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_token" (
    "user_tokenId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_token_pkey" PRIMARY KEY ("user_tokenId")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "avatar" TEXT,
    "vehicle_type" TEXT NOT NULL,
    "vehicle_color" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_request" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT false,
    "readed" BOOLEAN DEFAULT false,
    "id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin_address" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "statusPublication" BOOLEAN NOT NULL DEFAULT true,
    "regular" BOOLEAN NOT NULL,
    "vacancies" BOOLEAN NOT NULL DEFAULT true,
    "modality" TEXT NOT NULL,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatar_key" ON "users"("avatar");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_user_tokenId_key" ON "user_token"("user_tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "user_token_user_id_key" ON "user_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_id_key" ON "admin_users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_id_key" ON "vehicles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_avatar_key" ON "vehicles"("avatar");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_id_user_key" ON "vehicles"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "status_request_id_key" ON "status_request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "status_request_id_user_key" ON "status_request"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "address_id_key" ON "address"("id");

-- CreateIndex
CREATE UNIQUE INDEX "publication_id_key" ON "publication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "publication_origin_address_key" ON "publication"("origin_address");

-- CreateIndex
CREATE UNIQUE INDEX "publication_destination_address_key" ON "publication"("destination_address");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_request" ADD CONSTRAINT "status_request_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_origin_address_fkey" FOREIGN KEY ("origin_address") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_destination_address_fkey" FOREIGN KEY ("destination_address") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
