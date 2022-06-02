type modeType =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

type lockLayerType = {
  isMoving: boolean;
  isModifying: boolean;
  isPainting: boolean;
};

export type layerTypesType = 'raster' | 'vector' | 'reference';

export type layerType = {
  name: string;
  isVisible: boolean;
  opacity: number;
  mode: modeType;
  locks: lockLayerType;
  id: number;
  cvs: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;
  type: layerTypesType;
  x: number;
  y: number;
};

export type layerStateType = {
  layersSelected: number[];
  layerFocused: number | null;
  layers: layerType[];
  nextLayerID: number;
  onScreenCVS: HTMLCanvasElement | null;
  onScreenCTX: CanvasRenderingContext2D | null;
};
