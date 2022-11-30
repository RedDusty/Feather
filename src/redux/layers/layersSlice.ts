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
			const place = state.layerFocusedID || state.layers.length;
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
			state.nextLayerID = layerID + 1;
		},
		setFocusedID: (state, action: PayloadAction<number>) => {
			state.layerFocusedID = action.payload;
		}
	},
});

export const { addLayer, setFocusedID } = layersSlice.actions;
export default layersSlice.reducer;
