import React from 'react';
import { hot } from 'react-hot-loader';
import Layers from '@components/layers/Layers';
import ActionBorder from '@components/Utils/ActionBorder';
import Brush from '@components/brush/Brush';
import Settings from '@components/settings/Settings';
import TopBar from '@components/Utils/TopBar';
import { Provider } from 'react-redux';
import { store } from '@redux/store';

function Main() {
	const [isSettingsOpen, setSettingsOpen] = React.useState(false);

	return <div>
		<React.StrictMode>
			<Provider store={store}>
				<TopBar setSettingsOpen={setSettingsOpen} />
				<ActionBorder>
					<Layers />
				</ActionBorder>
				<ActionBorder>
					<Brush />
				</ActionBorder>
				<Settings isSettingsOpen={isSettingsOpen} setSettingsOpen={setSettingsOpen} />
			</Provider>
		</React.StrictMode>
	</div>;
}

export default hot(module)(Main);
