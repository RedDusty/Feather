import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: brushesSliceType = {
	pencil: {
		width: 5,
		cap: 'round'
	}
};

export const brushesSlice = createSlice({
	name: 'brushes',
	initialState,
	reducers: {
		setWidth: (state, action: PayloadAction<brushWidthType>) => {
			state[action.payload.name].width = action.payload.width < 1 ? 1 : action.payload.width;
		}
	},
});

export const { setWidth } = brushesSlice.actions;
export default brushesSlice.reducer;
