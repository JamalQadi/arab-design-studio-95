
interface ImageData {
  id: string;
  name: string;
  url: string;
  file: File;
  size: number;
  type: string;
  uploadedAt: string;
}

class ImageService {
  private images: Map<string, ImageData> = new Map();

  async uploadImage(file: File): Promise<{ success: boolean; imageData?: ImageData; error?: string }> {
    try {
      if (!file.type.startsWith('image/')) {
        return { success: false, error: 'يجب أن يكون الملف صورة' };
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return { success: false, error: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' };
      }

      const imageId = Date.now().toString();
      const imageUrl = URL.createObjectURL(file);
      
      const imageData: ImageData = {
        id: imageId,
        name: file.name,
        url: imageUrl,
        file: file,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };

      this.images.set(imageId, imageData);
      
      return { success: true, imageData };
    } catch (error) {
      return { success: false, error: 'حدث خطأ أثناء رفع الصورة' };
    }
  }

  getImage(id: string): ImageData | undefined {
    return this.images.get(id);
  }

  getAllImages(): ImageData[] {
    return Array.from(this.images.values());
  }

  deleteImage(id: string): boolean {
    const imageData = this.images.get(id);
    if (imageData) {
      URL.revokeObjectURL(imageData.url);
      this.images.delete(id);
      return true;
    }
    return false;
  }
}

export const imageService = new ImageService();
export type { ImageData };
