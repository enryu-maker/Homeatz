import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from '../pages/customer/screens/Onboard';
import Login from '../pages/customer/screens/Login';
import Register from '../pages/customer/screens/Register';
import {
  getBannerAction,
  getLocation,
  getPopularAction,
} from '../../store/actions';
import { Platform, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import Home from '../pages/customer/screens/Home';
import Tab from './Tab';
import ChefInfo from '../pages/customer/screens/ChefInfo';
import FoodInfo from '../pages/customer/screens/FoodInfo';
import Cart from '../pages/customer/screens/Cart';
import Search from '../pages/customer/screens/Search';
import AboutScreen from '../constants/About';
import Contact from '../constants/Contact';
import Data from '../constants/Data';
import Faq from '../constants/Faq';
import Terms from '../constants/Terms';
const Stack = createNativeStackNavigator();
export default function HomeNav() {
  const dispatch = useDispatch();
  const location = JSON.stringify(
    useSelector(state => state.Reducers.location),
  );
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    dispatch(getLocation(setLoading, Platform.OS));
    dispatch(getBannerAction());
    dispatch(getPopularAction(JSON.parse(location)));
  }, []);
  const config = {
    screens: {
      ChefInfo: 'chefinfo/:id',
      FoodInfo: 'foodinfo/:id',
    },
  };

  const linking = {
    prefixes: ['https://homeatz.in', 'homeatz://'],
    config,
  };

  if (loading) {
    return (
      <View className=" flex-1 justify-center bg-white items-center text-logoPink">
        <ActivityIndicator size={'large'} color={'#bc3061'} />
        <Text className=" text-lg text-darkGrey text-center font-suseR">
          Fetching Your Current Location
        </Text>
      </View>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => {
          return {
            detachPreviousScreen: !navigation.isFocused(),
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'default' : 'slide_from_right',
            onTransitionStart: () => Keyboard.dismiss(),
          };
        }}
        initialRouteName={'Drawer'}>
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Tab" component={Tab} />
        <Stack.Screen name="ChefInfo" component={ChefInfo} />
        <Stack.Screen name="FoodInfo" component={FoodInfo} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Data" component={Data} />
        <Stack.Screen name="FAQ" component={Faq} />
        <Stack.Screen name="Terms" component={Terms} />

      </Stack.Navigator>
    );
  }
}
