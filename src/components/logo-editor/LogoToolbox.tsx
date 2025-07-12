
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Image, 
  Circle, 
  Square, 
  Triangle, 
  Star,
  Palette,
  Upload
} from "lucide-react";

interface LogoToolboxProps {
  onAddElement?: (element: any) => void;
}

export const LogoToolbox = ({ onAddElement }: LogoToolboxProps) => {
  const addTextElement = (style: string) => {
    if (!onAddElement) return;
    
    const textStyles = {
      title: { content: 'عنوان الشعار', fontSize: 32, fontWeight: 'bold' },
      subtitle: { content: 'شعار فرعي', fontSize: 16, fontWeight: 'normal' },
      tagline: { content: 'الشعار التجاري', fontSize: 14, fontWeight: 'light' }
    };

    const textData = textStyles[style as keyof typeof textStyles] || textStyles.title;

    onAddElement({
      id: `text-${crypto.randomUUID()}`,
      type: 'text',
      content: textData.content,
      x: 50,
      y: 50,
      width: 200,
      height: 40,
      rotation: 0,
      fontSize: textData.fontSize,
      fontWeight: textData.fontWeight,
      color: '#000000'
    });
  };

  const addIcon = (iconType: string) => {
    if (!onAddElement) return;
    
    const icons = {
      business: '🏢',
      tech: '💻',
      creative: '🎨',
      food: '🍽️',
      health: '🏥',
      education: '📚',
      finance: '💰',
      travel: '✈️'
    };

    onAddElement({
      id: `icon-${crypto.randomUUID()}`,
      type: 'text',
      content: icons[iconType as keyof typeof icons] || '🏢',
      x: 100,
      y: 100,
      width: 80,
      height: 80,
      rotation: 0,
      fontSize: 64,
      color: '#000000'
    });
  };

  const addShape = (shapeType: string) => {
    if (!onAddElement) return;
    
    const shapes = {
      circle: '⭕',
      square: '⬜',
      triangle: '🔺',
      star: '⭐'
    };

    onAddElement({
      id: `shape-${crypto.randomUUID()}`,
      type: 'text',
      content: shapes[shapeType as keyof typeof shapes] || '⭕',
      x: 100,
      y: 100,
      width: 60,
      height: 60,
      rotation: 0,
      fontSize: 48,
      color: '#000000'
    });
  };

  const uploadImage = () => {
    if (!onAddElement) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onAddElement({
          id: `image-${crypto.randomUUID()}`,
          type: 'image',
          content: url,
          x: 100,
          y: 100,
          width: 120,
          height: 120,
          rotation: 0
        });
      }
    };
    input.click();
  };

  const logoIcons = [
    { name: 'شركات', icon: '🏢', action: () => addIcon('business') },
    { name: 'تقنية', icon: '💻', action: () => addIcon('tech') },
    { name: 'إبداعي', icon: '🎨', action: () => addIcon('creative') },
    { name: 'طعام', icon: '🍽️', action: () => addIcon('food') },
    { name: 'صحة', icon: '🏥', action: () => addIcon('health') },
    { name: 'تعليم', icon: '📚', action: () => addIcon('education') },
    { name: 'مالية', icon: '💰', action: () => addIcon('finance') },
    { name: 'سفر', icon: '✈️', action: () => addIcon('travel') }
  ];

  const logoShapes = [
    { name: 'دائرة', icon: Circle, action: () => addShape('circle') },
    { name: 'مربع', icon: Square, action: () => addShape('square') },
    { name: 'مثلث', icon: Triangle, action: () => addShape('triangle') },
    { name: 'نجمة', icon: Star, action: () => addShape('star') }
  ];

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">أدوات الشعار</h3>
      
      {/* Text Elements */}
      <div className="space-y-2 mb-6">
        <h4 className="font-medium text-gray-700 mb-3">النصوص</h4>
        <Button
          variant="ghost"
          className="w-full justify-start text-right hover:bg-gray-100"
          size="sm"
          onClick={() => addTextElement('title')}
        >
          <Type className="w-4 h-4 ml-2" />
          عنوان رئيسي
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-right hover:bg-gray-100"
          size="sm"
          onClick={() => addTextElement('subtitle')}
        >
          <Type className="w-4 h-4 ml-2" />
          عنوان فرعي
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-right hover:bg-gray-100"
          size="sm"
          onClick={() => addTextElement('tagline')}
        >
          <Type className="w-4 h-4 ml-2" />
          شعار تجاري
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Logo Icons */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">أيقونات الشعار</h4>
        <div className="grid grid-cols-4 gap-2">
          {logoIcons.map((icon, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="aspect-square p-0 text-xs hover:bg-gray-100"
              title={icon.name}
              onClick={icon.action}
            >
              <span className="text-lg">{icon.icon}</span>
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Shapes */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">الأشكال</h4>
        <div className="grid grid-cols-2 gap-2">
          {logoShapes.map((shape, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="aspect-square p-0 hover:bg-gray-100"
              title={shape.name}
              onClick={shape.action}
            >
              <shape.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Image Upload */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">الصور</h4>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start hover:bg-gray-100"
          onClick={uploadImage}
        >
          <Upload className="w-4 h-4 ml-2" />
          رفع صورة
        </Button>
      </div>

      {/* Color Palette */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <Palette className="w-4 h-4 ml-2" />
          ألوان الشعار
        </h4>
        <div className="grid grid-cols-6 gap-2">
          {['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080'].map((color, index) => (
            <button
              key={index}
              className="w-6 h-6 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => console.log('تم اختيار اللون:', color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
