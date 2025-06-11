
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useConfiguratorStore } from '@/store/configuratorStore';
import { Upload, X } from 'lucide-react';
import { Button } from './button';

export const LogoUploader = () => {
  const { logoConfig, setLogoImage } = useConfiguratorStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setLogoImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    },
    multiple: false
  });

  const removeLogo = () => {
    setLogoImage(null);
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Logo Upload</h3>
      
      {!logoConfig.image ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-sm">Drop the image here...</p>
          ) : (
            <div>
              <p className="text-sm mb-1">Drag & drop an image here</p>
              <p className="text-xs text-muted-foreground">or click to select</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={logoConfig.image}
              alt="Logo preview"
              className="w-full h-32 object-contain bg-gray-50 rounded border"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeLogo}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            {...getRootProps()}
            className="w-full"
          >
            <input {...getInputProps()} />
            Replace Logo
          </Button>
        </div>
      )}
    </div>
  );
};
