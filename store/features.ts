import { combineReducers } from '@reduxjs/toolkit';
import expensessReducer from './expenses';

const reducer = combineReducers({
    expenses: expensessReducer,
});

export default reducer;
