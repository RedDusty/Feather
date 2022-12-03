import React from 'react';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { moveLayer } from '@redux/layers/layersSlice';
import Layer from '@components/layers/Layer';
import LayerMovable from '@components/layers/LayerMovable';
import LayerEmpty from '@components/layers/LayerEmpty';
import LayerMouseDetect from '@components/layers/LayerMouseDetect';
import render from '@feather/render';

function LayersRender() {
	const [movingID, setMovingID] = React.useState<number | null>(null);
	const [emptyID, setEmptyID] = React.useState<number | null>(null);
	const [updownempty, setUpdownEmpty] = React.useState<'up' | 'down' | null>(null);
	const [offsetTop, setOffsetTop] = React.useState<number>(0);
	const ls = useAppSelector((s) => s.layers);
	const dispatch = useAppDispatch();
	const mouseMoveLayerHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		// .layer-render offset 51 ||| to make center 21 (half of .layer height)
		setOffsetTop(e.clientY - 51 - 21);
	};
	const mouseOverUPHandler = (e: React.MouseEvent<HTMLDivElement>, lid: number) => {
		setUpdownEmpty('up');
		if (emptyID !== lid) setEmptyID(lid);
	};
	const mouseOverDOWNHandler = (e: React.MouseEvent<HTMLDivElement>, lid: number) => {
		setUpdownEmpty('down');
		if (emptyID !== lid) setEmptyID(lid);
	};
	const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>, lid: number) => {
		e.preventDefault();
		e.stopPropagation();
		if (ls.layers.length > 1) { 
			setMovingID(lid);
		}
	};
	const onMouseUPHandler = () => {
		if (movingID && emptyID) {
			dispatch(moveLayer({
				layerDraggedID: movingID,
				layerReplacedID: emptyID
			}));
			setEmptyID(null);
			setMovingID(null);
			render();
		}
	};
	return <div
		className='layers-render'
		onMouseMove={mouseMoveLayerHandler}
		onMouseUp={onMouseUPHandler}
		onMouseLeave={onMouseUPHandler}>
		{ls.layers.length === 0 ? <p className='layers-no'>No layers</p> : <></>}
		{ls.layers.map((l) => {
			if (movingID !== null) {
				if (l.id === movingID) {
					return <LayerMovable
						l={l}
						offsetTop={offsetTop}
						onDragStartHandler={onDragStartHandler}
						emptyID={emptyID}
						setEmptyID={setEmptyID}
						key={l.id} />;
				}
				if (l.id === emptyID) {
					return <React.Fragment key={l.id}>
						{updownempty === 'up' ? <LayerEmpty /> : <></>}
						<LayerMouseDetect
							l={l}
							onDragStartHandler={onDragStartHandler}
							mouseOverUPHandler={mouseOverUPHandler}
							mouseOverDOWNHandler={mouseOverDOWNHandler}
							emptyID={emptyID}
							setEmptyID={setEmptyID}
						/>
						{updownempty === 'down' ? <LayerEmpty /> : <></>}
					</React.Fragment>;
				}
				return <LayerMouseDetect
					key={l.id} l={l}
					mouseOverUPHandler={mouseOverUPHandler}
					mouseOverDOWNHandler={mouseOverDOWNHandler}
					onDragStartHandler={onDragStartHandler}
					emptyID={emptyID}
					setEmptyID={setEmptyID} />;
			}
			return <div key={'divl' + l.id}>
				<Layer
					l={l}
					key={l.id}
					onDragStartHandler={onDragStartHandler}
					emptyID={emptyID}
					setEmptyID={setEmptyID} />
			</div>;
		})}
	</div>;
}

export default LayersRender;
