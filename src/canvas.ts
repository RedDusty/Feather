import { draw_mouse, end_pos_mouse, start_pos_mouse } from '@feather/canvas';
import { ctxUI, cvsUI } from '@feather/context';

if (module.hot) module.hot.accept();

export const layersNodes: layersNodes[] = [];

export const canvasCallStack: canvasCallStackType[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).canvasCallStack = canvasCallStack;

export function addCanvasCallStack(v: canvasCallStackType) {
	const idx = canvasCallStack.findIndex((p) => p.name === v.name);
	if (idx !== -1) {
		canvasCallStack.splice(idx, 1, v);
	} else {
		canvasCallStack.push(v);
	}
}

export function emptyCanvasCallStack() {
	canvasCallStack.splice(0, canvasCallStack.length);
}

// function canvas_resize() {
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	offcanvas.width = window.innerWidth;
// 	offcanvas.height = window.innerHeight;
// 	ctx.drawImage(offcanvas, 0, 0);
// }

// function canvas_zoom(e: WheelEvent) {
// 	const { x, y, deltaY } = e;
// 	const dir = deltaY > 0 ? -1 : 1;
// 	const factor = 0.01;
// 	const zoom = 1 * dir * factor;

// 	const wx = (x-state.view.x)/(2*state.view.zoom);
// 	const wy = (y-state.view.y)/(2*state.view.zoom);

// 	state.view.x -= wx * 2 * zoom;
// 	state.view.y -= wy * 2 * zoom;
// 	state.view.zoom += zoom;
// }

export function createEventListeners() {
	if (ctxUI) {
		cvsUI.addEventListener('pointerdown', start_pos_mouse);
	}
}

createEventListeners();

// canvas.addEventListener('wheel', canvas_zoom);
// window.addEventListener('resize', canvas_resize, false);
document.addEventListener('pointerup', end_pos_mouse);
document.addEventListener('pointermove', draw_mouse);
