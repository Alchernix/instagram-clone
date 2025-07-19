-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "handle" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "profileImg" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dg7iu04zf/image/upload/v1741245410/aorfbhxinzeonxdq7guq.jpg',
    "website" TEXT,
    "bio" VARCHAR(150),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");
