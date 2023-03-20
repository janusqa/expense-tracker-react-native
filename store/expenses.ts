import { TRootState } from './configureStore';
import {
    createSlice,
    createSelector,
    PayloadAction,
    CaseReducer,
} from '@reduxjs/toolkit';

type TSliceState = {
    expenseList: TExpense[];
};

// no longer used.  just here for historical purposes
// and for education
// const getInitialStateOld = (): TSliceState => {
//     return {
//         expenseList: DUMMY_EXPENSES.map((expense) => {
//             const expenseShadow: {
//                 id: string;
//                 amount: number;
//                 description: string;
//                 date: string;
//             } = { id: '', amount: 0, description: '', date: '' };
//             Object.entries(expense).forEach(([key, value]) => {
//                 if (key !== 'date')
//                     // Record<typeof key, typeof value> OR {[key:string]: typeof value}
//                     // example:  (expenseShadow as Record<typeof key, typeof value>)[key] = value;
//                     // example:  (expenseShadow as {[key:string]: typeof value})[key] = value;
//                     (expenseShadow as Record<typeof key, typeof value>)[key] =
//                         value;
//                 else expenseShadow[key] = (value as Date).toISOString();
//             });
//             return expenseShadow;
//         }),
//     };
// };

const getInitialState = (): TSliceState => ({ expenseList: [] });

const expenseAddedReducer: CaseReducer<TSliceState, PayloadAction<TExpense>> = (
    expenses,
    action
) => {
    const { id, amount, date, description } = action.payload;
    expenses.expenseList.push({
        id,
        description,
        amount,
        date,
    });
};

const expensesAddedReducer: CaseReducer<
    TSliceState,
    PayloadAction<TExpense[]>
> = (expenses, action) => {
    const expenseList = action.payload;
    expenses.expenseList = expenseList;
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
        expensesAdded: expensesAddedReducer,
        expenseUpdated: expenseUpdatedReducer,
        expenseDeleted: expenseDeletedReducer,
    },
});

const { expenseAdded, expensesAdded, expenseUpdated, expenseDeleted } =
    slice.actions;

// reducer
export default slice.reducer;

// actions
export const addExpenses = (expenses: TExpense[]) => expensesAdded(expenses);
export const addExpense = (expense: TExpense) => expenseAdded(expense);
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
