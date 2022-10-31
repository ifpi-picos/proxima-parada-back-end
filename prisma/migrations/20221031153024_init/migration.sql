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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "admin_users_name_key" ON "admin_users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_id_key" ON "vehicles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_id_user_key" ON "vehicles"("id_user");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
