import React from 'react';
import ActionButton from '@components/ActionButton';
import PencilSvg from '@assets/icons/brush/pencil.svg';
import MoveSvg from '@assets/icons/brush/move.svg';
import { setBrushStateTool, setStateColor, state } from '@scripts/state';

function Brush() {
	const [color, setColor] = React.useState(state.color);
	const brushPencilHandler = () => {
		state.brush_current = 'pencil';
		setBrushStateTool('brush');
	};
	const moveHandler = () => setBrushStateTool('move');
	const colorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColor(e.target.value ?? '#ffffff');
		setStateColor(e.target.value);
	};

	return <div className='action-buttons'>
		<ActionButton svg={PencilSvg} alt='✎' title='Brush (pencil)' callback={brushPencilHandler} />
		<ActionButton svg={MoveSvg} alt='+' title='Move' callback={moveHandler} />
		<input
			className='layers-action-button'
			title={'Color: ' + state.color}
			type='color'
			onChange={colorHandler}
			value={color} />
	</div>;
}

export default Brush;
