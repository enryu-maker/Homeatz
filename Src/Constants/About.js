import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Platform, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { images } from '../assets/image';

const AboutScreen = ({ navigation }) => {
  // Static Data coming from component state
  const metadata = useSelector(state => state.Reducers.metadata);
  const aboutus = metadata.find(element => element.key == 'about');

  return (
    <View className="flex-1 bg-white">
      {/* Close Icon to go back to previous screen */}
      <SafeAreaView className={`flex-1 bg-white w-full h-full justify-start items-center ${Platform.OS === "ios" ? "" : "mt-[45px]"}`}>

        <View className="flex-row w-[100%] px-4 h-[50px] items-center justify-between ">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image className="w-5 h-5" tintColor={'#000'} source={images.back} />
          </TouchableOpacity>
          <Text className="text-2xl font-suseB text-center text-black">
            About Us
          </Text>
          <TouchableOpacity className="w-5 h-5"></TouchableOpacity>
        </View>
        <ScrollView className="flex-1 px-4">
          <View className="px-4">
            <Text className="text-base text-justify font-suseR">
              {aboutus?.data}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AboutScreen;
