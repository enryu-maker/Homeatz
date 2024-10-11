import { View, Text, SafeAreaView, StatusBar, Linking, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyCode, getItemsAction } from '../../../../store/actions';
import RNRestart from 'react-native-restart';
import { images } from '../../../assets/image';
import Toast from 'react-native-toast-message';

const useInitialURL = () => {
    const [url, setUrl] = React.useState(null);
    const [processing, setProcessing] = React.useState(true);

    React.useEffect(() => {
        const getUrlAsync = async () => {

            const initialUrl = await Linking.getInitialURL();

            setTimeout(() => {
                setUrl(initialUrl?.split('/')[3]);
                setProcessing(false);
            }, 1000);
        };

        getUrlAsync();
    }, []);

    return { url, processing };
};
export default function FoodInfo({
    navigation,
    route
}) {
    const [copied, setCopied] = React.useState(false);
    const [product, setProduct] = React.useState(route?.params?.data)
    const [loading, setLoading] = React.useState(false)
    const [code, setCode] = React.useState("")
    const [item, setItem] = React.useState([])
    const [count, setCount] = React.useState(1)

    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)

    React.useEffect(() => {
        dispatch(getItemsAction(setLoading, setItem, [id]))
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [dispatch])

    const copyToClipboard = (item) => {
        let message = `Click here to order ${item[0]?.name} https://www.homeatz.in/#/foodinfo/${item[0]?.id}`;
        Toast.show({
            type: 'success',
            text1: "URL Copied Sucessfully",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        });
        Clipboard.setString(message);
        console.log(message)
        setCopied(true);
    };
    const { url: initialUrl, processing } = useInitialURL();
    const [id, setId] = React.useState(initialUrl ? initialUrl : route?.params?.id)
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
                            <View className='flex-row  justify-between w-screen h-auto items-start mt-5 px-4'>
                                <Image
                                    className=' h-[80px] w-[80px] rounded-full border border-gray-300'
                                    source={{ uri: item[0]?.image }}
                                />
                                <View className=' w-[70%] '>
                                    <View className='flex-row space-x-4 items-center h-auto'>
                                        <Text className='text-lg font-suseB'>{item[0]?.name}</Text>
                                        {
                                            item[0]?.is_veg ?
                                                <Image source={images.Veg} className='h-5 w-5' />
                                                :
                                                <Image source={images.NonVeg} className='h-5 w-5' />
                                        }
                                        <TouchableOpacity onPress={() => {
                                            copyToClipboard()
                                        }}>
                                            <Image source={images.share} className='h-5 w-5' />
                                        </TouchableOpacity>
                                    </View>
                                    <Text className='text-xl text-black text-justify font-suseB'>
                                        {code} {item[0]?.price}</Text>
                                </View>
                            </View>
                            <View className=' px-4 justify-between w-screen border-t border-gray-200 h-auto  items-start py-5 mt-3'>
                                <Text className='text-xl text-start font-suseB'>Description:</Text>
                                <Text className='text-base text-gray-400 text-justify font-suseR'>
                                    {item[0]?.description}
                                </Text>
                            </View>
                            <View className=' px-4 justify-between w-screen border-b border-gray-200 h-auto  items-start pb-5 mt-3'>
                                <Text className='text-xl text-start font-suseB'>Ingredient:</Text>
                                <Text className='text-base text-gray-400 text-justify font-suseR'>
                                    {item[0]?.ingredients}
                                </Text>
                            </View>
                        </View>
                }
            </SafeAreaView>
            <View className='w-screen flex-row  justify-between px-5 items-center bg-white h-[80px]'>
                <View className=' bg-iconColor flex-row  py-2 justify-evenly items-center rounded-xl w-[35%]'>
                    <TouchableOpacity
                        onPress={() => {
                            if (count > 1) {
                                setCount(count - 1)
                            }
                        }}
                        className=' '>
                        <Text className='text-xl font-suseB text-white'>
                            -
                        </Text>
                    </TouchableOpacity>
                    <Text className='text-white text-xl font-suseB'>{count}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (product?.todays_limit || item[0]?.todays_limit > count) {
                                setCount(count + 1)
                            }
                            else {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Cannot Order More Than Daily Limit',
                                    visibilityTime: 2000,
                                    autoHide: true,
                                    topOffset: 50,
                                    bottomOffset: 40,
                                });
                            }
                        }}
                        className=' '>
                        <Text className='text-xl font-suseB text-white'>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className=' w-[60%] bg-iconColor py-2 justify-center items-center rounded-xl'
                    onPress={() => {
                        if (product?.todays_limit || item[0]?.todays_limit > 0) {

                            dispatch({
                                type: 'ADD_TO_CART2',
                                payload: {
                                    kitchen_id: kitchen_id,
                                    cart: {
                                        id: item[0]?.id,
                                        name: item[0]?.name,
                                        price: item[0]?.price,
                                        count: count,
                                        icon: item[0]?.icon,
                                        limit: product?.todays_limit || item[0]?.todays_limit,
                                    }

                                }
                            })
                            Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'Added to Cart',
                                visibilityTime: 2000,
                                autoHide: true,
                                topOffset: 30,
                                bottomOffset: 40,
                            })
                        }
                    }}
                >
                    <Text className=' text-white text-lg font-suseB'>
                        {product?.todays_limit || item[0]?.daily_limit > 0 ? `Add Item - ${code} ${count * item[0]?.price}` : `Out of Stock`}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}