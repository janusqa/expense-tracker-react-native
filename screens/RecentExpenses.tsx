import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackParamList, BottoTabsParamList } from '../App';
import { useAppSelector } from '../store/hooks/useStore';
import { getAllExpenses } from '../store/expenses';
import { getDateMinusDays } from '../helpers/date';

export type Props = CompositeScreenProps<
    BottomTabScreenProps<BottoTabsParamList, 'RecentExpenses'>,
    NativeStackScreenProps<NativeStackParamList>
>;

const RecentExpenses = () => {
    const recentExpenses = useAppSelector(getAllExpenses).filter((expense) => {
        const today = new Date();
        const expenseDate = new Date(expense.date);
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expenseDate >= date7DaysAgo && expenseDate <= today;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText="No expenses registered for the last 7 days!"
        />
    );
};

export default RecentExpenses;
