import { createContextApp } from '@feather/context';
import render from '@feather/render';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCanvasCallStack, createEventListeners } from '@canvas';

const initialState: settingsSliceType = {
	performance: {
		desynchronized: true,
		willReadFrequently: true,
		radiusExtender: {
			brushSize: 5,
			extraRadius: 15,
			state: false
		},
		render: {
			radius: 50,
			state: false,
		}
	}
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setDesynchronized: state => {
			const value = !state.performance.desynchronized;
			const willReadFrequently = state.performance.willReadFrequently;
			addCanvasCallStack({
				name: 'create',
				function: () => createContextApp({
					alpha: true,
					colorSpace: 'srgb',
					desynchronized: value,
					willReadFrequently: willReadFrequently
				} as CanvasRenderingContext2DSettings, createEventListeners)
			});
			addCanvasCallStack({
				name: 'render',
				function: render
			});
			state.performance.desynchronized = value;
		},
		setWillReadFrequently: state => {
			const value = !state.performance.willReadFrequently;
			const desynchronized = state.performance.desynchronized;
			addCanvasCallStack({
				name: 'create',
				function: () => createContextApp({
					alpha: true,
					colorSpace: 'srgb',
					desynchronized: desynchronized,
					willReadFrequently: value
				} as CanvasRenderingContext2DSettings, createEventListeners)
			});
			addCanvasCallStack({
				name: 'render',
				function: render
			});
			state.performance.willReadFrequently = value;
		},
		setRadiusExtender: (
			state: settingsSliceType,
			action: PayloadAction<objAction<RadiusExtenderType>>) => {
			state.performance.radiusExtender = { ...state.performance.radiusExtender, [action.payload.k]: action.payload.v };
		},
		setRender: (state, action: PayloadAction<objAction<RenderType>>) => {
			state.performance.render = { ...state.performance.render, [action.payload.k]: action.payload.v };
		},
	},
});

export const { setDesynchronized, setRadiusExtender, setRender, setWillReadFrequently } = settingsSlice.actions;
export default settingsSlice.reducer;
