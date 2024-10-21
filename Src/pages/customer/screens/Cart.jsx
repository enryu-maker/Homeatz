import { View, Text, Image, FlatList, Linking, TouchableOpacity, ActivityIndicator, StatusBar, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getChef, getChefMenuAction, getCurrencyCode } from '../../../../store/actions';
import RNRestart from 'react-native-restart';
import { images } from '../../../assets/image';
import FoodCard from '../components/FoodCard';
import Toast from 'react-native-toast-message';
import CartCard from '../components/CartCard';

export default function Cart({
    navigation,
    route
}) {
    const cart2 = useSelector(state => {
        const kitchenEntry = state.Reducers.cart2.find(k => k.kitchen_id === route?.params?.id);
        return kitchenEntry ? kitchenEntry.cart : []; // Return the cart if found, or an empty array if not
    });

    console.log(cart2)
    function getTotal(cart) {
        var total = 0
        cart.map((item) => {
            total += item?.price * item?.count
        })
    }
    return (
        <View className=" flex-1">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#ffffff"
                translucent={true}
            />
            <SafeAreaView className={`flex-1 bg-white w-full h-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>
                <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between ">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-suseB text-center text-black">
                        My Cart
                    </Text>
                    <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
                </View>
                <FlatList
                    className='w-screen mt-5'
                    showsVerticalScrollIndicator={false}

                    data={cart2}
                    renderItem={({ item, index }) => {
                        return (
                            <CartCard key={index} item={item} kitchen_id={route?.params?.id} />
                        )
                    }}
                    keyExtractor={(item) => item?.name}
                />
            </SafeAreaView>
            <TouchableOpacity
                className=' w-[60%] bg-iconColor py-2 justify-around flex-row items-center rounded-xl'
            >
                <Text className=' text-white text-lg font-suseB'>
                    Checkout
                </Text>
                <Text className=' text-white text-lg font-suseB'>
                    Checkout
                </Text>
            </TouchableOpacity>
        </View>
    )
}