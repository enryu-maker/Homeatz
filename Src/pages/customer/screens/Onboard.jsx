import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { images } from '../../../assets/image';

export default function Onboard({ navigation }) {
  return (
    <View className=" flex-1 bg-white w-full justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        className=" absolute top-5 right-5 w-[70px] rounded-full py-1 bg-slate-200">
        <Text className=" text-center font-suseR">skip</Text>
      </TouchableOpacity>
      <Image
        source={images.logo}
        className="h-[300px] w-[300px] object-contain"
      />
      <View className="w-full  h-[260px] justify-evenly items-center bottom-0 absolute bg-logoPink p-2">
        <Text className="text-2xl text-white font-suseR text-center">
          Continue As?
        </Text>
        <View className="flex-row w-full justify-around items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login', {
                chef: false,
              });
            }}>
            <Image
              source={images.bonus}
              className="w-[110px] h-[110px] border bg-white object-cover   rounded-full"
            />
            <Text className="text-xl font-suseR  text-white text-center">
              Customer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login', {
                chef: true,
              });
            }}>
            <Image
              source={images?.cook}
              className="w-[110px] h-[110px] border bg-white   rounded-full"
            />
            <Text className="text-xl font-suseR  text-white text-center">
              Chef
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
