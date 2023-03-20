import { StyleSheet, FlatList } from 'react-native/';
import ExpenseItem from './ExpenseItem';

type Props = {
    expenses: TExpense[];
};

const ExpensesList = ({ expenses }: Props) => {
    return (
        <FlatList
            data={expenses}
            renderItem={(ExpenseObject) => (
                <ExpenseItem expense={ExpenseObject.item} />
            )}
            keyExtractor={(expense) => expense.id}
        />
    );
};

export default ExpensesList;

const styles = StyleSheet.create({});
