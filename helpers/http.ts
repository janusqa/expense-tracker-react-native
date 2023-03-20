import { databaseURL } from '../constants/env';

export const postExpense = async (expenseData: Omit<TExpense, 'id'>) => {
    const response = await fetch(`${databaseURL}/expenses.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    return data as { name: string };
};

export const fetchAllExpenses = async () => {
    const response = await fetch(`${databaseURL}/expenses.json`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const data = (await response.json()) as {
        [key: string]: Omit<TExpense, 'id'>;
    };

    if (!response.ok) {
        throw new Error('Something went wrong');
    }

    const expenseData = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
    }));

    return expenseData as TExpense[];
};

export const updateExpense = async (expense: TExpense) => {
    return fetch(`${databaseURL}/expenses/${expense.id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: expense.amount,
            date: expense.date,
            description: expense.description,
        }),
    });
};

export const deleteExpense = async (expenseId: string) => {
    return fetch(`${databaseURL}/expenses/${expenseId}.json`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
};
