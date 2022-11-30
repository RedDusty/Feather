let cvsAPP: HTMLCanvasElement;
// [point] - add alpha and srgb options
let ctxAPP: CanvasRenderingContext2D;
let cvsUI: HTMLCanvasElement;
let ctxUI: CanvasRenderingContext2D;

const currentSettings: CanvasRenderingContext2DSettings = {
	alpha: true,
	colorSpace: 'srgb',
	desynchronized: false,
	willReadFrequently: true
};

function createContextApp(settings?: CanvasRenderingContext2DSettings, func?: () => void) {
	const contextSettings: CanvasRenderingContext2DSettings = settings ? {
		alpha: settings.alpha ?? true,
		colorSpace: settings.colorSpace ?? 'srgb',
		desynchronized: settings.desynchronized ?? true,
		willReadFrequently: settings.willReadFrequently ?? true
	} : {
		alpha: true,
		colorSpace: 'srgb',
		desynchronized: true,
		willReadFrequently: true
	};
	console.log('created new app context');
	
	if (cvsAPP) cvsAPP.remove();
	cvsAPP = document.createElement('canvas');
	cvsAPP.classList.add('canvas');
	cvsAPP.id = 'cvsAPP';
	cvsAPP.width = window.innerWidth;
	cvsAPP.height = window.innerHeight;
	ctxAPP = cvsAPP.getContext('2d', contextSettings)!;
	ctxAPP.imageSmoothingEnabled = false;
	document.body.appendChild(cvsAPP);
	if (settings &&
		(settings.colorSpace !== currentSettings.colorSpace ||
			settings.desynchronized !== currentSettings.desynchronized)) {
		console.log('created new ui context');
		if(cvsUI) cvsUI.remove();
		cvsUI = document.createElement('canvas');
		cvsUI.classList.add('canvas');
		cvsUI.id = 'cvsUI';
		cvsUI.width = window.innerWidth;
		cvsUI.height = window.innerHeight;
		ctxUI = cvsUI.getContext('2d', {
			alpha: true,
			colorSpace: contextSettings.colorSpace,
			desynchronized: contextSettings.desynchronized,
			willReadFrequently: false
		})!;
		ctxUI.imageSmoothingEnabled = false;
		document.body.appendChild(cvsUI);
	}
	if (func) func();
	if (ctxAPP && ctxAPP.getContextAttributes) {
		console.log('ctxAPP', ctxAPP.getContextAttributes());
	}
	if (ctxUI && ctxUI.getContextAttributes) {
		console.log('ctxUI', ctxUI.getContextAttributes());
	}

	currentSettings.alpha = contextSettings.alpha;
	currentSettings.colorSpace = contextSettings.colorSpace;
	currentSettings.desynchronized = contextSettings.desynchronized;
	currentSettings.willReadFrequently = contextSettings.willReadFrequently;
	
	return { cvsAPP, cvsUI, ctxAPP, ctxUI };
}

createContextApp({ alpha: true, colorSpace: 'srgb', desynchronized: true, willReadFrequently: true });

export { cvsAPP, ctxAPP, cvsUI, ctxUI, createContextApp };
