/*
  Warnings:

  - You are about to drop the column `brands` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isFavorite` on the `products` table. All the data in the column will be lost.
  - Added the required column `brand` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "brands",
DROP COLUMN "isFavorite",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
