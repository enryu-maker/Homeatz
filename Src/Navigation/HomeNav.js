import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Tab from '../Screens/Customer/Tab';
import Chef from '../Screens/Customer/CustScrrens/Chef';
import Cart from '../Screens/Customer/Cart';
import Info from '../Screens/Customer/CustScrrens/Info';
import Profile from '../Screens/Customer/CustScrrens/Profile';
import Login from '../Screens/Customer/CustScrrens/Login';
import Signup from '../Screens/Customer/CustScrrens/Signup';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBannerAction,
  getLocation,
  getPopularAction,
} from '../../Store/actions';
import FoodInfo from '../Screens/Customer/CustScrrens/FoodInfo';
import More from '../Constants/More';
import AboutScreen from '../Constants/About';
import Faq from '../Constants/Faq';
import Contact from '../Constants/Contact';
import Terms from '../Constants/Terms';
import Data from '../Constants/Data';
import Address from '../Screens/Customer/CustScrrens/Address';
import OrderHistory from '../Screens/Customer/CustScrrens/OrderHistory';
import AddAddress from '../Screens/Customer/CustScrrens/AddAddress';
import AddLine from '../Screens/Customer/CustScrrens/AddLine';
import MenuInfo from '../Screens/Customer/CustScrrens/MenuInfo';
import Checkout from '../Screens/Customer/CustScrrens/Checkout';
import Payment from '../Screens/Customer/CustScrrens/Payment';
import VerifyChef from '../Screens/Customer/CustScrrens/VerifyChef';
import OrderPlaced from '../Screens/Customer/CustScrrens/OrderPlaced';
import OrderInfo from '../Screens/Customer/CustScrrens/OrderInfo';
import Cancel from '../Screens/Customer/CustScrrens/Cancel';
import Reset from '../Screens/Customer/CustScrrens/Reset';
import Forgot from '../Screens/Customer/CustScrrens/Forgot';
import Delete from '../Screens/Customer/CustScrrens/Delete';
import {ActivityIndicator} from 'react-native-paper';

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
      <View className="flex-1 justify-center items-center h-full bg-white">
        {' '}
        {/* Add bg-white if you want a background */}
        <ActivityIndicator size="large" className=" text-logoPink" />
        <Text className="mt-2 text-lg font-balsamiq text-darkGrey">
          Fetching Your Current Location
        </Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={({navigation}) => {
            return {
              detachPreviousScreen: !navigation.isFocused(),
              headerShown: false,
              animation: Platform.OS == 'ios' ? 'simple_push' : 'simple_push',
              onTransitionStart: () => Keyboard.dismiss(),
            };
          }}>
          <Stack.Screen name="Main" component={Tab} />
          <Stack.Screen name="Chef" component={Chef} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="ChefInfo" component={Info} />
          <Stack.Screen name="FoodInfo" component={FoodInfo} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Signin" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="MoreInfo" component={More} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="FAQ" component={Faq} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Data" component={Data} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen name="AddLine" component={AddLine} />
          <Stack.Screen name="MenuInfo" component={MenuInfo} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Verify" component={VerifyChef} />
          <Stack.Screen name="Placed" component={OrderPlaced} />
          <Stack.Screen name="Cancel" component={Cancel} />
          <Stack.Screen name="OrderInfo" component={OrderInfo} />
          <Stack.Screen name="Reset" component={Reset} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Delete" component={Delete} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
