"use client";
import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "@/components/DataTable";
import UserDrawer from "@/components/UserDrawer";
import MovieDrawer from "@/components/MovieDrawer";
import AddMovieButton from "@/components/AddMovieButton";
import { ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
}

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Error fetching users", response);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch("/api/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error("Error fetching movies", response);
      }
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchMovies();
  }, [fetchUsers, fetchMovies]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleAddMovie = () => {
    setSelectedMovie({
      id: "",
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      genre: "",
      duration: "",
    });
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        fetchUsers(); // Refresh the users data
        setSelectedUser(null);
      } else {
        console.error("Error saving user:", response);
      }
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  const handleSaveMovie = async (updatedMovie: Movie) => {
    try {
      let method = "PUT";
      let url = "/api/movies";
      if (!updatedMovie.id) {
        method = "POST";
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });
      if (response.ok) {
        fetchMovies();
        setSelectedMovie(null);
      } else {
        console.error("Error saving movie", response);
      }
    } catch (error) {
      console.error("Error saving movie", error);
    }
  };

    const handleDeleteMovie = async (movieToDelete: Movie) => {
       try {
        const response = await fetch(`/api/movies?id=${movieToDelete.id}`, {
          method: "DELETE",
        });
           if(response.ok) {
            fetchMovies();
           } else {
            console.error('Error deleting movie', response)
           }
        } catch(error) {
            console.error('Error deleting movie', error)
        }
    };

  const userColumns = [
    { header: "ID", accessor: "id" as keyof User },
    { header: "Name", accessor: "name" as keyof User },
    {
      header: "Image",
      accessor: "image" as keyof User,
      render: (user: User) =>
        user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          "No Image"
        ),
    },
    { header: "Email", accessor: "email" as keyof User },
  ];
  const movieColumns = [
    { header: "ID", accessor: "id" as keyof Movie },
    { header: "Title", accessor: "title" as keyof Movie },
    {
      header: "Thumbnail",
      accessor: "thumbnailUrl" as keyof Movie,
      render: (movie: Movie) =>
        movie.thumbnailUrl ? (
          <img src={movie.thumbnailUrl} alt={movie.title} className="h-10 w-10 rounded" />
        ) : (
          "No thumbnail"
        ),
    },
    { header: "Genre", accessor: "genre" as keyof Movie },
    { header: "Duration", accessor: "duration" as keyof Movie },
  ];

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="movies">Movies</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          {/* Add home screen here */}
        </TabsContent>
        <TabsContent value="users">
          <DataTable
            data={users}
            columns={userColumns}
            onEdit={handleEditUser}
            searchable={true}
            className="mt-4"
          />
          <UserDrawer
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onSave={handleSaveUser}
          />
        </TabsContent>
        <TabsContent value="movies">
          <div className="mb-4 flex justify-end">
            <AddMovieButton onClick={handleAddMovie} />
          </div>
          <DataTable
            data={movies}
            columns={movieColumns}
            onEdit={handleEditMovie}
            onDelete={handleDeleteMovie}
            searchable={true}
            className="mt-4"
          />
          <MovieDrawer
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            onSave={handleSaveMovie}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}