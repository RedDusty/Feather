import React from 'react';

type props = {
	svg?: string;
	alt: string;
	title: string;
	callback: () => void;
}

function ActionButton({ svg, alt, title, callback }: props) {
	return <button onClick={callback} className='layers-action-button' title={title}>
		{svg ? <img src={svg} alt={alt} /> : <p>{alt}</p>}
	</button>;
}

export default ActionButton;
