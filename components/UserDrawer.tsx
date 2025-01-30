"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email?: string | null;
  image?: string | null;
}

interface UserDrawerProps {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => Promise<void>;
}

function UserDrawer({ user, onClose, onSave }: UserDrawerProps) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [isSaving, setIsSaving] = useState(false);


  const handleSave = async () => {
     setIsSaving(true);
      try {
        if (!user) return;
       await onSave({
         id: user.id,
         name,
         email,
         image,
       });
       onClose();
     } catch (error) {
        console.error("Error saving user:", error);
     } finally {
       setIsSaving(false);
     }

  }

  return (
    <Drawer open={!!user} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{user ? "Edit User" : "Add User"}</DrawerTitle>
          <DrawerDescription>Make changes to this user here.</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 p-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image && (
              <img
                src={image}
                alt="User Image Preview"
                className="max-h-32 max-w-32 rounded"
                />
            )}
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

export default UserDrawer;