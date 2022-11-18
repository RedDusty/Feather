import React from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/index.css';
import '@styles/paint.css';
import '@styles/layers.css';
import Main from '@components/Main';

const root = createRoot(document.getElementById('root') as Element);
root.render(<Main />);

if (module.hot) module.hot.accept('./components/Main.tsx', () => {
	root.render(<Main />);
}); 
