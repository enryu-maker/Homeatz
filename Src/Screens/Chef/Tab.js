import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import { colors } from '../../../Assets/theme';
import { images } from '../../../Assets/image';
import { RFPercentage } from 'react-native-responsive-fontsize';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import More from './More';
import Menu from './Menu';
import Order from './Order';
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
            iconName = focused ? images.home : images.home
            iconColor=focused ? colors.black : colors.darkGrey
            iconweight=focused ? "700": null
          } else if (route.name === 'To Cook') {
            iconName = focused ? images.order : images.order;
            iconColor=focused ? colors.black : colors.darkGrey
            iconweight=focused ? "700": null
          } 
          else if (route.name === 'Menu') {
            iconName = focused ? images.menu : images.menu;
            iconColor=focused ? colors.black : colors.darkGrey
            iconweight=focused ? "700": null
          }
          else if (route.name === 'More') {
            iconName = focused ? images.more :images.more
            iconColor=focused ? colors.black: colors.darkGrey 
            iconweight=focused ? "700": null
          }
          return (
            <View
              style={{
                height: 45,
                width:45,
                backgroundColor: focused ? colors.white : "transparent",
                justifyContent: 'center',
                justifyContent:"space-evenly",
                alignSelf: 'center',
                borderRadius: 12,
              }}>
              <Image
                source={iconName}
                resizeMode={"cover"}
                style={{
                  alignSelf: 'center',
                  height:focused ? 30 : 28,
                  width: focused ? 30 : 28,
                  tintColor:focused ? colors.logoPink : colors.white,
                }}
              />             
            </View>
          );
        },
        tabBarLabelStyle: {
            fontFamily: 'BalsamiqSans-Bold',
            fontSize: RFPercentage(2.2),
        },
        tabBarStyle: {
          height:hp('12%'),
          backgroundColor: colors.logoPink,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.black,
      })}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="To Cook" component={Order} />
      <BottomTab.Screen name="Menu" component={Menu} />
      <BottomTab.Screen name="More" component={More} />
    </BottomTab.Navigator>
    </>

    )
}