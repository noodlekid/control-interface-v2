import prisma from "../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {
    poi: {
      name,
      coordinate: { longitude, latitude },
    },
  } = await request.json();

  const createdCoordinate = await prisma.coordinate.create({
    data: {
      longitude,
      latitude,
    },
  });

  const poi = await prisma.poi.create({
    data: {
      name,
      coordinateId: createdCoordinate.id,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: "Coordinate Created Successfully!",
      data: poi,
    },
    { status: 201 },
  );
}

export async function GET() {
  const pois = await prisma.poi.findMany();
  const coords = await prisma.coordinate.findMany();
  return NextResponse.json(
    {
      success: true,
      message: "List Points of Interest",
      data: {
        pois,
        coords
      },
    },
    { status: 200 },
  );
}
