import React from 'react';

type props = {
	value: boolean;
	callback: () => void
}

function SettingBoolean(v: props) {
	return (
		<button
			title={'Click to ' + (v.value === true ? 'disable' : 'enable')}
			onClick={v.callback}
			className={'setting-bool-btn ' + (v.value === true ? ' setting-enabled' : 'setting-disabled')}>
			{v.value === true ? 'Enabled' : 'Disabled'}
		</button>);
}

export default SettingBoolean;
