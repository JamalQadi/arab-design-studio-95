
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { imageService, ImageData } from '@/services/imageService';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageSelect: (imageData: ImageData) => void;
  trigger?: React.ReactNode;
}

export const ImageUpload = ({ onImageSelect, trigger }: ImageUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await imageService.uploadImage(file);
      
      if (result.success && result.imageData) {
        setImages(prev => [...prev, result.imageData!]);
        toast({
          title: "تم رفع الصورة",
          description: `تم رفع ${file.name} بنجاح`,
        });
      } else {
        toast({
          title: "خطأ في رفع الصورة",
          description: result.error || "حدث خطأ أثناء رفع الصورة",
          variant: "destructive",
        });
      }
    }
    
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageSelect = (imageData: ImageData) => {
    onImageSelect(imageData);
    setIsOpen(false);
    toast({
      title: "تم اختيار الصورة",
      description: "تم إضافة الصورة إلى التصميم",
    });
  };

  const handleDeleteImage = (imageId: string) => {
    const success = imageService.deleteImage(imageId);
    if (success) {
      setImages(prev => prev.filter(img => img.id !== imageId));
      toast({
        title: "تم حذف الصورة",
        description: "تم حذف الصورة بنجاح",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <ImageIcon className="w-4 h-4 ml-2" />
            إضافة صورة
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة صورة</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">اسحب وأفلت الصور هنا</p>
            <p className="text-sm text-gray-600 mb-4">أو</p>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mb-2"
            >
              {uploading ? 'جاري الرفع...' : 'اختر الصور'}
            </Button>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF حتى 5MB
            </p>
          </div>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      onClick={() => handleImageSelect(image)}
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-gray-600 mt-1 truncate">
                    {image.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
