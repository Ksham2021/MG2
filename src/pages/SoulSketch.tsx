import React, { useRef, useState, useEffect } from 'react';
import { Palette, PenTool, Eraser, Square, Circle, Download, Undo, Redo, Trash2 } from 'lucide-react';
import { useMood } from '../context/MoodContext';

export function SoulSketch() {
  const { getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'brush' | 'eraser' | 'square' | 'circle'>('brush');
  const [brushColor, setBrushColor] = useState('#FFFFFF');
  const [brushSize, setBrushSize] = useState(5);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Drawing colors
  const colors = [
    { name: 'White', value: '#FFFFFF' },
    { name: 'Black', value: '#000000' },
    { name: 'Red', value: '#FF4136' },
    { name: 'Blue', value: '#0074D9' },
    { name: 'Green', value: '#2ECC40' },
    { name: 'Yellow', value: '#FFDC00' },
    { name: 'Purple', value: '#B10DC9' },
    { name: 'Orange', value: '#FF851B' },
    { name: 'Pink', value: '#F012BE' },
    { name: 'Teal', value: '#39CCCC' }
  ];

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Set initial canvas background
      if (context) {
        context.fillStyle = '#1a1a2e';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Save initial state to history
        const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingHistory([initialState]);
        setHistoryIndex(0);
      }
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (context) {
          // Save current drawing
          const currentDrawing = context.getImageData(0, 0, canvas.width, canvas.height);
          
          // Resize canvas
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          
          // Restore drawing
          context.putImageData(currentDrawing, 0, 0);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    setIsDrawing(true);
    
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    
    context.beginPath();
    context.moveTo(x, y);
    
    if (drawingTool === 'square' || drawingTool === 'circle') {
      context.beginPath();
      context.rect(x, y, 0, 0);
      context.fillStyle = brushColor;
      context.strokeStyle = brushColor;
      context.lineWidth = brushSize;
    } else {
      // For brush and eraser
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = drawingTool === 'eraser' ? '#1a1a2e' : brushColor;
      context.lineWidth = brushSize;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    
    if (drawingTool === 'brush' || drawingTool === 'eraser') {
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const endDrawing = () => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    setIsDrawing(false);
    
    // Save state to history
    const newState = context.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = drawingHistory.slice(0, historyIndex + 1);
    newHistory.push(newState);
    
    setDrawingHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        setHistoryIndex(historyIndex - 1);
        context.putImageData(drawingHistory[historyIndex - 1], 0, 0);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < drawingHistory.length - 1 && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        setHistoryIndex(historyIndex + 1);
        context.putImageData(drawingHistory[historyIndex + 1], 0, 0);
      }
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        context.fillStyle = '#1a1a2e';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Save cleared state to history
        const clearedState = context.getImageData(0, 0, canvas.width, canvas.height);
        const newHistory = drawingHistory.slice(0, historyIndex + 1);
        newHistory.push(clearedState);
        
        setDrawingHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'soulsketch-artwork.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Palette className={`w-6 h-6 ${moodTheme.primaryColor}`} />
          <h1 className="text-3xl font-bold gaming-gradient">SoulSketch</h1>
        </div>
        <button
          onClick={handleSave}
          className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Save Artwork
        </button>
      </div>

      <div className="mb-6">
        <p className="text-white/60 max-w-3xl">
          Welcome to SoulSketch, where art becomes a language of its own. When words fall short, let your emotions flow through colors, shapes, and strokes. This is your canvas for self-expression—no rules, no judgments, just pure creativity.
        </p>
      </div>

      <div className="gaming-card p-3 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Drawing Tools */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setDrawingTool('brush')}
              className={`p-2 rounded-lg transition-colors ${
                drawingTool === 'brush' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Brush"
            >
              <PenTool className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDrawingTool('eraser')}
              className={`p-2 rounded-lg transition-colors ${
                drawingTool === 'eraser' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Eraser"
            >
              <Eraser className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDrawingTool('square')}
              className={`p-2 rounded-lg transition-colors ${
                drawingTool === 'square' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Square"
            >
              <Square className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDrawingTool('circle')}
              className={`p-2 rounded-lg transition-colors ${
                drawingTool === 'circle' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
              }`}
              title="Circle"
            >
              <Circle className="w-5 h-5" />
            </button>
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Size:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-24"
            />
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Color:</span>
            <div className="flex gap-1">
              {colors.map(color => (
                <button
                  key={color.value}
                  onClick={() => setBrushColor(color.value)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    brushColor === color.value ? 'ring-2 ring-white scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* History Controls */}
          <div className="flex ml-auto gap-2">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={`p-2 rounded-lg transition-colors ${
                historyIndex <= 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'
              }`}
              title="Undo"
            >
              <Undo className="w-5 h-5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= drawingHistory.length - 1}
              className={`p-2 rounded-lg transition-colors ${
                historyIndex >= drawingHistory.length - 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'
              }`}
              title="Redo"
            >
              <Redo className="w-5 h-5" />
            </button>
            <button
              onClick={handleClear}
              className="p-2 rounded-lg text-white/60 hover:text-white transition-colors"
              title="Clear Canvas"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="gaming-card p-6">
        <canvas
          ref={canvasRef}
          className="w-full h-[600px] rounded-lg cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
        />
      </div>
    </div>
  );
} 