interface settingsStateType {
	state: boolean;
}

interface RadiusExtenderType extends settingsStateType {
	brushSize: number;
	extraRadius: number;
}

interface RenderType extends settingsStateType {
	radius: number;
}

type settingsPerformanceSliceType = {
	willReadFrequently: boolean;
	desynchronized: boolean;
	radiusExtender: RadiusExtenderType;
	render: RenderType;
}

type settingsSliceType = {
	performance: settingsPerformanceSliceType;
}

type ValueOf<T> = T[keyof T];

type objAction<T> = {
	k: keyof T;
	v: ValueOf<T>
}
