import React from 'react';
import layerVisibleSVG from '@assets/icons/layers/layerVisible.svg';
import layerInvisibleSVG from '@assets/icons/layers/layerInvisible.svg';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { selectLayer, setFocusedID } from '@redux/layers/layersSlice';

function Layer({ l }: { l: layerType }) {
	const layersState = useAppSelector(s => s.layers);
	const dispatch = useAppDispatch();
	const onClickHandler = (e: React.MouseEvent) => {
		if (e.ctrlKey === false && e.shiftKey === false) {
			dispatch(setFocusedID(l.id));
		} else if (e.ctrlKey || e.shiftKey){
			dispatch(selectLayer({ id: l.id, isCTRL: e.ctrlKey, isSHIFT: e.shiftKey }));
		}
	};
	return <div
		className={'layer' +
			(layersState.layersSelectedID.includes(l.id) ? ' layer-sel' : '') +
			(layersState.layerFocusedID === l.id ? ' layer-foc' : '')}
		onClick={onClickHandler}
		tabIndex={100 + l.id}>
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
