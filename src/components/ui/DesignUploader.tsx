
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDesignStore } from '@/store/designStore';
import { Upload, Trash2 } from 'lucide-react';
import { Button } from './button';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

export const DesignUploader = () => {
  const { 
    designs, 
    addDesign, 
    removeDesign, 
    selectDesign, 
    selectedDesignId,
    activeSide,
    setActiveSide,
    getActiveDesigns 
  } = useDesignStore();

  const activeDesigns = getActiveDesigns();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Compress image before adding
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // Set maximum dimensions for optimization
          const maxWidth = 1024;
          const maxHeight = 1024;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedImage = canvas.toDataURL('image/jpeg', 0.8);
          addDesign(compressedImage, file.name, activeSide);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }, [addDesign, activeSide]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    multiple: true
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">Design Upload</h3>
        
        {/* Front/Back Toggle */}
        <ToggleGroup 
          type="single" 
          value={activeSide} 
          onValueChange={(value) => value && setActiveSide(value as 'front' | 'back')}
          size="sm"
        >
          <ToggleGroupItem value="front" className="text-xs px-3">
            Front
          </ToggleGroupItem>
          <ToggleGroupItem value="back" className="text-xs px-3">
            Back
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors mb-4
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
        {isDragActive ? (
          <p className="text-sm">Drop designs here...</p>
        ) : (
          <div>
            <p className="text-sm mb-1">Upload {activeSide} designs</p>
            <p className="text-xs text-muted-foreground">Drag & drop or click to select</p>
          </div>
        )}
      </div>

      {/* Active Side Design List */}
      {activeDesigns.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium">
            {activeSide === 'front' ? 'Front' : 'Back'} Designs ({activeDesigns.length})
          </label>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {activeDesigns.map((design) => (
              <div
                key={design.id}
                className={`
                  flex items-center space-x-2 p-2 rounded border cursor-pointer transition-colors
                  ${selectedDesignId === design.id ? 'bg-primary/10 border-primary' : 'border-border hover:bg-muted'}
                `}
                onClick={() => selectDesign(design.id)}
              >
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-8 h-8 object-contain bg-gray-100 rounded"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs truncate block">{design.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {design.side === 'front' ? 'Front' : 'Back'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDesign(design.id);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary of all designs */}
      {designs.length > 0 && (
        <div className="mt-3 pt-2 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Front: {designs.filter(d => d.side === 'front').length}</span>
            <span>Back: {designs.filter(d => d.side === 'back').length}</span>
            <span>Total: {designs.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};
