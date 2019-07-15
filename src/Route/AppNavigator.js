import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../Screens/Home'

const AppNavigator = createStackNavigator(
    {
        Home: {
        screen: Home
        },
    
    },
    {
        headerMode: "none"
    }
);
  
const AppContainer =createAppContainer(AppNavigator)
export default AppContainer;