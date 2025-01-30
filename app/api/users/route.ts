import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/users
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, image } = body;
    if (!id) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        image
      }
    })
     return NextResponse.json({ user, message: "User Updated Successfully" });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}