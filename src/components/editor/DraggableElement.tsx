
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

  // إدارة اللمس المزدوج للأجهزة المحمولة
  const handleTouch = (e: React.TouchEvent) => {
    if (!isEditMode || type !== 'text') return;
    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 500 && tapLength > 0) {
      // لمس مزدوج - بدء التحرير
      e.preventDefault();
      e.stopPropagation();
      console.log('Double tap detected - starting text edit for:', id);
      setIsEditing(true);
      setEditValue(content);
      onSelect(id);
    } else {
      // لمس واحد - تحديد العنصر
      setLastTap(currentTime);
      onSelect(id);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    onSelect(id);
    setDragStart({
      x: e.clientX - x,
      y: e.clientY - y
    });
    
    console.log('Starting drag for element:', id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const touch = e.touches[0];
    setIsDragging(true);
    onSelect(id);
    setDragStart({
      x: touch.clientX - x,
      y: touch.clientY - y
    });
    
    console.log('Starting touch drag for element:', id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !isEditMode) return;
    
    const newX = Math.max(0, e.clientX - dragStart.x);
    const newY = Math.max(0, e.clientY - dragStart.y);
    
    console.log('Dragging element to:', { newX, newY });
    onUpdate(id, { x: newX, y: newY });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !isEditMode) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const newX = Math.max(0, touch.clientX - dragStart.x);
    const newY = Math.max(0, touch.clientY - dragStart.y);
    
    console.log('Touch dragging element to:', { newX, newY });
    onUpdate(id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      console.log('Stopped dragging element:', id);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      console.log('Stopped touch dragging element:', id);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragStart]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isEditMode || type !== 'text') return;
    e.stopPropagation();
    console.log('Double click - starting text edit for:', id);
    setIsEditing(true);
    setEditValue(content);
  };

  const handleEditSubmit = () => {
    console.log('Saving text edit:', editValue);
    onUpdate(id, { content: editValue });
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(content);
    }
  };

  const handleRotate = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const newRotation = (rotation + 90) % 360;
    console.log('Rotating element to:', newRotation);
    onUpdate(id, { rotation: newRotation });
  };

  const handleResize = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const newWidth = Math.min(width + 20, 400);
    const newHeight = Math.min(height + 20, 400);
    console.log('Resizing element to:', { newWidth, newHeight });
    onUpdate(id, { width: newWidth, height: newHeight });
  };

  const handleDelete = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    console.log('Deleting element:', id);
    onDelete(id);
  };

  const handleElementClick = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.stopPropagation();
    onSelect(id);
    console.log('Selected element:', id);
  };

  // تركيز الإدخال عند بدء التحرير
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      ref={elementRef}
      className={`absolute select-none transition-all ${
        isSelected && isEditMode ? 'ring-2 ring-blue-500 ring-opacity-75' : ''
      } ${isEditMode ? 'cursor-move hover:ring-1 hover:ring-blue-300' : 'cursor-default'}`}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        transform: `rotate(${rotation}deg)`,
        zIndex: isSelected ? 1000 : 10,
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouch}
      onClick={handleElementClick}
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
            className="w-full h-full border-2 border-blue-500 bg-white text-black px-2"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-bold break-words px-2"
            style={{ 
              fontSize: fontSize, 
              color: color,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            {content}
          </div>
        )
      ) : (
        <img
          src={content}
          alt="Uploaded"
          className="w-full h-full object-cover rounded"
          draggable={false}
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Controls - only show when selected and in edit mode */}
      {isSelected && isEditMode && !isEditing && (
        <div className="absolute -top-12 left-0 flex gap-1 bg-black bg-opacity-80 rounded px-2 py-1 z-50">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-white hover:bg-white hover:bg-opacity-20 touch-manipulation"
            onClick={handleRotate}
            onTouchEnd={handleRotate}
            title="تدوير"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-white hover:bg-white hover:bg-opacity-20 touch-manipulation"
            onClick={handleResize}
            onTouchEnd={handleResize}
            title="تكبير"
          >
            <Expand className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-red-400 hover:bg-red-500 hover:bg-opacity-20 touch-manipulation"
            onClick={handleDelete}
            onTouchEnd={handleDelete}
            title="حذف"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
