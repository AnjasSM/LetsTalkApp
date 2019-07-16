import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../Screens/Login'
import Register from '../Screens/Register'

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        }
    
    },
    {
        headerMode: "none"
    }
);
  
const AppContainer =createAppContainer(AppNavigator)
export default AppContainer;