import React from 'react';
import layerVisibleSVG from '@assets/icons/layers/layerVisible.svg';
import layerInvisibleSVG from '@assets/icons/layers/layerInvisible.svg';

function Layer({ l }: {l: layerType}) {
	return <div className='layer'>
		<div className='layer-col'>
			<button className='layer-button'>
				<img src={l.isVisible ? layerVisibleSVG : layerInvisibleSVG} alt="" />
			</button>
		</div>
		<div className='layer-col'>
			<p className='layer-name'>{l.name}</p>
			<p className='layer-opacity'>{(l.opacity * 100).toFixed(0) + '%'}</p>
		</div>
	</div>;
}

export default Layer;
