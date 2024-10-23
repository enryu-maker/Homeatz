import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getCurrencyCode } from '../../../../store/actions';
import Toast from 'react-native-toast-message';

export default function Checkout({ navigation, route }) {
    const [current, setCurrent] = React.useState(0);
    const [paymentmode, setPaymentMode] = React.useState("");
    const [selected, setSelected] = React.useState(1)
    const [ordermode, setOrderMode] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const renderNavSection = () => {
        let steps = ['Total', 'Address', 'Slot', 'Payment'];
        return (
            <View className="flex-row justify-between w-[90%] mt-5">
                {steps.map((step, index) => (
                    <View key={index} className="flex-1 items-center">
                        <Text
                            className={`text-sm font-semibold font-suseB ${current === index ? 'text-iconColor' : 'text-gray-400'
                                }`}
                        >
                            {step}
                        </Text>
                        <View
                            className={`h-1 w-full rounded-full mt-1 ${current === index ? 'bg-iconColor' : 'bg-gray-200'
                                }`}
                        />
                    </View>
                ))}
            </View>
        );
    };
    function getTotal(cart) {
        var total = 0
        cart.map((item) => {
            total = item?.price * item?.count + total
        })
        return total
    }

    function getProduct(cart) {
        let itemsID = []
        let subtotal = {}
        let subtotal_qty = {}
        cart.map((items) => {
            itemsID.push(items.id)
            subtotal[items.id] = items.price * 100
            subtotal_qty[items.id] = items.count
        })
        return {
            "items": itemsID,
            "address_id": active?.id,
            "total": getTotal(cart) * 100,
            "subtotal": JSON.stringify(subtotal),
            "subtotal_qty": subtotal_qty
        }
    }

    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)
    const active = useSelector(state => state.Reducers.active)
    const [code, setCode] = React.useState("")

    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [dispatch])

    const renderSection = () => {
        switch (current) {
            case 0:
                return (
                    <View className=" mt-5 w-full bg-white  px-4 rounded-xl ">

                        <Text className="text-lg font-semibold font-suseB text-black">
                            Total Payable
                        </Text>
                        <Text className="text-2xl font-bold font-suseB text-black mt-2">
                            {code} {getTotal(route?.params?.cart)} <Text className=' text-gray-300 text-lg'>
                                #{route?.params?.cart?.length}
                            </Text>
                        </Text>
                        <View className="flex-row justify-end mt-6">
                            <TouchableOpacity
                                className=" bg-iconColor rounded-full py-3 px-8 shadow-md"
                                onPress={() => setCurrent(1)}
                            >
                                <Text className="text-white text-lg font-medium font-suseB">Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View className=" mt-5 w-full bg-white  px-4 rounded-xl ">

                        <Text className="text-xl font-semibold font-suseB text-black">
                            Active Address
                        </Text>
                        <Text className="text-base text-gray-700 font-suseB mt-2">
                            {`${active?.address_line_1} ${active?.address_line_2}, ${active?.city}, ${active?.state}, ${active?.country}, ${active?.pin_code}`}
                        </Text>
                        <View className="flex-row justify-between mt-6">
                            <TouchableOpacity
                                className="bg-gray-400 rounded-full py-3 px-8 shadow-md"
                                onPress={() => setCurrent(0)}
                            >
                                <Text className="text-white text-lg font-medium">Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className=" bg-iconColor rounded-full py-3 px-8 shadow-md"
                                onPress={() => setCurrent(2)}
                            >
                                <Text className="text-white text-lg font-medium font-suseB">Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View className=" mt-5 w-full bg-white  px-4 rounded-xl ">
                        <Text className="text-lg font-semibold font-suseB text-black">
                            Delivery Slot
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelected(1)
                            }}
                            className={`flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg ${selected === 1 ? "border-iconColor border " : " text-black"}`}>
                            <Text className="text-black text-base font-suseB">12-PM</Text>
                            <Image source={images.wait} className="w-8 h-8" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelected(2)
                            }}
                            className={`flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg ${selected === 2 ? "border-iconColor border " : " text-black"}`}>
                            <Text className="text-black text-base font-suseB">06-PM</Text>
                            <Image source={images.wait} className="w-8 h-8" />
                        </TouchableOpacity>
                        <Text className="text-lg mt-3 font-semibold font-suseB text-black">
                            Delivery Option
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setOrderMode(1)
                            }}
                            className={`flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg ${ordermode === 1 ? "border-iconColor border " : " text-black"}`}>
                            <Text className="text-black text-base font-suseB">Pickup From chef Location</Text>
                            <Image source={images.foodpickup} className="w-8 h-8" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setOrderMode(2)
                            }}
                            className={`flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg ${ordermode === 2 ? "border-iconColor border " : " text-black"}`}>
                            <Text className="text-black text-base font-suseB">Door Delivey</Text>
                            <Image source={images.delivery} className="w-8 h-8" />
                        </TouchableOpacity>
                        <View className="flex-row justify-between mt-6">
                            <TouchableOpacity
                                className="bg-gray-400 rounded-full py-3 px-8 shadow-md"
                                onPress={() => setCurrent(1)}
                            >
                                <Text className="text-white text-lg font-medium font-suseB">Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-iconColor rounded-full py-3 px-8 shadow-md"
                                onPress={() => {
                                    // Confirm payment or any other action
                                    setCurrent(3);
                                }}
                            >
                                <Text className="text-white text-lg font-medium font-suseB">Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View className=" mt-5 w-full bg-white  px-4 rounded-xl ">

                        <Text className="text-lg font-semibold mt-4 font-suseB text-black">
                            Payment Method
                        </Text>
                        {/* Payment Option 1 */}
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode("COD")
                            }}
                            className={`flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg ${paymentmode === "COD" ? "border-iconColor border " : " text-black"}`}>
                            <Text className="text-black text-base font-suseB">Cash on Delivery</Text>
                            <Image source={images.cod} className="w-8 h-8" />
                        </TouchableOpacity>
                        {/* Payment Option 2 */}
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode("ONLINE")
                            }}
                            className={`flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg ${paymentmode === "ONLINE" ? "border-iconColor border " : " text-black"}`}>
                            <Text className="text-black text-base font-suseB">Pay through UPI</Text>
                            <Image source={images.upi} className="w-8 h-8" />
                        </TouchableOpacity>
                        <View className="flex-row justify-between mt-6">
                            <TouchableOpacity
                                className="bg-gray-400 rounded-full py-3 px-8 shadow-md"
                                onPress={() => setCurrent(2)}
                            >
                                <Text className="text-white text-lg font-medium font-suseB">Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-iconColor rounded-full py-3 px-8 shadow-md"
                                onPress={() => {
                                    if (paymentmode === "") {
                                        Toast.show({
                                            type: 'error',
                                            text1: "Please Select the method to proceed",
                                            visibilityTime: 2000,
                                            autoHide: true,
                                            topOffset: 30,
                                            bottomOffset: 40,
                                        });
                                    }
                                    else {
                                        const data = getProduct(route?.params?.cart)
                                        data["delivery_slot"] = ordermode
                                        data["delivery_mode"] = selected
                                        data["payment_mode"] = paymentmode
                                        console.log(data)
                                        dispatch(createOrder(data, setLoading, navigation))
                                    }
                                }}
                            >
                                <Text className="text-white text-lg font-medium font-suseB">Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#ffffff"
                translucent={true}
            />
            <SafeAreaView className={`flex-1 w-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>
                {/* Header Section */}
                <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-center text-black">
                        Checkout
                    </Text>
                    <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
                </View>

                {/* Navigation Section */}
                {renderNavSection()}

                {/* Dynamic Section Rendering */}
                <View className="flex-grow justify-start items-center w-full">
                    {renderSection()}
                </View>
            </SafeAreaView>
        </View>
    );
}
