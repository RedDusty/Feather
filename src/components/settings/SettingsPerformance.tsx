import React from 'react';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { setDesynchronized, setRadiusExtender, setRender, setWillReadFrequently } from '@redux/settings/settingsSlice';
import performanceJSON from '@assets/json/settings/performance.json';
import SettingOption from '@components/settings/SettingOption';
import SettingBoolean from '@components/settings/utils/SettingBoolean';
import SettingNumber from '@components/settings/utils/SettingNumber';

function SettingsPerformance() {
	const performance = useAppSelector((s) => s.settings.performance);
	const dispatch = useAppDispatch();
	const desynchronizedHandler = () => {
		dispatch(setDesynchronized());
	};
	const willReadFrequentlyHandler = () => {
		dispatch(setWillReadFrequently());
	};
	const renderHandler = (obj: objAction<RenderType>) => {
		dispatch(setRender(obj));
	};
	const radiusExtenderHandler = (obj: objAction<RadiusExtenderType>) => {
		dispatch(setRadiusExtender(obj));
	};

	return <div className='settings-options'>
		<SettingOption
			desc={performanceJSON.desynchronized}
			name='Desynchronized'
			type='boolean'
			value={performance.desynchronized}
			callback={desynchronizedHandler}
		/>
		<SettingOption
			desc={performanceJSON.willReadFrequently}
			name='Will Read Frequently'
			type='boolean'
			value={performance.willReadFrequently}
			callback={willReadFrequentlyHandler}
		/>
		<SettingOption
			desc={performanceJSON.render}
			name='Render'
			type='custom'
		>
			<>
				<SettingNumber
					callback={renderHandler}
					value={performance.render.radius}
					label={'Radius'}
					k={'radius'}
				/>
				<SettingBoolean
					callback={() => renderHandler({ k: 'state', v: !performance.render.state })}
					value={performance.render.state}
				/>
			</>
		</SettingOption>
		<SettingOption
			desc={performanceJSON.radiusExtender}
			name='Radius Extender'
			type='custom'
		>
			<>
				<SettingBoolean
					callback={() => radiusExtenderHandler({ k: 'state', v: !performance.radiusExtender.state })}
					value={performance.radiusExtender.state}
				/>
				<div className='setting-buttons'>
					<SettingNumber
						callback={radiusExtenderHandler}
						value={performance.radiusExtender.extraRadius}
						label={'Extra radius'}
						k={'extraRadius'}
					/>
					<SettingNumber
						callback={radiusExtenderHandler}
						value={performance.radiusExtender.brushSize}
						label={'Brush size'}
						k={'brushSize'}
					/>
				</div>
			</>
		</SettingOption>

	</div>;
}

export default SettingsPerformance;
