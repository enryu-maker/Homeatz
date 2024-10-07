import { View, Text, Image, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/customer/screens/Home';
import { images } from '../assets/image';
import Dinning from '../pages/customer/screens/Dinning';
import More from '../pages/customer/screens/More';
const BottomTab = createBottomTabNavigator();
export default function Tab() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Delivery') {
                        iconName = focused ? images.delivery : images.delivery
                    }
                    else if (route.name === 'Pickup') {
                        iconName = focused ? images.banquet : images.banquet
                    }
                    else if (route.name === 'More') {
                        iconName = focused ? images.menu : images.menu
                    }
                    return (
                        <View
                            className={`space-y-2 justify-center items-center ${focused ? "border-t-2 border-logoPink" : ""}`}>
                            <Image
                                source={iconName}
                                resizeMode={"cover"}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 35,
                                    width: 35,
                                    objectFit: "contain",
                                    // tintColor: focused ? "#bc3061" : "#000"
                                }}
                            />
                            <Text
                                className=' font-suseB text-sm '
                                style={{
                                    color: focused ? "#bc3061" : "#000",
                                }}
                            >
                                {route.name}
                            </Text>
                        </View>
                    );
                },
                tabBarLabelStyle: {
                    padding: 0,
                    margin: 0,
                },
                tabBarStyle: {
                    // border: 'none',
                    // position: "absolute",
                    backgroundColor: "#fff",
                    height: 70,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    // borderRadius: 100,
                    alignSelf: "center",
                    // bottom: 25,
                    //   elevation: 1
                },
                tabBarActiveTintColor: "#df633a",
                tabBarInactiveTintColor: "#000000",

            })}>
            <BottomTab.Screen name="Delivery" component={Home} />
            <BottomTab.Screen name="Pickup" component={Dinning} />
            <BottomTab.Screen name="More" component={More} />


        </BottomTab.Navigator>
    )
}