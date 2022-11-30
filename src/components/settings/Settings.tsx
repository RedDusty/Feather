import React from 'react';
import '@assets/styles/settings.css';
import closeSVG from '@assets/icons/close.svg';
import SettingsPerformance from '@components/settings/SettingsPerformance';
import { canvasCallStack, emptyCanvasCallStack } from '@canvas';

type props = {
	isSettingsOpen: boolean;
	setSettingsOpen: (v: boolean) => void;
}

const settingsCategories = ['performance'];

function Settings({ isSettingsOpen, setSettingsOpen }: props) {
	const [category, setCategory] = React.useState(settingsCategories[0]);
	const [isCallStack, setCallStack] = React.useState(false);
	if (isSettingsOpen === false) return <></>;

	const closeHandler = () => {
		if (canvasCallStack.length !== 0) {
			setCallStack(true);
			for (let idx = 0; idx < canvasCallStack.length; idx++) {
				canvasCallStack[idx].function();
			}
			emptyCanvasCallStack();
			setCallStack(false);
		}
		setSettingsOpen(false);
	};

	const categoryHandler = (c: string) => () => {
		setCategory(c);
	};

	return <div className={isCallStack ? 'settings-block settings-wait' : 'settings-block'}>
		<div className='settings-modal'>
			<div className='settings-top'>
				<p className={isCallStack ? 'settings-top-name-anim' : 'settings-top-name'}>
					{isCallStack ? 'Applying changes...' : 'Settings'}
				</p>
				<button className='settings-top-button' title='Close' onClick={closeHandler}>
					<img src={closeSVG} alt="+" />
				</button>
			</div>
			<div className='settings'>
				<div className='settings-categories'>
					{settingsCategories.map((v, idx) => {
						return <button
							key={idx}
							className={
								'settings-category ' + ((v === category) ? 'settings-category-active ' : '')}
							title={v}
							onClick={categoryHandler(v)}>
							{v}
						</button>;
					})}
				</div>
				<div className='settings-menu'>
					{
						category === 'performance' ? <SettingsPerformance /> : <></>
					}
				</div>
			</div>
		</div>
	</div>;
}

export default Settings;
