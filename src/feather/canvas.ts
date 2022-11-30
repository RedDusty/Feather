import { store } from '@redux/store';
import moveSVG from '@assets/icons/brush/move.svg';
import { rgba2hex } from '@scripts/utils';
import render from '@feather/render';
import { ctxAPP, ctxUI, cvsUI } from '@feather/context';
import { layersNodes } from '@canvas';

const moveSVGImage = new Image(24, 24);
moveSVGImage.src = moveSVG;

type pointerType = {
	x: number;
	y: number;
}

let is_drawing = false;
let pointer: pointerType | null = null;

function start_pos_mouse(e: PointerEvent) {
	is_drawing = true;
	pointer = {
		x: e.clientX,
		y: e.clientY
	};
	draw_mouse(e);
}

function end_pos_mouse() {
	is_drawing = false;
	pointer = null;
}

function draw_cursor_on_canvas_mouse(e: PointerEvent) {
	const posX = e.x;
	const posY = e.y;
	const state = store.getState();
	switch (state.utils.tool) {
	case 'brush':
	default:
		const radius = (state.brushes[state.utils.brush_current].width ?? 5) / 2;
		ctxUI.clearRect(0, 0, cvsUI.width, cvsUI.height);
		ctxUI.beginPath();
		// [point] - recolor each pixel separately
		const pixel = ctxAPP.getImageData(posX, posY, 1, 1).data;
		let hex = rgba2hex(255 - pixel[0], 255 - pixel[1], 255 - pixel[2]);
		if (pixel[0] == 0 && pixel[1] == 0 && pixel[2] == 0 && pixel[3] == 0) hex = '#000000';
		ctxUI.strokeStyle = hex;
		ctxUI.lineWidth = 2;
		ctxUI.arc(posX, posY, radius, 0, Math.PI * 2);
		ctxUI.stroke();
		// if brush size too small
		if (state.settings.performance.radiusExtender.state !== false) {
			if (radius < state.settings.performance.radiusExtender.brushSize) {
				ctxUI.beginPath();
				ctxUI.arc(posX, posY, state.settings.performance.radiusExtender.extraRadius, 0, Math.PI * 2);
				ctxUI.lineWidth = 1;
				ctxUI.stroke();
			}
		}
		break;
	case 'move':
		ctxAPP.drawImage(moveSVGImage, posX - 8, posY - 8, 16, 16);
		break;
	}
}

function draw_mouse(e: PointerEvent) {
	if (!is_drawing) return draw_cursor_on_canvas_mouse(e);
	if (!pointer) return;
	const state = store.getState();
	if (state.utils.tool !== 'brush') return;
	if (state.layers.layers.length === 0) return;
	if (state.layers.layerFocusedID === null) return;

	const events = e.getCoalescedEvents();
	events.forEach((e) => {
		const new_point = {
			x: e.clientX,
			y: e.clientY
		};
		layersNodes[state.layers.layerFocusedID!].ctx.beginPath();
		layersNodes[state.layers.layerFocusedID!].ctx.moveTo(pointer!.x, pointer!.y);
		layersNodes[state.layers.layerFocusedID!].ctx.lineTo(new_point.x, new_point.y);
		layersNodes[state.layers.layerFocusedID!].ctx.strokeStyle = state.utils.color;
		layersNodes[state.layers.layerFocusedID!].ctx.lineWidth = state.brushes[state.utils.brush_current].width;
		layersNodes[state.layers.layerFocusedID!].ctx.lineCap = state.brushes[state.utils.brush_current].cap;
		layersNodes[state.layers.layerFocusedID!].ctx.stroke();
		pointer = new_point;
	});
	draw_cursor_on_canvas_mouse(e);
	render({ posX: e.clientX, posY: e.clientY });
}

export { start_pos_mouse, draw_mouse, end_pos_mouse };
