import { View, Text, Image } from 'react-native'
import React from 'react'

export default function KitchenCard({
    name,
    img,
    distance,
    navigation,
    id
}) {
    return (
        <View className='w-[92%] shadow-xl border border-gray-100 shadow-gray-400 bg-white flex-row items-center justify-evenly rounded-xl mb-5 self-center h-[150px]'>
            <Image
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                source={{ uri: img }}
            />
            <View className='w-[60%] flex-col justify-evenly h-[100%]'>
                <Text className='text-lg text-black font-suseB'>{name}</Text>
                <Text className='text-sm text-black font-suseR'>{name}</Text>

                <Text className='text-md text-gray-600 font-suseR'>{Math.round(distance)} KM Away</Text>
            </View>
        </View>
    )
}