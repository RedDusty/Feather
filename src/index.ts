import { getLayerState } from './scripts/state';
import layerCreate from './scripts/layers/layerCreate';
import './styles/index.css';
import './styles/paint.css';
import './styles/layers.css';
import layerDivElementCreate from './scripts/layers/layerDivElement';

const layersSection = document.querySelector('#layersSection') as HTMLDivElement;
const layerCreateBTN = document.querySelector('#layerCreate') as HTMLButtonElement;
const layerDeleteBTN = document.querySelector('#layerDelete') as HTMLButtonElement;

const layerRasterCreateHandler = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  layerCreate('raster');
  updateLayersSection();
};

const layerDeleteHandler = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  layerCreate('raster');
  updateLayersSection();
};

if (layerCreateBTN) layerCreateBTN.addEventListener('click', layerRasterCreateHandler);
if (layerDeleteBTN) layerDeleteBTN.addEventListener('click', layerDeleteHandler);
if (layerCreateBTN) layerCreateBTN.addEventListener('touchstart', layerRasterCreateHandler);
if (layerDeleteBTN) layerDeleteBTN.addEventListener('touchstart', layerDeleteHandler);

const updateLayersSection = () => {
  if (layersSection) {
    layersSection.innerHTML = '';
    getLayerState()
      .getLayers()
      .forEach((layer, idx) => {
        layersSection.appendChild(layerDivElementCreate(layer, idx));
      });
  }
};
