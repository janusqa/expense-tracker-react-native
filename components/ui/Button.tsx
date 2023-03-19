import { StyleSheet, View, Text, Pressable } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type Props = {
    children: React.ReactNode;
    mode?: 'flat';
    style?: { [key: string]: string | number };
    onPress: () => void;
};

const Button = ({ children, mode, onPress, style }: Props) => {
    return (
        <View style={style && style}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View
                    style={[
                        styles.button,
                        mode && mode === 'flat' && styles.flat,
                    ]}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            mode === 'flat' && styles.flatText,
                        ]}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    },
});
