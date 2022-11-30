import { layersNodes } from '@canvas';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: layersSliceType = {
	layerFocusedID: null,
	layers: [],
	layersSelectedID: [],
	nextLayerID: 0
};

export const layersSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		addLayer: (state) => {
			const cvs = new OffscreenCanvas(window.innerWidth, window.innerHeight);
			const ctx = cvs.getContext('2d',
				{ alpha: true, willReadFrequently: false, colorSpace: 'srgb', desynchronized: false })!;
			ctx.imageSmoothingEnabled = false;
			const layerID = state.nextLayerID;
			const place = state.layers.findIndex((l) => l.id === state.layerFocusedID);
			layersNodes.push({
				cvs, ctx, id: layerID, isVisible: true
			});
			state.layers.splice(place, 0, {
				isVisible: true,
				id: layerID,
				locks: {
					isModifying: false, isMoving: false, isPainting: true
				},
				mode: 'normal',
				name: 'Layer' + layerID,
				opacity: 1,
				type: 'raster',
				x: 0,
				y: 0,
			});
			state.layerFocusedID = layerID;
			state.layersSelectedID = [layerID];
			state.nextLayerID = layerID + 1;
		},
		setFocusedID: (state, action: PayloadAction<number>) => {
			state.layerFocusedID = action.payload;
			state.layersSelectedID = [action.payload];
		},
		selectLayer: (state, action: PayloadAction<layersSliceSelectType>) => {
			if (action.payload.isCTRL && action.payload.isSHIFT === false) {
				if (state.layersSelectedID.includes(action.payload.id)) {
					if (state.layerFocusedID === action.payload.id) {
						if (state.layersSelectedID.length !== 1) {
							state.layersSelectedID = state.layersSelectedID.filter((l) => l !== action.payload.id);
							state.layerFocusedID = state.layersSelectedID[state.layersSelectedID.length - 1];
						}
					} else state.layersSelectedID = state.layersSelectedID.filter((l) => l !== action.payload.id);
				} else state.layersSelectedID.push(action.payload.id);
			} else if (action.payload.isCTRL === false && action.payload.isSHIFT) {
				const focID = state.layers.findIndex((l) => l.id === state.layerFocusedID);
				const selID = state.layers.findIndex((l) => l.id === action.payload.id);
				let selIDs: number[] = [];
				if (selID > focID) {
					selIDs = state.layers.slice(focID, selID + 1).map((l) => l.id);
				} else {
					selIDs = state.layers.slice(selID, focID).map((l) => l.id);
				}
				state.layersSelectedID = selIDs;
			}
		}
	},
});

export const { addLayer, setFocusedID, selectLayer } = layersSlice.actions;
export default layersSlice.reducer;
