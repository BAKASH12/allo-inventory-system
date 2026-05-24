import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      productName,
      warehouseName,
      quantity,
    } = body;

    const inventory =
      await prisma.inventory.findFirst({
        where: {
          product: {
            name: productName,
          },
          warehouse: {
            name: warehouseName,
          },
        },
      });

    if (!inventory) {
      return NextResponse.json(
        { error: "Inventory not found" },
        { status: 404 }
      );
    }

    const available =
      inventory.totalStock -
      inventory.reservedStock;

    if (available < quantity) {
      return NextResponse.json(
        { error: "Not enough stock" },
        { status: 409 }
      );
    }

    const updatedInventory =
      await prisma.inventory.update({
        where: {
          id: inventory.id,
        },
        data: {
          reservedStock: {
            increment: quantity,
          },
        },
      });

    const reservation =
      await prisma.reservation.create({
        data: {
          inventoryId: inventory.id,
          quantity,
          status: "pending",
          expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      });

    return NextResponse.json({
      success: true,
      reservation,
      updatedInventory,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}