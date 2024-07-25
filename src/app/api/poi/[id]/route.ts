import prisma from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const poi = await prisma.poi.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!poi) {
    return NextResponse.json(
      {
        success: false,
        message: "POI Not Found!",
      },
      { status: 404 },
    );
  }

  const coordinate = await prisma.coordinate.findUnique({
    where: { id: poi.coordinateId },
  });

  return NextResponse.json(
    {
      success: true,
      message: "POI Found!",
      data: {
        poi,
        coordinate,
      },
    },
    { status: 200 },
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const poiDelete = await prisma.poi.findUniqueOrThrow({
    where: {
      id: parseInt(params.id),
    },
  });

  await prisma.poi.delete({
    where: {
      id: poiDelete.id,
    },
  });

  await prisma.coordinate.delete({
    where: {
      id: poiDelete.coordinateId,
    },
  });

  if (!poiDelete) {
    return NextResponse.json(
      {
        success: false,
        message: "POI Not Found!",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "POI Deleted Successfully!",
    },
    { status: 200 },
  );
}
