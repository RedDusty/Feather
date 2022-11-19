import React from 'react';
import ActionButton from '@components/ActionButton';
import layerCreate from '@assets/icons/layers/layerCreate.svg';
import layerDelete from '@assets/icons/layers/layerDelete.svg';

function Layers() {
	return <div className='full'>
		<div className='action-buttons'>
			<ActionButton svg={layerCreate} alt='+' title='Layer create' callback={() => {return;}} />
			<ActionButton svg={layerDelete} alt='-' title='Layer delete' callback={() => {return;}} />
		</div>
		<div>

		</div>
	</div>;
}

export default Layers;
