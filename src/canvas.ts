import { brushState, getStateBrushRadius, state } from '@scripts/state';
import moveSvg from '@assets/icons/brush/move.svg';
import { rgba2hex } from '@scripts/utils';

const moveSVGImage = new Image(24, 24);
moveSVGImage.src = moveSvg;

if (module.hot) module.hot.accept();

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const offcanvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);
const offctx = offcanvas.getContext('2d',
	{ alpha: true, willReadFrequently: true, colorSpace: 'display-p3', desynchronized: true })!;
const ctx = canvas.getContext('2d',
	{ alpha: true, willReadFrequently: false, colorSpace: 'display-p3', desynchronized: false })!;

export { canvas, ctx };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.imageSmoothingEnabled = false;
offctx.imageSmoothingEnabled = false;

function start_pos_mouse(e: PointerEvent) {
	state.is_drawing = true;
	state.pointer = {
		x: e.clientX,
		y: e.clientY
	};
	draw_mouse(e);
}

function end_pos_mouse() {
	state.is_drawing = false;
	state.pointer = null;
}

function draw_cursor_on_canvas_mouse(e: PointerEvent) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(offcanvas, 0, 0);
	ctx.beginPath();
	const posX = e.x;
	const posY = e.y;
	switch (state.tool) {
	case 'brush':
	default:
		const radius = (getStateBrushRadius() ?? 5) / 2;
		// [point] - recolor each pixel separately
		const pixel = offctx.getImageData(posX, posY, 1, 1).data;
		let hex = rgba2hex(255 - pixel[0], 255 - pixel[1], 255 - pixel[2]);
		if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 0) hex = '#000000';
		ctx.strokeStyle = hex;
		ctx.lineWidth = 2;
		ctx.arc(posX, posY, radius, 0, Math.PI * 2);
		ctx.stroke();
		// [point] - make it possible to turn off in settings
		// if brush size too small
		if (radius < 5) {
			ctx.beginPath();
			ctx.arc(posX, posY, 15, 0, Math.PI * 2);
			ctx.lineWidth = 1;
			ctx.stroke();
		}
		break;
	case 'move':
		ctx.drawImage(moveSVGImage, posX - 8, posY - 8, 16, 16);
		break;
	}
}

function draw_mouse(e: PointerEvent) {
	if (!state.is_drawing) return draw_cursor_on_canvas_mouse(e);
	if (!state.pointer) return;
	if (state.tool !== 'brush') return;

	const events = e.getCoalescedEvents();
	events.forEach((e) => {
		const new_point = {
			x: e.clientX,
			y: e.clientY
		};
		offctx.beginPath();
		offctx.moveTo(state.pointer!.x, state.pointer!.y);
		offctx.lineTo(new_point.x, new_point.y);
		offctx.strokeStyle = state.color;
		offctx.lineWidth = getStateBrushRadius();
		offctx.lineCap = brushState.pencil.cap;
		offctx.stroke();
		state.pointer = new_point;
	});
	draw_cursor_on_canvas_mouse(e);
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

canvas.addEventListener('pointerdown', start_pos_mouse);
// canvas.addEventListener('wheel', canvas_zoom);
// window.addEventListener('resize', canvas_resize, false);
document.addEventListener('pointerup', end_pos_mouse);
document.addEventListener('pointermove', draw_mouse);
