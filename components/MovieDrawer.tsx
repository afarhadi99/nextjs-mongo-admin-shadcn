"use client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  
  interface Movie {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    genre: string;
    duration: string;
  }
  
  interface MovieDrawerProps {
    movie: Movie | null;
    onClose: () => void;
    onSave: (movie: Movie) => Promise<void>;
  }
  
  function MovieDrawer({ movie, onClose, onSave }: MovieDrawerProps) {
    const [title, setTitle] = useState(movie?.title || "");
    const [description, setDescription] = useState(movie?.description || "");
    const [videoUrl, setVideoUrl] = useState(movie?.videoUrl || "");
    const [thumbnailUrl, setThumbnailUrl] = useState(movie?.thumbnailUrl || "");
    const [genre, setGenre] = useState(movie?.genre || "");
    const [duration, setDuration] = useState(movie?.duration || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
       setIsSaving(true);
        try {
          if (!movie) return;
           await onSave({
             id: movie.id,
              title,
              description,
              videoUrl,
              thumbnailUrl,
              genre,
              duration
           });
           onClose();
       } catch(error) {
        console.error('Error saving movie', error)
      } finally {
        setIsSaving(false);
      }
    }
    return (
      <Drawer open={!!movie} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{movie ? "Edit Movie" : "Add Movie"}</DrawerTitle>
            <DrawerDescription>Make changes to this movie here.</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-4 p-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
             {videoUrl && (
               <video src={videoUrl} controls  className="max-h-32 rounded"/>
             )}
            </div>
             <div className="grid gap-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
               {thumbnailUrl && (
                 <img src={thumbnailUrl} alt="Movie Thumbnail"  className="max-h-32 max-w-32 rounded"/>
              )}
            </div>
              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
             <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
          </div>
          <DrawerFooter>
             <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  
  export default MovieDrawer;