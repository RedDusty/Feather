import { layersNodes } from '@canvas';
import { ctxAPP } from '@feather/context';
import { store } from '@redux/store';

type renderAreaType = {
	posX: number;
	posY: number;
}

// [point] make redraw area better
function render(area?: renderAreaType) {
	layersNodes.forEach((l) => {
		if (l.isVisible === true) {
			// ctxAPP.save();
			// ctxAPP.globalAlpha = l.opacity;
			const renderRadius = store.getState().settings.performance.render;
			if (area && renderRadius.state !== false) {
				ctxAPP.putImageData(
					l.ctx.getImageData(
						area.posX - renderRadius.radius,
						area.posY - renderRadius.radius,
						renderRadius.radius * 2,
						renderRadius.radius * 2),
					area.posX, area.posY);
			} else {
				ctxAPP.drawImage(l.cvs, 0, 0);
			}
			// ctxAPP.restore();
		}
	});
}

export default render;
