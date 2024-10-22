import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyCode } from '../../../../store/actions';

export default function Checkout({ navigation, route }) {
    const [current, setCurrent] = React.useState(0);
    const [paymentmode, setPaymentMode] = React.useState("");

    const activeAddress = "123 Main Street, Springfield, IL, 62704"; // Placeholder for the active address
    console.log(route.params.cart)
    const renderNavSection = () => {
        let steps = ['Total Payable', 'Address', 'Payment'];
        return (
            <View className="flex-row justify-between w-[88%] mt-5">
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
    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)
    const [code, setCode] = React.useState("")
    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [dispatch])
    const renderSection = () => {
        switch (current) {
            case 0:
                return (
                    <View className="w-[88%] mt-5 bg-white shadow-lg rounded-xl p-6">
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
                    <View className="w-[88%] mt-5 bg-white shadow-lg rounded-xl p-6">
                        <Text className="text-lg font-semibold text-black">
                            Address
                        </Text>
                        <Text className="text-md text-gray-700 mt-2">
                            Active Address: {activeAddress}
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
                    <View className="w-[88%] mt-5 bg-white shadow-lg rounded-xl p-6">
                        <Text className="text-lg font-semibold text-black">
                            Payment Method
                        </Text>
                        {/* Payment Option 1 */}
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode("COD")
                            }}
                            className="flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg">
                            <Text className="text-black text-md font-suseB">Cash on Delivery</Text>
                            <Image source={images.cod} className="w-8 h-8" />
                        </TouchableOpacity>
                        {/* Payment Option 2 */}
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode("ONLINE")
                            }}
                            className="flex-row items-center justify-between mt-4 p-4 bg-gray-100 rounded-lg">
                            <Text className="text-black text-md font-suseB">Pay through UPI</Text>
                            <Image source={images.upi} className="w-8 h-8" />
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
                                    setCurrent(0);
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
