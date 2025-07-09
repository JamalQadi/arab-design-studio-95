
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

export const ToolboxPanel = () => {
  const tools = [
    { icon: Type, name: "النص", category: "text" },
    { icon: Image, name: "الصور", category: "media" },
    { icon: Upload, name: "رفع صورة", category: "media" },
  ];

  const shapes = [
    { icon: Square, name: "مربع" },
    { icon: Circle, name: "دائرة" },
    { icon: Triangle, name: "مثلث" },
    { icon: Star, name: "نجمة" },
    { icon: Heart, name: "قلب" },
  ];

  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
    "#DDA0DD", "#FFB347", "#87CEEB", "#98D8C8", "#F7DC6F"
  ];

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">أدوات التحرير</h3>
      
      {/* Basic Tools */}
      <div className="space-y-2 mb-6">
        {tools.map((tool, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-right"
            size="sm"
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
              className="aspect-square p-0"
              title={shape.name}
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
              className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Text Styles */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">أنماط النص</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="font-bold">عنوان رئيسي</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="font-semibold">عنوان فرعي</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="font-normal">نص عادي</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
