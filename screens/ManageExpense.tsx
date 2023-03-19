import { StyleSheet, View, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackParamList } from '../App';
import { useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButon';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { addExpense, deleteExpense, updateExpense } from '../store/expenses';
import { useAppDispatch } from '../store/hooks/useStore';
import { TExpense } from '../data/espenses';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export type Props = NativeStackScreenProps<
    NativeStackParamList,
    'ManageExpense'
>;

const ManageExpense = ({ route, navigation }: Props) => {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const dispatch = useAppDispatch();

    const deleteExpenseHandler = (expenseId: string) => {
        dispatch(deleteExpense({ expenseId }));
        navigation.goBack();
    };

    const cancelExpenseHandler = () => {
        navigation.goBack();
    };

    const confirmExpenseHandler = (expense: TExpense) => {
        if (isEditing) {
            dispatch(updateExpense(expense));
        } else {
            dispatch(
                addExpense({
                    description: expense.description,
                    date: expense.date,
                    amount: expense.amount,
                })
            );
        }
        navigation.goBack();
    };

    useLayoutEffect(
        function () {
            // this is the alternative way to setting options for a route
            // instead of add them to options prop back in parent component
            navigation.setOptions({
                title: isEditing ? 'Edit Expense' : 'Add Expense',
            });
        },
        [isEditing]
    );

    return (
        <View style={styles.container}>
            <ExpenseForm
                expenseId={expenseId}
                isEditing={isEditing}
                onCancel={cancelExpenseHandler}
                onSubmit={confirmExpenseHandler}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={() => deleteExpenseHandler(expenseId)}
                    />
                </View>
            )}
        </View>
    );
};

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});
