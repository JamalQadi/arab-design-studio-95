
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Image, 
  Square, 
  Circle, 
  Triangle, 
  Star, 
  Heart,
  Palette,
  Upload,
  Shapes
} from "lucide-react";

interface ToolboxPanelProps {
  onAddElement?: (element: any) => void;
}

export const ToolboxPanel = ({ onAddElement }: ToolboxPanelProps) => {
  const addTextElement = () => {
    if (onAddElement) {
      onAddElement({
        id: `text-${crypto.randomUUID()}`,
        type: 'text',
        content: 'نص جديد',
        x: 50,
        y: 50,
        width: 200,
        height: 40,
        rotation: 0,
        fontSize: 18,
        color: '#ffffff'
      });
    }
  };

  const addImageElement = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onAddElement) {
        const url = URL.createObjectURL(file);
        onAddElement({
          id: `image-${crypto.randomUUID()}`,
          type: 'image',
          content: url,
          x: 100,
          y: 100,
          width: 150,
          height: 150,
          rotation: 0
        });
      }
    };
    input.click();
  };

  const addShape = (shapeType: string) => {
    if (onAddElement) {
      const shapes = {
        square: '⬜',
        circle: '⭕',
        triangle: '🔺',
        star: '⭐',
        heart: '❤️'
      };
      
      onAddElement({
        id: `shape-${crypto.randomUUID()}`,
        type: 'text',
        content: shapes[shapeType as keyof typeof shapes] || '⬜',
        x: 100,
        y: 100,
        width: 60,
        height: 60,
        rotation: 0,
        fontSize: 48,
        color: '#ffffff'
      });
    }
  };

  const tools = [
    { icon: Type, name: "النص", category: "text", action: addTextElement },
    { icon: Image, name: "الصور", category: "media", action: () => {} },
    { icon: Upload, name: "رفع صورة", category: "media", action: addImageElement },
  ];

  const shapes = [
    { icon: Square, name: "مربع", action: () => addShape('square') },
    { icon: Circle, name: "دائرة", action: () => addShape('circle') },
    { icon: Triangle, name: "مثلث", action: () => addShape('triangle') },
    { icon: Star, name: "نجمة", action: () => addShape('star') },
    { icon: Heart, name: "قلب", action: () => addShape('heart') },
  ];

  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#FFB347", "#87CEEB", "#98D8C8", "#F7DC6F"
  ];

  const applyTextStyle = (style: string) => {
    // سيتم تطبيق الأنماط على العنصر المحدد
    console.log('تطبيق نمط النص:', style);
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">أدوات التحرير</h3>
      
      {/* Basic Tools */}
      <div className="space-y-2 mb-6">
        {tools.map((tool, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-right hover:bg-gray-100"
            size="sm"
            onClick={tool.action}
          >
            <tool.icon className="w-4 h-4 ml-2" />
            {tool.name}
          </Button>
        ))}
      </div>

      <Separator className="my-4" />

      {/* Shapes */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <Shapes className="w-4 h-4 ml-2" />
          الأشكال
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {shapes.map((shape, index) => (
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

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <Palette className="w-4 h-4 ml-2" />
          الألوان
        </h4>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
              style={{ backgroundColor: color }}
              title={color}
              onClick={() => console.log('تم اختيار اللون:', color)}
            />
          ))}
        </div>
      </div>

      {/* Text Styles */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">أنماط النص</h4>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => applyTextStyle('heading')}
          >
            <span className="font-bold">عنوان رئيسي</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => applyTextStyle('subheading')}
          >
            <span className="font-semibold">عنوان فرعي</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => applyTextStyle('normal')}
          >
            <span className="font-normal">نص عادي</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
