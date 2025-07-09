
import html2canvas from 'html2canvas';

export interface ExportOptions {
  format: 'png' | 'jpg' | 'pdf' | 'svg';
  quality: number;
  width: number;
  height: number;
}

export const exportService = {
  async exportCanvas(element: HTMLElement, options: ExportOptions) {
    try {
      console.log('Starting export with options:', options);
      
      if (!element) {
        return { success: false, error: 'No element provided for export' };
      }

      // For SVG export, we'll convert to PNG for now
      // In a full implementation, you might use a different approach for true SVG export
      if (options.format === 'svg') {
        // Convert SVG to PNG for now
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: options.width,
          height: options.height,
          scrollX: 0,
          scrollY: 0,
          windowWidth: options.width,
          windowHeight: options.height
        });

        await this.downloadImage(canvas, 'png', options.quality);
        return { success: true };
      }

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        backgroundColor: options.format === 'png' ? null : '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: options.width,
        height: options.height,
        scrollX: 0,
        scrollY: 0,
        windowWidth: options.width,
        windowHeight: options.height
      });

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // Resize canvas to desired dimensions
      const resizedCanvas = this.resizeCanvas(canvas, options.width, options.height);

      if (options.format === 'pdf') {
        // For PDF export, we'll create a downloadable PNG for now
        // In a full implementation, you might use jsPDF
        await this.downloadImage(resizedCanvas, 'png', options.quality);
        return { success: true };
      } else {
        await this.downloadImage(resizedCanvas, options.format, options.quality);
        return { success: true };
      }
    } catch (error) {
      console.error('Export failed:', error);
      return { success: false, error: `فشل في تصدير التصميم: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  },

  resizeCanvas(canvas: HTMLCanvasElement, targetWidth: number, targetHeight: number): HTMLCanvasElement {
    const newCanvas = document.createElement('canvas');
    const ctx = newCanvas.getContext('2d');
    
    if (!ctx) {
      return canvas;
    }

    newCanvas.width = targetWidth;
    newCanvas.height = targetHeight;

    // Draw the original canvas onto the new canvas with the new dimensions
    ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight);
    
    return newCanvas;
  },

  downloadImage(canvas: HTMLCanvasElement, format: 'png' | 'jpg', quality: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('فشل في إنشاء الصورة'));
              return;
            }

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `design_${Date.now()}.${format}`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up
            URL.revokeObjectURL(url);
            
            console.log('Export completed successfully');
            resolve();
          },
          mimeType,
          quality
        );
      } catch (error) {
        console.error('Download failed:', error);
        reject(error);
      }
    });
  },

  async exportToPNG(element: HTMLElement, scale: number = 2) {
    return this.exportCanvas(element, {
      format: 'png',
      quality: 100,
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  },

  async exportToJPG(element: HTMLElement, quality: number = 90, scale: number = 2) {
    return this.exportCanvas(element, {
      format: 'jpg',
      quality,
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  }
};
