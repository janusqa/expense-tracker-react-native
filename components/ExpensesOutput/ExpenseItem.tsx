import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TExpense } from '../../data/espenses';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../helpers/date';
import { useNavigation } from '@react-navigation/native';
import { Props as ManageExpenseScreenProps } from '../../screens/ManageExpense';

type Props = {
    expense: TExpense;
};

const ExpenseItem = ({ expense: { id, description, date, amount } }: Props) => {
    const navigation = useNavigation<ManageExpenseScreenProps['navigation']>();
    const expensePressHandler = () => {
        navigation.navigate('ManageExpense', { expenseId: id });
    };

    return (
        <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={expensePressHandler}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(new Date(date))}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        padingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    },
    pressed: {
        opacity: 0.75,
    },
});