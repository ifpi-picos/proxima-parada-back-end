-- CreateTable
CREATE TABLE "status_request" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT false,
    "readed" BOOLEAN DEFAULT false,
    "id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_request_id_key" ON "status_request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "status_request_id_user_key" ON "status_request"("id_user");

-- AddForeignKey
ALTER TABLE "status_request" ADD CONSTRAINT "status_request_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
