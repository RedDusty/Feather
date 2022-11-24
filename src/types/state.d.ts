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

type pointerType = {
	x: number;
	y: number;
}

type stateType = {
	brush_current: 'pencil',
	tool: toolType,
	is_drawing: boolean,
	color: string,
	view: stateViewType
	pointer: pointerType | null
}
