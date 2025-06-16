
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDesignStore } from '@/store/designStore';
import { Upload, X, Trash2 } from 'lucide-react';
import { Button } from './button';

export const DesignUploader = () => {
  const { designs, addDesign, removeDesign, selectDesign, selectedDesignId } = useDesignStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        addDesign(reader.result as string, file.name);
      };
      reader.readAsDataURL(file);
    });
  }, [addDesign]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    multiple: true
  });

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Design Upload</h3>
      
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
            <p className="text-sm mb-1">Upload logos, patterns, or graphics</p>
            <p className="text-xs text-muted-foreground">Drag & drop or click to select</p>
          </div>
        )}
      </div>

      {/* Design List */}
      {designs.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-medium">Uploaded Designs</label>
          <div className="max-h-32 overflow-y-auto space-y-2">
            {designs.map((design) => (
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
                <span className="flex-1 text-xs truncate">{design.name}</span>
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
    </div>
  );
};
