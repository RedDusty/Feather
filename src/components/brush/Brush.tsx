import React from 'react';
import ActionButton from '@components/ActionButton';
import PencilSvg from '@assets/icons/brush/pencil.svg';
import MoveSvg from '@assets/icons/brush/move.svg';
import { changeTool, state } from '@scripts/state';

function Brush() {
	return <div className='action-buttons'>
		<ActionButton svg={PencilSvg} alt='✎' title='Brush (pencil)' callback={
			() => { state.brush_current = 'pencil'; changeTool('brush'); }
		} />
		<ActionButton svg={MoveSvg} alt='+' title='Move' callback={() => { changeTool('move'); }} />
	</div>;
}

export default Brush;
