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
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }
}
