import { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import produce from 'immer';
import Input from './Input';
import Button from '../ui/Button';
import { TExpense } from '../../data/espenses';
import { useAppSelector } from '../../store/hooks/useStore';
import { getExpenseById } from '../../store/expenses';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { REGEX_DATE, REGEX_NUMBER } from '../../constants/regex';
import { GlobalStyles } from '../../constants/styles';

type Props = {
    expenseId?: string;
    isEditing: boolean;
    onCancel: () => void;
    onSubmit: (expense: TExpense) => void;
};

const submitDataSchema = z.object({
    id: z.string(),
    amount: z
        .string()
        .min(1, { message: 'Amount should not be empty' })
        .regex(REGEX_NUMBER, {
            message: 'Amount should be a number greater than 0',
        }),
    date: z.string().regex(REGEX_DATE, {
        message: 'Date should be of the form "YYYY-MM-DD"',
    }),
    description: z
        .string()
        .trim()
        .min(1, { message: 'Description should not be empty' }),
});

type TSubmitDataSchema = z.infer<typeof submitDataSchema>;

type TFormData = {
    data: TSubmitDataSchema;
    errors: { [key in keyof TSubmitDataSchema]?: string };
};

const ExpenseForm = ({ expenseId, isEditing, onCancel, onSubmit }: Props) => {
    // use a paramatized selector to calculate data for expense slice
    // fully reusable every where
    const expense = expenseId
        ? useAppSelector((state) => getExpenseById(state, { id: expenseId }))
        : undefined;

    const [formData, setFormData] = useState<TFormData>(() => {
        const initialFormData =
            isEditing && expense
                ? {
                      id: expenseId ?? '',
                      amount: expense.amount.toString(),
                      date: expense.date,
                      description: expense.description,
                  }
                : { id: '', amount: '', date: '', description: '' };
        return { data: initialFormData, errors: {} };
    });

    const inputChangedHandler = (
        inputIdentifier: keyof typeof formData.data,
        enteredValue: string
    ) => {
        setFormData((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft.data[inputIdentifier] = enteredValue;
            });
            return nextState;
        });
    };

    const processFormErrors = (errors: typeof formData.errors = {}) => {
        setFormData((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft.errors = errors;
            });
            return nextState;
        });
    };

    const submitHandler = (data: TSubmitDataSchema, checkAll = false) => {
        const submittedData = submitDataSchema.safeParse(data);

        if (!submittedData.success) {
            const errors: typeof formData.errors = {};
            submittedData.error.errors.forEach((error) => {
                const field = error.path[0] as keyof TSubmitDataSchema;
                if (field) {
                    errors[field] = error.message;
                }
            });
            processFormErrors(errors);
            // const error = fromZodError(submittedData.error, {
            //     prefix: '',
            //     prefixSeparator: '',
            //     issueSeparator: '\n',
            //     maxIssuesInMessage: 1,
            // });
            // Alert.alert('Invalid input', error.message);
        } else {
            processFormErrors();
            onSubmit({
                ...submittedData.data,
                amount: parseFloat(submittedData.data.amount),
            });
        }
    };

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    textInputConfig={{
                        value: formData.data.amount,
                        keyboardType: 'decimal-pad',
                        onChangeText: (enteredValue) =>
                            inputChangedHandler('amount', enteredValue),
                    }}
                    error={formData.errors.amount}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        value: formData.data.date,
                        onChangeText: (enteredValue) =>
                            inputChangedHandler('date', enteredValue),
                    }}
                    error={formData.errors.date}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    // autoCorrect:true,
                    // autoCapitilize: 'sentences'
                    value: formData.data.description,
                    onChangeText: (enteredValue) =>
                        inputChangedHandler('description', enteredValue),
                }}
                error={formData.errors.description}
            />
            <View style={styles.buttons}>
                <Button style={styles.button} mode="flat" onPress={onCancel}>
                    Cancel
                </Button>
                <Button
                    style={styles.button}
                    onPress={() =>
                        submitHandler(
                            {
                                id: isEditing && expenseId ? expenseId : '',
                                description: formData.data.description,
                                amount: formData.data.amount,
                                date: formData.data.date,
                            },
                            true
                        )
                    }
                >
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
            {Object.keys(formData.errors).length > 0 && (
                <View style={styles.errorTextContainer}>
                    {Object.values(formData.errors).map((errorMsg, index) => (
                        <Text style={styles.errorText} key={index}>
                            {errorMsg}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorTextContainer: {
        margin: 8,
    },
    errorText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
    },
});
