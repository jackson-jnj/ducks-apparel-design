
import { Object3D, Box3, Vector3, BoxGeometry, LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { ModelConfigItem } from './ModelConfig';

export const useModelTransformer = () => {
  const centerModel = (model: Object3D, config: ModelConfigItem) => {
    // Center the model: compute bounding box, center vertically & horizontally at [0,0,0]
    const bbox = new Box3().setFromObject(model);
    const center = bbox.getCenter(new Vector3());
    const size = bbox.getSize(new Vector3());

    // Center the model at origin
    model.position.set(-center.x, -center.y, -center.z);

    // Calculate visual Y center around neckline/collar for visual balance
    const yFromOriginToTop = bbox.max.y + model.position.y;
    const groupPosition: [number, number, number] = [
      0,
      config.baseYOffset - yFromOriginToTop + (config.collarYOffset ?? 0),
      0
    ];

    model.userData.__groupPosition = groupPosition;

    return { bbox, center, size, groupPosition };
  };

  const createDebugBBox = (size: Vector3) => {
    const edges = new EdgesGeometry(new BoxGeometry(size.x, size.y, size.z));
    const line = new LineSegments(edges, new LineBasicMaterial({ color: 0xff00ff }));
    line.position.set(0, 0, 0);
    return line;
  };

  return { centerModel, createDebugBBox };
};
