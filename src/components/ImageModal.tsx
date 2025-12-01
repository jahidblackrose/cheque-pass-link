import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
}

export const ImageModal = ({ isOpen, onClose, imageUrl, title }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto max-h-[85vh] object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
