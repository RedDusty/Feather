import React from 'react';
import layerVisibleSVG from '@assets/icons/layers/layerVisible.svg';
import layerInvisibleSVG from '@assets/icons/layers/layerInvisible.svg';
import { useAppDispatch, useAppSelector } from '@redux/store';
import {
	selectLayer,
	setFocusedID,
} from '@redux/layers/layersSlice';

type props = {
	l: layerType;
	onDragStartHandler: (e: React.DragEvent<HTMLDivElement>, lid: number) => void;
	emptyID: number | null;
	setEmptyID: (v: number) => void;
}

function Layer({ l, onDragStartHandler, emptyID, setEmptyID }: props) {
	const ls = useAppSelector(s => s.layers);
	const dispatch = useAppDispatch();
	const onClickHandler = (e: React.MouseEvent) => {
		if (e.ctrlKey === false && e.shiftKey === false) {
			dispatch(setFocusedID(l.id));
		} else if (e.ctrlKey || e.shiftKey){
			dispatch(selectLayer({ id: l.id, isCTRL: e.ctrlKey, isSHIFT: e.shiftKey }));
		}
	};
	return (
		<div className={'layer-cols' +
			(ls.layersSelectedID.includes(l.id) ? ' layer-sel' : '') +
			(ls.layerFocusedID === l.id ? ' layer-foc' : '')}
		onClick={onClickHandler}
		onDragStart={e => onDragStartHandler(e, l.id)}
		onDragOver={(e) => {
			if (emptyID !== l.id) setEmptyID(l.id);
			e.preventDefault();
			e.stopPropagation();
		}}
		onDragEnterCapture={e => e.currentTarget.classList.add('layer-replaced')}
		onDragLeaveCapture={e => e.currentTarget.classList.remove('layer-replaced')}
		tabIndex={100 + l.id}
		id={'layer' + l.id}
		draggable={true}>
			<div className='layer-col'>
				<button className='layer-button'>
					<img src={l.isVisible ? layerVisibleSVG : layerInvisibleSVG} alt="" />
				</button>
			</div>
			<div className='layer-col'>
				<p className='layer-name'>{l.name}</p>
				<p className='layer-opacity'>{(l.opacity * 100).toFixed(0) + '%'}</p>
			</div>
		</div>);
}

export default Layer;
