import { TRootState } from './configureStore';
import {
    createSlice,
    createSelector,
    PayloadAction,
    CaseReducer,
} from '@reduxjs/toolkit';
import { TExpense } from '../data/espenses';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
import { DUMMY_EXPENSES } from '../data/espenses';

type TSliceState = {
    expenseList: TExpense[];
};

const getInitialState = (): TSliceState => {
    return {
        expenseList: DUMMY_EXPENSES.map((expense) => {
            const expenseShadow: {
                id: string;
                amount: number;
                description: string;
                date: string;
            } = { id: '', amount: 0, description: '', date: '' };
            Object.entries(expense).forEach(([key, value]) => {
                if (key !== 'date')
                    // Record<typeof key, typeof value> OR {[key:string]: typeof value}
                    // example:  (expenseShadow as Record<typeof key, typeof value>)[key] = value;
                    // example:  (expenseShadow as {[key:string]: typeof value})[key] = value;
                    (expenseShadow as Record<typeof key, typeof value>)[key] =
                        value;
                else expenseShadow[key] = (value as Date).toISOString();
            });
            return expenseShadow;
        }),
    };
};

const expenseAddedReducer: CaseReducer<
    TSliceState,
    PayloadAction<{ description: string; amount: number; date: string }>
> = (expenses, action) => {
    const { description, amount, date } = action.payload;
    expenses.expenseList.push({
        id: nanoid(),
        description,
        amount,
        date: date,
    });
};

const expenseUpdatedReducer: CaseReducer<
    TSliceState,
    PayloadAction<TExpense>
> = (expenses, action) => {
    const { id, description, amount, date } = action.payload;
    const expenseToUpdate = expenses.expenseList.findIndex(
        (expense) => expense.id === id
    );
    expenses.expenseList[expenseToUpdate].amount = amount;
    expenses.expenseList[expenseToUpdate].description = description;
    expenses.expenseList[expenseToUpdate].date = date;
};

const expenseDeletedReducer: CaseReducer<
    TSliceState,
    PayloadAction<{ expenseId: string }>
> = (expenses, action) => {
    const { expenseId } = action.payload;
    expenses.expenseList = expenses.expenseList.filter(
        (expense) => expense.id !== expenseId
    );
};

const slice = createSlice({
    name: 'expenses',
    initialState: getInitialState(),
    reducers: {
        expenseAdded: expenseAddedReducer,
        expenseUpdated: expenseUpdatedReducer,
        expenseDeleted: expenseDeletedReducer,
    },
});

const { expenseAdded, expenseUpdated, expenseDeleted } = slice.actions;

// reducer
export default slice.reducer;

// actions
export const addExpense = (expense: {
    description: string;
    amount: number;
    date: string;
}) => expenseAdded(expense);
export const updateExpense = (expense: TExpense) => expenseUpdated(expense);
export const deleteExpense = (expenseId: { expenseId: string }) =>
    expenseDeleted(expenseId);

// selectors

//*** paramatized queries */
type ParameterSelector<T> = (_: TRootState, params: T) => T[keyof T];

const createParameterSelector = <T>(
    selector: (params: T) => T[keyof T]
): ParameterSelector<T> => {
    return (_, params) => selector(params);
};

// can query slice data on params
const getExpensIdParam: ParameterSelector<{ id: string }> =
    createParameterSelector((params) => params.id);

// To call this in a component see example directly below
// -> const expense = useAppSelector((state) =>
// -> getExpenseById(state, { id: expenseId })
// -> );
//*** paramatized queries */

export const getAllExpenses = createSelector(
    (store: TRootState) => store.features.expenses,
    (expenses) => expenses.expenseList
);

export const getExpenseById = createSelector(
    [
        (store: TRootState) => store.features.expenses.expenseList,
        getExpensIdParam, // put each param as a seperate input selector
    ],
    (expenses, expenseId) =>
        expenses.find((expense) => expense.id === expenseId) // this is the output selector
);
