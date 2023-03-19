import { combineReducers } from '@reduxjs/toolkit';
import featuresReducer from './features';

const reducer = combineReducers({ features: featuresReducer });

export default reducer;
