
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline,
  RotateCcw
} from "lucide-react";
import { useState } from "react";

export const PropertiesPanel = () => {
  const [opacity, setOpacity] = useState([100]);
  const [fontSize, setFontSize] = useState([24]);
  const [rotation, setRotation] = useState([0]);

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">خصائص العنصر</h3>
      
      {/* Element Info */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-900">العنصر المحدد</span>
          <span className="text-xs text-blue-600">نص</span>
        </div>
        <p className="text-sm text-blue-700">عنوان رئيسي</p>
      </div>

      {/* Text Properties */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="text-content" className="text-sm font-medium mb-2 block">
            محتوى النص
          </Label>
          <Textarea
            id="text-content"
            placeholder="اكتب النص هنا..."
            className="resize-none"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="font-size" className="text-sm font-medium mb-2 block">
            حجم الخط: {fontSize[0]}px
          </Label>
          <Slider
            id="font-size"
            value={fontSize}
            onValueChange={setFontSize}
            max={72}
            min={8}
            step={1}
            className="w-full"
          />
        </div>

        {/* Text Alignment */}
        <div>
          <Label className="text-sm font-medium mb-2 block">محاذاة النص</Label>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm">
              <AlignRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <AlignLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Text Style */}
        <div>
          <Label className="text-sm font-medium mb-2 block">نمط النص</Label>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Underline className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Position & Transform */}
      <div className="space-y-4 mb-6">
        <h4 className="font-medium text-gray-700">الموضع والتحويل</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="pos-x" className="text-xs text-gray-600">X</Label>
            <Input id="pos-x" type="number" placeholder="0" className="h-8" />
          </div>
          <div>
            <Label htmlFor="pos-y" className="text-xs text-gray-600">Y</Label>
            <Input id="pos-y" type="number" placeholder="0" className="h-8" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="width" className="text-xs text-gray-600">العرض</Label>
            <Input id="width" type="number" placeholder="100" className="h-8" />
          </div>
          <div>
            <Label htmlFor="height" className="text-xs text-gray-600">الارتفاع</Label>
            <Input id="height" type="number" placeholder="50" className="h-8" />
          </div>
        </div>

        <div>
          <Label htmlFor="rotation" className="text-sm font-medium mb-2 block flex items-center">
            <RotateCcw className="w-4 h-4 ml-1" />
            الدوران: {rotation[0]}°
          </Label>
          <Slider
            id="rotation"
            value={rotation}
            onValueChange={setRotation}
            max={360}
            min={0}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <Separator className="my-4" />

      {/* Appearance */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700">المظهر</h4>
        
        <div>
          <Label htmlFor="opacity" className="text-sm font-medium mb-2 block">
            الشفافية: {opacity[0]}%
          </Label>
          <Slider
            id="opacity"
            value={opacity}
            onValueChange={setOpacity}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="visible" className="text-sm font-medium">
            مرئي
          </Label>
          <Switch id="visible" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="locked" className="text-sm font-medium">
            مقفل
          </Label>
          <Switch id="locked" />
        </div>
      </div>
    </div>
  );
};
