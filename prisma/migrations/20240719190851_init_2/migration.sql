/*
  Warnings:

  - You are about to drop the `POI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "POI" DROP CONSTRAINT "POI_coordinateId_fkey";

-- DropTable
DROP TABLE "POI";

-- CreateTable
CREATE TABLE "Poi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coordinateId" INTEGER NOT NULL,

    CONSTRAINT "Poi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poi" ADD CONSTRAINT "Poi_coordinateId_fkey" FOREIGN KEY ("coordinateId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
