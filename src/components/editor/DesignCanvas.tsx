
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

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
    const handleRotate = () => setRotation(prev => (prev + 90) % 360);
    const handleFit = () => {
      setZoom(100);
      setRotation(0);
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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Deselect element if clicking on empty space
      setSelectedElement(null);
      
      console.log('Canvas clicked at:', { x, y });
    };

    const addTextElement = useCallback(() => {
      const newElement: DesignElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        content: 'نص جديد',
        x: 50,
        y: 50,
        width: 200,
        height: 40,
        rotation: 0,
        fontSize: 16,
        color: '#ffffff'
      };
      
      const updatedElements = [...elements, newElement];
      setElements(updatedElements);
      setSelectedElement(newElement.id);
      
      console.log('Added text element:', newElement);
      
      // Update parent component
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate]);

    const addImageElement = useCallback((imageUrl: string) => {
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
      
      // Update parent component
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate]);

    const updateElement = useCallback((id: string, updates: Partial<DesignElement>) => {
      const updatedElements = elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      );
      setElements(updatedElements);
      
      console.log('Updated element:', id, updates);
      
      // Update parent component
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
      
      // Update parent component
      if (onDesignChange) {
        onDesignChange({
          ...designData,
          elements: updatedElements,
          template: selectedTemplate
        });
      }
    }, [elements, designData, onDesignChange, selectedTemplate]);

    // Load elements from designData when it changes
    useEffect(() => {
      if (designData?.elements && Array.isArray(designData.elements)) {
        console.log('Loading elements from designData:', designData.elements);
        setElements(designData.elements);
      }
    }, [designData?.elements]);

    // Reset elements when template changes
    useEffect(() => {
      console.log('Template changed to:', selectedTemplate, templates[selectedTemplate]);
      setElements([]);
      setSelectedElement(null);
    }, [selectedTemplate]);

    // Load uploaded images as elements
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
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRotate}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleFit}>
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-500">أبعاد: 1080×1080</span>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">محفوظ</span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="flex justify-center">
            <div className="relative">
              <Card className="shadow-2xl overflow-hidden" style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}>
                <CardContent className="p-0">
                  <div 
                    ref={ref}
                    className={`w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br ${currentTemplate?.color || 'from-green-500 to-emerald-600'} relative overflow-hidden transition-all hover:shadow-xl ${!isPreviewMode ? 'cursor-crosshair' : 'cursor-default'}`}
                    onClick={handleCanvasClick}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 text-4xl sm:text-6xl lg:text-8xl">
                        {getCategoryIcon(currentTemplate?.category)}
                      </div>
                      <div className="absolute bottom-4 left-4 text-2xl sm:text-4xl lg:text-6xl opacity-50">
                        {getCategoryIcon(currentTemplate?.category)}
                      </div>
                    </div>

                    {/* Template Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8 text-white">
                      {/* Header */}
                      <div className="text-center">
                        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                          {templateContent.title}
                        </h1>
                        <p className="text-sm sm:text-lg lg:text-xl opacity-90">
                          {templateContent.subtitle}
                        </p>
                      </div>
                      
                      {/* Center Content */}
                      <div className="text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6 inline-block">
                          <div className="text-3xl sm:text-5xl lg:text-6xl mb-2">
                            {getCategoryIcon(currentTemplate?.category)}
                          </div>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                            {templateContent.centerText}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-base">
                            {templateContent.centerSubtext}
                          </p>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="text-center">
                        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 sm:p-4 lg:p-6">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                            {templateContent.footerTitle}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-base mb-1">{templateContent.footerContact}</p>
                          <p className="text-xs sm:text-sm">{templateContent.footerLocation}</p>
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
            <div className="flex justify-center mt-6 space-x-4">
              <Button variant="outline" size="sm" onClick={addTextElement}>
                <Type className="w-4 h-4 ml-2" />
                إضافة نص
              </Button>
              <Button variant="outline" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                <ImageIcon className="w-4 h-4 ml-2" />
                إضافة صورة
              </Button>
              <Button variant="outline" size="sm">تغيير الخلفية</Button>
              <Button variant="outline" size="sm">تغيير الألوان</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DesignCanvas.displayName = 'DesignCanvas';
