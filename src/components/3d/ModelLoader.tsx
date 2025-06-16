
import { Html } from '@react-three/drei';

export const ModelLoadingSpinner = () => {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading 3D model...</span>
      </div>
    </Html>
  );
};
