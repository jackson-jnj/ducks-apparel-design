
import { MODEL_CONFIG } from './ModelConfig';
import { preloadModels } from './ModelLoader';
import { ModelRenderer } from './ModelRenderer';
import { useModelState } from './ModelState';

export const ModelManager = () => {
  const { state, actions } = useModelState();

  return (
    <ModelRenderer
      state={state}
      onModelLoad={actions.handleModelLoad}
      onBboxLoad={actions.setBboxObj}
      onLoadingChange={actions.setIsLoading}
      onError={actions.setError}
      onDeformationUpdate={actions.handleDeformationUpdate}
    />
  );
};

// Preload all models
preloadModels(Object.values(MODEL_CONFIG).map(({ path }) => path));
