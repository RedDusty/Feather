type toolType = 'brush' | 'move';

type utilsViewType = {
	zoom: number;
	x: number;
	y: number;
}

type utilsSliceType = {
	brush_current: brushNameType,
	tool: toolType,
	color: string,
	view: utilsViewType
}
