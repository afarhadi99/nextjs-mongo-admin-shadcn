import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/movies
export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error fetching movies", error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/movies
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, videoUrl, thumbnailUrl, genre, duration } = body;

    if (!id) {
      return NextResponse.json({ message: "Movie ID is required" }, { status: 400 });
    }
    const movie = await prisma.movie.update({
        where: {
            id: id,
        },
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
      },
    });
    return NextResponse.json({ movie, message: "Movie Updated Successfully" });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating movie", error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/movies
export async function POST(req: Request) {
    try {
      const body = await req.json();
      const {title, description, videoUrl, thumbnailUrl, genre, duration } = body;
        const newMovie = await prisma.movie.create({
            data: {
               title,
               description,
               videoUrl,
               thumbnailUrl,
               genre,
               duration
            }
        })
       return NextResponse.json({ newMovie, message: "Movie Created Successfully" });
    } catch(error: any) {
        return NextResponse.json(
            { message: "Error creating movie", error: error.message },
            { status: 500 }
        )
    }
}

// DELETE /api/movies
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Movie ID is required" }, { status: 400 });
    }

    await prisma.movie.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Movie Deleted Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting movie", error: error.message },
      { status: 500 }
    );
  }
}