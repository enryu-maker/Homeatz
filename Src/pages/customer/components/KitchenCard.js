import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function KitchenCard({
    name,
    img,
    distance,
    navigation,
    id
}) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("ChefInfo", {
                    id: id
                });
            }}
            className='w-[92%] border border-gray-200  bg-white flex-row items-center justify-evenly rounded-xl mb-5 self-center h-[120px]'>
            <Image
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                source={{ uri: img }}
            />
            <View className='w-[60%] flex-col justify-evenly h-[100%]'>
                <Text className='text-lg text-black font-suseB'>{name}</Text>
                <Text className='text-sm text-black font-suseR'>{name}</Text>

                <Text className='text-md text-iconColor font-suseR'>{Math.round(distance)} km Away</Text>
            </View>
        </TouchableOpacity>
    )
}