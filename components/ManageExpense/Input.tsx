import { StyleSheet, View, Text, TextInput } from 'react-native';
import type { TextInputProps } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type Props = {
    label: string;
    textInputConfig?: TextInputProps;
    style?: { [key: string]: string | number };
    error?: string;
};

const Input = ({ label, textInputConfig, style, error }: Props) => {
    const inputStyles =
        textInputConfig && textInputConfig.multiline
            ? [styles.input, styles.inputMultiline]
            : [styles.input];

    return (
        <View style={[styles.inputContainer, style && style]}>
            <Text style={[styles.label, error ? styles.errorLabel : null]}>
                {label}
            </Text>
            <TextInput
                style={[inputStyles, error ? styles.errorInput : null]}
                {...textInputConfig}
            />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    errorLabel: {
        color: GlobalStyles.colors.error500,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700,
    },
    errorInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
});
