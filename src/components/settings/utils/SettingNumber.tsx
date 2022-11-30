import React from 'react';

type props = {
	callback: (obj: objAction<any>) => void;
	value: number;
	label: string;
	k: string
}

function SettingNumber<T>({ callback, label, value, k }: props) {
	const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
		callback({ k, v: e.currentTarget.valueAsNumber });
	};
	return <div className='setting-num'>
		<input type="number" id="spr" value={value} onChange={handler} className='setting-num-btn' />
		<label htmlFor="spr" className='setting-num-label'>{label}</label>
	</div>;
}

export default SettingNumber;
