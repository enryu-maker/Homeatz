import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { images } from '../assets/image';


export default function Faq({ navigation }) {
  const metadata = useSelector(state => state.Reducers.metadata);
  const faq = metadata.find(element => element.key === 'faq');

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className={`flex-1 bg-white w-full h-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>

        <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
          </TouchableOpacity>
          <Text className="text-2xl font-suseB text-center text-black">
            FAQ
          </Text>
          <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
        </View>
        <ScrollView className="flex-1 px-4">
          <View className="px-4">
            <Text className="text-lg text-justify font-suseR">
              {faq?.data}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
