import React from 'react';
import ActionButton from '@components/ActionButton';
import PencilSvg from '@assets/icons/brush/pencil.svg';
import MoveSvg from '@assets/icons/brush/move.svg';
import { brushState, setBrushStateSize, setBrushStateTool, setStateColor, state } from '@scripts/state';

function Brush() {
	const [color, setColor] = React.useState(state.color);
	const [size, setSize] = React.useState(brushState[state.brush_current].width);
	const brushPencilHandler = () => {
		state.brush_current = 'pencil';
		setBrushStateTool('brush');
	};
	const moveHandler = () => setBrushStateTool('move');
	const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColor(e.currentTarget.value ?? '#ffffff');
		setStateColor(e.currentTarget.value ?? '#ffffff');
	};
	const sizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const s = e.currentTarget.valueAsNumber < 0 ? 1 : e.currentTarget.valueAsNumber ?? 2;
		setSize(s);
		setBrushStateSize(s);
	};
	const wheelSizeHandler = (e: React.WheelEvent<HTMLInputElement>) => {
		if (e.deltaY > 0) {
			const s = e.currentTarget.valueAsNumber - 1 <= 0 ? 1 : e.currentTarget.valueAsNumber - 1 ?? 2;
			setSize(s);
			setBrushStateSize(s);
		} else if (e.deltaY < 0) {
			const s = e.currentTarget.valueAsNumber + 1 > 250 ? 250 : e.currentTarget.valueAsNumber + 1 ?? 2;
			setSize(s);
			setBrushStateSize(s);
		}
	};

	return <div className='action-buttons'>
		<ActionButton svg={PencilSvg} alt='✎' title='Brush (pencil)' callback={brushPencilHandler} />
		<ActionButton svg={MoveSvg} alt='+' title='Move' callback={moveHandler} />
		{/* [point] - make own color button */}
		<input
			className='action-button'
			title={'Color: ' + state.color}
			type='color'
			id='color-button-input'
			onChange={colorHandler}
			value={color} />
		<input
			className='action-button action-button-width-a'
			title={'Size: ' + brushState[state.brush_current].width}
			type={'number'}
			id='color-button-input'
			onChange={sizeHandler}
			onWheel={wheelSizeHandler}
			value={size} />
	</div>;
}

export default Brush;
