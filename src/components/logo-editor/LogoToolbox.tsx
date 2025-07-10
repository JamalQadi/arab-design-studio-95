
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Circle, 
  Square, 
  Triangle, 
  Star, 
  Heart,
  Zap,
  Crown,
  Diamond
} from "lucide-react";

interface LogoToolboxProps {
  onAddElement: (element: any) => void;
}

export const LogoToolbox = ({ onAddElement }: LogoToolboxProps) => {
  const addTextElement = (style: string) => {
    const textStyles = {
      title: { fontSize: 32, fontWeight: 'bold', content: 'اسم الشركة' },
      subtitle: { fontSize: 18, fontWeight: 'normal', content: 'الشعار الفرعي' },
      tagline: { fontSize: 14, fontWeight: 'light', content: 'الشعار التسويقي' }
    };

    const style_data = textStyles[style as keyof typeof textStyles] || textStyles.title;

    onAddElement({
      id: `text-${crypto.randomUUID()}`,
      type: 'text',
      content: style_data.content,
      x: 100,
      y: 100,
      width: 200,
      height: 40,
      rotation: 0,
      fontSize: style_data.fontSize,
      fontWeight: style_data.fontWeight,
      color: '#000000'
    });
  };

  const addShape = (shape: string) => {
    const shapes = {
      circle: '⭕',
      square: '⬛',
      triangle: '🔺',
      star: '⭐',
      heart: '❤️',
      diamond: '💎',
      crown: '👑',
      lightning: '⚡'
    };

    onAddElement({
      id: `shape-${crypto.randomUUID()}`,
      type: 'text',
      content: shapes[shape as keyof typeof shapes] || '⭕',
      x: 150,
      y: 150,
      width: 60,
      height: 60,
      rotation: 0,
      fontSize: 48,
      color: '#3B82F6'
    });
  };

  const tools = [
    { name: "عنوان رئيسي", action: () => addTextElement('title'), icon: Type },
    { name: "عنوان فرعي", action: () => addTextElement('subtitle'), icon: Type },
    { name: "شعار تسويقي", action: () => addTextElement('tagline'), icon: Type }
  ];

  const shapes = [
    { name: "دائرة", action: () => addShape('circle'), icon: Circle },
    { name: "مربع", action: () => addShape('square'), icon: Square },
    { name: "مثلث", action: () => addShape('triangle'), icon: Triangle },
    { name: "نجمة", action: () => addShape('star'), icon: Star },
    { name: "قلب", action: () => addShape('heart'), icon: Heart },
    { name: "ماسة", action: () => addShape('diamond'), icon: Diamond },
    { name: "تاج", action: () => addShape('crown'), icon: Crown },
    { name: "برق", action: () => addShape('lightning'), icon: Zap }
  ];

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">أدوات الشعار</h3>
      
      {/* Text Tools */}
      <div className="space-y-2 mb-6">
        <h4 className="font-medium text-gray-700 mb-3">النصوص</h4>
        {tools.map((tool, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-right"
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
        <h4 className="font-medium text-gray-700 mb-3">الأشكال والرموز</h4>
        <div className="grid grid-cols-4 gap-2">
          {shapes.map((shape, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="aspect-square p-0 text-xs"
              title={shape.name}
              onClick={shape.action}
            >
              <shape.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Logo Elements */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">عناصر الشعار</h4>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => addShape('crown')}
          >
            👑 شعار ملكي
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => addShape('lightning')}
          >
            ⚡ شعار طاقة
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => addShape('diamond')}
          >
            💎 شعار فاخر
          </Button>
        </div>
      </div>
    </div>
  );
};
