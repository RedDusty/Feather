import React from 'react';
import Layer from './Layer';

type props = {
	l: layerType;
	onDragStartHandler: (e: React.DragEvent<HTMLDivElement>, lid: number) => void;
	mouseOverUPHandler: (e: React.MouseEvent<HTMLDivElement>, lid: number) => void;
	mouseOverDOWNHandler: (e: React.MouseEvent<HTMLDivElement>, lid: number) => void;
	emptyID: number | null;
	setEmptyID: (v: number) => void;
}

function LayerMouseDetect(
	{ l, mouseOverDOWNHandler, mouseOverUPHandler, onDragStartHandler, emptyID, setEmptyID }: props) {
	return <div className='layer layer-mouse'>
		<div className='layer layer-mouse-up' onMouseOver={e => mouseOverUPHandler(e, l.id)}></div>
		<div className='layer layer-mouse-down' onMouseOver={e => mouseOverDOWNHandler(e, l.id)}></div>
		<Layer l={l} onDragStartHandler={onDragStartHandler} emptyID={emptyID} setEmptyID={setEmptyID} />
	</div>;
}

export default LayerMouseDetect;
