import { StyleSheet, View, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackParamList } from '../App';
import { useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButon';
import { GlobalStyles } from '../constants/styles';
import { addExpense, deleteExpense, updateExpense } from '../store/expenses';
import { useAppDispatch } from '../store/hooks/useStore';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { useState } from 'react';
import Loading from '../components/ui/Loading';
import produce from 'immer';
import {
    postExpense as dbPostExpense,
    updateExpense as dbUpdateExpense,
    deleteExpense as dbDeleteExpense,
} from '../helpers/http';

export type Props = NativeStackScreenProps<
    NativeStackParamList,
    'ManageExpense'
>;

const ManageExpense = ({ route, navigation }: Props) => {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const deleteExpenseHandler = async (expenseId: string) => {
        try {
            setLoading((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft = true;
                    return draft;
                });
                return nextState;
            });
            await dbDeleteExpense(expenseId);
            dispatch(deleteExpense({ expenseId }));
        } catch (error) {
            if (error instanceof Error)
                Alert.alert('Delete Operation failed', error.message);
            else Alert.alert('Delete Operation failed', 'Something went wrong');
        } finally {
            setLoading((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft = false;
                    return draft;
                });
                return nextState;
            });
        }

        navigation.goBack();
    };

    const cancelExpenseHandler = () => {
        navigation.goBack();
    };

    const confirmExpenseHandler = async (expense: TExpense) => {
        if (isEditing) {
            try {
                setLoading((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = true;
                        return draft;
                    });
                    return nextState;
                });
                await dbUpdateExpense(expense);
                dispatch(updateExpense(expense));
            } catch (error) {
                if (error instanceof Error)
                    Alert.alert('Update Operation failed', error.message);
                else
                    Alert.alert(
                        'Update Operation failed',
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
        } else {
            try {
                setLoading((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = true;
                        return draft;
                    });
                    return nextState;
                });
                const result = await dbPostExpense({
                    description: expense.description,
                    date: expense.date,
                    amount: expense.amount,
                });

                dispatch(
                    addExpense({
                        id: result.name,
                        description: expense.description,
                        date: expense.date,
                        amount: expense.amount,
                    })
                );
            } catch (error) {
                if (error instanceof Error)
                    Alert.alert('Add Operation failed', error.message);
                else
                    Alert.alert('Add Operation failed', 'Something went wrong');
            } finally {
                setLoading((prevState) => {
                    const nextState = produce(prevState, (draft) => {
                        draft = false;
                        return draft;
                    });
                    return nextState;
                });
            }
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

    if (loading) return <Loading />;

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
