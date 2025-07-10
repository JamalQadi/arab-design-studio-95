
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FontSelectorProps {
  fonts: any;
  onFontChange: (fonts: any) => void;
}

export const FontSelector = ({ fonts, onFontChange }: FontSelectorProps) => {
  const arabicFonts = [
    { name: "نوتو كوفي عربي", value: "Noto Kufi Arabic", preview: "نص تجريبي" },
    { name: "أميري", value: "Amiri", preview: "نص تجريبي" },
    { name: "رقعة", value: "Ruqaa", preview: "نص تجريبي" },
    { name: "ثلث", value: "Thuluth", preview: "نص تجريبي" },
    { name: "ديوان", value: "Diwan", preview: "نص تجريبي" }
  ];

  const englishFonts = [
    { name: "Helvetica", value: "Helvetica", preview: "Sample Text" },
    { name: "Arial", value: "Arial", preview: "Sample Text" },
    { name: "Times New Roman", value: "Times", preview: "Sample Text" },
    { name: "Georgia", value: "Georgia", preview: "Sample Text" },
    { name: "Futura", value: "Futura", preview: "Sample Text" },
    { name: "Bebas Neue", value: "Bebas Neue", preview: "Sample Text" }
  ];

  const fontPairs = [
    { name: "كلاسيكي", primary: "Amiri", secondary: "Helvetica" },
    { name: "عصري", primary: "Noto Kufi Arabic", secondary: "Arial" },
    { name: "أنيق", primary: "Thuluth", secondary: "Georgia" },
    { name: "تقني", primary: "Ruqaa", secondary: "Futura" }
  ];

  const handleFontChange = (fontType: string, value: string) => {
    onFontChange({
      ...fonts,
      [fontType]: value
    });
  };

  const applyFontPair = (pair: any) => {
    onFontChange({
      primary: pair.primary,
      secondary: pair.secondary
    });
  };

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">اختيار الخطوط</h3>
      
      {/* Primary Font */}
      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-sm font-medium">الخط الأساسي</Label>
          <Select value={fonts.primary} onValueChange={(value) => handleFontChange('primary', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="اختر الخط الأساسي" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 mb-2">خطوط عربية</div>
                {arabicFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{font.name}</span>
                      <span className="text-xs text-gray-400 mr-2">{font.preview}</span>
                    </div>
                  </SelectItem>
                ))}
                <div className="text-xs font-medium text-gray-500 mb-2 mt-4">خطوط إنجليزية</div>
                {englishFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{font.name}</span>
                      <span className="text-xs text-gray-400 mr-2" style={{ fontFamily: font.value }}>
                        {font.preview}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>

        {/* Secondary Font */}
        <div>
          <Label className="text-sm font-medium">الخط الثانوي</Label>
          <Select value={fonts.secondary} onValueChange={(value) => handleFontChange('secondary', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="اختر الخط الثانوي" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 mb-2">خطوط عربية</div>
                {arabicFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{font.name}</span>
                      <span className="text-xs text-gray-400 mr-2">{font.preview}</span>
                    </div>
                  </SelectItem>
                ))}
                <div className="text-xs font-medium text-gray-500 mb-2 mt-4">خطوط إنجليزية</div>
                {englishFonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{font.name}</span>
                      <span className="text-xs text-gray-400 mr-2" style={{ fontFamily: font.value }}>
                        {font.preview}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Font Pairs */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">تركيبات جاهزة</h4>
        <div className="space-y-2">
          {fontPairs.map((pair, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => applyFontPair(pair)}
            >
              <div className="text-right">
                <div className="font-medium">{pair.name}</div>
                <div className="text-xs text-gray-500">
                  {pair.primary} + {pair.secondary}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Font Styles */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">أنماط الخط</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="font-bold">سميك</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="font-medium">متوسط</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="font-light">خفيف</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <span className="italic">مائل</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
