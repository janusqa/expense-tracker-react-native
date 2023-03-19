import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import reducer from './reducer';

export type TRootState = ReturnType<typeof reducer>;

const customMiddlewares = [];
const initilizeStore = (preloadedState?: PreloadedState<TRootState>) =>
    configureStore({
        reducer: reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(customMiddlewares),
        preloadedState,
        devTools: true ? false : true,
    });

type StoreType = ReturnType<typeof initilizeStore>;

export type AppDispatchType = StoreType['dispatch'];

export default initilizeStore;
