type brushType = {
	width: number;
	cap: CanvasPathDrawingStyles['lineCap'];
}


type brushesSliceType = {
	pencil: brushType;
}

type brushNameType = keyof brushesSliceType;

type brushWidthType = {
	name: brushNameType;
	width: number;
}
