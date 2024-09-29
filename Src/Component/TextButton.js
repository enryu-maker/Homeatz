import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

export default function TextButton({title, onPress, loading}) {
  return (
    <View className="flex-row justify-center my-4">
      <TouchableOpacity
        onPress={onPress}
        className="w-[88%] px-3 bg-iconColor border border-black rounded-lg shadow-md shadow-gray-200">
        {loading ? (
          <ActivityIndicator
            size={40}
            className="py-2 text-white"
            color="#fff"
          />
        ) : (
          <Text className="text-white text-center font-bold py-3 text-base">
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
