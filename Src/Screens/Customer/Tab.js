import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import {colors} from '../../../Assets/theme';
import {images} from '../../Assets/image';
import {RFPercentage} from 'react-native-responsive-fontsize';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Search from './Search';
import Cart from './Cart';
import More from './More';
import TopRated from './TopRated';

const BottomTab = createBottomTabNavigator();
export default function Tab() {
  return (
    <>
      <BottomTab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconColor;
            if (route.name === 'Home') {
              iconName = focused ? images.home : images.home;
              iconColor = focused ? colors.black : colors.darkGrey;
              iconweight = focused ? '700' : null;
            } else if (route.name === 'Search') {
              iconName = focused ? images.search : images.search;
              iconColor = focused ? colors.black : colors.darkGrey;
              iconweight = focused ? '700' : null;
            } else if (route.name === 'Top Rated') {
              iconName = focused ? images.badge : images.badge;
              iconColor = focused ? colors.black : colors.darkGrey;
              iconweight = focused ? '700' : null;
            } else if (route.name === 'More') {
              iconName = focused ? images.more : images.more;
              iconColor = focused ? colors.black : colors.darkGrey;
              iconweight = focused ? '700' : null;
            }
            return (
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: focused ? colors.white : 'transparent',
                  justifyContent: 'center',
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                  borderRadius: 12,
                }}>
                <Image
                  source={iconName}
                  resizeMode={'cover'}
                  style={{
                    alignSelf: 'center',
                    height: focused ? 30 : 28,
                    width: focused ? 30 : 28,
                    tintColor: focused ? colors.logoPink : colors.white,
                  }}
                />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontFamily: 'LEMONMILK-Bold',
            fontSize: RFPercentage(2),
          },
          tabBarStyle: {
            height: hp('13.5%'),
            backgroundColor: colors.logoPink,
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.white,
        })}>
        <BottomTab.Screen name="Home" component={Home} />
        <BottomTab.Screen name="Search" component={Search} />
        <BottomTab.Screen name="Top Rated" component={TopRated} />
        <BottomTab.Screen name="More" component={More} />
      </BottomTab.Navigator>
    </>
  );
}
