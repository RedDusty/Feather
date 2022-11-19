type brushType = {
	width: number;
	cap: CanvasPathDrawingStyles['lineCap'];
}

type brushStateType = {
	pencil: brushType
}

export const brushState: brushStateType = {
	pencil: {
		width: 10,
		cap: 'round',
	}
};

export const state = {
	brush_current: 'pencil',
	tool: 'brush',
	is_drawing: false
};
