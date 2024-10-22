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

    function getTotal(cart) {
        var total = 0
        cart.map((item) => {
            total = item?.price * item?.count + total
        })
        return total
    }
    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)
    const access = useSelector(state => state.Reducers.access)
    const [code, setCode] = React.useState("")
    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [dispatch])
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
                    disableVirtualization
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
                onPress={() => {
                    if (access === null) {
                        navigation.navigate("Login")
                    }
                    else {
                        navigation.navigate("Checkout", {
                            cart: cart2
                        })
                    }

                }}
                className=' w-full bg-iconColor h-[80px] justify-between px-5 flex-row items-center'
            >
                <Text className=' text-white text-lg font-suseB'>
                    {code} {getTotal(cart2)}
                </Text>
                <Text className=' bg-white px-6 py-2 tracking-widest rounded-lg font-bold text-lg font-suseB'>
                    Checkout
                </Text>
            </TouchableOpacity>
        </View>
    )
}