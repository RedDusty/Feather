import React from 'react';
import ActionBorder from '@components/ActionBorder';
import LayersAction from '@components/layers/LayersAction';
import layerCreate from '@assets/icons/layers/layerCreate.svg';
import layerDelete from '@assets/icons/layers/layerDelete.svg';

function Layers() {
	return <ActionBorder>
		<div className='layer-action-buttons'>
			<LayersAction svg={layerCreate} alt='+' callback={() => {return;}} />
			<LayersAction svg={layerDelete} alt='-' callback={() => {return;}} />
		</div>
		<div>

		</div>
	</ActionBorder>;
}

export default Layers;
