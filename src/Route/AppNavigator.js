import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import FriendList from '../Screens/FriendsList';

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        },
        Home: {
            screen: Home
        },
        FriendList: {
            screen: FriendList
        }
        
    },
    {
        headerMode: "none" 
    }
);
  
const AppContainer = createAppContainer(AppNavigator)
export default AppContainer;