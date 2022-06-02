import { layerType } from './../../types/layers.d';
import layerVisibleSVG from './../../assets/icons/layers/layerVisible.svg';

const layerDivElementCreate = (layer: layerType, idx: number) => {
  const layerDiv = document.createElement('div');

  layerDiv.id = 'layer' + layer.id;
  layerDiv.tabIndex = 100 + idx;
  layerDiv.classList.add('layer', 'layer-brd-fcs');

  const columnBTN = document.createElement('div');

  columnBTN.classList.add('layer-col');

  const visibilityBTN = document.createElement('button');
  const visibilityImage = document.createElement('img');

  visibilityBTN.classList.add('layer-btn', 'layer-brd-fcs');
  visibilityImage.src = layerVisibleSVG;

  visibilityBTN.appendChild(visibilityImage);

  const WIP_BTN = document.createElement('button');

  WIP_BTN.classList.add('layer-btn', 'layer-brd-fcs');

  columnBTN.appendChild(visibilityBTN);
  columnBTN.appendChild(WIP_BTN);

  layerDiv.appendChild(columnBTN);

  return layerDiv;
};

export default layerDivElementCreate;
