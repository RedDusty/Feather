import { brushState, state } from '@scripts/state';

if (module.hot) module.hot.accept();

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const offcanvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);
const offctx = offcanvas.getContext('2d')!;
const ctx = canvas.getContext('2d')!;

export { canvas, ctx };
export default ctx;

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

function draw(e: MouseEvent) {
	if (!state.is_drawing) return;
	if (state.tool !== 'brush') return;

	offctx.lineWidth = brushState.pencil.width;
	offctx.lineCap = brushState.pencil.cap;
	offctx.lineTo(e.clientX, e.clientY);
	offctx.stroke();
	offctx.beginPath();
	offctx.moveTo(e.clientX, e.clientY);
	ctx.drawImage(offcanvas, 0, 0);
}

// function canvas_resize() {
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	offcanvas.width = window.innerWidth;
// 	offcanvas.height = window.innerHeight;
// 	ctx.drawImage(offcanvas, 0, 0);
// }

canvas.addEventListener('mousedown', start_pos);
// window.addEventListener('resize', canvas_resize, false);
document.addEventListener('mouseup', end_pos);
document.addEventListener('mousemove', draw);
