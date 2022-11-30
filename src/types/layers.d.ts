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

type layerTypesType = 'raster' | 'vector' | 'reference';

type layerType = {
  name: string;
  isVisible: boolean;
  opacity: number;
  mode: modeType;
  locks: lockLayerType;
  id: number;
  type: layerTypesType;
  x: number;
  y: number;
};

type layersSliceType = {
  layersSelectedID: number[];
  layerFocusedID: number | null;
  layers: layerType[];
  nextLayerID: number;
};

type layersSliceSelectType = {
  isCTRL: boolean;
  isSHIFT: boolean;
  id: number;
}

type layersNodes = {
  id: number;
  cvs: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;
  isVisible: boolean;
}
