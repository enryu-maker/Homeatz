import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '../../../assets/image'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencyCode, updateCartAction } from '../../../../store/actions'
import Toast from 'react-native-toast-message'
export default function FoodCard({
    navigation,
    item,
    kitchen_id
}) {
    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)
    const [count, setCount] = React.useState(0)
    const [code, setCode] = React.useState("")
    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [dispatch])
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('FoodInfo', {
                    id: item?.id,
                    data: item,
                    kitchen_id: kitchen_id
                })
            }}
            className=' w-[92%] self-center flex-row mb-2 mt-3 h-[120px]'>
            <View className='px-1 w-[70%] space-y-1'>
                {
                    item?.is_veg ?
                        <Image source={images.Veg} className='h-5 w-5' />
                        :
                        <Image source={images.NonVeg} className='h-5 w-5' />
                }
                <Text className=' text-base font-suseB'>
                    {item?.name}
                </Text>
                <Text className=' text-md font-suseB'>
                    {code} {item?.price}
                </Text>
                <Text className='text-[10px] text-gray-400 font-suseR'>{
                    item?.description?.length > 50 ?
                        item?.description?.slice(0, 50) + " read more..."
                        :
                        item?.description
                }</Text>
            </View>
            <View className='w-[30%] h-[100px] flex justify-center items-center'>
                <Image
                    source={{ uri: item?.image }}
                    className='h-[80px] w-[100%] rounded-lg'
                    resizeMode="cover"
                />
                {
                    count > 0 ?
                        <View className=' bg-iconColor flex-row fixed bottom-2 py-1 justify-evenly items-center rounded-lg w-[80%]'>
                            <TouchableOpacity
                                onPress={() => {
                                    if (count === 0) {
                                        dispatch({
                                            type: 'REMOVE_FROM_CART',
                                            payload: {
                                                kitchen_id: kitchen_id, // The kitchen ID
                                                item_id: item?.id // The item ID to be removed
                                            }
                                        });
                                    }
                                    else {
                                        setCount(count - 1)
                                        dispatch({
                                            type: 'CHANGE_QUANTITY',
                                            payload: {
                                                kitchen_id: kitchen_id, // The kitchen ID
                                                cart: {
                                                    id: item?.id, // The ID of the item you want to change
                                                    count: count - 1 // The new quantity value you want to set
                                                }
                                            }
                                        })
                                    }
                                }}
                                className=' '>
                                <Text className='text-lg font-suseB text-white'>
                                    -
                                </Text>
                            </TouchableOpacity>
                            <Text className='text-white font-suseB'>{count}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (item?.todays_limit > count) {
                                        setCount(count + 1)
                                        dispatch({
                                            type: 'CHANGE_QUANTITY',
                                            payload: {
                                                kitchen_id: kitchen_id, // The kitchen ID
                                                cart: {
                                                    id: item?.id, // The ID of the item you want to change
                                                    count: count + 1 // The new quantity value you want to set
                                                }
                                            }
                                        })
                                    }
                                    else {
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Cannot Order More Than Daily Limit',
                                            visibilityTime: 2000,
                                            autoHide: true,
                                            topOffset: 30,
                                            bottomOffset: 40,
                                        });
                                    }
                                }}
                                className=' '>
                                <Text className='text-lg font-suseB text-white'>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                setCount(count + 1)
                                dispatch({
                                    type: 'ADD_TO_CART2',
                                    payload: {
                                        kitchen_id: kitchen_id,
                                        cart: {
                                            id: item?.id,
                                            name: item?.name,
                                            price: item?.price,
                                            count: count + 1,
                                            image: item?.image,
                                            description: item?.description,
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
                            }}
                            className=' bg-iconColor fixed bottom-2 py-1 justify-center items-center rounded-lg w-[80%]'>
                            <Text className='text-lg font-suseB text-white'>
                                Add +
                            </Text>
                        </TouchableOpacity>
                }

            </View>
        </TouchableOpacity>
    )
}