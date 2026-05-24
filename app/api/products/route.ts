import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventory =
      await prisma.inventory.findMany({
        include: {
          product: true,
          warehouse: true,
        },
      });

    const formatted = inventory.map(
      (item) => ({
        id: item.id,
        product: item.product.name,
        warehouse: item.warehouse.name,
        totalStock: item.totalStock,
        reservedStock:
          item.reservedStock,
        availableStock:
          item.totalStock -
          item.reservedStock,
      })
    );

    return NextResponse.json(
      formatted
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}