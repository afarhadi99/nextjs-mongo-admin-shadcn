import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface AddMovieButtonProps {
    onClick: () => void;
}

const AddMovieButton: React.FC<AddMovieButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Movie
        </Button>
    );
};

export default AddMovieButton;