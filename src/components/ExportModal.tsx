
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, FileImage, FileText, Palette } from 'lucide-react';
import { exportService, ExportOptions } from '@/services/exportService';
import { useToast } from '@/hooks/use-toast';

interface ExportModalProps {
  canvasRef: React.RefObject<HTMLElement>;
  trigger?: React.ReactNode;
}

export const ExportModal = ({ canvasRef, trigger }: ExportModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpg' | 'pdf' | 'svg'>('png');
  const [quality, setQuality] = useState([90]);
  const [width, setWidth] = useState(1080);
  const [height, setHeight] = useState(1080);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!canvasRef.current) {
      toast({
        title: "خطأ",
        description: "لا يمكن العثور على التصميم للتصدير",
        variant: "destructive",
      });
      return;
    }

    setExporting(true);
    
    const options: ExportOptions = {
      format,
      quality: quality[0] / 100,
      width,
      height,
    };

    const result = await exportService.exportCanvas(canvasRef.current, options);
    
    if (result.success) {
      toast({
        title: "تم التصدير بنجاح",
        description: `تم تصدير التصميم بصيغة ${format.toUpperCase()}`,
      });
      setIsOpen(false);
    } else {
      toast({
        title: "خطأ في التصدير",
        description: result.error || "حدث خطأ أثناء التصدير",
        variant: "destructive",
      });
    }
    
    setExporting(false);
  };

  const formatIcons = {
    png: FileImage,
    jpg: FileImage,
    pdf: FileText,
    svg: Palette
  };

  const FormatIcon = formatIcons[format];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FormatIcon className="w-5 h-5 ml-2" />
            تصدير التصميم
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-2">
            <Label htmlFor="format">صيغة التصدير</Label>
            <Select value={format} onValueChange={(value: any) => setFormat(value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الصيغة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (شفاف)</SelectItem>
                <SelectItem value="jpg">JPG (مضغوط)</SelectItem>
                <SelectItem value="pdf">PDF (للطباعة)</SelectItem>
                <SelectItem value="svg">SVG (متجه)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality Slider (for JPG) */}
          {format === 'jpg' && (
            <div className="space-y-2">
              <Label>جودة الصورة: {quality[0]}%</Label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
            </div>
          )}

          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">العرض (px)</Label>
              <Select value={width.toString()} onValueChange={(value) => setWidth(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512">512px</SelectItem>
                  <SelectItem value="1024">1024px</SelectItem>
                  <SelectItem value="1080">1080px</SelectItem>
                  <SelectItem value="1920">1920px</SelectItem>
                  <SelectItem value="2048">2048px</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">الارتفاع (px)</Label>
              <Select value={height.toString()} onValueChange={(value) => setHeight(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512">512px</SelectItem>
                  <SelectItem value="1024">1024px</SelectItem>
                  <SelectItem value="1080">1080px</SelectItem>
                  <SelectItem value="1920">1920px</SelectItem>
                  <SelectItem value="2048">2048px</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">معلومات التصدير</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>الصيغة: {format.toUpperCase()}</p>
              <p>الأبعاد: {width} × {height} بكسل</p>
              {format === 'jpg' && <p>الجودة: {quality[0]}%</p>}
              <p>الحجم المتوقع: {format === 'jpg' ? '~500KB' : '~1MB'}</p>
            </div>
          </div>

          {/* Export Button */}
          <Button 
            onClick={handleExport} 
            disabled={exporting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {exporting ? 'جاري التصدير...' : 'تصدير التصميم'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
