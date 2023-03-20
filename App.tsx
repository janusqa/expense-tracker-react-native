import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import initilizeStore from './store/configureStore';
import {
    NavigationContainer,
    NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/ui/IconButon';
import { useNavigation } from '@react-navigation/native';
import { Props as ManageExpenseScreenProps } from './screens/ManageExpense';

export type NativeStackParamList = {
    ManageExpense: { expenseId?: string };
    ExpensesOverview: NavigatorScreenParams<BottoTabsParamList>;
};

export type BottoTabsParamList = {
    AllExpenses: undefined;
    RecentExpenses: undefined;
};

const Stack = createNativeStackNavigator<NativeStackParamList>();
const Tabs = createBottomTabNavigator<BottoTabsParamList>();
const store = initilizeStore();

const ExpensesOverviewTabs = () => {
    const navigation = useNavigation<ManageExpenseScreenProps['navigation']>();
    return (
        <Tabs.Navigator
            initialRouteName="RecentExpenses"
            screenOptions={{
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                // to set color of icon displayed headerRight receves automatic props of which one is tintColor which is the color we set in headerTintColor above
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={24}
                        color={tintColor!}
                        onPress={() => {
                            navigation.navigate('ManageExpense', {});
                        }}
                    />
                ),
            }}
        >
            <Tabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="ExpensesOverview"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.colors.primary500,
                        },
                        headerTintColor: 'white',
                    }}
                >
                    <Stack.Screen
                        name="ExpensesOverview"
                        component={ExpensesOverviewTabs}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                        options={{ presentation: 'modal' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
