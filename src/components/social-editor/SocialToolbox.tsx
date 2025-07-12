
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Image, 
  Hash, 
  AtSign, 
  Heart,
  MessageCircle,
  Share,
  Bookmark
} from "lucide-react";

interface SocialToolboxProps {
  onAddElement: (element: any) => void;
}

export const SocialToolbox = ({ onAddElement }: SocialToolboxProps) => {
  const addTextElement = (type: string) => {
    const textTypes = {
      headline: { content: 'عنوان جذاب', fontSize: 28, fontWeight: 'bold', color: '#FFFFFF' },
      description: { content: 'وصف المنشور هنا...', fontSize: 16, fontWeight: 'normal', color: '#FFFFFF' },
      hashtag: { content: '#هاشتاغ', fontSize: 14, fontWeight: 'normal', color: '#60A5FA' },
      mention: { content: '@اسم_المستخدم', fontSize: 14, fontWeight: 'normal', color: '#60A5FA' },
      cta: { content: 'اضغط هنا', fontSize: 18, fontWeight: 'bold', color: '#FBBF24' }
    };

    const textData = textTypes[type as keyof typeof textTypes] || textTypes.headline;

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
      color: textData.color
    });
  };

  const addSocialElement = (type: string) => {
    const socialElements = {
      like: '❤️',
      comment: '💬',
      share: '🔄',
      bookmark: '🔖',
      fire: '🔥',
      star: '⭐',
      thumbs: '👍',
      clap: '👏'
    };

    onAddElement({
      id: `social-${crypto.randomUUID()}`,
      type: 'text',
      content: socialElements[type as keyof typeof socialElements] || '❤️',
      x: 100,
      y: 100,
      width: 40,
      height: 40,
      rotation: 0,
      fontSize: 32,
      color: '#FFFFFF'
    });
  };

  const addImagePlaceholder = () => {
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
          x: 75,
          y: 75,
          width: 150,
          height: 150,
          rotation: 0
        });
      }
    };
    input.click();
  };

  const textTools = [
    { name: "عنوان رئيسي", action: () => addTextElement('headline'), icon: Type },
    { name: "وصف", action: () => addTextElement('description'), icon: Type },
    { name: "هاشتاغ", action: () => addTextElement('hashtag'), icon: Hash },
    { name: "منشن", action: () => addTextElement('mention'), icon: AtSign },
    { name: "دعوة للفعل", action: () => addTextElement('cta'), icon: Type }
  ];

  const socialIcons = [
    { name: "إعجاب", action: () => addSocialElement('like'), icon: Heart },
    { name: "تعليق", action: () => addSocialElement('comment'), icon: MessageCircle },
    { name: "مشاركة", action: () => addSocialElement('share'), icon: Share },
    { name: "حفظ", action: () => addSocialElement('bookmark'), icon: Bookmark }
  ];

  return (
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-4">أدوات التواصل</h3>
      
      {/* Text Elements */}
      <div className="space-y-2 mb-6">
        <h4 className="font-medium text-gray-700 mb-3">النصوص</h4>
        {textTools.map((tool, index) => (
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

      {/* Social Icons */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">أيقونات التفاعل</h4>
        <div className="grid grid-cols-2 gap-2">
          {socialIcons.map((icon, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="aspect-square p-0 text-xs hover:bg-gray-100"
              title={icon.name}
              onClick={icon.action}
            >
              <icon.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Media */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">الوسائط</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start hover:bg-gray-100"
            onClick={addImagePlaceholder}
          >
            <Image className="w-4 h-4 ml-2" />
            إضافة صورة
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => console.log('إضافة فيديو')}
          >
            🎬 إضافة فيديو
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => console.log('إضافة صوت')}
          >
            🎵 إضافة صوت
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Platform Specific */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">عناصر خاصة</h4>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => addTextElement('location')}
          >
            📍 إضافة موقع
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => addTextElement('product')}
          >
            🏷️ إضافة تاغ منتج
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => addTextElement('poll')}
          >
            📊 إضافة استطلاع
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-gray-100"
            onClick={() => addTextElement('date')}
          >
            ⏰ إضافة تاريخ
          </Button>
        </div>
      </div>
    </div>
  );
};
