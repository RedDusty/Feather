import React from 'react';

type props = {
	title: string;
	callback: () => void;
}

function TopBarButton({ title, callback }: props) {
	return <button onClick={callback} className='top-bar-button'>
		{title.toLowerCase()}
	</button>;
}

export default TopBarButton;
