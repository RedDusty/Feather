import React from 'react';

type props = {
	svg: string;
	alt: string;
	callback: () => void;
}

function LayersAction({ svg, alt, callback }: props) {
	return <button onClick={callback} className='layers-action-button'>
		{svg ? <img src={svg} alt={alt} /> : <p>{alt}</p>}
	</button>;
}

export default LayersAction;
