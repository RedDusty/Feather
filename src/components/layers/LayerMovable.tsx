import React from 'react';
import Layer from '@components/layers/Layer';

type props = {
	l: layerType;
	onDragStartHandler: (e: React.DragEvent<HTMLDivElement>, lid: number) => void;
	offsetTop: number;
	emptyID: number | null;
	setEmptyID: (v: number) => void;
}

function LayerMovable({ l, offsetTop, onDragStartHandler, emptyID, setEmptyID }: props) {
	return <div className='layer'
		style={{ top: offsetTop, position: 'absolute', zIndex: 1, pointerEvents: 'none', opacity: 0.75 }}>
		<Layer l={l} onDragStartHandler={onDragStartHandler} emptyID={emptyID} setEmptyID={setEmptyID} />
	</div>;
}

export default LayerMovable;
