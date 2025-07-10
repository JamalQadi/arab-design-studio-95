
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface ColorPaletteProps {
  colors: any;
  onColorChange: (colors: any) => void;
}

export const ColorPalette = ({ colors, onColorChange }: ColorPaletteProps) => {
  const presetPalettes = [
    { name: "الأزرق الكلاسيكي", colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#EF4444' } },
    { name: "الأخضر الطبيعي", colors: { primary: '#059669', secondary: '#047857', accent: '#F59E0B' } },
    { name: "البنفسجي العصري", colors: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#EC4899' } },
    { name: "الأحمر القوي", colors: { primary: '#EF4444', secondary: '#DC2626', accent: '#F97316' } },
    { name: "الرمادي المحترف", colors: { primary: '#6B7280', secondary: '#374151', accent: '#3B82F6' } },
    { name: "الذهبي الفاخر", colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#7C2D12' } }
  ];

  const handleColorChange = (colorType: string, value: string) => {
    onColorChange({
      ...colors,
      [colorType]: value
    });
  };

  const applyPreset = (preset: any) => {
    onColorChange(preset.colors);
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">لوحة الألوان</h3>
      
      {/* Current Colors */}
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="primary-color" className="text-sm font-medium">اللون الأساسي</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="primary-color"
              type="color"
              value={colors.primary || '#3B82F6'}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="w-12 h-8 p-0 border-0"
            />
            <Input
              type="text"
              value={colors.primary || '#3B82F6'}
              onChange={(e) => handleColorChange('primary', e.target.value)}
              className="flex-1 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="secondary-color" className="text-sm font-medium">اللون الثانوي</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="secondary-color"
              type="color"
              value={colors.secondary || '#1E40AF'}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
              className="w-12 h-8 p-0 border-0"
            />
            <Input
              type="text"
              value={colors.secondary || '#1E40AF'}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
              className="flex-1 text-sm"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="accent-color" className="text-sm font-medium">لون التمييز</Label>
          <div className="flex items-center space-x-2 mt-1">
            <Input
              id="accent-color"
              type="color"
              value={colors.accent || '#EF4444'}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="w-12 h-8 p-0 border-0"
            />
            <Input
              type="text"
              value={colors.accent || '#EF4444'}
              onChange={(e) => handleColorChange('accent', e.target.value)}
              className="flex-1 text-sm"
            />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Preset Palettes */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">لوحات جاهزة</h4>
        <div className="space-y-3">
          {presetPalettes.map((palette, index) => (
            <div key={index} className="cursor-pointer" onClick={() => applyPreset(palette)}>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">{palette.name}</span>
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: palette.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: palette.colors.secondary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: palette.colors.accent }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Color Harmony */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">انسجام الألوان</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            🎨 ألوان متكاملة
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            🌈 ألوان متناظرة
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            ⚪ أحادية اللون
          </Button>
        </div>
      </div>
    </div>
  );
};
