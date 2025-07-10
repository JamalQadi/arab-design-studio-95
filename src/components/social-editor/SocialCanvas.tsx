
import { forwardRef, useState, useCallback } from "react";
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

    const handleZoomIn = () => setZoom(Math.min(zoom + 20, 150));
    const handleZoomOut = () => setZoom(Math.max(zoom - 20, 40));
    const resetView = () => setZoom(80);

    const updateElement = useCallback((id: string, updates: any) => {
      const updatedElements = elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      );
      setElements(updatedElements);
      onDesignChange({ ...designData, elements: updatedElements });
    }, [elements, designData, onDesignChange]);

    const deleteElement = useCallback((id: string) => {
      const updatedElements = elements.filter(el => el.id !== id);
      setElements(updatedElements);
      onDesignChange({ ...designData, elements: updatedElements });
    }, [elements, designData, onDesignChange]);

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
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">التكبير: {zoom}%</span>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={resetView}>
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize">
              {platform}: {canvasSize.width}×{canvasSize.height}
            </Badge>
            <Button 
              variant={isPreview ? "default" : "outline"} 
              size="sm" 
              onClick={() => setIsPreview(!isPreview)}
            >
              <Eye className="w-4 h-4 ml-2" />
              {isPreview ? "تحرير" : "معاينة"}
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 bg-gray-100">
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
                    className="relative overflow-hidden"
                    style={{
                      width: Math.min(canvasSize.width, 600),
                      height: Math.min(canvasSize.height * (600 / canvasSize.width), 600),
                      background: getPlatformGradient()
                    }}
                  >
                    {/* Platform-specific overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                    {/* Grid for alignment (only in edit mode) */}
                    {!isPreview && (
                      <div 
                        className="absolute inset-0 opacity-10"
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
                        isSelected={false}
                        onSelect={() => {}}
                        isEditMode={!isPreview}
                      />
                    ))}

                    {/* Default Content */}
                    {elements.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8 text-white">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                            <span className="text-3xl">
                              {platform === 'instagram' && '📸'}
                              {platform === 'facebook' && '👥'}
                              {platform === 'twitter' && '🐦'}
                              {platform === 'linkedin' && '💼'}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold mb-2">
                            {currentTemplate?.name || 'منشور جديد'}
                          </h2>
                          <p className="text-white text-opacity-80">
                            ابدأ بإضافة النصوص والصور
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Platform watermark */}
                    {isPreview && (
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded capitalize">
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
