import { View, Text, Image, FlatList, Linking, TouchableOpacity, ActivityIndicator, StatusBar, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getChef, getChefMenuAction, getCurrencyCode } from '../../../../store/actions';
import RNRestart from 'react-native-restart';
import { images } from '../../../assets/image';
import FoodCard from '../components/FoodCard';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-community/clipboard'

const useInitialURL = () => {
    const [url, setUrl] = React.useState(null);
    const [processing, setProcessing] = React.useState(true);

    React.useEffect(() => {
        const getUrlAsync = async () => {
            // Get the deep link used to open the app
            const initialUrl = await Linking.getInitialURL();

            // The setTimeout is just for testing purpose
            setTimeout(() => {
                setUrl(initialUrl?.split('/')[3]);
                setProcessing(false);
            }, 1000);
        };

        getUrlAsync();
    }, []);

    return { url, processing };
};
export default function ChefInfo({
    navigation,
    route
}) {
    const [loading, setLoading] = React.useState(false)
    const [Item, setItem] = React.useState(null)
    const [menu, setMenu] = React.useState([])
    const [current, setCurrent] = React.useState(0)
    const [copied, setCopied] = React.useState(false);

    const cart2 = useSelector(state => {
        const kitchenEntry = state.Reducers.cart2.find(k => k.kitchen_id === route?.params?.id);
        return kitchenEntry ? kitchenEntry.cart : []; // Return the cart if found, or an empty array if not
    });

    console.log(cart2)

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getChef(setLoading, id, setItem))
        dispatch(getChefMenuAction(setLoading, setMenu, id))
    }, [dispatch])
    function formatData(data) {
        const arr = []
        Object?.keys(data)?.map((item, index) => {
            arr.push({
                "name": item,
                "value": data[item].data,
                "icon": data[item].icon
            })
        }
        )
        return arr
    }
    function formatData2(data) {
        let arr = []
        Object?.keys(data)?.map((key) => {
            arr.push({
                name: key,
                value: data[key]
            })
        }
        )
        return arr
    }
    // Copy on clicking on share button
    const copyToClipboard = () => {
        let message = `Click here to order from ${Item?.kitchen_name} https://www.homeatz.in/#/chefinfo/${id}`;
        Toast.show({
            type: 'success',
            text1: "URL Copied Sucessfully",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
        Clipboard.setString(message);
        setCopied(true);
    };

    const { url: initialUrl, processing } = useInitialURL();
    const [id, setId] = React.useState(initialUrl ? initialUrl : route?.params?.id)
    var currentDate = new Date();

    function getDeliveryDate(name, currentDate) {
        switch (name) {
            case "Today 's":
                return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

            case "Tomorrow's":
                return ` ${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate() + 1}`;

            case "Monthly Plan":
                return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate() + 2}`;
            case "Party Menu":
                return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate() + 2}`;

        }
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
                {
                    initialUrl ?
                        <TouchableOpacity
                            onPress={() => {
                                RNRestart.Restart();
                            }}
                        >
                            <Text
                                className=' text-lg font-suseB'
                            >
                                Go Home
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            className='w-[92%] self-center'
                            onPress={() => {
                                navigation.goBack()
                            }}
                        >
                            <Image
                                source={images.back}
                                className='h-5 w-5 object-contain'
                                tintColor={"#6b7280"}
                            />
                        </TouchableOpacity>
                }
                {
                    loading ?
                        <View className='flex-1 justify-center items-center'>
                            <ActivityIndicator size="large" color="#bc3061" />
                        </View>
                        :
                        <View className='flex-1 '>
                            <View className='flex-row  justify-between w-screen items-center mt-5 px-4'>
                                <Image
                                    className=' h-[80px] w-[80px] rounded-full border border-gray-300'
                                    source={{ uri: Item?.icon }}
                                />
                                <View className=' w-[70%] '>
                                    <View className='flex-row space-x-4 items-center h-auto'>
                                        <Text className='text-lg font-suseB'>{Item?.kitchen_name}</Text>
                                        <TouchableOpacity onPress={() => {
                                            copyToClipboard()
                                        }}>
                                            <Image source={images.share} className='h-5 w-5' />
                                        </TouchableOpacity>
                                    </View>
                                    <Text className='text-md text-gray-400 font-suseR'>{
                                        Item?.description?.length > 50 ?
                                            Item?.description?.slice(0, 100) + "..."
                                            :
                                            Item?.description
                                    }</Text>
                                </View>
                            </View>
                            {/* bg-[#F8F4F4] */}
                            <View className='flex-row justify-between w-screen border-t border-gray-200 h-[60px]  items-center mt-5'>
                                <FlatList
                                    className=' self-center'
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={formatData(menu)}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                className={`flex-col justify-center items-center mx-2 space-y-5 `}
                                                onPress={() => {
                                                    setCurrent(index)
                                                }}
                                            >
                                                <Text className={` text-xl font-suseR ${current === index ? "text-black border-b font-suseB border-logoPink " : "text-gray-500"}`}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <View className=' '>
                                <Image
                                    source={{ uri: formatData(menu)[current]?.icon }}
                                    className='h-[150px] w-screen self-center object-fill '
                                />
                                <Text
                                    className=' text-base font-suseB px-3 pt-2'>
                                    {`Delivery Date : ${getDeliveryDate(formatData(menu)[current]?.name, currentDate)}`}
                                </Text>
                                <Text
                                    className=' text-base font-suseB px-3 py-2'>
                                    Delivery Time : 12PM / 6PM
                                </Text>
                            </View>
                            <View className=' w-screen flex items-center flex-row justify-evenly mt-2 '>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                                <Text className='text-xl font-suseB text-gray-800 '>{formatData(menu)[current]?.name} Menu </Text>
                                <View className='w-[25%] h-[2px] bg-slate-200' />
                            </View>
                            {
                                formatData(menu)[current]?.value ?
                                    <FlatList
                                        style={{
                                            width: '100%',
                                            marginTop: 20,
                                        }}
                                        showsVerticalScrollIndicator={false}

                                        data={formatData2(formatData(menu)[current]?.value)}
                                        renderItem={({ item }) => {
                                            return (
                                                <View
                                                    className=' w-screen flex-col justify-start items-start py-2 self-start'>
                                                    <Text
                                                        className=' text-lg px-4 font-suseB'>{item?.name}</Text>
                                                    {
                                                        item?.value?.map((val, index) => {
                                                            return (
                                                                <FoodCard kitchen_id={id} key={index} cart={cart2} navigation={navigation} item={val} />
                                                            )
                                                        }
                                                        )
                                                    }
                                                </View>
                                            )
                                        }}
                                        keyExtractor={(item) => item?.name}
                                    />
                                    :
                                    null
                            }

                        </View>
                }

            </SafeAreaView>
            {
                cart2.length > 0 ?
                    <View className='w-screen flex-row border-t border-gray-400 justify-between px-5 items-center bg-iconColor h-[80px]'>
                        <View className='w-[60%] justify-start'>
                            <Text className=' text-white text-base font-suseB'> {
                                cart2?.length
                            } Item in Cart</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Cart', {
                                    id: id
                                })
                            }}
                        >
                            <Text className=' text-white text-lg font-suseB'>
                                View Cart
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
        </View>
    )
}