import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
type Props = {
    icon: IoniconName;
    size: number;
    color: string;
    onPress: () => void;
};

const IconButton = ({ icon, size, color, onPress }: Props) => {
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={onPress}
        >
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.75,
    },
});
