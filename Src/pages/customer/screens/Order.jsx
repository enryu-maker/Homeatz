import { View, Text, StatusBar, SafeAreaView, RefreshControl, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyCode, getOrdersAction } from '../../../../store/actions';
import OrderCard from '../components/OrderCard';

export default function Order({
    navigation
}) {
    const [current, setCurrent] = React.useState(0);
    const userOrders = useSelector(state => state.Reducers.userOrders)
    const [currentchefOrders, setcurrentChefOrders] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false)
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    React.useEffect(() => {
        dispatch(getOrdersAction())
        setcurrentChefOrders(userOrders['12-PM'])
    }, [dispatch])
    const renderNavSection = () => {
        let steps = ['06-PM', '12-PM'];
        return (
            <View className="flex-row justify-between w-[88%] mt-5">
                {steps.map((step, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            setCurrent(index);
                            setcurrentChefOrders(userOrders[step])
                        }}
                        key={index} className="flex-1 items-center">
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
                    </TouchableOpacity>
                ))}
            </View>
        );
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
                    <Text className="text-2xl font-bold text-center font-suseB text-black">
                        Order History
                    </Text>
                    <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
                </View>

                {/* Navigation Section */}
                {renderNavSection()}
                <FlatList
                    className='w-full'
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    refreshControl={<RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            dispatch(getOrdersAction(setLoading))
                            setRefreshing(false)
                        }} />}
                    contentContainerStyle={{
                        alignItems: "center",
                        width: "100%"
                        //     paddingBottom: 20,

                    }}
                    data={[1, 2, 3, 4]}
                    renderItem={({ item, index }) => <OrderCard key={item?.id} order={item} navigation={navigation} />}
                    keyExtractor={(item) => item.toString()}
                />
            </SafeAreaView>
        </View>
    )
}