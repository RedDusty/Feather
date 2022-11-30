import React from 'react';
import Layer from '@components/layers/Layer';
import { useAppSelector } from '@redux/store';

function LayersRender() {
	const layers = useAppSelector((s) => s.layers.layers);
	return <div className='layers-render'>
		{layers.length === 0 ? <p className='layers-no'>No layers</p> : <></>}
		{layers.map((l, idx) => {
			return <Layer l={l} key={idx} />;
		})}
	</div>;
}

export default LayersRender;
