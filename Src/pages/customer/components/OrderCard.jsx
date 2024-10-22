import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyCode } from '../../../../store/actions';


export default function OrderCard({
    order,
    navigation
}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const location = useSelector(state => state.Reducers.location);
    const [code, setCode] = React.useState("");

    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode));
    }, []);

    function checkStatus(order) {
        switch (order?.status) {
            case 0:
                return (
                    <Text className="text-lg font-bold self-start text-darkGrey">
                        Status: <Text className="text-base font-bold text-red-600">Cancelled</Text>
                    </Text>
                );
            case 1:
                return (
                    <Text className="text-lg font-bold self-start text-darkGrey">
                        Status: <Text className="text-base font-bold text-red-600">Payment Pending</Text>
                    </Text>
                );
            case 2:
                return (
                    <Text className="text-lg font-bold self-start text-darkGrey">
                        Status: <Text className="text-base font-bold text-red-600">Placed</Text>
                    </Text>
                );
            case 3:
                return (
                    <Text className="text-lg font-bold self-start text-darkGrey">
                        Status: <Text className="text-base font-bold text-green-600">Order Accepted</Text>
                    </Text>
                );
            case 4:
                return (
                    <Text className="text-lg font-bold self-start text-darkGrey">
                        Status: <Text className="text-base font-bold text-green-600">Out For Delivery</Text>
                    </Text>
                );
            case 5:
                return (
                    <Text className="text-lg font-bold self-start text-darkGrey">
                        Status: <Text className="text-base font-bold text-iconColor">Delivered</Text>
                    </Text>
                );
            default:
                break;
        }
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("OrderInfo", { order })}
            className="w-full py-2 rounded-lg mb-6 shadow-lg justify-center items-center"
        >
            <View className="flex-row justify-between w-[90%] mb-2">
                <Text className="text-xl font-semibold text-darkGrey">
                    Order ID: <Text className="text-base font-bold text-iconColor">#{order?.id}</Text>
                </Text>
                <Text className="text-xl font-semibold text-darkGrey">
                    Value: <Text className="text-base font-bold text-iconColor">{code} {order?.total / 100}</Text>
                </Text>
            </View>

            <View className="flex-row justify-start items-start  w-[90%] mb-2">
                <Text className="text-lg font-semibold text-start w-full text-darkGrey">
                    Delivery Date: <Text className="text-base font-bold text-iconColor">{order?.delivery_date}</Text>
                </Text>
            </View>

            <Text className="text-lg font-semibold self-start w-[90%] text-darkGrey mb-2">
                Payment: <Text className="text-base text-start w-full  font-bold text-iconColor">{order?.payment_mode}</Text>
            </Text>
            {checkStatus(order)}

            <View className="flex-row justify-end items-center w-[90%] mt-4">
                <TouchableOpacity className="bg-iconColor px-3 py-1 rounded-full" onPress={() => navigation.navigate("OrderInfo", { order })}>
                    <Text className="text-lg font-bold text-white">View Items</Text>
                </TouchableOpacity>
            </View>

            {show && product ? (
                <View className="flex-row justify-end py-2 w-[90%] mt-2">
                    <Text className="text-lg font-bold text-darkGrey">Quantity</Text>
                </View>
            ) : null}
        </TouchableOpacity>

    );
}
