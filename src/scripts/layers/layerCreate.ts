import { fileState, getLayerState, layerState } from '@scripts/state';
import { layerTypesType } from '@typings/layers';

const layerCreate = (layerType: layerTypesType) => {
	const newState = layerState.layers.slice(0);
	layerState.layersSelectedID = [];
	const layerCVS = new OffscreenCanvas(fileState.width, fileState.height);
	const layerCTX = layerCVS.getContext('2d')!;
	const newPlace = layerState.layerFocusedID || layerState.layers.length;
	const layerID = layerState.nextLayerID;
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
		name: 'Layer' + layerID,
		id: layerID,
	});
	layerState.layerFocusedID = layerID;
	layerState.nextLayerID = layerID + 1;
	layerState.layers = newState;
	getLayerState().onLayersUpdate(() => {
		return;
	});
};

export default layerCreate;
