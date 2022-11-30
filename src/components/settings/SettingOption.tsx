import React from 'react';
import SettingBoolean from '@components/settings/utils/SettingBoolean';
import SettingNumber from '@components/settings/utils/SettingNumber';

type propsDefault = {
	name: string;
	desc: string | string[];
}

interface propsBoolean extends propsDefault {
	value: boolean;
	callback: () => void;
	type: 'boolean';
}

interface propsNumber extends propsDefault {
	value: number;
	label: string;
	k: string;
	callback: (obj: objAction<any>) => void;
	type: 'number';
}

interface propsString extends propsDefault {
	value: string;
	callback: (v: string) => void;
	type: 'string';
}

interface propsChildren extends propsDefault {
	children: React.ReactNode;
	type: 'custom'
}

type props = propsBoolean | propsNumber | propsString | propsChildren

function SettingOption(props: props) {
	return <div className='setting'>
		<div className='setting-option'>
			<p className='setting-name'>{props.name}</p>
			<div className='setting-option-buttons'>
				{props.type === 'boolean' ?
					<SettingBoolean
						callback={props.callback}
						value={props.value} /> : <></>}
				{props.type === 'number' ?
					<SettingNumber
						callback={props.callback}
						k={props.k}
						value={props.value}
						label={props.label} /> : <></>}
				{props.type === 'custom' ? props.children : <></>}
			</div>
		</div>
		<div className='setting-description'>
			{Array.isArray(props.desc) ? <>
				<p className='setting-description-solo'>{props.desc[0]}</p>
				<ul className='setting-description-list'>
					{props.desc.slice(1).map((t, idx) => {
						return <li key={'p' + t + idx}>{t}</li>;
					})}
				</ul>
			</> : <></>}
			{typeof props.desc === 'string' ?
				<p className='setting-description-solo'>
					{props.desc}
				</p> : <></>}
		</div>
	</div>;
}

export default SettingOption;
