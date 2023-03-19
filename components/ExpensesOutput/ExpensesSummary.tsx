import { StyleSheet, View, Text, FlatList } from 'react-native/';
import { TExpense } from '../../data/espenses';
import { GlobalStyles } from '../../constants/styles';

type Props = {
    expensesPeriod: string;
    expenses: TExpense[];
};

const ExpensesSummary = ({ expenses, expensesPeriod }: Props) => {
    const expensesSum = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{expensesPeriod}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    },
});
