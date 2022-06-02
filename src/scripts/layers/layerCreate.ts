import { layerTypesType } from '../../types/layers';
import { layerState, fileState, getLayerState } from './../state';

const layerCreate = (layerType: layerTypesType) => {
  let newState = layerState.layers.slice(0);
  layerState.layersSelected = [];
  const layerCVS = new OffscreenCanvas(fileState.width, fileState.height);
  const layerCTX = layerCVS.getContext('2d')!;
  let newPlace = layerState.layerFocused || layerState.layers.length;
  newState.splice(newPlace, 0, {
    cvs: layerCVS,
    ctx: layerCTX,
    isVisible: true,
    locks: {
      isModifying: true,
      isMoving: true,
      isPainting: true,
    },
    mode: 'normal',
    opacity: 1,
    type: layerType,
    x: 0,
    y: 0,
    name: 'Layer' + layerState.nextLayerID,
    id: layerState.nextLayerID,
  });
  layerState.nextLayerID = layerState.nextLayerID + 1;
  layerState.layers = newState;
  getLayerState().onLayersUpdate(() => {});
};

export default layerCreate;
