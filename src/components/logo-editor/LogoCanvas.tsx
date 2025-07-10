
import { forwardRef, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Download } from "lucide-react";
import { DraggableElement } from "../editor/DraggableElement";

interface LogoCanvasProps {
  selectedTemplate: number;
  templates: any[];
  designData: any;
  onDesignChange: (data: any) => void;
}

export const LogoCanvas = forwardRef<HTMLDivElement, LogoCanvasProps>(
  ({ selectedTemplate, templates, designData, onDesignChange }, ref) => {
    const [zoom, setZoom] = useState(100);
    const [elements, setElements] = useState(designData.elements || []);

    const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
    const handleZoomOut = () => setZoom(Math.max(zoom - 25, 25));
    const resetView = () => setZoom(100);

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
    const canvasSize = { width: 400, height: 400 };

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
            <Badge variant="outline">الشعار: {canvasSize.width}×{canvasSize.height}</Badge>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">جاهز</span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 bg-gray-100">
          <div className="flex justify-center">
            <div className="relative">
              <Card 
                className="shadow-2xl overflow-hidden border-2 border-gray-300 bg-white" 
                style={{ 
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'center center'
                }}
              >
                <CardContent className="p-0">
                  <div 
                    ref={ref}
                    className="relative bg-white"
                    style={{
                      width: canvasSize.width,
                      height: canvasSize.height,
                      background: currentTemplate?.category === 'text' 
                        ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                        : 'radial-gradient(circle, #ffffff 0%, #f8f9fa 100%)'
                    }}
                  >
                    {/* Grid Pattern */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px'
                      }}
                    />

                    {/* Center Guidelines */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="absolute w-full h-px bg-gray-400"></div>
                      <div className="absolute h-full w-px bg-gray-400"></div>
                    </div>

                    {/* Logo Elements */}
                    {elements.map((element: any) => (
                      <DraggableElement
                        key={element.id}
                        {...element}
                        onUpdate={updateElement}
                        onDelete={deleteElement}
                        isSelected={false}
                        onSelect={() => {}}
                        isEditMode={true}
                      />
                    ))}

                    {/* Default Logo Content */}
                    {elements.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-8">
                          {currentTemplate?.category === 'text' && (
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                              اسم الشركة
                            </h1>
                          )}
                          {currentTemplate?.category === 'icon' && (
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-3xl">🏢</span>
                            </div>
                          )}
                          {currentTemplate?.category === 'combination' && (
                            <>
                              <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                                <span className="text-white text-2xl">✨</span>
                              </div>
                              <h2 className="text-2xl font-bold text-gray-800">
                                اسم العلامة التجارية
                              </h2>
                            </>
                          )}
                          <p className="text-sm text-gray-500 mt-2">
                            انقر على الأدوات لإضافة عناصر
                          </p>
                        </div>
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

LogoCanvas.displayName = 'LogoCanvas';
