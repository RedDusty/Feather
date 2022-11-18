import { fileStateType } from '@typings/file';
import { layerStateType } from '@typings/layers';

export const layerState: layerStateType = {
	layersSelectedID: [],
	layerFocusedID: null,
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
		getSelectedID: () => layerState.layersSelectedID,
		getFocusedID: () => layerState.layerFocusedID,
		getLayers: () => layerState.layers,
		getLayer: (id: number) => layerState.layers[id],
		onLayersUpdate: (callback: () => void) => callback(),
	};
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).layerState = layerState;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).fileState = fileState;
