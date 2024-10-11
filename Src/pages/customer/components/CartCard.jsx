import { View, Text, Image, TouchableOpacity } from 'react-native'

import React from 'react'
import { images } from '../../../assets/image'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrencyCode } from '../../../../store/actions'
import Toast from 'react-native-toast-message'

export default function CartCard({
    item,
    kitchen_id
}) {
    const dispatch = useDispatch()
    const location = useSelector(state => state.Reducers.location)
    const [count, setCount] = React.useState(item?.count)
    const [code, setCode] = React.useState("")
    React.useEffect(() => {
        dispatch(getCurrencyCode(location?.country, setCode))
    }, [dispatch])
    return (
        <View
            className=' w-[92%] self-center flex-row mb-2 mt-3 h-auto '>
            <View className='px-1 w-[70%] space-y-1'>
                <Text className=' text-lg font-suseB items-center'>
                    {
                        item?.is_veg ?
                            <Image source={images.Veg} className='h-4 w-4 mr-2' />
                            :
                            <Image source={images.NonVeg} className='h-4 w-4 mr-2' />
                    } {item?.name}
                </Text>
                <Text className=' text-md font-suseB ml-7'>
                    {code} {item?.price}
                </Text>
            </View>
            <View className=' w-[30%] space-y-2'>

                <View className=' bg-iconColor flex-row h-[35px] justify-evenly items-center rounded-lg'>
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
                <Text className=' text-md text-right text-gray-600 font-suseB px-1'>
                    {code} {item?.price * count}
                </Text>
            </View>

        </View>
    )
}