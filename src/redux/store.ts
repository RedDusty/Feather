import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import settingsSlice from '@redux/settings/settingsSlice';
import brushesSlice from '@redux/brushes/brushesSlice';
import utilsSlice from '@redux/utils/utilsSlice';
import layersSlice from '@redux/layers/layersSlice';

const rootReducer = combineReducers({
	settings: settingsSlice,
	brushes: brushesSlice,
	utils: utilsSlice,
	layers: layersSlice
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(<any>window).store = store;

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
