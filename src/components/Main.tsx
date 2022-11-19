import React from 'react';
import Layers from '@components/layers/Layers';
import ActionBorder from '@components/ActionBorder';
import Brush from '@components/brush/Brush';

function Main() {
	return <div>
		<React.StrictMode>
			<ActionBorder>
				<Layers />
			</ActionBorder>
			<ActionBorder>
				<Brush />
			</ActionBorder>
		</React.StrictMode>
	</div>;
}

export default Main;
