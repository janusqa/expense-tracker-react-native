export type TExpense = {
    id: string;
    description: string;
    amount: number;
    date: string;
};

export const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19'),
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-01-05'),
    },

    {
        id: 'e3',
        description: 'Some Bananas',
        amount: 5.99,
        date: new Date('2022-12-01'),
    },
    {
        id: 'e4',
        description: 'A Book',
        amount: 15.99,
        date: new Date('2023-03-12'),
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2023-03-18'),
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19'),
    },
    {
        id: 'e7',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-01-05'),
    },

    {
        id: 'e8',
        description: 'Some Bananas',
        amount: 5.99,
        date: new Date('2022-12-01'),
    },
    {
        id: 'e9',
        description: 'A Book',
        amount: 14.99,
        date: new Date('2023-03-13'),
    },
    {
        id: 'e10',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2023-03-16'),
    },
];
