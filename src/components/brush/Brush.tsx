import React from 'react';
import ActionButton from '@components/Utils/ActionButton';
import PencilSvg from '@assets/icons/brush/pencil.svg';
// import MoveSvg from '@assets/icons/brush/move.svg';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { setBrush, setColor } from '@redux/utils/utilsSlice';
import { setWidth } from '@redux/brushes/brushesSlice';

function Brush() {
	const state = useAppSelector(s => s);
	const dispatch = useAppDispatch();
	const [localColor, setLocalColor] = React.useState(state.utils.color);
	const brushPencilHandler = () => {
		dispatch(setBrush('pencil'));
	};
	const colorMoveHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalColor(e.currentTarget.value ?? '#ffffff');
		dispatch(setColor(e.currentTarget.value ?? '#ffffff'));
	};
	const sizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const s = e.currentTarget.valueAsNumber < 0 ? 1 : e.currentTarget.valueAsNumber ?? 2;
		dispatch(setWidth({
			name: state.utils.brush_current,
			width: s
		}));
	};
	const wheelSizeHandler = (e: React.WheelEvent<HTMLInputElement>) => {
		if (e.deltaY > 0) {
			const s = e.currentTarget.valueAsNumber - 1 <= 0 ? 1 : e.currentTarget.valueAsNumber - 1 ?? 2;
			dispatch(setWidth({
				name: state.utils.brush_current,
				width: s
			}));
		} else if (e.deltaY < 0) {
			const s = e.currentTarget.valueAsNumber + 1 > 250 ? 250 : e.currentTarget.valueAsNumber + 1 ?? 2;
			dispatch(setWidth({
				name: state.utils.brush_current,
				width: s
			}));
		}
	};

	return <div className='action-buttons section'>
		<ActionButton svg={PencilSvg} alt='✎' title='Brush (pencil)' callback={brushPencilHandler} />
		{/* <ActionButton svg={MoveSvg} alt='+' title='Move' callback={moveHandler} /> */}
		{/* [point] - make own color button */}
		<input
			className='action-button'
			title={'Color: ' + state.utils.color}
			type='color'
			id='color-button-input'
			onChange={colorMoveHandler}
			value={localColor} />
		<input
			className='action-button action-button-width-a'
			title={'Size: ' + state.brushes[state.utils.brush_current].width}
			type={'number'}
			id='color-button-input'
			onChange={sizeHandler}
			onWheel={wheelSizeHandler}
			value={state.brushes[state.utils.brush_current].width} />
	</div>;
}

export default Brush;
