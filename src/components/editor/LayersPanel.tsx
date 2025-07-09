
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  MoreVertical,
  Copy,
  Trash2,
  MoveUp,
  MoveDown
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LayersPanel = () => {
  const [layers, setLayers] = useState([
    { id: 1, name: "خلفية التصميم", type: "background", visible: true, locked: false, selected: false },
    { id: 2, name: "العنوان الرئيسي", type: "text", visible: true, locked: false, selected: true },
    { id: 3, name: "النص الفرعي", type: "text", visible: true, locked: false, selected: false },
    { id: 4, name: "أيقونة السفر", type: "icon", visible: true, locked: false, selected: false },
    { id: 5, name: "معلومات المكتب", type: "text", visible: true, locked: false, selected: false },
  ]);

  const toggleVisibility = (id: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLock = (id: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === id ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const selectLayer = (id: number) => {
    setLayers(prev => prev.map(layer => 
      ({ ...layer, selected: layer.id === id })
    ));
  };

  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'text': return '📝';
      case 'background': return '🎨';
      case 'icon': return '🎯';
      default: return '📄';
    }
  };

  const moveLayer = (id: number, direction: 'up' | 'down') => {
    setLayers(prev => {
      const index = prev.findIndex(layer => layer.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newLayers = [...prev];
      [newLayers[index], newLayers[newIndex]] = [newLayers[newIndex], newLayers[index]];
      return newLayers;
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">الطبقات</h3>
        <Button variant="ghost" size="sm">
          + إضافة طبقة
        </Button>
      </div>
      
      <div className="space-y-1">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={`group flex items-center p-2 rounded-lg border transition-all cursor-pointer ${
              layer.selected 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => selectLayer(layer.id)}
          >
            {/* Layer Icon & Name */}
            <div className="flex items-center flex-1 min-w-0">
              <span className="text-lg ml-2">{getLayerIcon(layer.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {layer.name}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {layer.type}
                </Badge>
              </div>
            </div>

            {/* Layer Controls */}
            <div className="flex items-center space-x-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  moveLayer(layer.id, 'up');
                }}
              >
                <MoveUp className="w-3 h-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  moveLayer(layer.id, 'down');
                }}
              >
                <MoveDown className="w-3 h-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(layer.id);
                }}
              >
                {layer.visible ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3 text-gray-400" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLock(layer.id);
                }}
              >
                {layer.locked ? (
                  <Lock className="w-3 h-3 text-orange-500" />
                ) : (
                  <Unlock className="w-3 h-3" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 ml-2" />
                    نسخ
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 ml-2" />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Layer Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            دمج الطبقات
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            تسطيح الكل
          </Button>
        </div>
      </div>
    </div>
  );
};
