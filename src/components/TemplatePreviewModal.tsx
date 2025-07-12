
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

export const TemplatePreviewModal = ({ isOpen, onClose, template }: TemplatePreviewModalProps) => {
  if (!template) return null;

  const getTemplateGradient = (type: string) => {
    switch (type) {
      case 'restaurant': return 'from-orange-500 to-red-600';
      case 'tech': return 'from-blue-600 to-orange-500';
      case 'wedding': return 'from-blue-400 to-blue-600';
      case 'solidarity': return 'from-gray-800 to-gray-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">{template.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          {/* Template Preview */}
          <div 
            className={`relative bg-gradient-to-br ${getTemplateGradient(template.type)} rounded-lg overflow-hidden`}
            style={{
              width: '100%',
              height: '500px',
              background: template.background || `linear-gradient(135deg, ${getTemplateGradient(template.type)})`
            }}
          >
            {/* Render template elements as preview */}
            {template.elements?.map((element: any, index: number) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${(element.x / template.size.width) * 100}%`,
                  top: `${(element.y / template.size.height) * 100}%`,
                  width: element.width ? `${(element.width / template.size.width) * 100}%` : 'auto',
                  height: element.height ? `${(element.height / template.size.height) * 100}%` : 'auto',
                  fontSize: element.fontSize ? `${element.fontSize * 0.6}px` : '16px',
                  fontWeight: element.fontWeight || 'normal',
                  color: element.color || '#000000',
                  textAlign: element.textAlign || 'left',
                  backgroundColor: element.backgroundColor || 'transparent',
                  borderRadius: element.borderRadius || '0px',
                  padding: element.padding || '0px',
                  transform: element.transform || 'none',
                  lineHeight: element.lineHeight || 1.2,
                  whiteSpace: 'pre-line'
                }}
                className="pointer-events-none"
              >
                {element.content}
              </div>
            ))}
          </div>
          
          {/* Template Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">معلومات القالب:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">النوع:</span> {template.type}
              </div>
              <div>
                <span className="font-medium">الأبعاد:</span> {template.size.width}×{template.size.height}
              </div>
              <div>
                <span className="font-medium">عدد العناصر:</span> {template.elements?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
