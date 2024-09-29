import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Tab from '../Screens/Home/Chef/Tab';
import Profile from '../Screens/Home/Chef/ChefScreen/Profile';
import OrderInfo from '../Screens/Home/Chef/ChefScreen/OrderInfo';
import AddDish from '../Screens/Home/Chef/ChefScreen/AddDish';
import OrderHistory from '../Screens/Home/Chef/ChefScreen/OrderHistory';
import ChefProfile from '../Screens/Home/Chef/ChefScreen/ChefProfile';
import EditMenu from '../Screens/Home/Chef/ChefScreen/EditMenu';
import {useDispatch} from 'react-redux';
import {
  GetChefOrders,
  getCatType,
  getDealType,
  getLocation,
  getMenuOverview,
} from '../../Store/actions';
import MenuDetails from '../Screens/Home/Chef/ChefScreen/MenuDetails';
import AddAddress from '../Screens/Customer/CustScrrens/AddAddress';
import AddLine from '../Screens/Customer/CustScrrens/AddLine';
import Verify from '../Screens/Home/Chef/ChefScreen/Verify';
import AboutScreen from '../Constants/About';
import Faq from '../Constants/Faq';
import Contact from '../Constants/Contact';
import Terms from '../Constants/Terms';
import Data from '../Constants/Data';
import More from '../Constants/More';
import {NavigationContainer} from '@react-navigation/native';

export default function ChefNav() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(getDealType());
    dispatch(getCatType());
    dispatch(GetChefOrders());
    dispatch(getMenuOverview());
    dispatch(getLocation(setLoading, Platform.OS));
  }, [dispatch]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation}) => {
          return {
            detachPreviousScreen: !navigation.isFocused(),
            headerShown: false,
            animation: Platform.OS == 'ios' ? 'default' : 'slide_from_right',
            onTransitionStart: () => Keyboard.dismiss(),
          };
        }}
        initialRouteName={'Main'}>
        <Stack.Screen name="Main" component={Tab} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Info" component={OrderInfo} />
        <Stack.Screen name="AddDish" component={AddDish} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="MoreInfo" component={More} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="FAQ" component={Faq} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Data" component={Data} />
        <Stack.Screen name="ChefProfile" component={ChefProfile} />
        <Stack.Screen name="EditMenu" component={EditMenu} />
        <Stack.Screen name="MenuDetails" component={MenuDetails} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="AddLine" component={AddLine} />
        <Stack.Screen name="Verify" component={Verify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
