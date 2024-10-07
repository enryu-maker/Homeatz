import { View, Text, Image, Platform, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CircularCard({
    navigation,
    name,
    img,
    id
}) {
    return (
        <TouchableOpacity
            className={`flex-col items-center ${Platform.OS === "android" ? 'm-1' : 'm-1'} w-[120px] h-[120px] justify-center items-center space-y-2 `}
            onPress={() => {
                navigation.navigate("ChefInfo", {
                    id: id
                });
            }}
        >
            <Image
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                source={{ uri: img }}
            />
            <Text className="text-center text-sm w-[100%] font-suseB">{name}</Text>
        </TouchableOpacity>
    );
}
