-- CreateTable
CREATE TABLE "POI" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coordinateId" INTEGER NOT NULL,

    CONSTRAINT "POI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordinate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "POI" ADD CONSTRAINT "POI_coordinateId_fkey" FOREIGN KEY ("coordinateId") REFERENCES "Coordinate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
