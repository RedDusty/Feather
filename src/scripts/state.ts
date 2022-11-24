export const brushState: brushStateType = {
	pencil: {
		width: 2,
		cap: 'round',
	}
};

export const state: stateType = {
	brush_current: 'pencil',
	tool: 'brush',
	is_drawing: false,
	color: '#000000',
	view: {
		zoom: 1,
		x: 0,
		y: 0
	},
	pointer: null
};

export const setBrushStateTool = (tool: toolType) =>	state.tool = tool;

export const getStateBrushRadius = () => brushState[state.brush_current].width;

export const setStateColor = (hex: string) => state.color = hex;

export const setBrushStateSize = (size: number) => brushState[state.brush_current].width = size;
