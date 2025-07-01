import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Square,
  Circle,
  Type,
  Image,
  MousePointer,
} from "lucide-react";
import { DesignElement, Comment } from "@/types";
import { cn } from "@/lib/utils";

interface DesignCanvasProps {
  elements: DesignElement[];
  comments: Comment[];
  onElementSelect?: (element: DesignElement | null) => void;
  onCommentAdd?: (position: { x: number; y: number }) => void;
  selectedElement?: DesignElement | null;
  tool?:
    | "select"
    | "move"
    | "rectangle"
    | "circle"
    | "text"
    | "image"
    | "comment";
}

const DesignCanvas = ({
  elements,
  comments,
  onElementSelect,
  onCommentAdd,
  selectedElement,
  tool = "select",
}: DesignCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(100);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  const handleResetView = () => {
    setZoom(100);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (tool === "comment") {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - panOffset.x) / (zoom / 100);
        const y = (e.clientY - rect.top - panOffset.y) / (zoom / 100);
        onCommentAdd?.({ x, y });
      }
    } else {
      onElementSelect?.(null);
    }
  };

  const handleElementClick = (e: React.MouseEvent, element: DesignElement) => {
    e.stopPropagation();
    if (tool === "select") {
      onElementSelect?.(element);
    }
  };

  const renderElement = (element: DesignElement) => {
    const style = {
      position: "absolute" as const,
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      transform: `scale(${zoom / 100})`,
      transformOrigin: "top left",
      cursor: tool === "select" ? "pointer" : "default",
    };

    const isSelected = selectedElement?.id === element.id;

    switch (element.type) {
      case "rectangle":
        return (
          <div
            key={element.id}
            style={style}
            className={cn(
              "border-2 border-transparent",
              isSelected && "border-primary border-dashed",
            )}
            onClick={(e) => handleElementClick(e, element)}
          >
            <div
              className="w-full h-full flex items-center justify-center text-white font-medium"
              style={{
                backgroundColor: element.properties.fill || "#8B5CF6",
                borderRadius: element.properties.borderRadius || 0,
                fontSize: element.properties.fontSize || 16,
                fontFamily: element.properties.fontFamily || "Inter",
                opacity: element.properties.opacity || 1,
              }}
            >
              {element.properties.text}
            </div>
          </div>
        );

      case "circle":
        return (
          <div
            key={element.id}
            style={style}
            className={cn(
              "border-2 border-transparent",
              isSelected && "border-primary border-dashed",
            )}
            onClick={(e) => handleElementClick(e, element)}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: element.properties.fill || "#F1F5F9",
                border: element.properties.stroke
                  ? `2px solid ${element.properties.stroke}`
                  : "none",
                opacity: element.properties.opacity || 1,
              }}
            />
          </div>
        );

      case "text":
        return (
          <div
            key={element.id}
            style={style}
            className={cn(
              "border-2 border-transparent",
              isSelected && "border-primary border-dashed",
            )}
            onClick={(e) => handleElementClick(e, element)}
          >
            <div
              style={{
                color: element.properties.fill || "#64748B",
                fontSize: element.properties.fontSize || 16,
                fontFamily: element.properties.fontFamily || "Inter",
                opacity: element.properties.opacity || 1,
                lineHeight: 1.5,
              }}
            >
              {element.properties.text}
            </div>
          </div>
        );

      case "image":
        return (
          <div
            key={element.id}
            style={style}
            className={cn(
              "border-2 border-transparent bg-gray-200 rounded-lg flex items-center justify-center",
              isSelected && "border-primary border-dashed",
            )}
            onClick={(e) => handleElementClick(e, element)}
          >
            <Image className="w-8 h-8 text-gray-400" />
          </div>
        );

      default:
        return null;
    }
  };

  const renderComments = () => {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className="absolute z-20"
        style={{
          left: comment.position.x * (zoom / 100) + panOffset.x,
          top: comment.position.y * (zoom / 100) + panOffset.y,
          transform: `scale(${Math.max(zoom / 100, 0.8)})`,
          transformOrigin: "top left",
        }}
      >
        <div className="relative">
          <Badge
            variant={comment.resolved ? "secondary" : "destructive"}
            className="animate-pulse cursor-pointer"
          >
            {comments.indexOf(comment) + 1}
          </Badge>
          {!comment.resolved && (
            <div className="absolute -inset-1 bg-red-500/20 rounded-full animate-ping" />
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-30 flex items-center space-x-2 glass rounded-lg p-2">
        <Button
          variant={tool === "select" ? "default" : "ghost"}
          size="sm"
          className="p-2"
        >
          <MousePointer className="w-4 h-4" />
        </Button>
        <Button
          variant={tool === "move" ? "default" : "ghost"}
          size="sm"
          className="p-2"
        >
          <Move className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border" />
        <Button
          variant={tool === "rectangle" ? "default" : "ghost"}
          size="sm"
          className="p-2"
        >
          <Square className="w-4 h-4" />
        </Button>
        <Button
          variant={tool === "circle" ? "default" : "ghost"}
          size="sm"
          className="p-2"
        >
          <Circle className="w-4 h-4" />
        </Button>
        <Button
          variant={tool === "text" ? "default" : "ghost"}
          size="sm"
          className="p-2"
        >
          <Type className="w-4 h-4" />
        </Button>
        <Button
          variant={tool === "image" ? "default" : "ghost"}
          size="sm"
          className="p-2"
        >
          <Image className="w-4 h-4" />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 glass rounded-lg p-2">
        <Button variant="ghost" size="sm" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium min-w-[3rem] text-center">
          {zoom}%
        </span>
        <Button variant="ghost" size="sm" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleResetView}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full relative cursor-crosshair"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
        }}
        onClick={handleCanvasClick}
      >
        {/* Canvas Content */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          {/* Design Elements */}
          {elements.map(renderElement)}

          {/* Comments */}
          {renderComments()}
        </div>

        {/* Selection Indicator */}
        {selectedElement && (
          <div
            className="absolute border-2 border-primary border-dashed pointer-events-none z-10"
            style={{
              left: selectedElement.position.x * (zoom / 100) + panOffset.x,
              top: selectedElement.position.y * (zoom / 100) + panOffset.y,
              width: selectedElement.size.width * (zoom / 100),
              height: selectedElement.size.height * (zoom / 100),
            }}
          >
            {/* Resize Handles */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary border border-white rounded-sm" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary border border-white rounded-sm" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary border border-white rounded-sm" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary border border-white rounded-sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignCanvas;
