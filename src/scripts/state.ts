type brushType = {
	width: number;
	cap: CanvasPathDrawingStyles['lineCap'];
}

type brushStateType = {
	pencil: brushType
}

type toolType = 'brush' | 'move';

type stateViewType = {
	zoom: number;
	x: number;
	y: number;
}

type stateType = {
	brush_current: 'pencil',
	tool: toolType,
	is_drawing: boolean,
	color: string,
	view: stateViewType
}

export const brushState: brushStateType = {
	pencil: {
		width: 10,
		cap: 'round',
	}
};

export function changeTool(tool: toolType) {
	state.tool = tool;
}

export const state: stateType = {
	brush_current: 'pencil',
	tool: 'brush',
	is_drawing: false,
	color: '#000000',
	view: {
		zoom: 1,
		x: 0,
		y: 0
	}
};

export function getBrushRadius() {
	return brushState[state.brush_current].width;
}
