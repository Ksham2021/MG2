import React, { useState, useEffect, useRef } from 'react';
import { Edit, BookOpen, Plus, Image, Type, Layout, PaintBucket, Save, Moon, Sun, CloudLightning, Coffee, Palette, ChevronDown, Trash2 } from 'lucide-react';
import { useMood } from '../context/MoodContext';

interface Entry {
  id: string;
  content: string;
  createdAt: Date;
  editedAt: Date | null;
  styling: {
    font: string;
    color: string;
    size: string;
    background: string;
  };
}

export function SoulScript() {
  const { getMoodTheme, currentMood } = useMood();
  const moodTheme = getMoodTheme();
  
  // State for entries
  const [entries, setEntries] = useState<Entry[]>([{
    id: Date.now().toString(),
    content: '',
    createdAt: new Date(),
    editedAt: null,
    styling: {
      font: 'font-sans',
      color: 'text-white',
      size: 'text-base',
      background: 'bg-white/10'
    }
  }]);
  const [currentEntryId, setCurrentEntryId] = useState(entries[0].id);
  
  // State for diary customization
  const [diaryContent, setDiaryContent] = useState('');
  const [selectedFont, setSelectedFont] = useState('font-sans');
  const [textColor, setTextColor] = useState('text-white');
  const [fontSize, setFontSize] = useState('text-base');
  const [background, setBackground] = useState('bg-gradient-to-br from-blue-500/20 to-purple-500/20');
  
  // State for dropdown menus
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Refs for dropdown positioning
  const dropdownRefs = {
    font: useRef<HTMLDivElement>(null),
    color: useRef<HTMLDivElement>(null),
    size: useRef<HTMLDivElement>(null),
    background: useRef<HTMLDivElement>(null)
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const activeRef = dropdownRefs[activeDropdown as keyof typeof dropdownRefs];
        if (activeRef.current && !activeRef.current.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);
  
  // Available customization options
  const fontOptions = [
    { name: 'Sans Serif', value: 'font-sans' },
    { name: 'Serif', value: 'font-serif' },
    { name: 'Monospace', value: 'font-mono' },
    { name: 'Cursive', value: 'font-serif italic' },
    { name: 'Fantasy', value: 'font-bold' }
  ];
  
  const colorOptions = [
    { name: 'White', value: 'text-white', color: 'bg-white' },
    { name: 'Blue', value: 'text-blue-400', color: 'bg-blue-400' },
    { name: 'Purple', value: 'text-purple-400', color: 'bg-purple-400' },
    { name: 'Pink', value: 'text-pink-400', color: 'bg-pink-400' },
    { name: 'Green', value: 'text-green-400', color: 'bg-green-400' },
    { name: 'Yellow', value: 'text-yellow-400', color: 'bg-yellow-400' },
    { name: 'Orange', value: 'text-orange-400', color: 'bg-orange-400' }
  ];
  
  const fontSizeOptions = [
    { name: 'Small', value: 'text-sm' },
    { name: 'Medium', value: 'text-base' },
    { name: 'Large', value: 'text-lg' },
    { name: 'Extra Large', value: 'text-xl' }
  ];
  
  const backgroundOptions = [
    { 
      name: 'Sunrise', 
      icon: Sun,
      value: 'bg-gradient-to-br from-orange-400/20 to-yellow-300/20',
      description: 'A peaceful sunrise for new beginnings'
    },
    { 
      name: 'Ocean', 
      icon: CloudLightning,
      value: 'bg-gradient-to-br from-blue-400/20 to-cyan-300/20',
      description: 'A gentle ocean wave to calm your thoughts'
    },
    { 
      name: 'Night Sky', 
      icon: Moon,
      value: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
      description: 'A starry night sky to reflect and dream'
    },
    { 
      name: 'Cozy', 
      icon: Coffee,
      value: 'bg-gradient-to-br from-amber-500/20 to-red-400/20',
      description: 'A cozy indoor vibe for warmth and comfort'
    },
    { 
      name: 'Creative', 
      icon: Palette,
      value: 'bg-gradient-to-br from-pink-400/20 to-purple-400/20',
      description: 'A vibrant palette to inspire creativity'
    }
  ];
  
  // Toggle dropdown menu
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };
  
  // Get current option name
  const getCurrentFontName = () => {
    return fontOptions.find(font => font.value === selectedFont)?.name || 'Sans Serif';
  };
  
  const getCurrentColorName = () => {
    return colorOptions.find(color => color.value === textColor)?.name || 'White';
  };
  
  const getCurrentSizeName = () => {
    return fontSizeOptions.find(size => size.value === fontSize)?.name || 'Medium';
  };
  
  const getCurrentBackgroundName = () => {
    return backgroundOptions.find(bg => bg.value === background)?.name || 'Default';
  };
  
  // Handle saving diary entry
  const handleSave = () => {
    // In a real app, you would save this to a database
    console.log('Saving diary entry:', {
      content: diaryContent,
      font: selectedFont,
      color: textColor,
      fontSize,
      background
    });
    
    // Show a success message or notification
    alert('Your diary entry has been saved!');
  };
  
  // Get dropdown position
  const getDropdownPosition = (type: string) => {
    const ref = dropdownRefs[type as keyof typeof dropdownRefs];
    if (!ref.current) return {};
    
    const rect = ref.current.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left}px`
    };
  };
  
  // Get text style classes
  const getTextStyleClasses = () => {
    return `${selectedFont} ${textColor} ${fontSize}`;
  };
  
  // Get font style properties
  const getFontStyles = () => {
    return {
      fontFamily: selectedFont.includes('serif') ? 'serif' : 
                 selectedFont.includes('mono') ? 'monospace' : 
                 selectedFont.includes('bold') ? 'fantasy, sans-serif' : 'sans-serif',
      fontStyle: selectedFont.includes('italic') ? 'italic' : 'normal',
      fontWeight: selectedFont.includes('bold') ? 'bold' : 'normal'
    };
  };
  
  // Format date helper function
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };
  
  // Get current entry
  const getCurrentEntry = () => {
    return entries.find(entry => entry.id === currentEntryId) || entries[0];
  };
  
  // Update entry content
  const handleContentChange = (content: string) => {
    setEntries(prev => prev.map(entry => 
      entry.id === currentEntryId 
        ? { ...entry, content, editedAt: new Date() }
        : entry
    ));
  };
  
  // Create new entry
  const createNewEntry = () => {
    const newEntry: Entry = {
      id: Date.now().toString(),
      content: '',
      createdAt: new Date(),
      editedAt: null,
      styling: getCurrentEntry().styling // Inherit styling from current entry
    };
    setEntries(prev => [...prev, newEntry]);
    setCurrentEntryId(newEntry.id);
  };
  
  // Style options
  const options = {
    fonts: [
      { value: 'font-sans', label: 'Default' },
      { value: 'font-serif', label: 'Serif' },
      { value: 'font-mono', label: 'Monospace' },
      { value: 'font-cursive', label: 'Cursive' }
    ],
    colors: [
      { value: 'text-white', label: 'White' },
      { value: 'text-blue-400', label: 'Blue' },
      { value: 'text-green-400', label: 'Green' },
      { value: 'text-purple-400', label: 'Purple' },
      { value: 'text-pink-400', label: 'Pink' }
    ],
    sizes: [
      { value: 'text-sm', label: 'Small' },
      { value: 'text-base', label: 'Medium' },
      { value: 'text-lg', label: 'Large' },
      { value: 'text-xl', label: 'Extra Large' }
    ],
    backgrounds: [
      { value: 'bg-white/10', label: 'Default' },
      { value: 'bg-blue-500/10', label: 'Blue' },
      { value: 'bg-green-500/10', label: 'Green' },
      { value: 'bg-purple-500/10', label: 'Purple' },
      { value: 'bg-pink-500/10', label: 'Pink' }
    ]
  };
  
  // Update styling
  const updateStyling = (type: keyof Entry['styling'], value: string) => {
    setEntries(prev => prev.map(entry =>
      entry.id === currentEntryId
        ? { ...entry, styling: { ...entry.styling, [type]: value } }
        : entry
    ));
  };
  
  // Add delete entry function
  const handleDeleteEntry = (entryId: string, event: React.MouseEvent) => {
    // Stop propagation to prevent selecting the entry when clicking delete
    event.stopPropagation();
    
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      // Filter out the deleted entry
      const updatedEntries = entries.filter(entry => entry.id !== entryId);
      
      // Update entries state
      setEntries(updatedEntries);
      
      // If we're deleting the current entry, select another one
      if (entryId === currentEntryId) {
        // Select the most recent entry, or create a new one if no entries left
        if (updatedEntries.length > 0) {
          setCurrentEntryId(updatedEntries[updatedEntries.length - 1].id);
        } else {
          // Create a new entry if all entries were deleted
          const newEntry: Entry = {
            id: Date.now().toString(),
            content: '',
            createdAt: new Date(),
            editedAt: null,
            styling: {
              font: 'font-sans',
              color: 'text-white',
              size: 'text-base',
              background: 'bg-white/10'
            }
          };
          setEntries([newEntry]);
          setCurrentEntryId(newEntry.id);
        }
      }
    }
  };
  
  const currentEntry = getCurrentEntry();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Edit className={`w-6 h-6 ${moodTheme.primaryColor}`} />
          <h1 className="text-3xl font-bold gaming-gradient">SoulScript</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={createNewEntry}
            className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            New Entry
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Entry
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-white/60 max-w-3xl">
          Welcome to SoulScript, your personal sanctuary to explore emotions, unleash creativity, and embrace self-expression. 
          This digital diary is yours to shape, decorate, and cherish—a safe space where you can write freely without judgment.
        </p>
      </div>
      
      {/* Customization Toolbar */}
      <div className="gaming-card p-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {/* Font Style Button */}
          <div className="relative" ref={dropdownRefs.font}>
            <button
              onClick={() => toggleDropdown('font')}
              className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white flex items-center gap-2"
            >
              <Type className="w-4 h-4" />
              <span className={selectedFont}>{getCurrentFontName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'font' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Text Color Button */}
          <div className="relative" ref={dropdownRefs.color}>
            <button
              onClick={() => toggleDropdown('color')}
              className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white flex items-center gap-2"
            >
              <PaintBucket className="w-4 h-4" />
              <div className={`w-4 h-4 rounded-full ${textColor.replace('text-', 'bg-')}`}></div>
              <span>{getCurrentColorName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'color' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Font Size Button */}
          <div className="relative" ref={dropdownRefs.size}>
            <button
              onClick={() => toggleDropdown('size')}
              className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white flex items-center gap-2"
            >
              <Layout className="w-4 h-4" />
              <span className={fontSize}>{getCurrentSizeName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'size' ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Background Button */}
          <div className="relative" ref={dropdownRefs.background}>
            <button
              onClick={() => toggleDropdown('background')}
              className="py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white flex items-center gap-2"
            >
              <Image className="w-4 h-4" />
              <span>Background: {getCurrentBackgroundName()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'background' ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Font Dropdown */}
      {activeDropdown === 'font' && (
        <div 
          style={getDropdownPosition('font')}
          className="fixed mt-1 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden z-[100] border border-white/10"
        >
          {fontOptions.map(font => (
            <button
              key={font.value}
              onClick={() => {
                setSelectedFont(font.value);
                setActiveDropdown(null);
              }}
              className={`w-full p-2 text-left transition-colors ${font.value} ${
                selectedFont === font.value ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
      
      {/* Color Dropdown */}
      {activeDropdown === 'color' && (
        <div 
          style={getDropdownPosition('color')}
          className="fixed mt-1 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden p-2 z-[100] border border-white/10"
        >
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map(color => (
              <button
                key={color.value}
                onClick={() => {
                  setTextColor(color.value);
                  setActiveDropdown(null);
                }}
                className={`p-2 rounded-lg flex items-center justify-center transition-colors ${
                  textColor === color.value ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                title={color.name}
              >
                <div className={`w-6 h-6 rounded-full ${color.color}`}></div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Size Dropdown */}
      {activeDropdown === 'size' && (
        <div 
          style={getDropdownPosition('size')}
          className="fixed mt-1 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden z-[100] border border-white/10"
        >
          {fontSizeOptions.map(size => (
            <button
              key={size.value}
              onClick={() => {
                setFontSize(size.value);
                setActiveDropdown(null);
              }}
              className={`w-full p-2 text-left transition-colors ${
                fontSize === size.value ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <span className={size.value}>{size.name}</span>
            </button>
          ))}
        </div>
      )}
      
      {/* Background Dropdown */}
      {activeDropdown === 'background' && (
        <div 
          style={getDropdownPosition('background')}
          className="fixed mt-1 w-64 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden p-2 z-[100] border border-white/10"
        >
          {backgroundOptions.map(bg => (
            <button
              key={bg.value}
              onClick={() => {
                setBackground(bg.value);
                setActiveDropdown(null);
              }}
              className={`w-full p-2 rounded-lg mb-1 flex items-center gap-2 transition-colors ${bg.value} ${
                background === bg.value ? 'ring-2 ring-white/40' : 'hover:bg-opacity-80'
              }`}
            >
              <bg.icon className="w-4 h-4 text-white" />
              <div>
                <div className="text-sm font-medium text-white">{bg.name}</div>
                <div className="text-xs text-white/60">{bg.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Diary Content Area */}
      <div className={`gaming-card p-6 min-h-[500px] ${background}`}>
        {/* Creation Date */}
        <div className="text-sm text-white/60 mb-4">
          Created on: {formatDate(currentEntry.createdAt)}
        </div>
        
        <div className="w-full h-full min-h-[400px]">
          <textarea
            value={currentEntry.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Write your heart out... This is your safe space to express yourself freely."
            className={`w-full h-full min-h-[400px] bg-transparent border-none resize-none focus:outline-none ${getTextStyleClasses()}`}
            style={getFontStyles()}
          />
        </div>
        
        {/* Edit Timestamp */}
        {currentEntry.editedAt && (
          <div className="text-sm text-white/60 mt-4">
            Last edited: {formatDate(currentEntry.editedAt)}
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm">
          Your diary entries are private and secure. Express yourself freely without fear of judgment.
        </p>
      </div>
      
      {/* Entry List with Delete Buttons */}
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-bold text-white mb-4">Previous Entries</h2>
        {entries.length === 0 ? (
          <div className="text-white/60 text-center py-4">
            No entries yet. Start writing to create your first entry!
          </div>
        ) : (
          entries.slice().reverse().map(entry => (
            <div 
              key={entry.id}
              className={`relative gaming-card p-4 hover:bg-white/5 transition-colors ${
                entry.id === currentEntryId ? 'border-2 border-white/20' : ''
              }`}
            >
              <button
                onClick={() => setCurrentEntryId(entry.id)}
                className="w-full text-left pr-10" // Add padding to make room for delete button
              >
                <div className="text-sm text-white/60 mb-2">
                  {formatDate(entry.createdAt)}
                </div>
                <div className="text-white line-clamp-2">
                  {entry.content || 'Empty entry'}
                </div>
              </button>
              
              {/* Delete button */}
              <button
                onClick={(e) => handleDeleteEntry(entry.id, e)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-full transition-colors"
                title="Delete entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 