
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Move, RotateCcw, Expand } from 'lucide-react';

interface DraggableElementProps {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fontSize?: number;
  color?: string;
  onUpdate: (id: string, updates: Partial<DraggableElementProps>) => void;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  isEditMode: boolean;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  id,
  type,
  content,
  x,
  y,
  width,
  height,
  rotation,
  fontSize = 16,
  color = '#ffffff',
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
  isEditMode
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastTap, setLastTap] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  // تحديث قيمة التحرير عند تغيير المحتوى
  useEffect(() => {
    setEditValue(content);
  }, [content]);

  // تحسين إدارة اللمس المزدوج
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isEditMode || type !== 'text') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
      // لمس مزدوج سريع - بدء التحرير
      console.log('Double tap detected - starting text edit for:', id);
      setIsEditing(true);
      setEditValue(content);
      onSelect(id);
    } else {
      // لمس واحد - تحديد العنصر
      setLastTap(currentTime);
      onSelect(id);
      console.log('Single tap - selected element:', id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // تحديد العنصر أولاً
    onSelect(id);
    
    // بدء السحب
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    console.log('Starting drag for element:', id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditMode) return;
    
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    
    // تحديد العنصر أولاً
    onSelect(id);
    
    // بدء السحب
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    console.log('Starting touch drag for element:', id);
  };

  // تحسين إدارة الحركة
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !isEditMode) return;
    
    const parentRect = elementRef.current?.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    
    const newX = Math.max(0, Math.min(e.clientX - parentRect.left - dragStart.x, parentRect.width - width));
    const newY = Math.max(0, Math.min(e.clientY - parentRect.top - dragStart.y, parentRect.height - height));
    
    onUpdate(id, { x: newX, y: newY });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !isEditMode) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const parentRect = elementRef.current?.parentElement?.getBoundingClientRect();
    if (!parentRect) return;
    
    const newX = Math.max(0, Math.min(touch.clientX - parentRect.left - dragStart.x, parentRect.width - width));
    const newY = Math.max(0, Math.min(touch.clientY - parentRect.top - dragStart.y, parentRect.height - height));
    
    onUpdate(id, { x: newX, y: newY });
  };

  const handleDragEnd = () => {
    if (isDragging) {
      console.log('Stopped dragging element:', id);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, dragStart, width, height]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isEditMode || type !== 'text') return;
    e.preventDefault();
    e.stopPropagation();
    console.log('Double click - starting text edit for:', id);
    setIsEditing(true);
    setEditValue(content);
  };

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      console.log('Saving text edit:', editValue);
      onUpdate(id, { content: editValue.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(content);
    }
  };

  const handleControlAction = (action: 'rotate' | 'resize' | 'delete', e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    switch (action) {
      case 'rotate':
        const newRotation = (rotation + 90) % 360;
        console.log('Rotating element to:', newRotation);
        onUpdate(id, { rotation: newRotation });
        break;
      case 'resize':
        const newWidth = Math.min(width + 20, 400);
        const newHeight = Math.min(height + 20, 400);
        console.log('Resizing element to:', { newWidth, newHeight });
        onUpdate(id, { width: newWidth, height: newHeight });
        break;
      case 'delete':
        console.log('Deleting element:', id);
        onDelete(id);
        break;
    }
  };

  // تركيز الإدخال عند بدء التحرير
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      setTimeout(() => {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }, 100);
    }
  }, [isEditing]);

  return (
    <div
      ref={elementRef}
      className={`absolute select-none transition-all duration-200 ${
        isSelected && isEditMode ? 'ring-2 ring-blue-500 ring-opacity-75 shadow-lg z-50' : 'z-10'
      } ${isEditMode ? 'cursor-move hover:ring-1 hover:ring-blue-300' : 'cursor-default'}`}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        transform: `rotate(${rotation}deg)`,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
    >
      {type === 'text' ? (
        isEditing ? (
          <Input
            ref={editInputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyPress}
            style={{ fontSize: fontSize, color: color }}
            className="w-full h-full border-2 border-blue-500 bg-white text-black px-2 rounded"
            onClick={(e) => e.stopPropagation()}
            placeholder="اكتب النص هنا..."
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-bold break-words px-2 rounded"
            style={{ 
              fontSize: fontSize, 
              color: color,
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              backgroundColor: 'rgba(0,0,0,0.1)'
            }}
          >
            {content || 'نص فارغ'}
          </div>
        )
      ) : (
        <img
          src={content}
          alt="صورة"
          className="w-full h-full object-cover rounded shadow-md"
          draggable={false}
          style={{ touchAction: 'none' }}
          onError={(e) => {
            console.error('Image load error:', content);
            e.currentTarget.style.display = 'none';
          }}
        />
      )}

      {/* أزرار التحكم - تظهر فقط عند التحديد */}
      {isSelected && isEditMode && !isEditing && (
        <div className="absolute -top-14 left-0 flex gap-1 bg-black bg-opacity-90 rounded-lg px-2 py-1 z-50 shadow-lg">
          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0 text-white hover:bg-white hover:bg-opacity-20 touch-manipulation"
            onClick={(e) => handleControlAction('rotate', e)}
            onTouchEnd={(e) => handleControlAction('rotate', e)}
            title="تدوير"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0 text-white hover:bg-white hover:bg-opacity-20 touch-manipulation"
            onClick={(e) => handleControlAction('resize', e)}
            onTouchEnd={(e) => handleControlAction('resize', e)}
            title="تكبير"
          >
            <Expand className="w-5 h-5" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0 text-red-400 hover:bg-red-500 hover:bg-opacity-20 touch-manipulation"
            onClick={(e) => handleControlAction('delete', e)}
            onTouchEnd={(e) => handleControlAction('delete', e)}
            title="حذف"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
