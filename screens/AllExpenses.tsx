import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackParamList, BottoTabsParamList } from '../App';
import { useAppSelector } from '../store/hooks/useStore';
import { getAllExpenses } from '../store/expenses';

export type Props = CompositeScreenProps<
    BottomTabScreenProps<BottoTabsParamList, 'AllExpenses'>,
    NativeStackScreenProps<NativeStackParamList>
>;

const AllExpenses = () => {
    const expenses = useAppSelector(getAllExpenses);
    return (
        <ExpensesOutput
            expenses={expenses}
            expensesPeriod="Total"
            fallbackText="No expenses found!"
        />
    );
};

export default AllExpenses;
