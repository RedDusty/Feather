import { layerType } from '@typings/layers';
import layerVisibleSVG from '@assets/icons/layers/layerVisible.svg';
import layerClipSVG from '@assets/icons/layers/layerClip.svg';
import { layerState } from '@scripts/state';

const layerDivElementCreate = (layer: layerType, idx: number) => {
	const layerDiv = document.createElement('div');

	layerDiv.id = 'layer' + layer.id;
	layerDiv.tabIndex = 100 + idx;
	layerDiv.classList.add('layer');
	if (idx === layerState.layerFocusedID) {
		layerDiv.classList.add('layer-focused');
	}

	const columnBTN = document.createElement('div');
	columnBTN.classList.add('layer-col');

	const visibilityBTN = document.createElement('button');
	const visibilityImage = document.createElement('img');

	visibilityBTN.classList.add('layer-button');
	if (idx === layerState.layerFocusedID) {
		visibilityBTN.classList.add('layer-focused');
	}
	visibilityImage.src = layerVisibleSVG;
	visibilityBTN.appendChild(visibilityImage);

	const WIP_BTN = document.createElement('button');
	const WIP_BTN_IMG = document.createElement('img');

	WIP_BTN.classList.add('layer-button');
	if (idx === layerState.layerFocusedID) {
		WIP_BTN.classList.add('layer-focused');
	}

	WIP_BTN_IMG.src = layerClipSVG;
	WIP_BTN.appendChild(WIP_BTN_IMG);

	columnBTN.appendChild(visibilityBTN);
	columnBTN.appendChild(WIP_BTN);

	layerDiv.appendChild(columnBTN);

	const columnText = document.createElement('div');
	columnText.classList.add('layer-col');

	const layerName = document.createElement('p');
	layerName.classList.add('layer-name');
	layerName.innerText = 'layer' + layer.id;

	const layerOpacity = document.createElement('p');
	layerOpacity.classList.add('layer-opacity');
	layerOpacity.innerText = (layer.opacity * 100).toFixed(0) + '%';

	columnText.appendChild(layerName);
	columnText.appendChild(layerOpacity);

	layerDiv.appendChild(columnText);

	return layerDiv;
};

export default layerDivElementCreate;
