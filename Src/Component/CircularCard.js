import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CircularCard({navigation, name, img, id}) {
  return (
    <TouchableOpacity
      className="flex-col items-center m-1 w-1/3" // Tailwind for layout and width
      onPress={() => {
        navigation.navigate('ChefInfo', {id});
      }}>
      <Image
        className="rounded-full border-2 border-gray-300 w-24 h-24" // Tailwind for image styling and size
        source={{uri: img}}
      />
      <Text
        className="text-center font-bold text-lg" // Tailwind for text style and size
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
