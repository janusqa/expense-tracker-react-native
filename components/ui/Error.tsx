import { StyleSheet, View, Text, Button } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type Props = {
    message: string;
    onConfirm: () => void;
};

const Error = ({ message, onConfirm }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occured!</Text>
            <Text style={[styles.text, styles.message]}>{message}</Text>
            <Button title="Okay" onPress={onConfirm} />
        </View>
    );
};

export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
    },
});
