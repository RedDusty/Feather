import { fileStateType } from '../types/file';
import { layerStateType } from '../types/layers';

export const layerState: layerStateType = {
  layersSelected: [],
  layerFocused: null,
  layers: [],
  nextLayerID: 0,
  onScreenCVS: null,
  onScreenCTX: null,
};

export const fileState: fileStateType = {
  width: 128,
  height: 128,
  sizeMetrics: 'px',
  fileName: 'NewCanvas1',
  printRes: 72,
  printResMetrics: 'pixels/cm',
  background: 'white',
  backgroundColor: '#ffffff',
  fileStorage: 'skip',
};

export const getFileState = () => {
  return {
    getWidth: () => fileState.width,
    getHeight: () => fileState.height,
    getSizeMetrics: () => fileState.sizeMetrics,
    getFileName: () => fileState.fileName,
    getPrintRes: () => fileState.printRes,
    getPrintResMetrics: () => fileState.printResMetrics,
    getBackground: () => fileState.background,
    getBackgroundColor: () => fileState.backgroundColor,
    getFileStorage: () => fileState.fileStorage,
  };
};

export const getLayerState = () => {
  return {
    getSelected: () => layerState.layersSelected,
    getFocused: () => layerState.layerFocused,
    getLayers: () => layerState.layers,
    getLayer: (id: number) => layerState.layers[id],
    onLayersUpdate: (callback: Function) => callback(),
  };
};

(<any>window).layerState = layerState;
(<any>window).fileState = fileState;
