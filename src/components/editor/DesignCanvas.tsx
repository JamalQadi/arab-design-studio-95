
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Maximize, Type, Image as ImageIcon } from "lucide-react";
import { useState, forwardRef, useCallback, useEffect } from "react";
import React from "react";
import { DraggableElement } from "./DraggableElement";

interface Template {
  name: string;
  type: string;
  category: string;
  color: string;
}

interface DesignElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fontSize?: number;
  color?: string;
}

interface DesignCanvasProps {
  selectedTemplate: number;
  templates: Template[];
  isPreviewMode: boolean;
  designData?: any;
  onDesignChange?: (data: any) => void;
}

export const DesignCanvas = forwardRef<HTMLDivElement, DesignCanvasProps>(
  ({ selectedTemplate, templates, isPreviewMode, designData, onDesignChange }, ref) => {
    const [zoom, setZoom] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [elements, setElements] = useState<DesignElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<string | null>(null);

    const handleZoomIn = () => {
      const newZoom = Math.min(zoom + 25, 200);
      setZoom(newZoom);
      console.log('Zoom in to:', newZoom);
    };

    const handleZoomOut = () => {
      const newZoom = Math.max(zoom - 25, 25);
      setZoom(newZoom);
      console.log('Zoom out to:', newZoom);
    };

    const handleRotate = () => {
      const newRotation = (rotation + 90) % 360;
      setRotation(newRotation);
      console.log('Canvas rotated to:', newRotation);
    };

    const handleFit = () => {
      setZoom(100);
      setRotation(0);
      console.log('Canvas reset to fit');
    };

    const getCategoryIcon = (category: string) => {
      const icons = {
        religious: '🕋',
        flights: '✈️',
        visa: '📋',
        honeymoon: '💑',
        social: '📱',
        logo: '🏷️'
      };
      return icons[category as keyof typeof icons] || '📋';
    };

    const getTemplateContent = (template: Template) => {
      console.log('Getting content for template:', template);
      
      switch (template.category) {
        case 'flights':
          return {
            title: 'عروض الطيران المميزة',
            subtitle: 'احجز الآن واستمتع بأفضل الأسعار',
            centerText: 'خصم 40%',
            centerSubtext: 'على جميع الرحلات',
            footerTitle: 'مكتب الطيران الذهبي',
            footerContact: '📞 +966 11 123 4567',
            footerLocation: '📍 جدة - المملكة العربية السعودية'
          };
        case 'visa':
          return {
            title: 'تأشيرات سياحية سريعة',
            subtitle: 'خدمة متميزة وإجراءات مبسطة',
            centerText: 'خلال 24 ساعة',
            centerSubtext: 'ضمان الموافقة',
            footerTitle: 'مكتب التأشيرات السريع',
            footerContact: '📞 +966 11 987 6543',
            footerLocation: '📍 الدمام - المملكة العربية السعودية'
          };
        case 'honeymoon':
          return {
            title: 'باقات شهر العسل الرومانسية',
            subtitle: 'ذكريات لا تُنسى في أجمل الوجهات',
            centerText: 'عرض خاص',
            centerSubtext: 'للعرسان الجدد',
            footerTitle: 'وكالة الأحلام السياحية',
            footerContact: '📞 +966 12 456 7890',
            footerLocation: '📍 مكة - المملكة العربية السعودية'
          };
        case 'social':
          return {
            title: 'تابعنا على مواقع التواصل',
            subtitle: 'اكتشف آخر العروض والأخبار',
            centerText: 'تابعنا',
            centerSubtext: 'على جميع المنصات',
            footerTitle: 'حسابنا الرسمي',
            footerContact: '📱 @our_travel_account',
            footerLocation: '🌐 www.ourtravel.com'
          };
        case 'logo':
          return {
            title: 'شعار الشركة المميز',
            subtitle: 'هوية بصرية احترافية ومتميزة',
            centerText: 'علامتك التجارية',
            centerSubtext: 'بجودة عالية',
            footerTitle: 'استوديو التصميم الإبداعي',
            footerContact: '📞 +966 11 555 0123',
            footerLocation: '📍 الرياض - المملكة العربية السعودية'
          };
        case 'religious':
        default:
          return {
            title: 'حج وعمرة VIP مباركة',
            subtitle: 'رحلة روحانية مباركة - احجز الآن واستمتع بأفضل الخدمات',
            centerText: 'خصم 25%',
            centerSubtext: 'باقات متكاملة مع أفضل الخدمات',
            footerTitle: 'مكتب الرحلات المباركة',
            footerContact: '📞 +966 12 345 6789',
            footerLocation: '📍 الرياض - المملكة العربية السعودية'
          };
      }
    };

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (isPreviewMode) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (zoom / 100);
      const y = (e.clientY - rect.top) / (zoom / 100);
      
      // إلغاء تحديد العنصر عند النقر على مساحة فارغة
      setSelectedElement(null);
      
      console.log('Canvas clicked at:', { x, y, zoom });
    };

    const addTextElement = useCallback(() => {
      if (isPreviewMode) return;
      
      const newElement: DesignElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        content: 'نص جديد',
        x: 50,
        y: 50,
        width: 200,
        height: 40,
        rotation: 0,
        fontSize: 18,
        color: '#ffffff'
      };
      
      const updatedElements = [...elements, newElement];
      setElements(updatedElements);
      setSelectedElement(newElement.id);
      
      console.log('Added text element:', newElement);
      
      // تحديث البيانات
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate, isPreviewMode]);

    const addImageElement = useCallback((imageUrl: string) => {
      if (isPreviewMode) return;
      
      const newElement: DesignElement = {
        id: `image-${Date.now()}`,
        type: 'image',
        content: imageUrl,
        x: 100,
        y: 100,
        width: 150,
        height: 150,
        rotation: 0
      };
      
      const updatedElements = [...elements, newElement];
      setElements(updatedElements);
      setSelectedElement(newElement.id);
      
      console.log('Added image element:', newElement);
      
      // تحديث البيانات
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate, isPreviewMode]);

    const updateElement = useCallback((id: string, updates: Partial<DesignElement>) => {
      const updatedElements = elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      );
      setElements(updatedElements);
      
      console.log('Updated element:', id, updates);
      
      // تحديث البيانات
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate]);

    const deleteElement = useCallback((id: string) => {
      const updatedElements = elements.filter(el => el.id !== id);
      setElements(updatedElements);
      setSelectedElement(null);
      
      console.log('Deleted element:', id);
      
      // تحديث البيانات
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate]);

    // تحميل العناصر من البيانات
    useEffect(() => {
      if (designData?.elements && Array.isArray(designData.elements)) {
        console.log('Loading elements from designData:', designData.elements);
        setElements(designData.elements);
      }
    }, [designData?.elements]);

    // إعادة تعيين العناصر عند تغيير القالب
    useEffect(() => {
      console.log('Template changed to:', selectedTemplate, templates[selectedTemplate]);
      setElements([]);
      setSelectedElement(null);
      setZoom(100);
      setRotation(0);
    }, [selectedTemplate]);

    // تحميل الصور المرفوعة كعناصر
    useEffect(() => {
      if (designData?.images && Array.isArray(designData.images)) {
        const imageElements = designData.images.map((image: any, index: number) => ({
          id: `uploaded-image-${index}-${Date.now()}`,
          type: 'image' as const,
          content: image.url || image,
          x: 20 + index * 10,
          y: 20 + index * 10,
          width: 100,
          height: 100,
          rotation: 0
        }));
        
        console.log('Adding uploaded images as elements:', imageElements);
        
        setElements(prev => {
          const existingIds = prev.map(el => el.id);
          const newElements = imageElements.filter(el => !existingIds.includes(el.id));
          return [...prev, ...newElements];
        });
      }
    }, [designData?.images]);

    const currentTemplate = templates[selectedTemplate] || templates[0];
    const templateContent = getTemplateContent(currentTemplate);

    console.log('Rendering with template:', currentTemplate, 'Content:', templateContent);

    return (
      <div className="flex-1 flex flex-col">
        {/* Canvas Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">التكبير: {zoom}%</span>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={handleZoomOut} title="تصغير">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleZoomIn} title="تكبير">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRotate} title="تدوير">
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleFit} title="ملاءمة">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-500">أبعاد: 600×600</span>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">جاهز</span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 bg-gray-100">
          <div className="flex justify-center">
            <div className="relative">
              <Card 
                className="shadow-2xl overflow-hidden border-2 border-gray-300" 
                style={{ 
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                <CardContent className="p-0">
                  <div 
                    ref={ref}
                    className={`w-[600px] h-[600px] bg-gradient-to-br ${currentTemplate?.color || 'from-green-500 to-emerald-600'} relative overflow-hidden transition-all duration-300 ${!isPreviewMode ? 'cursor-crosshair' : 'cursor-default'}`}
                    onClick={handleCanvasClick}
                    style={{
                      touchAction: 'manipulation'
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <div className="absolute top-8 right-8 text-8xl">
                        {getCategoryIcon(currentTemplate?.category)}
                      </div>
                      <div className="absolute bottom-8 left-8 text-6xl opacity-50">
                        {getCategoryIcon(currentTemplate?.category)}
                      </div>
                    </div>

                    {/* Template Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-white pointer-events-none">
                      {/* Header */}
                      <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                          {templateContent.title}
                        </h1>
                        <p className="text-xl opacity-90">
                          {templateContent.subtitle}
                        </p>
                      </div>
                      
                      {/* Center Content */}
                      <div className="text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 inline-block">
                          <div className="text-6xl mb-4">
                            {getCategoryIcon(currentTemplate?.category)}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">
                            {templateContent.centerText}
                          </h3>
                          <p className="text-base">
                            {templateContent.centerSubtext}
                          </p>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="text-center">
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6">
                          <h3 className="text-2xl font-bold mb-2">
                            {templateContent.footerTitle}
                          </h3>
                          <p className="text-base mb-1">{templateContent.footerContact}</p>
                          <p className="text-sm">{templateContent.footerLocation}</p>
                        </div>
                      </div>
                    </div>

                    {/* Draggable Elements */}
                    {elements.map((element) => (
                      <DraggableElement
                        key={element.id}
                        {...element}
                        onUpdate={updateElement}
                        onDelete={deleteElement}
                        isSelected={selectedElement === element.id}
                        onSelect={setSelectedElement}
                        isEditMode={!isPreviewMode}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          {!isPreviewMode && (
            <div className="flex justify-center mt-6 space-x-4 flex-wrap">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addTextElement}
                className="mb-2"
              >
                <Type className="w-4 h-4 ml-2" />
                إضافة نص
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      addImageElement(url);
                    }
                  };
                  input.click();
                }}
                className="mb-2"
              >
                <ImageIcon className="w-4 h-4 ml-2" />
                إضافة صورة
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DesignCanvas.displayName = 'DesignCanvas';
