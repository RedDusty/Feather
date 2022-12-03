import React from 'react';

function LayerEmpty() {
	return (<div
		className='layer layer-cols layer-empty'
		onDragEnterCapture={e => {
			e.currentTarget.children[0].classList.add('layer-replaced');
		}}
		onDragLeaveCapture={e => {
			e.currentTarget.children[0].classList.remove('layer-replaced');
		}}
		onDragStart={e => {
			e.preventDefault();
			e.stopPropagation();
		}}
		draggable={true}>
	</div>);
}

export default LayerEmpty;
