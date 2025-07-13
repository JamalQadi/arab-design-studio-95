import { forwardRef, useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, Maximize, Eye } from "lucide-react";
import { DraggableElement } from "../editor/DraggableElement";

interface SocialCanvasProps {
  selectedTemplate: number;
  templates: any[];
  designData: any;
  onDesignChange: (data: any) => void;
  platform: string;
}

export const SocialCanvas = forwardRef<HTMLDivElement, SocialCanvasProps>(
  ({ selectedTemplate, templates, designData, onDesignChange, platform }, ref) => {
    const [zoom, setZoom] = useState(80);
    const [isPreview, setIsPreview] = useState(false);
    const [elements, setElements] = useState(designData.elements || []);
    const [selectedElement, setSelectedElement] = useState<string | null>(null);

    // Auto-adjust zoom for mobile devices
    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        if (isMobile && zoom > 60) {
          setZoom(50);
        } else if (!isMobile && zoom < 60) {
          setZoom(80);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [zoom]);

    const handleZoomIn = () => setZoom(Math.min(zoom + 20, 150));
    const handleZoomOut = () => setZoom(Math.max(zoom - 20, 40));
    const resetView = () => {
      const isMobile = window.innerWidth < 768;
      setZoom(isMobile ? 50 : 80);
    };

    // تحديث العناصر عند تغيير designData
    useEffect(() => {
      if (designData.elements && Array.isArray(designData.elements)) {
        setElements(designData.elements);
      }
    }, [designData.elements]);

    const updateElement = useCallback((id: string, updates: any) => {
      console.log('Updating element:', id, updates);
      const updatedElements = elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      );
      setElements(updatedElements);
      onDesignChange({ ...designData, elements: updatedElements });
    }, [elements, designData, onDesignChange]);

    const deleteElement = useCallback((id: string) => {
      console.log('Deleting element:', id);
      const updatedElements = elements.filter(el => el.id !== id);
      setElements(updatedElements);
      setSelectedElement(null);
      onDesignChange({ ...designData, elements: updatedElements });
    }, [elements, designData, onDesignChange]);

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (isPreview) return;
      
      // إلغاء تحديد العنصر عند النقر على مساحة فارغة
      if (e.target === e.currentTarget) {
        setSelectedElement(null);
      }
    };

    const currentTemplate = templates[selectedTemplate] || templates[0];
    const canvasSize = designData.size || { width: 1080, height: 1080 };

    const getPlatformGradient = () => {
      switch (platform) {
        case 'instagram':
          return 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)';
        case 'facebook':
          return 'linear-gradient(45deg, #3b5998 0%, #8b9dc3 100%)';
        case 'twitter':
          return 'linear-gradient(45deg, #1da1f2 0%, #0d95e8 100%)';
        case 'linkedin':
          return 'linear-gradient(45deg, #0077b5 0%, #00a0dc 100%)';
        default:
          return 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)';
      }
    };

    return (
      <div className="flex-1 flex flex-col">
        {/* Canvas Controls */}
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-xs sm:text-sm text-gray-600">التكبير: {zoom}%</span>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={resetView}>
                <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize text-xs sm:text-sm">
              {platform}: {canvasSize.width}×{canvasSize.height}
            </Badge>
            <Button 
              variant={isPreview ? "default" : "outline"} 
              size="sm" 
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-2" />
              <span className="hidden sm:inline">{isPreview ? "تحرير" : "معاينة"}</span>
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-2 sm:p-4 lg:p-8 bg-gray-100">
          <div className="flex justify-center">
            <div className="relative">
              <Card 
                className="shadow-2xl overflow-hidden border-2 border-gray-300" 
                style={{ 
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'center center'
                }}
              >
                <CardContent className="p-0">
                  <div 
                    ref={ref}
                    className="relative overflow-hidden cursor-crosshair"
                    style={{
                      width: Math.min(canvasSize.width, 600),
                      height: Math.min(canvasSize.height * (600 / canvasSize.width), 600),
                      background: getPlatformGradient()
                    }}
                    onClick={handleCanvasClick}
                  >
                    {/* Platform-specific overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                    {!isPreview && (
                      <div 
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                          `,
                          backgroundSize: '30px 30px'
                        }}
                      />
                    )}

                    {/* Social Media Elements */}
                    {elements.map((element: any) => (
                      <DraggableElement
                        key={element.id}
                        {...element}
                        onUpdate={updateElement}
                        onDelete={deleteElement}
                        isSelected={selectedElement === element.id}
                        onSelect={setSelectedElement}
                        isEditMode={!isPreview}
                      />
                    ))}

                    {/* Default Content */}
                    {elements.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center p-4 sm:p-8 text-white">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <span className="text-2xl sm:text-3xl">
                              {platform === 'instagram' && '📸'}
                              {platform === 'facebook' && '👥'}
                              {platform === 'twitter' && '🐦'}
                              {platform === 'linkedin' && '💼'}
                            </span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold mb-2">
                            {currentTemplate?.name || 'منشور جديد'}
                          </h2>
                          <p className="text-white text-opacity-80 text-sm sm:text-base">
                            ابدأ بإضافة النصوص والصور من الأدوات
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Platform watermark */}
                    {isPreview && (
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded capitalize">
                        {platform}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SocialCanvas.displayName = 'SocialCanvas';
