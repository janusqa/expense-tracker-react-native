import { StyleSheet, View, Text } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { TExpense } from '../../data/espenses';
import { GlobalStyles } from '../../constants/styles';

type Props = {
    expenses: TExpense[];
    expensesPeriod: string;
    fallbackText: string;
};

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }: Props) => {
    const content =
        expenses.length > 0 ? (
            <ExpensesList expenses={expenses} />
        ) : (
            <Text style={styles.infoText}>{fallbackText}</Text>
        );

    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expenses}
                expensesPeriod={expensesPeriod}
            />
            {content}
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});
