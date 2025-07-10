
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SocialFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

export const SocialFilters = ({ filters, onFilterChange }: SocialFiltersProps) => {
  const handleFilterChange = (filterType: string, value: number) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const presetFilters = [
    { name: "طبيعي", values: { brightness: 100, contrast: 100, saturation: 100 } },
    { name: "دافئ", values: { brightness: 110, contrast: 105, saturation: 120 } },
    { name: "بارد", values: { brightness: 95, contrast: 110, saturation: 80 } },
    { name: "عتيق", values: { brightness: 90, contrast: 120, saturation: 70 } },
    { name: "حيوي", values: { brightness: 105, contrast: 115, saturation: 140 } },
    { name: "أحادي", values: { brightness: 100, contrast: 110, saturation: 0 } }
  ];

  const applyPreset = (preset: any) => {
    onFilterChange(preset.values);
  };

  const resetFilters = () => {
    onFilterChange({ brightness: 100, contrast: 100, saturation: 100 });
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">الفلاتر والتأثيرات</h3>
      
      {/* Manual Controls */}
      <div className="space-y-6 mb-6">
        <div>
          <Label className="text-sm font-medium">السطوع</Label>
          <div className="mt-2">
            <Slider
              value={[filters.brightness || 100]}
              onValueChange={([value]) => handleFilterChange('brightness', value)}
              min={50}
              max={150}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50%</span>
              <span>{filters.brightness || 100}%</span>
              <span>150%</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">التباين</Label>
          <div className="mt-2">
            <Slider
              value={[filters.contrast || 100]}
              onValueChange={([value]) => handleFilterChange('contrast', value)}
              min={50}
              max={150}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>50%</span>
              <span>{filters.contrast || 100}%</span>
              <span>150%</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">التشبع</Label>
          <div className="mt-2">
            <Slider
              value={[filters.saturation || 100]}
              onValueChange={([value]) => handleFilterChange('saturation', value)}
              min={0}
              max={200}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>{filters.saturation || 100}%</span>
              <span>200%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Button variant="outline" size="sm" onClick={resetFilters}>
          إعادة تعيين
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Preset Filters */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">فلاتر جاهزة</h4>
        <div className="grid grid-cols-2 gap-2">
          {presetFilters.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => applyPreset(preset)}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Instagram-style Filters */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">فلاتر عصرية</h4>
        <div className="space-y-2">
          {[
            "Valencia", "X-Pro II", "Willow", "Nashville", 
            "1977", "Toaster", "Brannan", "Inkwell"
          ].map((filterName) => (
            <Button
              key={filterName}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs"
            >
              ✨ {filterName}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
