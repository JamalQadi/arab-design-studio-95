
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Eye, Trash2 } from "lucide-react";
import { organizationService } from "@/services/organizationService";

interface ImageGalleryProps {
  onImageSelect?: (imageUrl: string) => void;
  category?: string;
  showUpload?: boolean;
}

export const ImageGallery = ({ 
  onImageSelect, 
  category = 'all', 
  showUpload = true 
}: ImageGalleryProps) => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [uploadCategory, setUploadCategory] = useState('general');

  const categories = [
    { id: 'all', name: 'جميع الصور', icon: '🖼️' },
    { id: 'background', name: 'خلفيات', icon: '🎨' },
    { id: 'logo', name: 'شعارات', icon: '🏷️' },
    { id: 'product', name: 'منتجات', icon: '📦' },
    { id: 'general', name: 'عام', icon: '📁' }
  ];

  useEffect(() => {
    loadImages();
  }, [selectedCategory]);

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const categoryFilter = selectedCategory === 'all' ? undefined : selectedCategory;
      const imagesData = await organizationService.getImages(categoryFilter);
      setImages(imagesData);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    try {
      for (const file of files) {
        await organizationService.uploadImage(file, uploadCategory);
      }
      loadImages();
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsLoading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
      const result = await organizationService.deleteImage(imageId);
      if (result.success) {
        loadImages();
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-right">معرض الصور</CardTitle>
        
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Upload Section */}
        {showUpload && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="flex flex-col items-center space-y-4">
              <Upload className="w-12 h-12 text-gray-400" />
              <div className="text-center">
                <p className="text-sm text-gray-600">اسحب الصور هنا أو</p>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>اختر الصور</span>
                  </Button>
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="upload-category" className="text-sm">التصنيف:</Label>
                <Select value={uploadCategory} onValueChange={setUploadCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat.id !== 'all').map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Images Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>لا توجد صور متاحة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {onImageSelect && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onImageSelect(image.url)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Image Info */}
                <div className="mt-2">
                  <p className="text-sm font-medium truncate">{image.filename}</p>
                  <div className="flex justify-between items-center mt-1">
                    <Badge variant="outline" className="text-xs">
                      {categories.find(c => c.id === image.category)?.name || 'عام'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(image.size || 0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
