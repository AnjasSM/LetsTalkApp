import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import FriendsList from '../Screens/FriendsList';
import AuthLoadingScreen from '../Screens/Loading';
import UserProfile from '../Screens/UserProfile';

const AppStack = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        FriendsList: {
            screen: FriendsList
        },
        UserProfile: {
            screen: UserProfile
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home'
    }
);

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        },
    },
    {
        headerMode: 'none'
    }
)

export default createAppContainer(createSwitchNavigator (
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
))

