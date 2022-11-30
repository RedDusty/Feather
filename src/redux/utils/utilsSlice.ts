import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: utilsSliceType = {
	brush_current: 'pencil',
	color: '#000000',
	tool: 'brush',
	view: {
		x: 0,
		y: 0,
		zoom: 1
	}
};

export const utilsSlice = createSlice({
	name: 'state',
	initialState,
	reducers: {
		setBrush: (state, action: PayloadAction<brushNameType>) => {
			state.brush_current = action.payload;
		},
		setTool: (state, action: PayloadAction<toolType>) => {
			state.tool = action.payload;
		},
		setColor: (state, action: PayloadAction<string>) => {
			state.color = action.payload;
		}
	},
});

export const { setBrush, setColor, setTool } = utilsSlice.actions;
export default utilsSlice.reducer;
