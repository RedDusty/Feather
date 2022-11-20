import { brushState, getBrushRadius, state } from '@scripts/state';
import moveSvg from '@assets/icons/brush/move.svg';

const moveSVGImage = new Image(24, 24);
moveSVGImage.src = moveSvg;

if (module.hot) module.hot.accept();

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const offcanvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);
const offctx = offcanvas.getContext('2d',
	{ willReadFrequently: true, alpha: true, colorSpace: 'display-p3', desynchronized: true })!;
const ctx = canvas.getContext('2d',
	{ willReadFrequently: false, alpha: true, colorSpace: 'display-p3', desynchronized: true })!;

export { canvas, ctx };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function start_pos(e: MouseEvent) {
	state.is_drawing = true;
	draw(e);
}

function end_pos() {
	state.is_drawing = false;
	offctx.beginPath();
}

function draw_cursor_on_canvas(e: MouseEvent) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(offcanvas, 0, 0);
	ctx.beginPath();
	const posX = e.x;
	const posY = e.y;
	switch (state.tool) {
	case 'brush':
	default:
		const radius = (getBrushRadius() ?? 5) / 2;
		// [point] - maybe need another method
		// const pixel = offctx.getImageData(posX, posY, 1, 1).data;
		// let hex = rgba2hex(255 - pixel[0], 255 - pixel[1], 255 - pixel[2]);
		// if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 0) hex = '#000000';
		ctx.arc(posX, posY, radius, 0, Math.PI * 2);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
		ctx.globalCompositeOperation = 'xor';
		ctx.stroke();
		break;
	case 'move':
		ctx.drawImage(moveSVGImage, posX - 8, posY - 8, 16, 16);
		break;
	}
}

function draw(e: MouseEvent) {
	if (!state.is_drawing) return draw_cursor_on_canvas(e);
	if (state.tool !== 'brush') return;

	offctx.lineWidth = getBrushRadius();
	offctx.lineCap = brushState.pencil.cap;
	offctx.strokeStyle = state.color;
	offctx.lineTo(e.clientX, e.clientY);
	offctx.stroke();
	offctx.beginPath();
	offctx.moveTo(e.clientX, e.clientY);
	ctx.drawImage(offcanvas, 0, 0);
	draw_cursor_on_canvas(e);
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

canvas.addEventListener('mousedown', start_pos);
// canvas.addEventListener('wheel', canvas_zoom);
// window.addEventListener('resize', canvas_resize, false);
document.addEventListener('mouseup', end_pos);
document.addEventListener('mousemove', draw);
