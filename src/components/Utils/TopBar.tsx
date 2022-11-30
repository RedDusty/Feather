import React from 'react';
import TopBarButton from '@components/Utils/TopBarButton';

type props = {
	setSettingsOpen: (v: boolean) => void
}

function TopBar({ setSettingsOpen }: props) {
	const settingsHandler = () => {
		setSettingsOpen(true);
	};
	return <div className='top-bar'>
		<TopBarButton title='settings' callback={settingsHandler} />
	</div>;
}

export default TopBar;
