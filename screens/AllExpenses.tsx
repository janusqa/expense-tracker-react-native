import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackParamList, BottoTabsParamList } from '../App';
import { useAppSelector } from '../store/hooks/useStore';
import { getAllExpenses, addExpenses } from '../store/expenses';
import { useEffect, useState } from 'react';
import { fetchAllExpenses } from '../helpers/http';
import { useAppDispatch } from '../store/hooks/useStore';
import Loading from '../components/ui/Loading';
import produce from 'immer';
import { Alert } from 'react-native';

export type Props = CompositeScreenProps<
    BottomTabScreenProps<BottoTabsParamList, 'AllExpenses'>,
    NativeStackScreenProps<NativeStackParamList>
>;

const AllExpenses = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const expenses = [...useAppSelector(getAllExpenses)].sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );

    useEffect(function () {
        const fetchExpenses = async () => {
            try {
                setLoading((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = true;
                        return draft;
                    });
                    return nextState;
                });
                const expenses = await fetchAllExpenses();
                dispatch(addExpenses(expenses));
            } catch (error) {
                if (error instanceof Error)
                    Alert.alert('Fetch Operation failed', error.message);
                else
                    Alert.alert(
                        'Fetch Operation failed',
                        'Something went wrong'
                    );
            } finally {
                setLoading((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = false;
                        return draft;
                    });
                    return nextState;
                });
            }
        };
        fetchExpenses();
    }, []);

    if (loading) return <Loading />;

    return (
        <ExpensesOutput
            expenses={expenses}
            expensesPeriod="Total"
            fallbackText="No expenses found!"
        />
    );
};

export default AllExpenses;
